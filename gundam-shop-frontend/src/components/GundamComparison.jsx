import React from 'react';

const GundamComparison = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Effects - Hiệu ứng ánh sáng loang loáng hai bên */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-blue-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/10 blur-[100px] pointer-events-none" />

      {/* Title */}
      <div className="relative flex justify-center mb-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-800"></div>
        </div>
        <h2 className="relative px-6 bg-[#050505] text-sm font-bold tracking-[0.4em] text-gray-300 uppercase italic">
          SO SÁNH GUNDAM
        </h2>
      </div>

      {/* Comparison Box */}
      <div className="relative mx-auto border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          
          {/* Vertical Divider - Đường kẻ ngăn cách ở giữa */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden md:block" />

          {/* Left: Gundam Nhật Bản */}
          <div className="p-10 text-right flex flex-col items-end space-y-6">
            <div 
              className="bg-blue-600/20 text-blue-400 px-8 py-2 font-black text-xs tracking-widest border-r-4 border-blue-500 relative"
              style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              GUNDAM NHẬT BẢN
            </div>
            <ul className="space-y-4">
              <li className="flex items-center justify-end text-[11px] text-gray-300 tracking-wide">
                Thiết kế chuẩn Bandai <span className="ml-3 text-blue-500">✔</span>
              </li>
              <li className="flex items-center justify-end text-[11px] text-gray-300 tracking-wide">
                Chất liệu cao cấp <span className="ml-3 text-blue-500">✔</span>
              </li>
              <li className="flex items-center justify-end text-[11px] text-gray-300 tracking-wide">
                Độ chi tiết cao <span className="ml-3 text-blue-500">✔</span>
              </li>
            </ul>
          </div>

          {/* Center VS - Chữ VS đè lên giữa */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <span className="text-4xl font-black italic text-white/10 select-none">VS</span>
          </div>

          {/* Right: Gundam Trung Quốc */}
          <div className="p-10 text-left flex flex-col items-start space-y-6">
            <div 
              className="bg-red-600/20 text-red-500 px-8 py-2 font-black text-xs tracking-widest border-l-4 border-red-600 relative"
              style={{ clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0 100%)' }}
            >
              GUNDAM TRUNG QUỐC
            </div>
            <ul className="space-y-4">
              <li className="flex items-center text-[11px] text-gray-300 tracking-wide">
                <span className="mr-3 text-red-600 italic">★</span> Giá thành rẻ
              </li>
              <li className="flex items-center text-[11px] text-gray-300 tracking-wide">
                <span className="mr-3 text-red-600">✔</span> Mẫu mã đa dạng
              </li>
              <li className="flex items-center text-[11px] text-gray-300 tracking-wide">
                <span className="mr-3 text-red-600">✔</span> Lắp ráp linh hoạt
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Button - Xem chi tiết */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
          <button className="bg-[#1a1a1c] border border-gray-700 px-8 py-2 text-[10px] font-bold text-gray-300 uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-2xl">
            XEM CHI TIẾT <span className="ml-2 font-normal">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GundamComparison;