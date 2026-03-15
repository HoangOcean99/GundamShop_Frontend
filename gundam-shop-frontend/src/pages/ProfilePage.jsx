import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoPersonOutline,
  IoChevronForwardOutline,
  IoSettingsOutline,
  IoListOutline,
  IoLogOutOutline,
  IoBagCheckOutline,
  IoTimeOutline,
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
  IoEyeOutline,
  IoLocationOutline,
  IoPhonePortraitOutline,
  IoRepeatOutline,
  IoCardOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { getUserByFirebaseId, updateUser } from "../api/userApi";
import { getOrdersByUser, updateOrder } from "../api/orderApi";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [userId, setUserId] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        setAvatar(null);
        navigate("/login");
        return;
      }

      try {
        const response = await getUserByFirebaseId(user.uid);
        const userData = response;

        setUserId(userData._id || userData.id);
        setFormData({
          name: userData.name || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });

        const storedAvatar = localStorage.getItem("avatar") || user.photoURL;
        setAvatar(storedAvatar);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (view === "orders" && userId) {
      fetchOrders();
    }
  }, [view, userId]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await getOrdersByUser();
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      await updateUser(userId, formData);
      toast.success("Thông tin đã được cập nhật!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Cập nhật thất bại.");
    }
  };

  const handleConfirmReceived = async (e, orderId) => {
    e.stopPropagation();
    try {
      await updateOrder(orderId, { status: "done" });
      toast.success("Xác nhận đã nhận hàng!");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Cập nhật trạng thái thất bại.");
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Chờ xử lý",
          color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
          icon: <IoTimeOutline className="w-3.5 h-3.5 mr-1" />,
        };
      case "shipping":
        return {
          label: "Đang giao",
          color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
          icon: <IoRepeatOutline className="w-3.5 h-3.5 mr-1" />,
        };
      case "done":
        return {
          label: "Hoàn tất",
          color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
          icon: <IoCheckmarkCircleOutline className="w-3.5 h-3.5 mr-1" />,
        };
      case "cancel":
        return {
          label: "Đã hủy",
          color: "text-red-400 bg-red-400/10 border-red-400/20",
          icon: <IoCloseCircleOutline className="w-3.5 h-3.5 mr-1" />,
        };
      default:
        return { label: status, color: "text-gray-400", icon: null };
    }
  };

  const formatPrice = (price) => (price || 0).toLocaleString("vi-VN") + "đ";

  if (loading)
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative flex flex-col"
      style={{ backgroundImage: "url('../src/assets/jpGundamBG.png')" }}
    >
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <Header />

      <div className="max-w-[1400px] mx-auto w-full px-10 pt-16 pb-6 relative z-20 text-left">
        <h1 className="text-4xl font-black italic tracking-wider drop-shadow-[0_0_20px_rgba(0,102,255,0.5)] text-white uppercase">
          KHO LƯU TRỮ CÁ NHÂN
        </h1>
        <p className="text-[10px] tracking-[0.4em] font-black text-blue-400/80 mt-2 uppercase">
          User Database Level 01
        </p>
      </div>

      <main className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 px-10 py-8 relative z-20 flex-grow mb-20">
        {/* --- SIDEBAR --- */}
        <aside>
          <div className="bg-[#0A0A0E]/80 backdrop-blur-2xl border border-white/5 p-6 rounded-sm shadow-2xl relative overflow-hidden group h-full">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_15px_rgba(0,102,255,0.5)]"></div>

            <div className="flex items-center space-x-4 border-b border-white/5 pb-10 mb-8 mt-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-sm bg-gradient-to-tr from-blue-600/20 to-indigo-900/20 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-12 h-12 object-cover rounded-sm"
                    />
                  ) : (
                    <IoPersonOutline className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0A0A0E] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-xs font-black text-white uppercase tracking-widest truncate">
                  {formData.name || "Pilot No-01"}
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-[8px] font-black tracking-widest text-blue-400 uppercase bg-blue-400/10 px-1.5 py-0.5 rounded-sm">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <nav className="space-y-3">
              {[
                {
                  id: "profile",
                  name: "Dữ liệu cá nhân",
                  icon: <IoPersonOutline />,
                },
                {
                  id: "orders",
                  name: "Lịch sử mua hàng",
                  icon: <IoBagCheckOutline />,
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center justify-between p-4 rounded-sm cursor-pointer transition-all duration-500 group/nav ${
                    view === item.id
                      ? "bg-blue-600/10 border border-blue-500/20 text-blue-400 shadow-[inset_0_0_20px_rgba(0,102,255,0.05)]"
                      : "text-gray-500 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`text-lg mr-4 transition-transform duration-500 ${view === item.id ? "scale-110" : "group-hover/nav:scale-110 opacity-50"}`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-black text-[10px] tracking-[0.2em] uppercase">
                      {item.name}
                    </span>
                  </div>
                  {view === item.id && (
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(0,102,255,1)]"></div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- MAIN SECTION --- */}
        <section className="min-h-[600px]">
          {view === "profile" ? (
            <div className="bg-[#0A0A0E]/80 backdrop-blur-2xl border border-white/5 p-10 rounded-sm shadow-2xl relative overflow-hidden h-full">
              <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                <h2 className="text-xl font-black italic tracking-[0.2em] text-white flex items-center">
                  <span className="w-8 h-[2px] bg-blue-600 mr-4"></span> THUYẾT
                  MINH CHI TIẾT
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center">
                      <IoPersonOutline className="mr-2 text-blue-400" /> Tên
                      hiển thị
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/60 border border-white/10 p-4 rounded-sm text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold tracking-wide"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center">
                      <IoPhonePortraitOutline className="mr-2 text-blue-400" />{" "}
                      Hệ thống liên lạc
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/60 border border-white/10 p-4 rounded-sm text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold tracking-wide"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center">
                    <IoLocationOutline className="mr-2 text-blue-400" /> Điểm
                    nhận hàng (Địa chỉ)
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-black/60 border border-white/10 p-4 rounded-sm text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold tracking-wide"
                  />
                </div>

                <div className="pt-10 flex justify-end">
                  <button
                    type="submit"
                    className="relative group px-10 py-4 bg-blue-600 text-white font-black italic tracking-widest text-[10px] rounded-sm overflow-hidden shadow-[0_10px_30px_rgba(0,102,255,0.3)] hover:-translate-y-1 transition-all"
                  >
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                    <span className="relative z-10">CẬP NHẬT DỮ LIỆU ›</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-[#0A0A0E]/80 backdrop-blur-2xl border border-white/5 p-10 rounded-sm shadow-2xl relative overflow-hidden h-full flex flex-col">
              <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                <h2 className="text-xl font-black italic tracking-[0.2em] text-white flex items-center">
                  <span className="w-8 h-[2px] bg-red-600 mr-4 shadow-[0_0_10px_rgba(255,0,0,0.5)]"></span>{" "}
                  NHẬT KÝ ĐƠN HÀNG
                </h2>
                <div className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase">
                  Total Logs: {orders.length}
                </div>
              </div>

              {loadingOrders ? (
                <div className="flex-grow flex items-center justify-center py-20">
                  <LoadingSpinner size="lg" />
                </div>
              ) : orders.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center py-20 text-gray-600">
                  <IoBagCheckOutline className="text-6xl mb-4 opacity-10" />
                  <p className="font-black italic tracking-widest uppercase text-sm">
                    Chưa có nhiệm vụ nào được ghi nhận
                  </p>
                </div>
              ) : (
                <div className="space-y-6 flex-grow max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                  {orders.map((order) => {
                    const status = getStatusInfo(order.status);
                    return (
                      <div
                        key={order._id}
                        onClick={() => setSelectedOrder(order)}
                        className="group bg-white/[0.02] border border-white/5 p-6 rounded-sm hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-center space-x-4">
                              <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">
                                LOG-ID: {order._id.slice(-8).toUpperCase()}
                              </span>
                              <div
                                className={`flex items-center px-2 py-0.5 rounded-sm border text-[8px] font-black uppercase tracking-widest ${status.color}`}
                              >
                                {status.icon} {status.label}
                              </div>
                            </div>

                            <div className="flex items-center space-x-6">
                              <div className="flex -space-x-3">
                                {order.items.slice(0, 3).map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="w-12 h-12 bg-black border border-white/10 rounded-sm overflow-hidden shadow-xl"
                                  >
                                    <img
                                      src={
                                        item.product?.images?.[0] ||
                                        "../src/assets/logo.png"
                                      }
                                      alt="p"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                                {order.items.length > 3 && (
                                  <div className="w-12 h-12 bg-gray-900 border border-white/10 rounded-sm flex items-center justify-center text-[10px] font-black text-white">
                                    +{order.items.length - 3}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-black text-white uppercase tracking-tight line-clamp-1">
                                  {order.items[0]?.name ||
                                    "Sản phẩm không xác định"}{" "}
                                  {order.items.length > 1 &&
                                    `và ${order.items.length - 1} sản phẩm khác`}
                                </span>
                                <span className="text-[10px] text-gray-500 font-bold mt-1 tracking-wider uppercase">
                                  Ngày đặt:{" "}
                                  {order.createdAt
                                    ? new Date(
                                        order.createdAt,
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between border-l border-white/5 pl-6 min-w-[150px]">
                            <span className="text-lg font-black text-blue-500 italic drop-shadow-[0_0_10px_rgba(0,102,255,0.2)]">
                              {formatPrice(order.totalPrice)}
                            </span>

                            <div className="flex space-x-2 mt-4">
                              {order.status !== "done" &&
                                order.status !== "cancel" && (
                                  <button
                                    onClick={(e) =>
                                      handleConfirmReceived(e, order._id)
                                    }
                                    className="px-3 py-1.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-[8px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all rounded-sm flex items-center cursor-pointer"
                                  >
                                    ĐÃ NHẬN HÀNG
                                  </button>
                                )}
                              {order.status === "done" &&
                                order.items[0]?.product && (
                                  <Link
                                    to={`/product/${order.items[0].product._id}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-3 py-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[8px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded-sm flex items-center"
                                  >
                                    <IoRepeatOutline className="mr-1 text-xs" />{" "}
                                    MUA LẠI
                                  </Link>
                                )}
                              <button className="p-1.5 bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all rounded-sm cursor-pointer">
                                <IoEyeOutline className="text-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* --- ORDER DETAILS POPUP --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedOrder(null)}
          ></div>
          <div className="relative bg-[#0A0A0E] border border-white/10 w-full max-w-2xl h-[80vh] flex flex-col rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center space-x-4">
                <div className="w-1.5 h-6 bg-blue-600"></div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">
                    CHI TIẾT NHIỆM VỤ
                  </h3>
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">
                    LOG: {selectedOrder._id.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-white/5 transition-all text-gray-400 hover:text-white cursor-pointer"
              >
                <IoCloseCircleOutline className="text-2xl" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar space-y-8">
              {/* Status & Info */}
              <div className="grid grid-cols-2 gap-8 text-left">
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">
                    TRẠNG THÁI HIỆN TẠI
                  </span>
                  <div className="flex">
                    <div
                      className={`flex items-center px-3 py-1 bg-white/5 border text-[10px] font-black uppercase tracking-widest rounded-sm ${getStatusInfo(selectedOrder.status).color}`}
                    >
                      {getStatusInfo(selectedOrder.status).icon}{" "}
                      {getStatusInfo(selectedOrder.status).label}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">
                    THỜI GIAN KHỞI TẠO
                  </span>
                  <p className="text-xs font-bold text-white uppercase">
                    {selectedOrder.createdAt
                      ? new Date(selectedOrder.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3 pt-6 border-t border-white/5 text-left">
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">
                  THÔNG TIN GIAO HÀNG
                </span>
                <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                  <p className="text-xs font-bold text-gray-200 uppercase leading-relaxed">
                    {selectedOrder.shippingAddress}
                  </p>
                  <div className="flex items-center mt-3 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    <IoCardOutline className="mr-2" />{" "}
                    {selectedOrder.paymentMethod || "COD"}
                  </div>
                </div>
              </div>

              {/* Item List */}
              <div className="space-y-4 pt-6 text-left">
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em]">
                  DANH SÁCH SẢN PHẨM ({selectedOrder.items.length})
                </span>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/5 rounded-sm group hover:bg-white/[0.05] transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-black border border-white/5 p-0.5">
                          <img
                            src={
                              item.product?.images?.[0] ||
                              "../src/assets/logo.png"
                            }
                            alt="p"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[10px] font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                            {item.name || "Sản phẩm không xác định"}
                          </h4>
                          <span className="text-[9px] text-gray-500 font-bold mt-1 uppercase">
                            x{item.quantity || 0} •{" "}
                            {formatPrice(item.price || 0)}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-white italic">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Summary */}
            <div className="p-8 bg-white/[0.02] border-t border-white/5">
              <div className="flex justify-between items-end">
                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    TỔNG HỢP CHI PHÍ
                  </span>
                  <div className="flex items-center text-emerald-400 text-[10px] font-black">
                    <IoShieldCheckmarkOutline className="mr-1.5" /> SECURE
                    TRANSACTION
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-gray-500 uppercase block mb-1">
                    TOTAL PAYMENT
                  </span>
                  <span className="text-3xl font-black text-blue-500 italic drop-shadow-[0_0_15px_rgba(0,102,255,0.4)]">
                    {formatPrice(selectedOrder.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;
