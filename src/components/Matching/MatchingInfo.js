import React from "react";

export default function MatchingInfo({ matching }) {
    const {
        certificate,
        degree,
        experience,
        responsibility,
        score,
        soft_skill,
        summary_comment,
        technical_skill
    } = matching;

    return (
        <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Candidate Analysis</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Overall Score: {score}%</h3>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Certificate</h3>
                <p>Score: {certificate.score}%</p>
                <p>Comment: {certificate.comment}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Degree</h3>
                <p>Score: {degree.score}%</p>
                <p>Comment: {degree.comment}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Experience</h3>
                <p>Score: {experience.score}%</p>
                <p>Comment: {experience.comment}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Responsibility</h3>
                <p>Score: {responsibility.score}%</p>
                <p>Comment: {responsibility.comment}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Soft Skills</h3>
                <p>Score: {soft_skill.score}%</p>
                <p>Comment: {soft_skill.comment}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Technical Skills</h3>
                <p>Score: {technical_skill.score}%</p>
                <p>Comment: {technical_skill.comment}</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Summary Comment</h3>
                <p>{summary_comment}</p>
            </div>
        </div>
    );
}
