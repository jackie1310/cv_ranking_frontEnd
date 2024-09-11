import { useState } from "react";
import Button from "../Button";
import { toast } from "sonner";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebaseconfig";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";

export default function Analyser() {
    const [pdf, setPDF] = useState("");
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const { currentUser } = useAuth();

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
                    setPDF(downloadURL);
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
        if (!pdf) {
            toast.error('File URL required');
            return;
        }

        // const formData = new FormData();
        // formData.append('file_url', fileUrl);
        // formData.append('email', currentUser);

        try {
            setIsAnalysing(true);
            const response = await axios.post('/analysing/analyse_strength_weakness', pdf, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data)
            setAnalysis(response.data);
            toast.success('Analysed successfully');
        } catch (error) {
            console.log(error);
            console.error('Could not analyse');
        } finally {
            setFile(null);
            setIsAnalysing(false);
        }
    };

    return (
        <div>
            <div className="mb-10">
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
            <div className="mt-8 mb-10">
                <h2 className="text-2xl font-bold text-gray-700">Resume Analyser</h2>
                {pdf ? (
                    <iframe
                        src={pdf}
                        className="w-full h-[800px] mt-4 border"
                        title="Resume PDF"
                    />
                ) : (
                    <p className="text-gray-500">Upload your resume to view the analysis</p>
                )}
            </div>
            {analysis && <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
                {/* PDF Viewer Section */}

                {/* Strengths Section */}
                <div className="mb-8">
                    <h2 className="text-5xl font-bold text-white bg-green-600 px-6 py-2 -mx-6">Strengths</h2>
                    <ul className="list-disc list-inside mt-4 space-y-4">
                        <li>
                            <strong>Core Competencies:</strong> {analysis[0].strengths.core_competencies}
                        </li>
                        <li>
                            <strong>Accomplishments:</strong> {analysis[0].strengths.accomplishments}
                        </li>
                        <li>
                            <strong>Leadership and Collaboration:</strong> {analysis[0].strengths.leadership_and_collaboration}
                        </li>
                        <li>
                            <strong>Communication Skills:</strong> {analysis[0].strengths.communication_skills}
                        </li>
                        <li>
                            <strong>Analytical Skills:</strong> {analysis[0].strengths.analytical_skills}
                        </li>
                        <li>
                            <strong>Adaptability and Learning:</strong> {analysis[0].strengths.adaptability_and_learning}
                        </li>
                        <li>
                            <strong>Client and Customer Focus:</strong> {analysis[0].strengths.client_and_customer_focus}
                        </li>
                    </ul>
                </div>

                {/* Areas of Improvement Section */}
                <div className="mb-8">
                    <h2 className="text-5xl font-bold text-white bg-yellow-600 px-6 py-2 -mx-6">Areas of Improvement</h2>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        {analysis[0].areas_of_improvement.map((area, index) => (
                            <li key={index}>{area}</li>
                        ))}
                    </ul>
                </div>

                {/* Job Recommendations Section */}
                {/* <div className="mb-8">
                <h2 className="text-2xl font-bold text-green-600">Job Recommendations</h2>
                <ul className="list-disc list-inside mt-4 space-y-2">
                    {analysis[0].job_recommended.map((job, index) => (
                        <li key={index}>{job}</li>
                    ))}
                </ul>
            </div> */}

                {/* Detailed Analysis Section */}
                <div className="mb-8">
                    <h2 className="text-5xl font-bold text-white bg-red-600 px-6 py-2 -mx-6">Weakness</h2>

                    {/* Skills and Qualifications */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Skills and Qualifications</h3>
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                <strong>Missing Skills:</strong> {analysis[1].skills_and_qualifications.missing_skills}
                            </li>
                            <li>
                                <strong>Outdated Skills:</strong> {analysis[1].skills_and_qualifications.outdated_skills}
                            </li>
                            <li>
                                <strong>Relevant Certifications:</strong> {analysis[1].skills_and_qualifications.relevant_certifications}
                            </li>
                        </ul>
                    </div>

                    {/* Impact and Achievements */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Impact and Achievements</h3>
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                <strong>Issue:</strong> {analysis[1].impact_and_achievements.issue}
                            </li>
                            <li>
                                <strong>Recommendation:</strong> {analysis[1].impact_and_achievements.recommendation}
                            </li>
                        </ul>
                    </div>

                    {/* Clarity of Descriptions */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Clarity of Descriptions</h3>
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                <strong>Vague Responsibilities:</strong> {analysis[1].clarity_of_descriptions.vague_responsibilities}
                            </li>
                            <li>
                                <strong>Vague Projects:</strong> {analysis[1].clarity_of_descriptions.vague_projects}
                            </li>
                            <li>
                                <strong>Recommendation:</strong> {analysis[1].clarity_of_descriptions.recommendation}
                            </li>
                        </ul>
                    </div>

                    {/* Leadership and Collaboration */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Leadership and Collaboration</h3>
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                <strong>Issue:</strong> {analysis[1].leadership_and_collaboration.issue}
                            </li>
                            <li>
                                <strong>Recommendation:</strong> {analysis[1].leadership_and_collaboration.recommendation}
                            </li>
                        </ul>
                    </div>

                    {/* Career Trajectory */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Career Trajectory</h3>
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                <strong>Job Hopping:</strong> {analysis[1].career_trajectory.job_hopping}
                            </li>
                            <li>
                                <strong>Employment Gaps:</strong> {analysis[1].career_trajectory.employment_gaps}
                            </li>
                            <li>
                                <strong>Recommendation:</strong> {analysis[1].career_trajectory.recommendation}
                            </li>
                        </ul>
                    </div>

                    {/* Resume Formatting */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Resume Formatting</h3>
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                <strong>Formatting Issues:</strong> {analysis[1].resume_formatting.formatting_issues}
                            </li>
                            <li>
                                <strong>Missing Sections:</strong> {analysis[1].resume_formatting.missing_sections}
                            </li>
                            <li>
                                <strong>Recommendation:</strong> {analysis[1].resume_formatting.recommendation}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>}
        </div>
    );
};