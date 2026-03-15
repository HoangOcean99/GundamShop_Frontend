import React, { useEffect, useMemo, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllProducts } from "../api/productApi";

const JapanGundamPage = () => {
  const [sections, setSections] = useState([
    { title: "HG", scale: "1/144", subCategory: "HG", products: [] },
    { title: "RG", scale: "1/144", subCategory: "RG", products: [] },
    { title: "RG", scale: "1/100", subCategory: "RG", products: [] },
    { title: "PG", scale: "1/60", subCategory: "PG", products: [] },
    { title: "SD", scale: "Non-Scale", subCategory: "SD", products: [] },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = useMemo(
    () =>
      sections.map((section) => ({
        name: section.title,
        sub: section.scale,
        count: section.products.length,
      })),
    [sections],
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
          mainCategory: "Gundam Nhật Bản",
        });

        if (!isCurrent) return;

        const updatedSections = sections.map((section) => ({
          ...section,
          products: products.filter(
            (p) =>
              p.subCategory === section.subCategory &&
              p.scale === section.scale,
          ),
        }));

        setSections(updatedSections);
      } catch (err) {
        console.error("Failed to load Gundam Nhật Bản products", err);
        if (isCurrent) setError(err);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      isCurrent = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative"
      style={{ backgroundImage: "url('../src/assets/jpGundamBG.png')" }}
    >
      {/* Dark overlay to make content pop */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      <Header />

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
          <div className="bg-[#0A0A0E]/30 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-2xl relative overflow-hidden group">
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
                  className={`flex items-center justify-between p-3 rounded-sm cursor-pointer transition-all ${
                    idx === 0
                      ? "bg-blue-600/20 shadow-[inset_0_0_10px_rgba(0,102,255,0.1)]"
                      : "hover:bg-white/5 text-gray-400"
                  }`}
                >
                  <span className="font-extrabold text-[13px] tracking-wide">
                    {cat.name}
                  </span>
                  <div className="flex items-center">
                    <span className="text-[10px] mr-2 opacity-40 font-bold">
                      {cat.count}
                    </span>
                    <IoChevronForwardOutline
                      className={`w-3.5 h-3.5 ${
                        idx === 0 ? "text-blue-500" : "opacity-30"
                      }`}
                    />
                  </div>
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

                {section.products.length === 0 ? (
                  <div className="text-center text-gray-400">
                    Chưa có sản phẩm trong danh mục này.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 lg:grid-cols-5 gap-5">
                    {section.products.map((p, pIdx) => (
                      <div
                        key={p._id || pIdx}
                        className="bg-[#0A0A0E]/60 backdrop-blur-md border border-white/10 p-3 rounded-sm group hover:border-blue-500/40 transition-all hover:-translate-y-1 relative shadow-lg"
                      >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="aspect-square bg-[#111115] overflow-hidden mb-3 relative rounded-sm shadow-inner">
                          <img
                            src={
                              p.images?.[0] ||
                              "https://via.placeholder.com/300x300"
                            }
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
                            {formatPrice(p.price)}
                          </p>
                          <button className="w-full py-1.5 bg-blue-900/40 border border-blue-500/40 text-[9px] font-black uppercase rounded-sm hover:bg-blue-600 transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(0,102,255,0.3)]">
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

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
};

export default JapanGundamPage;
