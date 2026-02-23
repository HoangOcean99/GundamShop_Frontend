import React from 'react';

const newsData = [
    { id: 1, title: "Hướng Dẫn Build Gundam Đúng Cách", date: "12/01/2022", img: "https://gamek.mediacdn.vn/zoom/600_315/2017/gundam-00-mobile-suit-gundam-00-20740655-1600-1200-1513311637345.jpg" },
    { id: 2, title: "Top 5 Gundam Đáng Mua Nhất Hiện Nay", date: "20/12/2021", img: "https://file.hstatic.net/1000231532/file/hinh_nen_wallpaper_gundam_the_witch_from_mercury_43aae4edfc064a4b8a3f476e8fe7d522.jpg" },
    { id: 3, title: "Đánh Giá Gundam Trung Quốc Mới", date: "10/11/2021", img: "https://file.hstatic.net/1000231532/file/tai_anh_gundam_ngau_hinh_nen_pc_laptop_dien_thoai__43__6109b2b81e9f4e92943784a1abcd6c49.jpg" },
];

const GundamNews = () => {
    return (
        <section className="py-16">
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
                <h2 className="text-lg font-black uppercase tracking-widest italic border-l-4 border-blue-500 pl-4">
                    TIN TỨC & REVIEW
                </h2>
                <button className="bg-white/5 border border-white/10 px-6 py-1.5 text-[10px] rounded-full hover:bg-white hover:text-black transition font-bold uppercase">
                    XEM THÊM ›
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {newsData.map((news) => (
                    <div key={news.id} className="group cursor-pointer">
                        <div className="aspect-video bg-zinc-900 overflow-hidden mb-5 border border-white/5 relative">
                            <img
                                src={news.img}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 grayscale-[20%] group-hover:grayscale-0"
                                alt={news.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <h4 className="text-[13px] font-bold text-gray-200 group-hover:text-blue-500 transition leading-tight mb-3">
                            {news.title}
                        </h4>
                        <div className="flex items-center text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                            <span className="mr-2">📅</span> {news.date}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GundamNews;