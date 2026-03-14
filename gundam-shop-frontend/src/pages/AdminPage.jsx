import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoPricetagOutline,
  IoAddCircleOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("japan");

  // Dummy Initial Data
  const [japanProducts, setJapanProducts] = useState([
    { id: 1, name: "RX-78-2 Gundam PG Unleashed", scale: "1/60", price: 8600000, stock: 12 },
    { id: 2, name: "Gundam Exia PG", scale: "1/60", price: 8600000, stock: 5 },
    { id: 3, name: "Unicorn Gundam PG", scale: "1/60", price: 1800000, stock: 0 },
  ]);

  const [chinaProducts, setChinaProducts] = useState([
    { id: 101, name: "MoShow Takeda Shingen", scale: "1/72", price: 3200000, stock: 8 },
    { id: 102, name: "Motor Nuclear AoBing", scale: "1/72", price: 4500000, stock: 15 },
  ]);

  const activeProducts = activeTab === "japan" ? japanProducts : chinaProducts;
  const setActiveProducts = activeTab === "japan" ? setJapanProducts : setChinaProducts;

  const handleStockChange = (id, newStock) => {
    setActiveProducts(
      activeProducts.map((p) =>
        p.id === id ? { ...p, stock: parseInt(newStock) || 0 } : p
      )
    );
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative flex flex-col font-sans"
      style={{ backgroundImage: "url('../src/assets/jpGundamBG.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 z-0 backdrop-blur-sm"></div>

      {/* --- ADMIN TOP NAVBAR --- */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#060608]/40 backdrop-blur-xl sticky top-0 z-50">
        <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
          <img
            src="../src/assets/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain mix-blend-screen group-hover:scale-110 transition-transform"
          />
          <span className="font-black italic text-2xl tracking-tighter drop-shadow-lg text-white group-hover:text-blue-400 transition-colors">
            ADMIN PANEL
          </span>
        </Link>

        <div className="flex items-center space-x-6 text-gray-400 text-sm">
          <div className="flex items-center space-x-2 text-white bg-blue-600/20 px-4 py-2 rounded-full border border-blue-500/30">
            <IoPersonOutline className="w-5 h-5 text-blue-400" />
            <span className="font-bold tracking-widest text-xs uppercase">Super Admin</span>
          </div>
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-red-400 transition-colors cursor-pointer group"
          >
            <span className="font-bold tracking-widest text-[10px] uppercase group-hover:text-red-400 transition-colors">
              Rời Admin
            </span>
            <IoLogOutOutline className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* --- ADMIN MAIN CONTENT --- */}
      <main className="flex-grow w-full grid grid-cols-[250px_1fr] relative z-20">
        
        {/* Admin Sidebar */}
        <aside className="bg-[#0A0A0E]/80 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="space-y-2 flex-grow">
            <div className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-4 ml-2">
              QUẢN QUẢN LÝ
            </div>
            
            <button
              onClick={() => setActiveTab("japan")}
              className={`w-full flex items-center justify-between p-3 rounded-sm transition-all ${
                activeTab === "japan"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[inset_0_0_15px_rgba(0,102,255,0.2)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center font-bold text-xs tracking-widest uppercase">
                <IoPricetagOutline className="w-4 h-4 mr-3" />
                Gundam Nhật Bản
              </div>
            </button>

            <button
              onClick={() => setActiveTab("china")}
              className={`w-full flex items-center justify-between p-3 rounded-sm transition-all ${
                activeTab === "china"
                  ? "bg-red-600/20 text-red-400 border border-red-500/30 shadow-[inset_0_0_15px_rgba(255,50,0,0.2)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center font-bold text-xs tracking-widest uppercase">
                <IoPricetagOutline className="w-4 h-4 mr-3" />
                Gundam Trung Quốc
              </div>
            </button>
            
            <div className="my-6 border-b border-white/5"></div>

            <button className="w-full flex items-center p-3 rounded-sm transition-all text-gray-400 hover:bg-white/5 hover:text-white">
              <div className="flex items-center font-bold text-xs tracking-widest uppercase">
                <IoSettingsOutline className="w-4 h-4 mr-3" />
                Cài đặt hệ thống
              </div>
            </button>
          </div>
        </aside>

        {/* Admin Workspace */}
        <div className="p-10 h-[calc(100vh-73px)] overflow-y-auto">
          {/* Header Area */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className={`text-3xl font-black italic tracking-wider uppercase drop-shadow-lg ${activeTab === 'japan' ? 'text-blue-400' : 'text-red-500'}`}>
                {activeTab === "japan" ? "QUẢN LÝ GUNDAM NHẬT BẢN" : "QUẢN LÝ GUNDAM TRUNG QUỐC"}
              </h1>
              <p className="text-xs tracking-[0.2em] font-bold text-gray-400 mt-2 uppercase">
                {activeProducts.length} sản phẩm đang hiển thị
              </p>
            </div>

            <button className={`flex items-center space-x-2 px-6 py-2.5 rounded-sm font-black text-xs uppercase tracking-widest border transition-all shadow-lg text-white ${
                activeTab === 'japan' 
                ? 'bg-blue-600/80 border-blue-400 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(0,102,255,0.6)]' 
                : 'bg-red-600/80 border-red-400 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(255,50,0,0.6)]'}`}
            >
              <IoAddCircleOutline className="w-5 h-5" />
              <span>Thêm sản phẩm</span>
            </button>
          </div>

          {/* Search/Filter Bar */}
          <div className="bg-[#0A0A0E]/60 backdrop-blur-xl border border-white/10 p-4 rounded-sm flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-black/50 px-4 py-2 rounded-sm border border-white/10 focus-within:border-white/30">
                <IoSearchOutline className="text-gray-400 w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm ID, Tên..."
                  className="bg-transparent text-xs w-64 text-white focus:outline-none placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-[#0A0A0E]/80 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <th className="p-4 w-20 text-center">ID</th>
                  <th className="p-4">Tên Sản Phẩm</th>
                  <th className="p-4 w-32 text-center">Tỷ Lệ</th>
                  <th className="p-4 w-48 text-right">Giá (VNĐ)</th>
                  <th className="p-4 w-40 text-center">Tồn Kho</th>
                  <th className="p-4 w-32 text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-xs font-bold text-gray-500 text-center">#{product.id}</td>
                    <td className="p-4 text-sm font-bold text-white tracking-widest">
                      {product.name}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-1 text-[9px] font-bold rounded uppercase border ${
                        activeTab === 'japan' ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' : 'bg-red-900/30 text-red-300 border-red-500/30'
                      }`}>
                        {product.scale}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-300 text-right">
                      {formatPrice(product.price)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) => handleStockChange(product.id, e.target.value)}
                          className={`w-16 bg-black/60 border ${product.stock <= 5 ? 'border-amber-500/50 text-amber-400 focus:border-amber-400' : 'border-white/10 text-white focus:border-blue-400'} px-2 py-1 rounded-sm text-center text-xs font-bold focus:outline-none focus:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-colors`}
                          min="0"
                        />
                        {product.stock <= 5 && product.stock > 0 && <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest absolute -mt-8 bg-amber-500/10 px-1 rounded border border-amber-500/20 backdrop-blur-sm">Sắp hết</span>}
                        {product.stock === 0 && <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest absolute -mt-8 bg-red-500/10 px-1 rounded border border-red-500/20 backdrop-blur-sm">Hết hàng</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center space-x-3">
                        <button className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-400/10 rounded">
                          <IoPencilOutline className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-500/10 rounded">
                          <IoTrashOutline className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {activeProducts.length === 0 && (
              <div className="p-10 text-center text-sm font-bold text-gray-500 tracking-widest uppercase">
                Không tìm thấy sản phẩm nào
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminPage;
