import { useEffect, useState } from "react";
import Candidate from "./Candidate";
import UploadFile from "../UploadFiles";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../contexts/UserContext";
import Button from "../Button";

export default function Candidates() {
    const { fetchAnalysis, listAnalysis } = useAuth();

    useEffect(() => {
        fetchAnalysis();
    }, []);

    async function deleteAnalysis(_id) {
        try {
            const {data} = await axios.delete(`/candidate/delete_analysis/${_id}`);
            // toast.success(data);
        } catch (error) {
            toast.error("Error while deleting analysis");
            console.error(error);
        } finally {
            fetchAnalysis();
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div>
                <UploadFile />
            </div>
            {/* <h1 className="text-xl text-gray-400">Analysis</h1> */}
            {/* <div>
                {listAnalysis.length > 0 
                    ? (
                        <div className="flex flex-col gap-3">
                            {listAnalysis.map((candidate, index) => {
                                return <Candidate candidate={candidate} id={index}/>
                            })}
                        </div>
                    )
                    : <h1 className="text-7xl flex items-start justify-center text-gray-300">No Analysis</h1>
                }
            </div> */}
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                {listAnalysis.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Candidate Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAnalysis?.map((candidate, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{candidate.candidate_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{candidate.email}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                        <div>
                                            <Candidate candidate={candidate}/>
                                        </div>
                                        {/* <button
                                            onClick={() => deleteAnalysis(candidate._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button> */}
                                        <Button btnClass="btn-error text-white" title="Delete" onClick={() => deleteAnalysis(candidate._id)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1 className="text-7xl text-gray-300 flex items-start justify-center">No Analysis</h1>
                )}
            </div>
        </div>
    )
}