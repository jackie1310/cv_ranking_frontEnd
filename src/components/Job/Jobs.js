import { toast } from "sonner";
import { useAuth } from "../../contexts/UserContext";
import Job from "../Job/Job";
import JobForm from "./JobForm";
import { useEffect } from "react";
import axios from "axios";
import Button from "../Button";
import JobDeleteButton from "./JobDeleteButton";

export default function Jobs() {
    const {jobList, fetchJobs} = useAuth();

    useEffect(() => {
        fetchJobs();
    }, []);

    async function deleteJob(_id, setIsDeleting) {
        try {
            setIsDeleting(true);
            const {data} = await axios.delete(`/job/delete_job/${_id}`);
            toast.success(data.message);
        } catch (error) {
            toast.error("Error while deleting job");
            console.error(error);
        } finally {
            fetchJobs();
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div>
                <JobForm />
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
                {jobList.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Job Name</th>
                                {/* <th className="border border-gray-300 px-4 py-2 text-left">Email</th> */}
                                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobList?.map((job, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{job.job_name}</td>
                                    {/* <td className="border border-gray-300 px-4 py-2">{candidate.email}</td> */}
                                    <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                        <div>
                                            <Job job={job}/>
                                        </div>
                                        {/* <button
                                            onClick={() => deleteJob(job._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button> */}
                                        <JobDeleteButton jobId={job._id} deleteJob={deleteJob}/>
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