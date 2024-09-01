import { Modal } from "antd";
import { useState } from "react"
import JobInfo from "./JobInfo";
import Button from "../Button";

export default function Job({job}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // ${candidate.email}
    return (
        <>
            <Button onClick={showModal} btnClass="btn-info text-white" title="View Job"/>
            <Modal title={`${job.job_name} analysis`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {/* <CandidateInfo candidate={candidate}/> */}
                <JobInfo job={job}/>
            </Modal>

            {/* <Link to={`/candidate/${id}`} className="flex gap-5 justify-start items-center w-1/2 rounded-md hover:bg-blue-500 hover:text-white px-4 py-2 shadow-md">
                <FontAwesomeIcon icon={faUser} />
                Candidate {id + 1}
            </Link> */}
        </>
    )
}