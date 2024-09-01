import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/UserContext";
import Candidate from "../Candidate/Candidate";
import { Cascader } from "antd";
import Button from "../Button";
import { toast } from "sonner";
import axios from "axios";
import MatchButton from "./MatchButton";
import Matching from "./Matching";
import DeleteButton from "./DeleteButton";

export default function Matchings() {
    const { listAnalysis, fetchAnalysis, jobList, fetchJobs } = useAuth();
    const [jobId, setJobId] = useState("");
    const [options, setOptions] = useState([]);
    // const [isMatching, setIsMatching] = useState(false);
    const [listMatching, setListMatching] = useState([]);

    async function fetchMatching() {
        if (jobId === "") return;
        setListMatching([]);
        try {
            const { data } = await axios.get(`/matching/get_matchings/${jobId}`);
            if (data === "Not Found") {
                // toast.warning("No matching analysis made yet!!!");
                return;
            }
            setListMatching(data);  // Assuming 'data' is the list of matchings
            // toast.success("Success");
        } catch (error) {
            console.log(error);
            toast.error("Could not fetch matchings for this job");
        }
    }

    useEffect(() => {
        fetchAnalysis();
        fetchJobs();
    }, []);

    useEffect(() => {
        fetchMatching();
    }, [jobId]);

    useEffect(() => {
        if (jobList.length) {
            const updatedOptions = jobList.map((job) => ({
                value: job._id,
                label: job.job_name,
            }));
            setOptions(updatedOptions);
        }
    }, [jobList]);

    function onChange(value) {
        console.log("Selected job IDs:", value[0]);
        setJobId(value[0]);
    }

    async function matching(job_id, candidate_id, setIsMatching) {
        const job_match = jobList.find(job => job._id === job_id);
        const candidate_match = listAnalysis.find(analysis => analysis._id === candidate_id);
        if (!job_match) {
            toast.error("Select a Job to match");
            return;
        }
        if (!candidate_match) {
            toast.error("Could not detect candidate to match with job");
            return;
        }

        try {
            setIsMatching(true);
            const { data } = await axios.post("/matching/analyse", { job: job_match, candidate: candidate_match });
            console.log(data);
            toast.success(data);
        } catch (error) {
            console.log(error);
            toast.error("Could not match the candidate with the job");
        } finally {
            setIsMatching(false);
            fetchMatching();
        }
    }

    function searchForScore(candidate_id) {
        return listMatching.find(matching => matching.candidate_id === candidate_id);
    }

    async function deleteMatching(jobId, candidate_id, setIsDeleting) {
        if (!jobId) {
            toast.warning("Select a job first");
            return;
        }
        try {
            setIsDeleting(true);
            const response = await axios.delete(`/matching/delete_matching/`, {
                params: { job_id: jobId, candidate_id: candidate_id }
            });
            toast.success(response.data.message);
            // Optionally, refresh the list of matchings after deletion
        } catch (error) {
            if (error.response && error.response.status === 402) {
                toast.error("Matching not found");
            } else {
                toast.error("Error deleting matching");
            }
        } finally {
            setIsDeleting(false);
            fetchMatching();
        }
    }

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Jobs
                </label>
                <Cascader
                    options={options}
                    onChange={onChange}
                    changeOnSelect
                    placeholder="Select a Job for matching"
                />
            </div>
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                {listAnalysis.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Candidate Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Matching</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAnalysis.map((candidate, index) => {
                                const matchingData = searchForScore(candidate._id);
                                const score = matchingData && `${matchingData.score}%`

                                return (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{candidate.candidate_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{candidate.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <MatchButton
                                                score={score}
                                                matching={matching}
                                                jobId={jobId}
                                                candidate_id={candidate._id}
                                            />
                                        </td>
                                        <td className={`border border-gray-300 px-4 py-2 ${score && "flex gap-3"} items-center`}>
                                            
                                            {score ? <Matching matching={matchingData} /> : "No Matching"}
                                            
                                            {score && <DeleteButton deleteMatching={deleteMatching} jobId={jobId} candidate_id={candidate._id}/>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <h1 className="text-7xl text-gray-300 flex items-start justify-center">No Analysis</h1>
                )}
            </div>
        </div>
    );
}
