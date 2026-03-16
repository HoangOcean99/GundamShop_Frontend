import React from "react";

const GundamComparison = () => {
  return (
    <section className="relative py-8 md:py-16 overflow-hidden max-w-[1400px] mx-auto px-4 md:px-10">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-blue-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/10 blur-[100px] pointer-events-none" />

      {/* Title */}
      <div className="relative flex justify-center mb-12 items-center">
        <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent to-white/20"></div>
        <h2 className="px-8 text-[16px] font-black tracking-[0.3em] text-gray-200 uppercase italic flex items-center justify-center">
          SO SÁNH GUNDAM
        </h2>
        <div className="w-1/3 h-[1px] bg-gradient-to-l from-transparent to-white/20"></div>
      </div>

      {/* Comparison Box */}
      <div className="relative mx-auto bg-[#0A0A0E]/20 border border-white/10 shadow-y-2xl backdrop-blur-md rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
          {/* Vertical Divider */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-gray-600 to-transparent hidden md:block z-10" />

          {/* Left: Gundam Nhật Bản */}
          <div className="p-6 md:p-12 pb-8 md:pb-16 text-left flex flex-col items-start space-y-6 md:space-y-8 bg-gradient-to-br from-blue-900/10 to-transparent">
            {/* Header style matching design */}
            <div className="w-full border-b border-blue-500/30 pb-4 flex justify-start">
              <div
                className="bg-blue-600/20 text-blue-300 px-8 py-2.5 font-black text-xs tracking-[0.2em] uppercase border-l-4 border-blue-500 shadow-[0_0_15px_rgba(0,102,255,0.2)]"
                style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 0 100%)" }}
              >
                GUNDAM NHẬT BẢN
              </div>
            </div>

            <ul className="space-y-5 w-full pl-2">
              <li className="flex items-center justify-start text-[12px] text-gray-300 tracking-wide">
                <span className="mr-5 text-blue-500 font-extrabold text-sm">
                  ✔
                </span>{" "}
                Thiết kế chuẩn Bandai
              </li>
              <li className="flex items-center justify-start text-[12px] text-gray-300 tracking-wide">
                <span className="mr-5 text-blue-500 font-extrabold text-sm">
                  ✔
                </span>{" "}
                Chất liệu cao cấp
              </li>
              <li className="flex items-center justify-start text-[12px] text-gray-300 tracking-wide">
                <span className="mr-5 text-blue-500 font-extrabold text-sm">
                  ✔
                </span>{" "}
                Độ chi tiết cao
              </li>
            </ul>
          </div>

          {/* Center VS */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center">
            <div className="text-6xl font-black italic text-gray-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] select-none mix-blend-screen opacity-90">
              VS
            </div>
          </div>

          {/* Right: Gundam Trung Quốc */}
          <div className="p-6 md:p-12 pb-8 md:pb-16 text-right flex flex-col items-end space-y-6 md:space-y-8 bg-gradient-to-bl from-red-900/10 to-transparent">
            {/* Header style matching design */}
            <div className="w-full border-b border-red-500/30 pb-4 flex justify-end">
              <div
                className="bg-red-600/20 text-red-400 px-8 py-2.5 font-black text-xs tracking-[0.2em] uppercase border-r-4 border-red-500 shadow-[0_0_15px_rgba(255,51,0,0.2)]"
                style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                GUNDAM TRUNG QUỐC
              </div>
            </div>

            <ul className="space-y-5 w-full flex flex-col items-end pr-2">
              <li className="flex items-center justify-end text-[12px] text-gray-300 tracking-wide">
                Giá thành rẻ{" "}
                <span className="ml-5 text-red-500 font-extrabold text-sm">
                  ✔
                </span>
              </li>
              <li className="flex items-center justify-end text-[12px] text-gray-300 tracking-wide">
                Mẫu mã đa dạng{" "}
                <span className="ml-5 text-red-500 font-extrabold text-sm">
                  ✔
                </span>
              </li>
              <li className="flex items-center justify-end text-[12px] text-gray-300 tracking-wide">
                Lắp ráp linh hoạt{" "}
                <span className="ml-5 text-red-500 font-extrabold text-sm">
                  ✔
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30">
          <a href="https://www.tiktok.com/@hakudastore/video/7610816443885587732" target="_blank" className="bg-[#0A0A0E] border border-white/20 px-8 py-2 rounded-sm text-[10px] font-bold text-gray-300 uppercase hover:bg-white/10 hover:text-white transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center whitespace-nowrap cursor-pointer">
            XEM CHI TIẾT <span className="ml-2 text-xs">›</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GundamComparison;
