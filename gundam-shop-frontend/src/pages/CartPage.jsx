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
  IoTrashOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const CartPage = () => {
  // Dummy cart data
  const cartItems = [
    {
      id: 1,
      name: "PG Unleashed RX-78-2",
      scale: "1/60",
      price: 6500000,
      quantity: 1,
      image: "https://via.placeholder.com/150x150?text=PG+Unleashed",
    },
    {
      id: 2,
      name: "MG Barbatos",
      scale: "1/100",
      price: 1150000,
      quantity: 2,
      image: "https://via.placeholder.com/150x150?text=MG+Barbatos",
    },
    {
      id: 3,
      name: "RG Hi-Nu Gundam",
      scale: "1/144",
      price: 1250000,
      quantity: 1,
      image: "https://via.placeholder.com/150x150?text=RG+Hi-Nu",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = 50000;
  const total = subtotal + shipping;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
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
            <Link to="/login">
              <IoPersonOutline className="w-5 h-5 cursor-pointer hover:text-white transition" />
            </Link>
            <IoHeartOutline className="w-5 h-5 cursor-pointer hover:text-white transition" />
            <div className="relative">
              <IoCartOutline className="w-5 h-5 cursor-pointer text-white" />
              <span className="absolute -top-1 -right-1 bg-red-600 w-2.5 h-2.5 rounded-full border border-black shadow-[0_0_10px_rgba(255,0,0,0.8)]"></span>
            </div>
          </div>
        </div>
      </nav>

      {/* --- PAGE HEADER --- */}
      <div className="max-w-[1400px] mx-auto w-full px-10 pt-16 pb-6 relative z-20 text-center">
        <h1 className="text-4xl font-black italic tracking-wider drop-shadow-lg text-white uppercase">
          GIỎ HÀNG CỦA BẠN
        </h1>
        <p className="text-xs tracking-[0.3em] font-bold text-gray-400 mt-2 uppercase">
          {cartItems.length} sản phẩm
        </p>
      </div>

      {/* --- CART CONTENT --- */}
      <main className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 px-10 py-8 relative z-20 flex-grow">
        {/* Cart Items List */}
        <div className="space-y-6">
          <div className="bg-[#0A0A0E]/60 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[100px_1fr_120px_120px_60px] gap-4 p-4 border-b border-white/5 bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center items-center">
              <div className="text-left">Sản phẩm</div>
              <div></div>
              <div>Đơn giá</div>
              <div>Số lượng</div>
              <div></div>
            </div>

            {/* Items */}
            <div className="divide-y divide-white/5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[100px_1fr_120px_120px_60px] gap-4 p-4 items-center group hover:bg-white/5 transition-colors"
                >
                  {/* Image */}
                  <div className="aspect-square bg-[#111] overflow-hidden rounded-sm relative shadow-inner">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                      {item.name}
                    </h4>
                    <span className="inline-block px-2 py-0.5 bg-blue-900/40 border border-blue-500/20 text-[9px] font-bold text-blue-300 rounded uppercase">
                      {item.scale}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-xs font-bold text-gray-300 text-center">
                    {formatPrice(item.price)}
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center justify-center">
                    <div className="flex bg-black/40 border border-white/10 rounded-sm overflow-hidden">
                      <button className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-8 bg-transparent text-center text-xs font-bold text-white focus:outline-none"
                      />
                      <button className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <div className="flex justify-center">
                    <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                      <IoTrashOutline className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-white/5 flex justify-between items-center bg-black/20">
              <Link
                to="/"
                className="text-[11px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center"
              >
                <IoChevronForwardOutline className="w-3 h-3 mr-1 rotate-180" />
                Tiếp tục mua hàng
              </Link>
              <button className="text-[10px] font-bold text-gray-400 hover:text-white uppercase transition-colors">
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside>
          <div className="bg-[#0A0A0E]/60 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_15px_rgba(0,102,255,0.5)]"></div>

            <h3 className="font-black italic text-sm tracking-widest text-white mb-6 border-b border-white/5 pb-4">
              THÔNG TIN ĐƠN HÀNG
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                <span className="text-gray-200">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>Phí giao hàng:</span>
                <span className="text-gray-200">{formatPrice(shipping)}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Tổng cộng:
                </span>
                <div className="text-right">
                  <span className="block text-2xl font-black text-white">
                    {formatPrice(total)}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">
                    (Đã bao gồm VAT nếu có)
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full relative group overflow-hidden bg-blue-600 text-white font-black italic tracking-widest py-4 text-sm rounded-sm shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] transition-all">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 w-full flex items-center justify-center">
                TIẾN HÀNH THANH TOÁN{" "}
                <IoChevronForwardOutline className="ml-2 w-4 h-4" />
              </span>
            </button>
          </div>
        </aside>
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

export default CartPage;
