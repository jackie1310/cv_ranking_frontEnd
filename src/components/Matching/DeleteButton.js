import React, { useState } from "react";
import Button from "../Button";

export default function DeleteButton({ deleteMatching, jobId, candidate_id }) {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <Button
            btnClass="btn-error text-white"
            title={isDeleting ? "Deleting..." : "Delete"}
            onClick={() => deleteMatching(jobId, candidate_id, setIsDeleting)}
            disabled={isDeleting}
        />
    )
}