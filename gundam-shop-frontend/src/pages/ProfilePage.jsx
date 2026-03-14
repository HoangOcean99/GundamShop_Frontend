import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoCartOutline,
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
  IoChevronForwardOutline,
  IoSettingsOutline,
  IoListOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    phone: "0912 345 678",
    address: "Đại học FPT, Hòa Lạc, Thạch Thất, Hà Nội",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thông tin đã được cập nhật!");
  };

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative flex flex-col"
      style={{ backgroundImage: "url('../src/assets/jpGundamBG.png')" }}
    >
      {/* Dark overlay for better content contrast */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* --- NAVIGATION BAR --- */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-[#060608]/20 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center space-x-4 cursor-pointer">
          <img
            src="../src/assets/logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain mix-blend-screen"
          />
          <span className="font-black italic text-3xl tracking-tighter drop-shadow-lg text-white">
            GUNDAM STORE
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
          <Link
            to="/"
            className="hover:text-blue-500 transition-colors drop-shadow-sm border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Trang chủ
          </Link>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors drop-shadow-sm border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Sản phẩm
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors drop-shadow-sm border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Tin tức
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors drop-shadow-sm border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Hướng dẫn
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors drop-shadow-sm border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Liên hệ
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors px-4 py-1.5 rounded-full border border-white/10 focus-within:border-white/30 focus-within:bg-white/10">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-[11px] focus:outline-none w-32 placeholder-gray-500 text-gray-200"
            />
            <IoSearchOutline className="text-gray-400 w-4 h-4 ml-2 cursor-pointer hover:text-white transition" />
          </div>

          <div className="flex items-center space-x-4 text-gray-400">
            <Link to="/profile" className="text-blue-500 relative">
              <IoPersonOutline className="w-5 h-5 cursor-pointer" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(0,102,255,0.8)]"></div>
            </Link>
            <IoHeartOutline className="w-5 h-5 cursor-pointer hover:text-white transition" />
            <Link
              to="/cart"
              className="relative cursor-pointer hover:text-white transition"
            >
              <IoCartOutline className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-2.5 h-2.5 rounded-full border border-black shadow-[0_0_10px_rgba(255,0,0,0.8)]"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- PAGE HEADER --- */}
      <div className="max-w-[1400px] mx-auto w-full px-10 pt-16 pb-6 relative z-20 text-left">
        <h1 className="text-4xl font-black italic tracking-wider drop-shadow-[0_0_20px_rgba(0,102,255,0.5)] text-white uppercase">
          HỒ SƠ CỦA BẠN
        </h1>
        <p className="text-xs tracking-[0.3em] font-bold text-blue-300/80 mt-2 uppercase">
          Quản lý thông tin cá nhân
        </p>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 px-10 py-8 relative z-20 flex-grow">
        {/* Sidebar Navigation */}
        <aside>
          <div className="bg-[#0A0A0E]/60 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-2xl relative overflow-hidden group h-full">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_15px_rgba(0,102,255,0.5)]"></div>

            <div className="flex items-center space-x-4 border-b border-white/5 pb-6 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-900 border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.4)]">
                <IoPersonOutline className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  {formData.name}
                </h3>
                <p className="text-[10px] font-bold text-gray-400">
                  Thành viên thân thiết
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center justify-between p-3 rounded-sm bg-blue-600/20 shadow-[inset_0_0_10px_rgba(0,102,255,0.1)] transition-all"
              >
                <div className="flex items-center text-blue-400">
                  <IoPersonOutline className="w-4 h-4 mr-3" />
                  <span className="font-extrabold text-xs tracking-wide uppercase">
                    Thông tin cá nhân
                  </span>
                </div>
                <IoChevronForwardOutline className="w-3.5 h-3.5 text-blue-500" />
              </Link>

              <div className="flex items-center justify-between p-3 rounded-sm cursor-pointer hover:bg-white/5 text-gray-400 transition-all">
                <div className="flex items-center">
                  <IoListOutline className="w-4 h-4 mr-3" />
                  <span className="font-extrabold text-xs tracking-wide uppercase">
                    Đơn hàng của tôi
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-sm cursor-pointer hover:bg-white/5 text-gray-400 transition-all">
                <div className="flex items-center">
                  <IoSettingsOutline className="w-4 h-4 mr-3" />
                  <span className="font-extrabold text-xs tracking-wide uppercase">
                    Cài đặt bảo mật
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <Link
                  to="/login"
                  className="flex items-center justify-between p-3 rounded-sm cursor-pointer hover:bg-red-900/20 text-red-500/80 hover:text-red-400 transition-all"
                >
                  <div className="flex items-center">
                    <IoLogOutOutline className="w-4 h-4 mr-3" />
                    <span className="font-extrabold text-xs tracking-wide uppercase">
                      Đăng xuất
                    </span>
                  </div>
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Profile Edit Form */}
        <section>
          <div className="bg-[#0A0A0E]/60 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-2xl relative overflow-hidden group">
            <h2 className="text-xl font-black italic tracking-widest text-white mb-8 border-b border-white/5 pb-4 flex items-center">
              THÔNG TIN CÁ NHÂN
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 p-3 rounded-sm text-sm text-white focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 p-3 rounded-sm text-sm text-white focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  Địa chỉ giao hàng
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 p-3 rounded-sm text-sm text-white focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(0,102,255,0.2)] transition-all"
                />
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  className="relative group overflow-hidden bg-blue-600 text-white font-black italic tracking-widest px-8 py-3 text-xs rounded-sm shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:shadow-[0_0_25px_rgba(0,102,255,0.6)] transition-all"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    LƯU THAY ĐỔI
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="px-10 py-12 bg-[#050507]/40 backdrop-blur-xl border-t border-white/10 text-gray-400 relative overflow-hidden mt-auto">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h4 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">
              THÔNG TIN
            </h4>
            <ul className="text-[11px] space-y-3">
              <li className="hover:text-blue-400 transition-colors cursor-pointer w-max uppercase">
                Giới thiệu
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer w-max uppercase">
                Chính sách trả hàng
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer w-max uppercase">
                Điều khoản dịch vụ
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul className="text-[11px] space-y-3">
              <li className="hover:text-blue-400 transition-colors cursor-pointer w-max uppercase">
                Đặt hàng trung gian
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer w-max uppercase">
                Hướng dẫn mua hàng
              </li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer w-max uppercase">
                Mua thế nào giá tốt
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">
              THEO DÕI CHÚNG TÔI
            </h4>
            <ul className="text-[11px] space-y-3">
              <li className="flex items-center hover:text-blue-400 transition-colors cursor-pointer w-max text-xs font-bold uppercase">
                <FaFacebook className="w-4 h-4 mr-3 text-blue-500" /> Facebook
              </li>
              <li className="flex items-center hover:text-red-400 transition-colors cursor-pointer w-max text-xs font-bold uppercase">
                <FaYoutube className="w-4 h-4 mr-3 text-red-500" /> YouTube
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="mb-6 flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center text-[10px]">
                  <IoCallOutline className="w-4 h-4 mr-3 text-gray-300" />
                  <span>
                    <strong className="text-white">Hotline:</strong> 0123 456
                    789
                  </span>
                </div>
                <div className="flex items-center text-[10px]">
                  <IoLocationOutline className="w-5 h-5 mr-2 -ml-0.5 text-gray-300 shrink-0" />
                  <span className="leading-tight">
                    Địa chỉ: Đại học FPT Hòa Lạc
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center space-x-2 pt-2 border-t border-white/5 mt-6">
              <div className="bg-white px-2 py-1 rounded text-[9px] font-black italic text-blue-800 tracking-tighter">
                VISA
              </div>
              <div className="bg-[#EB001B] w-7 h-4 rounded-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F00] opacity-90"></div>
              </div>
              <div className="bg-gradient-to-r from-blue-900 to-red-500 px-2 py-1 rounded text-[9px] font-bold text-white tracking-widest leading-tight">
                JCB
              </div>
              <div className="bg-[#050507] border border-white/20 px-2 py-1 rounded text-[9px] font-bold text-white">
                COD
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
