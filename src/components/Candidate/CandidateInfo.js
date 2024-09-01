export default function CandidateInfo({ candidate }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">{candidate.candidate_name}</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Comment</h2>
                <p className="text-gray-700">{candidate.comment}</p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Degrees</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Degree</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidate.degree.length > 0 ? (
                            candidate.degree.map((degree, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{degree}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-gray-500">No degrees listed</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Experience</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Experience</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidate.experience.length > 0 ? (
                            candidate.experience.map((exp, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{exp}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-gray-500">No experience listed</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Responsibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidate.responsibility.length > 0 ? (
                            candidate.responsibility.map((resp, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{resp}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-gray-500">No responsibilities listed</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Soft Skills</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Soft Skill</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidate.soft_skill.length > 0 ? (
                            candidate.soft_skill.map((skill, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{skill}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-gray-500">No soft skills listed</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Technical Skills</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Technical Skill</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidate.technical_skill.length > 0 ? (
                            candidate.technical_skill.map((tech, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{tech}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-gray-500">No technical skills listed</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                <p className="text-gray-700"><strong>Email:</strong> {candidate.email}</p>
                <p className="text-gray-700"><strong>Phone Number:</strong> {candidate.phone_number}</p>
            </div>
        </div>
    )
}