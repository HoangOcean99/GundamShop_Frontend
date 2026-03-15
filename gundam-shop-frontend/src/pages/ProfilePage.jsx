import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoPersonOutline,
  IoChevronForwardOutline,
  IoSettingsOutline,
  IoListOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <Header />

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
      <Footer />
    </div>
  );
};

export default ProfilePage;
