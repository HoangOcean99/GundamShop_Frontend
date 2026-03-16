import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
  IoFilterOutline,
} from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllProducts } from "../api/productApi";
import LoadingSpinner from "../components/LoadingSpinner";

const statusOptions = [
  { label: "Tất cả", value: "all" },
  { label: "Còn hàng", value: "in-stock" },
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const ITEMS_PER_PAGE = 12;

  const formatPrice = (price) => {
    if (price == null) return "";
    return price.toLocaleString("vi-VN") + "đ";
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);

        // Calculate actual min and max prices from data
        if (data.length > 0) {
          const prices = data.map((p) => p.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]);
        }
      } catch (err) {
        console.error("Failed to load products", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Price Filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Status Filter
    if (statusFilter === "in-stock") {
      result = result.filter((p) => p.stock > 0);
    }

    return result;
  }, [products, priceRange, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, statusFilter]);

  if (loading)
    return (
      <div className="text-center text-gray-200 py-20">
        <LoadingSpinner />
      </div>
    );

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative flex flex-col"
      style={{ backgroundImage: "url('../src/assets/BackgroudBoth.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <Header />

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-10 pt-16 pb-4 relative z-20 text-left">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-wider drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-white uppercase">
          Tất cả sản phẩm
        </h1>
        <p className="text-base md:text-lg tracking-[0.3em] font-bold text-gray-300 mt-2 uppercase">
          Khám phá bộ sưu tập Gundam
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-10 px-4 md:px-10 py-12 relative z-20 flex-grow">
        <aside className="space-y-8">
          <div className="bg-[#0A0A0E]/80 backdrop-blur-2xl border border-white/10 p-7 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] sticky top-24">
            <div className="flex items-center space-x-3 mb-10 pb-4 border-b border-white/5 relative">
              <IoFilterOutline className="text-blue-400 w-5 h-5" />
              <h3 className="font-black italic text-sm tracking-widest text-white uppercase">
                Bộ lọc
              </h3>
              <div className="absolute bottom-[-1px] left-0 w-12 h-[1px] bg-blue-500"></div>
            </div>

            <div className="space-y-12">
              {/* Custom Price Range Slider */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Khoảng giá
                  </h4>
                  <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    VNĐ
                  </span>
                </div>

                <div className="px-2">
                  <div className="relative h-1 w-full bg-white/10 rounded-full mb-8">
                    <div
                      className="absolute h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      style={{
                        left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                        right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      }}
                    ></div>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          Math.min(Number(e.target.value), priceRange[1] - 1),
                          priceRange[1],
                        ])
                      }
                      className="absolute w-full -top-1 h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Math.max(Number(e.target.value), priceRange[0] + 1),
                        ])
                      }
                      className="absolute w-full -top-1 h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-sm p-2 text-center">
                      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">
                        Từ
                      </p>
                      <p className="text-[10px] font-bold text-white tracking-wider">
                        {formatPrice(priceRange[0])}
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-sm p-2 text-center">
                      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">
                        Đến
                      </p>
                      <p className="text-[10px] font-bold text-white tracking-wider">
                        {formatPrice(priceRange[1])}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">
                  Tình trạng kho
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center justify-between cursor-pointer group bg-white/5 hover:bg-white/10 p-3 rounded-sm border border-white/5 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="status"
                          checked={statusFilter === option.value}
                          onChange={() => setStatusFilter(option.value)}
                          className="hidden"
                        />
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 ${statusFilter === option.value ? "border-blue-500 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "border-white/20"} transition-all flex items-center justify-center`}
                        >
                          {statusFilter === option.value && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span
                          className={`text-[11px] font-bold transition-colors ${statusFilter === option.value ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}
                        >
                          {option.label}
                        </span>
                      </div>
                      <IoChevronForwardOutline
                        className={`w-3 h-3 transition-all ${statusFilter === option.value ? "text-blue-500 translate-x-1" : "text-gray-700 opacity-0 group-hover:opacity-100"}`}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setPriceRange([minPrice, maxPrice]);
                  setStatusFilter("all");
                }}
                className="w-full py-3 bg-white/5 hover:bg-red-900/20 border border-white/10 hover:border-red-900/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-red-400 transition-all rounded-sm mt-4"
              >
                Xóa tất cả lọc
              </button>
            </div>
          </div>
        </aside>

        <main className="space-y-12">
          {error && (
            <div className="text-center text-red-300 py-20">
              Không thể tải sản phẩm. Vui lòng thử lại.
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {filteredProducts.length} Sản phẩm tìm thấy
                </span>

                {totalPages > 1 && (
                  <div className="flex items-center space-x-4">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="p-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-20 transition-all cursor-pointer"
                    >
                      <IoChevronBackOutline className="text-white" />
                    </button>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Trang {currentPage} / {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="p-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-20 transition-all cursor-pointer"
                    >
                      <IoChevronForwardOutline className="text-white" />
                    </button>
                  </div>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 py-20 italic bg-[#0A0A0E]/30 backdrop-blur-md rounded-sm border border-white/5">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {paginatedProducts.map((p) => (
                    <div
                      key={p._id}
                      className="bg-[#0A0A0E]/60 backdrop-blur-md border border-white/10 p-4 rounded-sm group hover:border-blue-500/40 transition-all hover:-translate-y-1 relative shadow-lg"
                    >
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="aspect-square bg-[#111] overflow-hidden mb-4 relative rounded-sm shadow-inner flex items-center justify-center">
                        <img
                          src={
                            p.images?.[0] ||
                            "https://via.placeholder.com/300x300"
                          }
                          alt={p.name}
                          className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {p.stock === 0 && (
                          <div className="absolute top-2 right-2 bg-red-600 text-[8px] font-black text-white px-2 py-0.5 rounded-sm uppercase tracking-tighter italic">
                            Hết hàng
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[11px] font-bold text-gray-200 line-clamp-2 h-8 group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-tight">
                          {p.name}
                        </h4>
                        <div className="flex flex-col space-y-3">
                          <span className="text-xs font-black text-white italic tracking-widest">
                            {formatPrice(p.price)}
                          </span>
                          <Link
                            to={`/product/${p._id}`}
                            className="w-full py-2 bg-blue-900/40 border border-blue-500/40 text-[9px] font-black uppercase rounded-sm hover:bg-blue-600 transition-all shadow-md flex items-center justify-center text-white"
                          >
                            CHI TIẾT ›
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
