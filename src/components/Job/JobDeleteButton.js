import React, { useState } from "react";
import Button from "../Button";

export default function JobDeleteButton({ jobId, deleteJob}) {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <Button
            btnClass="btn-error text-white"
            title={isDeleting ? "Deleting..." : "Delete"}
            onClick={() => deleteJob(jobId, setIsDeleting)}
            disabled={isDeleting}
        />
    )
}