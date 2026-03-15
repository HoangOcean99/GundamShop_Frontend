import React, { useEffect, useMemo, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllProducts } from "../api/productApi";

const subCategoryOrder = ["1/144", "1/100", "1/60", "Original Mecha"];

const ChinaGundamPage = () => {
  const [productsBySubCategory, setProductsBySubCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = useMemo(
    () =>
      subCategoryOrder.map((name) => ({
        name,
        count: productsBySubCategory[name]?.length ?? 0,
      })),
    [productsBySubCategory],
  );

  const sections = useMemo(
    () =>
      subCategoryOrder.map((title) => ({
        title,
        products: productsBySubCategory[title] ?? [],
      })),
    [productsBySubCategory],
  );

  const formatPrice = (price) => {
    if (price == null) return "";
    return price.toLocaleString("vi-VN") + "đ";
  };

  useEffect(() => {
    let isCurrent = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const products = await getAllProducts({
          mainCategory: "Gundam Trung Quốc",
        });

        if (!isCurrent) return;

        const grouped = {};
        subCategoryOrder.forEach((name) => {
          grouped[name] = [];
        });

        products.forEach((product) => {
          if (subCategoryOrder.includes(product.subCategory)) {
            grouped[product.subCategory].push(product);
          }
        });

        setProductsBySubCategory(grouped);
      } catch (err) {
        console.error("Failed to load Gundam Trung Quốc products", err);
        if (isCurrent) setError(err);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative"
      style={{ backgroundImage: "url('../src/assets/cnGundamBG.png')" }}
    >
      {/* Dark overlay for better content contrast */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <Header />
      <div className="max-w-[1400px] mx-auto px-10 pt-16 pb-6 relative z-20 text-left">
        <h1 className="text-5xl font-black italic tracking-wider drop-shadow-[0_0_30px_rgba(255,50,0,0.5)] text-white uppercase">
          GUNDAM TRUNG QUỐC
        </h1>
        <p className="text-lg tracking-[0.3em] font-bold text-red-200/80 mt-2 uppercase">
          Mẫu mã ấn tượng
        </p>
      </div>

      {/* --- MAIN SECTION --- */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-[280px_1fr] gap-10 px-10 py-12 relative z-20">
        {/* --- SIDEBAR --- */}
        <aside className="space-y-8">
          <div className="bg-[#0A0A0E]/30 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-900/40 shadow-[0_0_15px_rgba(255,0,0,0.2)]"></div>

            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/5">
              <div className="w-8 h-8 bg-red-900/20 rounded flex items-center justify-center border border-red-800/20">
                <img
                  src="../src/assets/logo.png"
                  alt="L"
                  className="w-5 h-5 object-contain mix-blend-screen"
                />
              </div>
              <h3 className="font-black italic text-sm tracking-widest text-white">
                TỈ LỆ GUNDAM
              </h3>
            </div>

            <nav className="space-y-2">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-sm cursor-pointer transition-all duration-300 ${
                    idx === 0
                      ? "bg-red-900/20 shadow-[inset_0_0_10px_rgba(255,0,0,0.05)] border border-red-500/20"
                      : "hover:bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="font-extrabold text-[13px] tracking-wide uppercase">
                    {cat.name}
                  </span>
                  <div className="flex items-center">
                    <span className="text-[10px] mr-2 opacity-40 font-bold">
                      {cat.count}
                    </span>
                    <IoChevronForwardOutline
                      className={`w-3.5 h-3.5 ${
                        idx === 0 ? "text-red-500" : "opacity-30"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </nav>

            <div className="mt-10 space-y-4">
              <div className="flex items-center text-[11px] text-gray-300 font-bold">
                <span className="text-red-700/80 mr-3 text-xs">✔</span> Mẫu mã
                đa dạng
              </div>
              <div className="flex items-center text-[11px] text-gray-300 font-bold">
                <span className="text-red-700/80 mr-3 text-xs">✔</span> Giá cả
                hợp lý
              </div>
              <div className="flex items-center text-[11px] text-gray-300 font-bold">
                <span className="text-red-700/80 mr-3 text-xs">✔</span> Dễ dàng
                lắp ráp
              </div>
            </div>
          </div>
        </aside>

        {/* --- PRODUCTS CONTENT --- */}
        <main className="space-y-12">
          {loading && (
            <div className="text-center text-gray-200">
              Đang tải sản phẩm...
            </div>
          )}
          {error && (
            <div className="text-center text-red-300">
              Không thể tải sản phẩm. Vui lòng thử lại.
            </div>
          )}

          {!loading &&
            !error &&
            sections.map((section, sIdx) => (
              <section
                key={sIdx}
                className="space-y-6 bg-[#0A0A0E]/40 backdrop-blur-lg border border-white/5 p-6 rounded-sm shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-900/5 blur-[60px]"></div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                  <div className="flex items-center space-x-3">
                    <span className="text-red-800/60 text-xl">
                      {section.icon}
                    </span>
                    <h2 className="text-xl font-black italic flex items-center tracking-widest text-white uppercase">
                      {section.title}
                    </h2>
                  </div>
                  <div className="flex space-x-2 text-[10px] font-bold text-gray-500">
                    <span className="hover:text-red-500 cursor-pointer transition uppercase">
                      1
                    </span>
                    <span className="opacity-30">|</span>
                    <span className="hover:text-red-500 cursor-pointer transition uppercase">
                      2
                    </span>
                    <span className="opacity-30">|</span>
                    <span className="hover:text-red-500 cursor-pointer transition uppercase">
                      3
                    </span>
                    <IoChevronForwardOutline className="w-3 h-3 ml-1 cursor-pointer hover:text-red-500 transition-colors" />
                  </div>
                </div>

                {section.products.length === 0 ? (
                  <div className="text-center text-gray-400">
                    Chưa có sản phẩm trong danh mục này.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 lg:grid-cols-5 gap-5">
                    {section.products.map((p, pIdx) => (
                      <div
                        key={p._id || pIdx}
                        className="bg-[#0A0A0E]/60 backdrop-blur-md border border-white/10 p-3 rounded-sm group transition-all duration-300 hover:border-red-900/40 hover:-translate-y-1 relative shadow-lg"
                      >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="aspect-square bg-[#111] overflow-hidden mb-3 relative rounded-sm shadow-inner">
                          <img
                            src={
                              p.images?.[0] ||
                              "https://via.placeholder.com/300x300"
                            }
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-[11px] font-bold text-gray-200 line-clamp-1 group-hover:text-red-400 transition-colors uppercase tracking-tight">
                              {p.name}
                            </h4>
                            <p className="text-[11px] font-bold text-gray-400 mt-1">
                              {formatPrice(p.price)}
                            </p>
                          </div>
                          <button className="w-full py-1.5 bg-red-900/30 border border-red-800/30 text-[9px] font-black uppercase rounded-sm hover:bg-red-800 transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(255,0,0,0.1)]">
                            XEM NGAY ›
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ChinaGundamPage;
