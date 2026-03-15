import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GundamComparison from "../components/GundamComparison";
import GundamNews from "../components/GundamNews";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllProducts } from "../api/productApi";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                setLoading(true);
                const allProducts = await getAllProducts();
                // Sort by price descending and take top 4
                const sorted = [...allProducts]
                    .sort((a, b) => b.price - a.price)
                    .slice(0, 4);
                setProducts(sorted);
            } catch (error) {
                console.error("Error fetching top products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopProducts();
    }, []);

    const formatPrice = (price) => {
        if (price == null) return "";
        return price.toLocaleString("vi-VN") + "đ";
    };

    return (
        <div className="w-full mx-auto bg-transparent">
            {/* --- NAVIGATION BAR --- */}
            <Header />

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
                    <Link to="/products" className="bg-transparent border border-white/10 px-5 py-1.5 text-[10px] rounded-full hover:bg-white/10 transition-colors font-bold uppercase text-gray-300 hover:text-white flex items-center">
                        XEM TẤT CẢ <span className="ml-1">›</span>
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    {loading ? (
                        <div className="col-span-4 text-center py-10 text-gray-400 font-bold uppercase tracking-widest">
                            Đang tải sản phẩm...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="col-span-4 text-center py-10 text-gray-500 italic">
                            Chưa có sản phẩm nào.
                        </div>
                    ) : (
                        products.map((p, i) => (
                            <Link
                                to={`/product/${p._id}`}
                                key={p._id || i}
                                className="bg-[#0A0A0E]/10 backdrop-blur-md border border-white/5 rounded-sm p-3 group hover:border-white/20 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 relative block"
                            >
                                {/* Subtle top glow line */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="aspect-[3/4] bg-gradient-to-b from-[#111115] to-[#0A0A0E] overflow-hidden mb-4 relative flex justify-center items-center shadow-inner rounded-sm">
                                    <img
                                        src={p.images?.[0] || "https://via.placeholder.com/300x400"}
                                        className="w-full h-full object-contain group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100 p-2"
                                        alt={p.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                    {p.stock === 0 && (
                                        <div className="absolute top-2 right-2 bg-red-600 text-[8px] font-black text-white px-2 py-0.5 rounded-sm uppercase tracking-tighter italic">Hết hàng</div>
                                    )}
                                </div>
                                <div className="text-center pb-2">
                                    <h3 className="text-[11px] font-bold text-gray-200 group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1">
                                        {p.name}
                                    </h3>
                                    <p className="text-[12px] font-black text-white mt-1.5 tracking-widest italic">
                                        {formatPrice(p.price)}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </section>

            {/* --- COMPARISON (SO SÁNH) --- */}
            <GundamComparison />
            <GundamNews />

            {/* --- FOOTER --- */}
            <Footer />
        </div>
    );
};

export default HomePage;
