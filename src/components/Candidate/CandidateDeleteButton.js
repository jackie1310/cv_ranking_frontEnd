import React, { useState } from "react";
import Button from "../Button";

export default function CandidateDeleteButton({ candidate_id, deleteAnalysis }) {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <Button
            btnClass="btn-error text-white"
            title={isDeleting ? "Deleting..." : "Delete"}
            onClick={() => deleteAnalysis(candidate_id, setIsDeleting)}
            disabled={isDeleting}
        />
    )
}