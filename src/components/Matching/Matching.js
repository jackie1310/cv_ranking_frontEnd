import { Modal } from "antd";
import Button from "../Button";
import MatchingInfo from "./MatchingInfo";
import { useState } from "react";

export default function Matching({ matching }) {
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
    return (
        <div>
            <Button onClick={showModal} btnClass="btn-info text-white" title="View Candidate" />

            {/* </Button> */}
            <Modal title="Matching result" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <MatchingInfo matching={matching} />
            </Modal>
        </div>
    )
}