import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { navData } from '../data/navData';
import NavListItem from './NavListItem';

export default function Navbar() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("user_token");
        navigate("/");
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="text-xl font-bold text-yellow-800">Cybersoft</a>
                    </div>
                    <div className="hidden md:flex items-center space-x-16">
                        {navData.map((section, index) => <NavListItem key={index} section={section}/>)}
                        {/* <Link to="/candidates" className="">Home</Link>
                        <Link to="/jobs" className="text-gray-700 hover:text-blue-500 transition">About</Link>
                        <Link to="/matching" className="text-gray-700 hover:text-blue-500 transition">Services</Link> */}
                    </div>
                    <div className="flex items-center">
                        <Button btnClass="btn-warning text-yellow-800" title="Logout" onClick={() => logout()}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};