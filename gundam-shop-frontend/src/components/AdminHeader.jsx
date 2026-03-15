import React from "react";
import { Link } from "react-router-dom";
import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";

const AdminHeader = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#060608]/40 backdrop-blur-xl sticky top-0 z-50">
            <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
                <img
                    src="../src/assets/logo.png"
                    alt="Logo"
                    className="w-10 h-10 object-contain mix-blend-screen group-hover:scale-110 transition-transform"
                />
                <span className="font-black italic text-2xl tracking-tighter drop-shadow-lg text-white group-hover:text-blue-400 transition-colors">
                    ADMIN PANEL
                </span>
            </Link>

            <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-2 text-white bg-blue-600/20 px-4 py-2 rounded-full border border-blue-500/30">
                    <IoPersonOutline className="w-5 h-5 text-blue-400" />
                    <span className="font-bold tracking-widest text-xs uppercase">
                        Super Admin
                    </span>
                </div>
                <Link
                    to="/"
                    className="flex items-center space-x-2 hover:text-red-400 transition-colors cursor-pointer group"
                >
                    <span className="font-bold tracking-widest text-[10px] uppercase group-hover:text-red-400 transition-colors">
                        Rời Admin
                    </span>
                    <IoLogOutOutline className="w-5 h-5" />
                </Link>
            </div>
        </nav>
    );
};

export default AdminHeader;
