import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { getUserByFirebaseId } from "../api/userApi";
import { getAllCarts, deleteCart } from "../api/cartApi";
import { createOrder } from "../api/orderApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import {
  IoChevronForwardOutline,
  IoShieldCheckmarkOutline,
  IoLocationOutline,
  IoCardOutline,
  IoPhonePortraitOutline,
  IoPersonOutline,
} from "react-icons/io5";

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "COD",
  });

  const shipping = 50000;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (!currUser) {
        navigate("/login");
        return;
      }
      setUser(currUser);

      try {
        const uData = await getUserByFirebaseId(currUser.uid);
        setUserData(uData);
        setFormData({
          name: uData.name || "",
          phone: uData.phone || "",
          address: uData.address || "",
          paymentMethod: "COD",
        });

        const carts = await getAllCarts();
        const userId = uData._id;
        const cart = carts.find((c) => (c.user?._id || c.user) === userId);

        if (cart) {
          setCartId(cart._id);
          setCartItems(cart.items || []);
          if (cart.items.length === 0) {
            navigate("/cart");
          }
        } else {
          navigate("/cart");
        }
      } catch (err) {
        console.error("Checkout initialization error:", err);
        toast.error("Không thể tải thông tin thanh toán.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        user: userData._id,
        items: cartItems.map((item) => ({
          product: item.product?._id || item.product,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: total,
        shippingAddress: `${formData.name} - ${formData.phone} - ${formData.address}`,
        paymentMethod: formData.paymentMethod,
        status: "pending",
      };

      await createOrder(orderData);

      // Clear cart
      if (cartId) {
        await deleteCart(cartId);
      }

      toast.success("Đặt hàng thành công!");
      navigate("/profile");
    } catch (err) {
      console.error("Order creation error:", err);
      const errMsg =
        err.response?.data?.message || err.message || "Đặt hàng thất bại.";
      toast.error(`Đặt hàng thất bại: ${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-full bg-[#050B14] min-h-screen relative flex flex-col">
      <Header />
      <main className="container mx-auto px-4 md:px-4 py-8 md:py-12 max-w-[1200px] relative z-10 flex-1">
        <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-widest text-white mb-8 md:mb-12 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Xác nhận thanh toán
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 md:gap-12 text-left">
          {/* Left: Info Sections */}
          <div className="space-y-8">
            {/* Shipping Info */}
            <section className="bg-white/5 border border-white/10 rounded-sm p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_10px_rgba(0,102,255,0.5)]"></div>
              <h2 className="flex items-center text-sm font-black uppercase tracking-widest text-white mb-8">
                <IoLocationOutline className="mr-3 text-blue-500 scale-125" />{" "}
                Thông tin nhận hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center">
                    <IoPersonOutline className="mr-2" /> Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 p-3 text-sm text-white focus:border-blue-500 outline-none transition-all rounded-sm"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center">
                    <IoPhonePortraitOutline className="mr-2" /> Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 p-3 text-sm text-white focus:border-blue-500 outline-none transition-all rounded-sm"
                    placeholder="0987xxxxxx"
                  />
                </div>
                <div className="space-y-2 md:col-span-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Địa chỉ giao hàng
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full bg-black/40 border border-white/10 p-3 text-sm text-white focus:border-blue-500 outline-none transition-all rounded-sm resize-none"
                    placeholder="Số nhà, Tên đường, Quận/Huyện, Tỉnh/Thành phố"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white/5 border border-white/10 rounded-sm p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_10px_rgba(0,102,255,0.5)]"></div>
              <h2 className="flex items-center text-sm font-black uppercase tracking-widest text-white mb-8">
                <IoCardOutline className="mr-3 text-blue-500 scale-125" />{" "}
                Phương thức thanh toán
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`relative p-4 border rounded-sm cursor-pointer transition-all ${formData.paymentMethod === "COD" ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-black/20 hover:bg-white/5"}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white uppercase tracking-widest">
                      Thanh toán (COD)
                    </span>
                    {formData.paymentMethod === "COD" && (
                      <IoShieldCheckmarkOutline className="text-blue-500 text-xl" />
                    )}
                  </div>
                </label>

                <div className="relative p-4 border border-white/5 bg-black/10 rounded-sm grayscale opacity-50 cursor-not-allowed overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white uppercase tracking-widest">
                      Thanh toán ngay
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] bg-blue-600 px-2 py-1 rounded-sm text-white ml-40">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Summary */}
          <aside className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-sm p-6 backdrop-blur-xl relative">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 pb-4 border-b border-white/5">
                Sản phẩm của bạn
              </h3>
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-16 h-16 bg-black rounded-sm border border-white/5 overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all"
                      />
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden flex-1">
                      <h4 className="text-[11px] font-bold text-white uppercase truncate">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                          x{item.quantity}
                        </span>
                        <span className="text-[11px] font-black text-white uppercase">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase">
                  <span>Tạm tính</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase">
                  <span>Phí giao hàng</span>
                  <span className="text-white">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-xs font-black uppercase tracking-widest text-white">
                    Tổng thanh toán
                  </span>
                  <span className="text-2xl font-black text-blue-500 italic drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="w-full mt-8 bg-blue-600 text-white font-black italic uppercase tracking-[0.2em] py-4 text-xs rounded-sm shadow-[0_10px_30px_rgba(0,102,255,0.3)] hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <span>Xác nhận đặt hàng</span>
                    <IoChevronForwardOutline className="text-lg" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center leading-relaxed px-4">
              Bằng việc đặt hàng, bạn đồng ý với{" "}
              <Link to="#" className="text-blue-500 underline">
                Điều khoản dịch vụ
              </Link>{" "}
              của GundamShop.
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
