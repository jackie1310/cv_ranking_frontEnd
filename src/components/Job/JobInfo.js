export default function JobInfo({job}) {
    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">{job.job_name}</h2>
            <table className="min-w-full bg-white">
                <tbody>
                    {/* Degree */}
                    <tr>
                        <td className="border px-4 py-2 font-semibold">Degree</td>
                        <td className="border px-4 py-2">
                            {job.degree.length > 0 ? (
                                <ul className="list-disc ml-6">
                                    {job.degree.map((degree, index) => (
                                        <li key={index}>{degree}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-500">No degree information available.</span>
                            )}
                        </td>
                    </tr>

                    {/* Experience */}
                    <tr>
                        <td className="border px-4 py-2 font-semibold">Experience</td>
                        <td className="border px-4 py-2">
                            {job.experience.length > 0 ? (
                                <ul className="list-disc ml-6">
                                    {job.experience.map((exp, index) => (
                                        <li key={index}>{exp}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-500">No experience information available.</span>
                            )}
                        </td>
                    </tr>

                    {/* Technical Skills */}
                    <tr>
                        <td className="border px-4 py-2 font-semibold">Technical Skills</td>
                        <td className="border px-4 py-2">
                            {job.technical_skill.length > 0 ? (
                                <ul className="list-disc ml-6">
                                    {job.technical_skill.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-500">No technical skills available.</span>
                            )}
                        </td>
                    </tr>

                    {/* Responsibilities */}
                    <tr>
                        <td className="border px-4 py-2 font-semibold">Responsibilities</td>
                        <td className="border px-4 py-2">
                            {job.responsibility.length > 0 ? (
                                <ul className="list-disc ml-6">
                                    {job.responsibility.map((resp, index) => (
                                        <li key={index}>{resp}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-500">No responsibilities available.</span>
                            )}
                        </td>
                    </tr>

                    {/* Certificates */}
                    <tr>
                        <td className="border px-4 py-2 font-semibold">Certificates</td>
                        <td className="border px-4 py-2">
                            {job.certificate.length > 0 ? (
                                <ul className="list-disc ml-6">
                                    {job.certificate.map((cert, index) => (
                                        <li key={index}>{cert}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-500">No certificates available.</span>
                            )}
                        </td>
                    </tr>

                    {/* Soft Skills */}
                    <tr>
                        <td className="border px-4 py-2 font-semibold">Soft Skills</td>
                        <td className="border px-4 py-2">
                            {job.soft_skill.length > 0 ? (
                                <ul className="list-disc ml-6">
                                    {job.soft_skill.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-500">No soft skills available.</span>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}