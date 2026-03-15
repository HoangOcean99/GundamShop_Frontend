import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllProducts } from "../api/productApi";
import LoadingSpinner from "../components/LoadingSpinner";

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
  const [currentPages, setCurrentPages] = useState({});
  const sectionRefs = useRef({});

  const ITEMS_PER_PAGE = 10;

  const categories = useMemo(
    () =>
      sections.map((section, idx) => ({
        name: section.title,
        sub: section.scale,
        count: section.products.length,
        idx,
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
        
        const initialPages = {};
        updatedSections.forEach((_, idx) => {
          initialPages[idx] = 1;
        });
        setCurrentPages(initialPages);
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
  }, []);

  const scrollToSection = (idx) => {
    const element = sectionRefs.current[idx];
    if (element) {
      const offset = 100; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative flex flex-col"
      style={{ backgroundImage: "url('../src/assets/jpGundamBG.png')" }}
    >
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      <Header />

      <div className="max-w-[1400px] mx-auto w-full px-10 pt-16 pb-4 relative z-20 text-left">
        <h1 className="text-5xl font-black italic tracking-wider drop-shadow-[0_0_20px_rgba(0,102,255,0.6)] text-white">
          GUNDAM NHẬT BẢN
        </h1>
        <p className="text-lg tracking-[0.3em] font-bold text-blue-200/80 mt-2 uppercase">
          Chất lượng tinh tế
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-[280px_1fr] gap-10 px-10 py-12 relative z-20 flex-grow">
        <aside className="space-y-8">
          <div className="bg-[#0A0A0E]/30 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-2xl relative overflow-hidden group sticky top-24">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/40 shadow-[0_0_10px_rgba(0,102,255,0.2)]"></div>
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/5">
              <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center">
                <img src="../src/assets/logo.png" alt="L" className="w-5 h-5 object-contain mix-blend-screen" />
              </div>
              <h3 className="font-black italic text-sm tracking-widest text-white">DÒNG GUNDAM</h3>
            </div>

            <nav className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.idx}
                  onClick={() => scrollToSection(cat.idx)}
                  className="flex items-center justify-between p-3 rounded-sm cursor-pointer transition-all hover:bg-white/5 group/nav"
                >
                  <span className="font-extrabold text-[13px] tracking-wide text-gray-400 group-hover:text-white transition-colors">
                    {cat.name} <span className="text-[9px] opacity-40 italic ml-1">{cat.sub}</span>
                  </span>
                  <div className="flex items-center">
                    <span className="text-[10px] mr-2 opacity-40 font-bold group-hover:opacity-100 transition-opacity">
                      {cat.count}
                    </span>
                    <IoChevronForwardOutline className="w-3.5 h-3.5 text-blue-500 opacity-30 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <main className="space-y-16">
          {loading && <div className="text-center text-gray-200 py-20"><LoadingSpinner /></div>}
          {error && <div className="text-center text-red-300 py-20">Không thể tải sản phẩm. Vui lòng thử lại.</div>}

          {!loading && !error && sections.map((section, sIdx) => {
            const page = currentPages[sIdx] || 1;
            const startIdx = (page - 1) * ITEMS_PER_PAGE;
            const paginatedProducts = section.products.slice(startIdx, startIdx + ITEMS_PER_PAGE);
            const totalPages = Math.ceil(section.products.length / ITEMS_PER_PAGE);

            return (
              <section
                key={sIdx}
                ref={el => sectionRefs.current[sIdx] = el}
                className="space-y-8 bg-[#0A0A0E]/40 backdrop-blur-lg border border-white/5 p-8 rounded-sm shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <h2 className="text-2xl font-black italic flex items-center tracking-widest text-white">
                    {section.title} 
                    <span className="ml-4 text-xs font-bold text-blue-400 not-italic uppercase opacity-60 tracking-[0.2em]">
                      Tỉ lệ {section.scale}
                    </span>
                  </h2>
                  
                  {totalPages > 1 && (
                    <div className="flex items-center space-x-4">
                      <button 
                         disabled={page === 1}
                         onClick={() => setCurrentPages(prev => ({ ...prev, [sIdx]: page - 1 }))}
                         className="p-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-20 transition-all"
                      >
                        <IoChevronBackOutline className="text-white" />
                      </button>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Trang {page} / {totalPages}</span>
                      <button 
                         disabled={page === totalPages}
                         onClick={() => setCurrentPages(prev => ({ ...prev, [sIdx]: page + 1 }))}
                         className="p-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-20 transition-all"
                      >
                        <IoChevronForwardOutline className="text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {section.products.length === 0 ? (
                  <div className="text-center text-gray-500 py-10 italic">Chưa có sản phẩm trong danh mục này.</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {paginatedProducts.map((p, pIdx) => (
                      <div
                        key={p._id || pIdx}
                        className="bg-[#0A0A0E]/60 backdrop-blur-md border border-white/10 p-4 rounded-sm group hover:border-blue-500/40 transition-all hover:-translate-y-1 relative shadow-lg"
                      >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="aspect-square bg-[#111115] overflow-hidden mb-4 relative rounded-sm shadow-inner flex items-center justify-center">
                          <img
                            src={p.images?.[0] || "https://via.placeholder.com/300x300"}
                            alt={p.name}
                            className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          {p.stock === 0 && (
                            <div className="absolute top-2 right-2 bg-red-600 text-[8px] font-black text-white px-2 py-0.5 rounded-sm uppercase tracking-tighter italic">Hết hàng</div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-bold text-gray-200 line-clamp-2 h-8 group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-tight">
                            {p.name}
                          </h4>
                          <div className="flex flex-col space-y-3">
                            <span className="text-xs font-black text-white italic tracking-widest">{formatPrice(p.price)}</span>
                            <Link
                              to={`/product/${p._id}`}
                              className="w-full py-2 bg-blue-900/40 border border-blue-500/40 text-[9px] font-black uppercase rounded-sm hover:bg-blue-600 transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(0,102,255,0.3)] flex items-center justify-center text-white"
                            >
                              CHI TIẾT ›
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default JapanGundamPage;
