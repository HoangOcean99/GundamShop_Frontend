import React from "react";
import { Link } from "react-router-dom";
import GundamComparison from "../components/GundamComparison";
import GundamNews from "../components/GundamNews";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoCartOutline,
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const HomePage = () => {
  const products = [
    {
      name: "RX-78-2 Gundam",
      price: "850.000đ",
      img: "https://via.placeholder.com/300x400",
    },
    {
      name: "Gundam Barbatos",
      price: "990.000đ",
      img: "https://via.placeholder.com/300x400",
    },
    {
      name: "Gundam Dynames",
      price: "1.100.000đ",
      img: "https://via.placeholder.com/300x400",
    },
    {
      name: "Qinglong Gundam",
      price: "920.000đ",
      img: "https://via.placeholder.com/300x400",
    },
  ];

  return (
    <div className="w-full mx-auto bg-transparent">
      {/* --- NAVIGATION BAR --- */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-[#060608]/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-4 cursor-pointer">
          <img
            src="../src/assets/logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain mix-blend-screen"
          />
          <span className="font-black italic text-3xl tracking-tighter drop-shadow-lg text-white">
            GUNDAM STORE
          </span>
        </div>

        <div className="hidden md:flex space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
          <a
            href="#"
            className="hover:text-blue-500 transition-colors drop-shadow-sm border-b-2 border-transparent hover:border-blue-500 pb-1"
          >
            Trang chủ
          </a>
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
            <Link to="/profile" className="hover:text-white transition-colors cursor-pointer">
              <IoPersonOutline className="w-5 h-5" />
            </Link>
            <button className="hover:text-white transition-colors cursor-pointer">
              <IoHeartOutline className="w-5 h-5" />
            </button>
            <Link to="/cart" className="hover:text-white transition-colors cursor-pointer relative">
              <IoCartOutline className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-2.5 h-2.5 rounded-full border border-black"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO BANNER --- */}
      <div className="grid grid-cols-2 h-[480px] border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10 relative">
        {/* Left: Japan */}
        <div className="relative group overflow-hidden border-r border-black/50 bg-[#050B14]/40">
          <div className="absolute inset-0 bg-gradient-to-r from-[#03112E]/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-10 mix-blend-screen pointer-events-none"></div>
          <img
            src="../src/assets/GundamNhat.png"
            className="absolute inset-0 w-[105%] h-[95%] object-contain translate-x-[-120px] translate-y-[20px] z-0 opacity-90 group-hover:scale-105 transition-transform duration-700"
            alt="JP"
          />
          <div className="relative z-20 p-14 flex flex-col items-end justify-center h-full text-right">
            <h1 className="text-5xl font-black leading-tight tracking-wide drop-shadow-[0_0_15px_rgba(0,102,255,0.8)]">
              GUNDAM
              <br />
              NHẬT BẢN
            </h1>
            <p className="text-[18px] tracking-[0.4em] mt-3 mb-8 opacity-90 uppercase font-bold text-blue-200">
              Chất lượng tinh tế
            </p>
            <Link to="/japan-gundam" className="px-6 py-2.5 bg-blue-900/40 border border-blue-500/50 text-[11px] font-bold uppercase rounded-sm hover:bg-blue-600 hover:border-blue-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)] hover:shadow-[0_0_20px_rgba(0,102,255,0.6)] backdrop-blur-sm">
              XEM NGAY <span className="ml-2 font-normal">›</span>
            </Link>
          </div>
        </div>

        {/* Right: China */}
        <div className="relative group overflow-hidden bg-[#1A0505]/40">
          <div className="absolute inset-0 bg-gradient-to-l from-[#2A0808]/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-10 mix-blend-screen pointer-events-none"></div>
          <img
            src="../src/assets/GundamTrung.png"
            className="absolute inset-0 w-[110%] h-[115%] object-contain translate-x-[110px] translate-y-[10px] z-0 opacity-90 group-hover:scale-105 transition-transform duration-700"
            alt="CN"
          />
          <div className="relative z-20 p-14 flex flex-col items-start justify-center h-full">
            <h1 className="text-5xl font-black leading-tight tracking-wide drop-shadow-[0_0_15px_rgba(255,51,0,0.8)]">
              GUNDAM
              <br />
              TRUNG QUỐC
            </h1>
            <p className="text-[18px] tracking-[0.4em] mt-3 mb-8 opacity-90 uppercase font-bold text-red-200">
              Mẫu mã ấn tượng
            </p>
            <Link to="/china-gundam" className="px-6 py-2.5 bg-red-900/40 border border-red-500/50 text-[11px] font-bold uppercase rounded-sm hover:bg-red-600 hover:border-red-400 transition-all duration-300 shadow-[0_0_15px_rgba(255,51,0,0.2)] hover:shadow-[0_0_20px_rgba(255,51,0,0.6)] backdrop-blur-sm">
              KHÁM PHÁ <span className="ml-2 font-normal">›</span>
            </Link>
          </div>
        </div>
      </div>

      <section className="px-10 py-12 relative z-20 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-3">
          <h2 className="text-xl font-black uppercase tracking-widest italic drop-shadow-md">
            SẢN PHẨM NỔI BẬT
          </h2>
          <button className="bg-transparent border border-white/10 px-5 py-1.5 text-[10px] rounded-full hover:bg-white/10 transition-colors font-bold uppercase text-gray-300 hover:text-white">
            XEM TẤT CẢ <span className="ml-1">›</span>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="bg-[#0A0A0E]/20 backdrop-blur-md border border-white/5 rounded-sm p-3 group hover:border-white/20 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 relative"
            >
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="aspect-[3/4] bg-gradient-to-b from-[#111115] to-[#0A0A0E] overflow-hidden mb-4 relative flex justify-center items-center shadow-inner">
                <img
                  src={p.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                  alt={p.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="text-center pb-2">
                <h3 className="text-[13px] font-bold text-gray-200 group-hover:text-blue-400 transition-colors">
                  {p.name}
                </h3>
                <p className="text-[12px] font-semibold text-gray-400 mt-1.5 tracking-wide">
                  {p.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- COMPARISON (SO SÁNH) --- */}
      <GundamComparison />
      <GundamNews />

      {/* --- FOOTER --- */}
      <footer className="px-10 py-12 bg-[#050507] border-t border-white/10 text-gray-400 relative overflow-hidden">
        {/* Subtle footer glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
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
            <div className="mb-6 flex justify-between items-start">
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
    </div>
  );
};

export default HomePage;
