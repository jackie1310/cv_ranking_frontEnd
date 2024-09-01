import React, { useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../contexts/UserContext";

export default function JobForm() {
    const [formData, setFormData] = useState({
        job_name: "",
        job_description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {fetchJobs} = useAuth();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.job_name === "") {
            toast.error("Enter job's name");
            return;
        } 
        if (formData.job_description === "") {
            toast.error("Enter job's description");
            return;
        }
        try {
            setIsSubmitting(true);
            const {data} = await axios.post("/job/analyse", formData)
            console.log(data);
            toast.success("Analyse Job successfully");
        } catch (error) {
            console.log(error);
            toast.error("Could not analyse job")
        } finally {
            setFormData({job_name: "", job_description: ""})
            setIsSubmitting(false);
            fetchJobs();
        }
    };
    // onSubmit={handleSubmit}
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="job_name" className="block text-gray-700 font-bold mb-2">
                    Job Name
                </label>
                <input
                    type="text"
                    id="job_name"
                    name="job_name"
                    value={formData.job_name}
                    onChange={e => handleChange(e)}
                    placeholder="Enter job's name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="job_description" className="block text-gray-700 font-bold mb-2">
                    Job Description
                </label>
                <textarea
                    id="job_description"
                    name="job_description"
                    value={formData.job_description}
                    onChange={e => handleChange(e)}
                    placeholder="Enter job's description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    rows="5"
                ></textarea>
            </div>
            {!isSubmitting
            ?  <button
                    // onSubmit={handleSubmit}
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Submit & Analyse
                </button>
            : <Loader color="blue"/>
            }
        </form>
    );
}
