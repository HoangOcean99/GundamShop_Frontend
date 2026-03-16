import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { loginByFirebase } from "../api/authApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await loginByFirebase();
      navigate('/');
    } catch (error) {
      
    }
  }
  return (
    <div
      className="w-full h-screen bg-fixed bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: "url('/jpGundamBG.png')" }}
    >
      <div className="absolute inset-0 bg-[#050B14]/70 backdrop-blur-sm z-0"></div>

      <div className="absolute top-8 left-4 md:left-10 z-20">
        <Link
          to="/"
          className="flex items-center text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group"
        >
          <IoChevronBackOutline className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md bg-[#0A0A0E]/60 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-sm shadow-2xl flex flex-col items-center">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        
        <div className="w-16 h-16 bg-blue-600/20 rounded mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.2)]">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-20 object-contain mix-blend-screen"
          />
        </div>

        <h2 className="text-3xl font-black italic tracking-wider text-white mb-2 text-center">
          ĐĂNG NHẬP
        </h2>
        <p className="text-xs text-blue-200/60 font-bold uppercase tracking-widest text-center mb-10 w-full pb-6 border-b border-white/5">
          Truy cập GUNDAM STORE
        </p>

        <button className="w-full group relative flex items-center justify-center px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all duration-300 rounded-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <FaGoogle className="w-5 h-5 mr-3 text-red-500 relative z-10" />
          <span 
          onClick={handleLogin}
          className="text-sm font-black uppercase tracking-widest text-white relative z-10 cursor-pointer"
          >
            Đăng nhập bằng Google
          </span>
        </button>

        <div className="mt-8 text-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          <p>
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Điều khoản
            </a>{" "}
            và{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Chính sách
            </a>{" "}
            của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
