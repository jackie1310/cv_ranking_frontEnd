import { Link, useLocation } from "react-router-dom";

export default function NavListItem({ section }) {
    const location = useLocation();
    const pathname = location.pathname;

    // Determine if the current path matches the section link
    const isActive = pathname === section.link || pathname.includes(section.link);

    return (
        <Link
            to={section.link}
            className={`${
                isActive ? " text-blue-500" : "text-gray-700 hover:text-blue-500"
            } text-lg flex gap-5 justify-start items-center h-16 rounded-md transition`}
        >
            {/* Optionally render the icon */}
            {/* {section.icon && <span className="w-10 h-10 text-2xl flex justify-center items-center">{section.icon}</span>} */}
            <span>{section.name}</span>
        </Link>
    );
}

// className={`${pathname.includes(section.link) ? "bg-gradient-to-r from-[#432371] to-[#faae7b] text-white" : "text-white"} text-2xl text-center hover:bg-gradient-to-r from-[#432371] to-[#faae7b] flex gap-5 justify-start items-center h-16 rounded-md`}