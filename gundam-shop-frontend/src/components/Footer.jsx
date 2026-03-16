import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="px-4 md:px-10 py-8 md:py-12 bg-[#050507] border-t border-white/10 text-gray-400 relative overflow-hidden">
            {/* Subtle footer glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                <div className="space-y-4">
                    <h4 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">
                        THÔNG TIN
                    </h4>
                    <ul className="text-[11px] space-y-3">
                        <li className="hover:text-blue-400 transition-colors cursor-pointer w-max">
                            Giới thiệu
                        </li>
                        <li className="hover:text-blue-400 transition-colors cursor-pointer w-max">
                            Chính sách trả hàng
                        </li>
                        <li className="hover:text-blue-400 transition-colors cursor-pointer w-max">
                            Điều khoản dịch vụ
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">
                        HỖ TRỢ KHÁCH HÀNG
                    </h4>
                    <ul className="text-[11px] space-y-3">
                        <li className="hover:text-blue-400 transition-colors cursor-pointer w-max">
                            Đặt hàng trung gian
                        </li>
                        <li className="hover:text-blue-400 transition-colors cursor-pointer w-max">
                            Hướng dẫn mua hàng
                        </li>
                        <li className="hover:text-blue-400 transition-colors cursor-pointer w-max">
                            Mua thế nào giá tốt
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">
                        THEO DÕI CHÚNG TÔI
                    </h4>
                    <ul className="text-[11px] space-y-3">
                        <li className="flex items-center hover:text-blue-400 transition-colors cursor-pointer w-max">
                            <FaFacebook className="w-4 h-4 mr-3 text-blue-500" /> Facebook
                        </li>
                        <li className="flex items-center hover:text-red-400 transition-colors cursor-pointer w-max">
                            <FaYoutube className="w-4 h-4 mr-3 text-red-500" /> YouTube
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
                        <div className="space-y-3">
                            <div className="flex items-center text-[11px]">
                                <IoCallOutline className="w-4 h-4 mr-3 text-gray-300" />
                                <span>
                                    <strong className="text-white">Hotline:</strong> 0123 456
                                    789
                                </span>
                            </div>
                            <div className="flex items-center text-[11px]">
                                <IoLocationOutline className="w-5 h-5 mr-2 -ml-0.5 text-gray-300 shrink-0" />
                                <span className="leading-tight">
                                    Địa chỉ: Đại học FPT Hòa Lạc
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center text-[11px]">
                            <IoMailOutline className="w-4 h-4 mr-2 text-gray-300" />
                            <span>
                                <strong className="text-white">Email:</strong>{" "}
                                ducanhduong@gmail.com
                            </span>
                        </div>
                    </div>

                    {/* Payment Icons */}
                    <div className="flex justify-end items-center space-x-2 pt-2 border-t border-white/5 mt-6">
                        <div className="bg-white px-2 py-1 rounded text-[10px] font-black italic text-blue-800 tracking-tighter">
                            VISA
                        </div>
                        <div className="bg-[#EB001B] w-8 h-5 rounded relative overflow-hidden flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[#F79E1B] absolute left-1 mix-blend-screen mix-blend-normal"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FF5F00] absolute right-1 mix-blend-multiply opacity-80"></div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-900 to-red-500 px-2 py-1 rounded text-[10px] font-bold text-white tracking-widest leading-tight">
                            JCB
                        </div>
                        <div className="bg-[#050507] border border-white/20 px-2 py-1 rounded text-[10px] font-bold text-white">
                            COD
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
