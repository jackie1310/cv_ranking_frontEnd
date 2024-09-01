import { useState } from "react";
// import { storage } from "../firebaseconfig";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import { toast } from "sonner";
import Button from "./Button";
import { useAuth } from "../contexts/UserContext";
import Loading from "./Loading";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { findAllByAltText } from "@testing-library/react";
import { storage } from "../firebaseconfig";
// import CommonProgress from "./CommonProgress";


export default function UploadFile({ parentId }) {
    // const [progress, setProgress] = useState(0);
    const { currentUser } = useAuth();
    console.log(currentUser)
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const { fetchAnalysis } = useAuth();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const fileUpload = (file) => {
        const storageRef = ref(storage, `${currentUser}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setIsUploading(true);
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setFileUrl(downloadURL);
                    setIsUploading(false);
                    toast.success("File upload successfully");
                    // window.location.reload()
                })
                    .catch((error) => {
                        toast.error("Error uploading files: ", error);
                    }
                );
            }
        )
    }

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }

        try {
            fileUpload(file);
        } catch (err) {
            toast.error("Could not upload the file");
        }
    };

    const handleAnalysis = async () => {
        if (!fileUrl) {
            toast.error('File URL required');
            return;
        }

        // const formData = new FormData();
        // formData.append('file_url', fileUrl);
        // formData.append('email', currentUser);

        try {
            setIsAnalysing(true);
            const response = await axios.post('/candidate/analyse', fileUrl, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data)
            toast.success('Analysed successfully');
        } catch (error) {
            console.log(error);
            console.error('Could not analyse');
        } finally {
            setFile(null);
            setFileUrl("");
            setIsAnalysing(false);
            fetchAnalysis();
        }
    };

    return (
        <div className="flex md:flex-col gap-3">
            <div className="flex gap-5">
                {/* <input type="file" onChange={handleFileChange} /> */}
                <input type="file" className="file-input w-full max-w-xs text-black" onChange={handleFileChange} disabled={isAnalysing || isUploading} />
                {/* {isFileVisible && <input type="file"  multiple className="file-input w-full max-w-xs text-black" onChange={(event) => uploadFiles(event)} />} */}
                <Button
                    title={isUploading ? "Uploading..." : "Upload file"}
                    btnClass="btn-primary text-white"
                    onClick={() => handleUpload()}
                    disabled={isUploading || isAnalysing}
                />
                <Button
                    title={isAnalysing ? "Analysing..." : "Analyse"}
                    btnClass="btn-primary text-white"
                    onClick={() => handleAnalysis()}
                    disabled={isUploading || isAnalysing}
                />
            </div>
        </div>
    )
}