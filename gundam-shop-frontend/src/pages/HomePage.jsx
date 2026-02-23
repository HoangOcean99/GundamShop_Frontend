import React from 'react';
import GundamComparison from '../components/GundamComparison';
import GundamNews from '../components/GundamNews';

const HomePage = () => {
    const products = [
        { name: "RX-78-2 Gundam", price: "850.000đ", img: "https://via.placeholder.com/300x400" },
        { name: "Gundam Barbatos", price: "990.000đ", img: "https://via.placeholder.com/300x400" },
        { name: "Gundam Dynames", price: "1.100.000đ", img: "https://via.placeholder.com/300x400" },
        { name: "Qinglong Gundam", price: "920.000đ", img: "https://via.placeholder.com/300x400" },
    ];

    return (
        <div className="w-full mx-auto bg-transparent shadow-2xl border-x border-gray-900 px-10">
            {/* --- NAVIGATION BAR --- */}
            <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800 backdrop-blur-none">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-red-500 rounded-sm"></div>
                    <span className="font-black italic text-xl tracking-tighter">GUNDAM STORE</span>
                </div>
                <div className="hidden md:flex space-x-6 text-[11px] font-bold uppercase tracking-widest text-gray-300">
                    <a href="#" className="hover:text-gd-blue transition">Trang chủ</a>
                    <a href="#" className="hover:text-gd-blue transition">Sản phẩm</a>
                    <a href="#" className="hover:text-gd-blue transition">Tin tức</a>
                    <a href="#" className="hover:text-gd-blue transition">Hướng dẫn</a>
                    <a href="#" className="hover:text-gd-blue transition">Liên hệ</a>
                </div>
                <div className="flex items-center bg-[#1a1a1c] px-3 py-1 rounded border border-gray-700">
                    <input type="text" placeholder="Search" className="bg-transparent text-xs focus:outline-none w-32" />
                    <span className="text-gray-500 text-sm">🔍</span>
                </div>
            </nav>

            {/* --- HERO BANNER --- */}
            <div className="grid grid-cols-2 h-[400px] border-b border-gray-800">
                {/* Left: Japan */}
                <div className="relative group overflow-hidden border-r border-black">
                    <div className="absolute inset-0 bg-blue-900/40 z-10"></div>
                    <img src='../src/assets/GundamNhat.png' className="absolute inset-0 w-[2000px] h-[800px] object-contain translate-x-[-150px] translate-y-[-20px] z-999" alt="JP" />
                    <div className="relative z-20 p-10 flex flex-col items-end justify-center h-full">
                        <h1 className="text-4xl font-black leading-tight">GUNDAM<br />NHẬT BẢN</h1>
                        <p className="text-[10px] tracking-[0.3em] my-2 opacity-80 uppercase">Chất lượng tinh tế</p>
                        <button className="mt-4 px-6 py-1.5 bg-gd-blue text-[10px] font-bold uppercase rounded-sm hover:bg-white hover:text-black transition">Xem ngay {'>'}</button>
                    </div>
                </div>
                {/* Right: China */}
                <div className="relative group overflow-hidden">
                    <div className="absolute inset-0 bg-red-900/40 z-10"></div>
                    <img src='../src/assets/GundamTrung.png' className="absolute inset-0 w-[2000px] h-[800px] object-contain translate-x-20 translate-y-[-20px] z-999" alt="JP" />
                    <div className="relative z-20 p-10 flex flex-col items-start justify-center h-full">
                        <h1 className="text-4xl font-black leading-tight">GUNDAM<br />TRUNG QUỐC</h1>
                        <p className="text-[10px] tracking-[0.3em] my-2 opacity-80 uppercase">Mẫu mã ấn tượng</p>
                        <button className="mt-4 px-6 py-1.5 bg-gd-red text-[10px] font-bold uppercase rounded-sm hover:bg-white hover:text-black transition">Khám phá {'>'}</button>
                    </div>
                </div>
            </div>

            {/* --- PRODUCT SECTION --- */}
            <section className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest border-l-4 border-gd-blue pl-3">Sản phẩm nổi bật</h2>
                    <button className="text-[10px] text-gray-500 hover:text-white uppercase">Xem tất cả {'>'}</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {products.map((p, i) => (
                        <div key={i} className="  p-2 group hover:border-gray-600 transition cursor-pointer ">
                            <div className="aspect-[3/4] bg-gray-900 overflow-hidden mb-3">
                                <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.name} />
                            </div>
                            <div className="text-center pb-2">
                                <h3 className="text-[11px] font-bold text-gray-300 uppercase">{p.name}</h3>
                                <p className="text-[10px] text-gray-500 mt-1">{p.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- COMPARISON (SO SÁNH) --- */}
            <GundamComparison />
            <GundamNews />

            {/* --- FOOTER --- */}
            <footer className="p-10 grid grid-cols-4 gap-8 border-t border-gray-900 text-gray-500">
                <div className="space-y-3">
                    <h4 className="text-white text-[11px] font-bold uppercase">Thông tin</h4>
                    <ul className="text-[10px] space-y-1">
                        <li>Giới thiệu</li>
                        <li>Điều khoản dịch vụ</li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h4 className="text-white text-[11px] font-bold uppercase">Hỗ trợ khách hàng</h4>
                    <ul className="text-[10px] space-y-1">
                        <li>Chính sách mua hàng</li>
                        <li>Hướng dẫn mua hàng</li>
                    </ul>
                </div>
                <div className="space-y-3 col-span-2">
                    <h4 className="text-white text-[11px] font-bold uppercase">Liên hệ chúng tôi</h4>
                    <p className="text-[10px]">Hotline: 0123 456 789 | Email: info@gundamstore.vn</p>
                    <p className="text-[10px]">Địa chỉ: 123 Đường Mẫu Quân 1, TP. HCM</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;