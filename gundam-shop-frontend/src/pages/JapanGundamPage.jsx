import React from "react";
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
} from "react-icons/io5";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const JapanGundamPage = () => {
  const categories = [
    { name: "HG", sub: "1/144" },
    { name: "RG", sub: "1/144" },
    { name: "MG", sub: "1/100" },
    { name: "PG", sub: "1/60" },
    { name: "SD", sub: "Non-Scale" },
  ];

  const sections = [
    {
      title: "HG",
      scale: "1/144",
      products: [
        {
          name: "RX-78-2 Gundam",
          price: "550.000đ",
          img: "https://via.placeholder.com/300x300?text=RX-78-2",
        },
        {
          name: "RX-805 Gundam",
          price: "950.000đ",
          img: "https://via.placeholder.com/300x300?text=RX-805",
        },
        {
          name: "RX-451.00 Gundam",
          price: "660.000đ",
          img: "https://via.placeholder.com/300x300?text=RX-451",
        },
        {
          name: "RX-78-1 Gundam",
          price: "1.200.000đ",
          img: "https://via.placeholder.com/300x300?text=RX-78-1",
        },
      ],
    },
    {
      title: "RG",
      scale: "1/144",
      products: [
        {
          name: "RX-78-2 Gundam",
          price: "990.000đ",
          img: "https://via.placeholder.com/300x300?text=RX-78-2+RG",
        },
        {
          name: "Wing Gundam",
          price: "1.020.000đ",
          img: "https://via.placeholder.com/300x300?text=Wing",
        },
        {
          name: "Strike Freedom Gundam",
          price: "1.160.000đ",
          img: "https://via.placeholder.com/300x300?text=Strike+Freedom",
        },
        {
          name: "Unicorn Gundam",
          price: "1.400.000đ",
          img: "https://via.placeholder.com/300x300?text=Unicorn",
        },
      ],
    },
    {
      title: "RG",
      scale: "1/100",
      products: [
        {
          name: "RX-78-2 Gundam",
          price: "900.000đ",
          img: "https://via.placeholder.com/300x300?text=RX-78-2+RG+100",
        },
        {
          name: "Gundam Barbatos",
          price: "1.050.000đ",
          img: "https://via.placeholder.com/300x300?text=Barbatos",
        },
        {
          name: "Strike Freedom Gundam",
          price: "1.150.000đ",
          img: "https://via.placeholder.com/300x300?text=Strike+Freedom+100",
        },
        {
          name: "Unicorn Gundam",
          price: "1.400.000đ",
          img: "https://via.placeholder.com/300x300?text=Unicorn+100",
        },
        {
          name: "Sazabi Ver. Ka",
          price: "1.550.000đ",
          img: "https://via.placeholder.com/300x300?text=Sazabi",
        },
      ],
    },
    {
      title: "PG",
      scale: "1/60",
      products: [
        {
          name: "RX-78-2 Gundam Unleashed",
          price: "8.600.000đ",
          img: "https://via.placeholder.com/300x300?text=RX-78-2+PG",
        },
        {
          name: "Gundam Exia",
          price: "8.600.000đ",
          img: "https://via.placeholder.com/300x300?text=Exia",
        },
        {
          name: "Unicorn Gundam",
          price: "1.800.000đ",
          img: "https://via.placeholder.com/300x300?text=Unicorn+PG",
        },
        {
          name: "Strike Freedom Gundam",
          price: "8.600.000đ",
          img: "https://via.placeholder.com/300x300?text=Strike+Freedom+PG",
        },
        {
          name: "Strike Freedom Gundam",
          price: "8.600.000đ",
          img: "https://via.placeholder.com/300x300?text=Strike+Freedom+PG+2",
        },
      ],
    },
    {
      title: "SD",
      scale: "Non-Scale",
      products: [
        {
          name: "SDW Heroes Wukong",
          price: "180.000đ",
          img: "https://via.placeholder.com/300x300?text=SD+Wukong",
        },
        {
          name: "SD Musha Gundam",
          price: "220.000đ",
          img: "https://via.placeholder.com/300x300?text=SD+Musha",
        },
        {
          name: "SD Knight Gundam",
          price: "240.000đ",
          img: "https://via.placeholder.com/300x300?text=SD+Knight",
        },
        {
          name: "SD Cao Cao Wing",
          price: "190.000đ",
          img: "https://via.placeholder.com/300x300?text=SD+Cao+Cao",
        },
      ],
    },
  ];

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative"
      style={{ backgroundImage: "url('../src/assets/jpGundamBG.png')" }}
    >
      {/* Dark overlay to make content pop */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      {/* --- NAVIGATION BAR --- */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-[#060608]/10 backdrop-blur-md sticky top-0 z-50">
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
            className="hover:text-blue-500 transition-colors drop-shadow-sm border-b-2 border-transparent hover:border-blue-500 pb-1 text-blue-500 border-blue-500"
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
            <Link to="/login">
              <IoPersonOutline className="w-5 h-5 cursor-pointer hover:text-white transition" />
            </Link>
            <IoHeartOutline className="w-5 h-5 cursor-pointer hover:text-white transition" />
            <div className="relative cursor-pointer hover:text-white transition">
              <IoCartOutline className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-2.5 h-2.5 rounded-full border border-black"></span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-10 pt-12 pb-4 relative z-20 text-left">
        <h1 className="text-5xl font-black italic tracking-wider drop-shadow-[0_0_20px_rgba(0,102,255,0.6)] text-white">
          GUNDAM NHẬT BẢN
        </h1>
        <p className="text-lg tracking-[0.3em] font-bold text-blue-200/80 mt-2 uppercase">
          Chất lượng tinh tế
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-[280px_1fr] gap-10 px-10 py-12 relative z-20">
        {/* --- SIDEBAR --- */}
        <aside className="space-y-8">
          <div className="bg-[#0A0A0E]/60 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/40 shadow-[0_0_10px_rgba(0,102,255,0.2)]"></div>
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/5">
              <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center">
                <img
                  src="../src/assets/logo.png"
                  alt="L"
                  className="w-5 h-5 object-contain mix-blend-screen"
                />
              </div>
              <h3 className="font-black italic text-sm tracking-widest">
                DÒNG GUNDAM
              </h3>
            </div>

            <nav className="space-y-2">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-sm cursor-pointer transition-all ${idx === 0 ? "bg-blue-600/20 shadow-[inset_0_0_10px_rgba(0,102,255,0.1)]" : "hover:bg-white/5 text-gray-400"}`}
                >
                  <span className="font-extrabold text-[13px] tracking-wide">
                    {cat.name}
                  </span>
                  <IoChevronForwardOutline
                    className={`w-3.5 h-3.5 ${idx === 0 ? "text-blue-500" : "opacity-30"}`}
                  />
                </div>
              ))}
            </nav>

            <div className="mt-10 space-y-4">
              <div className="flex items-center text-[11px] text-gray-300">
                <span className="text-blue-500 mr-3 text-xs">✔</span> Chính hãng
                Bandai
              </div>
              <div className="flex items-center text-[11px] text-gray-300">
                <span className="text-blue-500 mr-3 text-xs">✔</span> Chất lượng
                cao cấp
              </div>
              <div className="flex items-center text-[11px] text-gray-300">
                <span className="text-blue-500 mr-3 text-xs">✔</span> Tỉ lệ
                Gundam
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="space-y-12">
          {sections.map((section, sIdx) => (
            <section
              key={sIdx}
              className="space-y-6 bg-[#0A0A0E]/40 backdrop-blur-lg border border-white/5 p-6 rounded-sm shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-black italic flex items-center tracking-widest">
                  {section.title}{" "}
                  <span className="ml-3 text-xs font-bold text-gray-400 not-italic uppercase opacity-60">
                    {section.scale}
                  </span>
                </h2>
                <div className="flex space-x-2 text-[10px] font-bold text-gray-500">
                  <span className="hover:text-white cursor-pointer transition uppercase">
                    1
                  </span>
                  <span>|</span>
                  <span className="hover:text-white cursor-pointer transition uppercase">
                    2
                  </span>
                  <span>|</span>
                  <IoChevronForwardOutline className="w-3 h-3 cursor-pointer hover:text-white" />
                </div>
              </div>

              <div className="grid grid-cols-4 lg:grid-cols-5 gap-5">
                {section.products.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-[#0A0A0E]/60 backdrop-blur-md border border-white/10 p-3 rounded-sm group hover:border-blue-500/40 transition-all hover:-translate-y-1 relative shadow-lg"
                  >
                    <div className="aspect-square bg-[#111115] overflow-hidden mb-3 relative rounded-sm shadow-inner">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-bold text-gray-200 line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-[11px] font-bold text-gray-400">
                        {p.price}
                      </p>
                      <button className="w-full py-1.5 bg-blue-900/40 border border-blue-500/40 text-[9px] font-black uppercase rounded-sm hover:bg-blue-600 transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        XEM NGAY ›
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* --- FOOTER --- */}
      <footer className="px-10 py-12 bg-[#050507]/40 backdrop-blur-xl border-t border-white/10 text-gray-400 relative overflow-hidden">
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

export default JapanGundamPage;
