import React from "react";

const newsData = [
  {
    id: 1,
    title: "Hướng Dẫn Build Gundam Đúng Cách",
    date: "12/01/2026",
    link: "https://www.nshop.com.vn/blogs/gundam-plaza/huong-dan-lap-rap-gundam-co-ban?srsltid=AfmBOoqM1jBJ8FVQIu_MBV6qcwPPd3GZYxeezw85_9SFE_GPgmgDNs1R#gref",
    img: "https://gamek.mediacdn.vn/zoom/600_315/2017/gundam-00-mobile-suit-gundam-00-20740655-1600-1200-1513311637345.jpg",
  },
  {
    id: 2,
    title: "Top 5 Gundam Đáng Mua Nhất Hiện Nay",
    date: "20/12/2025",
    link: "https://www.nshop.com.vn/blogs/gundam-plaza/top-10-gundam-manh-nhat?srsltid=AfmBOoosZH4QfhwzkbWHB-r15HcXST4cWkPNQRC-SolcpFfcaDV0G_rn",
    img: "https://file.hstatic.net/1000231532/file/hinh_nen_wallpaper_gundam_the_witch_from_mercury_43aae4edfc064a4b8a3f476e8fe7d522.jpg",
  },
  {
    id: 3,
    title: "Đánh Giá Gundam Trung Quốc Mới",
    date: "10/11/2025",
    link: "https://tuoitre.vn/gundam-gquuuuuux-cuoc-cach-tan-tao-bao-cua-thuong-hieu-gundam-20250308124027497.htm",
    img: "https://file.hstatic.net/1000231532/file/tai_anh_gundam_ngau_hinh_nen_pc_laptop_dien_thoai__43__6109b2b81e9f4e92943784a1abcd6c49.jpg",
  },
];

const GundamNews = () => {
  return (
    <section className="py-8 md:py-16 px-4 md:px-10 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-3">
        <h2 className="text-xl font-black uppercase tracking-widest italic drop-shadow-md">
          TIN TỨC & REVIEW
        </h2>
        <button className="bg-transparent border border-white/10 px-5 py-1.5 text-[10px] rounded-full hover:bg-white/10 transition-colors font-bold uppercase text-gray-300 hover:text-white">
          XEM THÊM ›
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <a
            href={news.link}
            key={news.id}
            className="group cursor-pointer bg-[#0A0A0E]/20 backdrop-blur-md border border-white/5 p-3 hover:border-white/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 relative"
            target="_blank"
          >
            {/* Subtle top glow line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="aspect-[16/9] bg-[#111115] overflow-hidden mb-4 relative shadow-inner">
              <img
                src={news.img}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
                alt={news.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>
            <h4 className="text-[14px] font-bold text-gray-200 group-hover:text-blue-400 transition-colors leading-snug mb-3">
              {news.title}
            </h4>
            <div className="flex items-center text-[10px] text-gray-400 font-semibold tracking-wider">
              <span className="mr-2 opacity-80">📖</span> {news.date}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default GundamNews;
