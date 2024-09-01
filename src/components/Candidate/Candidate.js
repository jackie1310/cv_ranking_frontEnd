import { Modal } from "antd"
import { useState } from "react";
import CandidateInfo from "./CandidateInfo";
import Button from "../Button";

export default function Candidate({ candidate}) {
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
// className="flex gap-5 justify-start items-center w-full rounded-md px-4 py-2"
    return (
        <>
            <Button onClick={showModal} btnClass="btn-info text-white" title="View Candidate"/>
                
            {/* </Button> */}
            <Modal title={`${candidate.candidate_name} resume`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <CandidateInfo candidate={candidate}/>
            </Modal>

            {/* <Link to={`/candidate/${id}`} className="flex gap-5 justify-start items-center w-1/2 rounded-md hover:bg-blue-500 hover:text-white px-4 py-2 shadow-md">
                <FontAwesomeIcon icon={faUser} />
                Candidate {id + 1}
            </Link> */}
        </>
    )
}