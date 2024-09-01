import React, { useState } from "react";
import Button from "../Button";

export default function MatchButton({ score, matching, jobId, candidate_id }) {
    const [isMatching, setIsMatching] = useState(false);

    return (
        <div className="flex items-center justify-center">
            {score ? <span>{score}</span> : 
                <Button
                    btnClass="btn-success text-white"
                    title={isMatching ? "Matching..." : "Match"}
                    onClick={() => matching(jobId, candidate_id, setIsMatching)}
                    disabled={isMatching}
                />
            }
        </div>
    )
}