import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoTrashOutline, IoChevronForwardOutline } from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { getUserByFirebaseId } from "../api/userApi";
import { getAllCarts, updateCart } from "../api/cartApi";

const CartPage = () => {
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const shipping = 50000;

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const loadCart = async (userId) => {
    setLoading(true);
    try {
      const carts = await getAllCarts();
      const cart = carts.find((c) => c.user._id === userId || c.user === userId);
      if (!cart) {
        setCartItems([]);
        setCartId(null);
        return;
      }

      setCartId(cart._id);
      setCartItems(cart.items || []);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUserCart = async (user) => {
    try {
      const response = await getUserByFirebaseId(user.uid);
      const userData = response;
      if (userData?._id) {
        await loadCart(userData._id);
      }
    } catch (error) {
      console.error("Error getting current user cart:", error);
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    if (!cartId) return;
    const nextItems = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity } : item,
    );

    setCartItems(nextItems);
    setUpdating(true);

    try {
      await updateCart(cartId, { items: nextItems });
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId) => {
    if (!cartId) return;
    const nextItems = cartItems.filter((item) => item._id !== itemId);

    setCartItems(nextItems);
    setUpdating(true);

    try {
      await updateCart(cartId, { items: nextItems });
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      fetchCurrentUserCart(user);
    });

    return () => unsubscribe();
  }, []);

  const subtotal = calculateSubtotal(cartItems);
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <span className="text-white">Đang tải giỏ hàng...</span>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative flex flex-col"
      style={{ backgroundImage: "url('../src/assets/jpGundamBG.png')" }}
    >
      {/* Dark overlay for better content contrast */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* --- NAVIGATION BAR --- */}
      <Header />

      {/* --- PAGE HEADER --- */}
      <div className="max-w-[1400px] mx-auto w-full px-10 pt-16 pb-6 relative z-20 text-center">
        <h1 className="text-4xl font-black italic tracking-wider drop-shadow-lg text-white uppercase">
          GIỎ HÀNG CỦA BẠN
        </h1>
        <p className="text-xs tracking-[0.3em] font-bold text-gray-400 mt-2 uppercase">
          {cartItems.length} sản phẩm
        </p>
      </div>

      {/* --- CART CONTENT --- */}
      <main className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 px-10 py-8 relative z-20 flex-grow">
        {/* Cart Items List */}
        <div className="space-y-6">
          <div className="bg-[#0A0A0E]/60 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[100px_1fr_120px_120px_60px] gap-4 p-4 border-b border-white/5 bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center items-center">
              <div className="text-left">Sản phẩm</div>
              <div></div>
              <div>Đơn giá</div>
              <div>Số lượng</div>
              <div></div>
            </div>

            {/* Items */}
            <div className="divide-y divide-white/5">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-gray-400">Giỏ hàng của bạn đang trống.</div>
              ) : (
                cartItems.map((item) => {
                  const product = item.product || {};
                  const name = item.name || product.name || "Unknown";
                  const scale = item.scale || product.subCategory || "";
                  const price = item.price || product.price || 0;
                  const image =
                    item.image ||
                    product.images?.[0] ||
                    "https://via.placeholder.com/150x150?text=No+Image";

                  return (
                    <div
                      key={item._id || item.id}
                      className="grid grid-cols-[100px_1fr_120px_120px_60px] gap-4 p-4 items-center group hover:bg-white/5 transition-colors"
                    >
                      {/* Image */}
                      <div className="aspect-square bg-[#111] overflow-hidden rounded-sm relative shadow-inner">
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      {/* Info */}
                      <div className="space-y-1 text-left">
                        <h4 className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                          {name}
                        </h4>
                        <span className="inline-block px-2 py-0.5 bg-blue-900/40 border border-blue-500/20 text-[9px] font-bold text-blue-300 rounded uppercase">
                          {scale}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-xs font-bold text-gray-300 text-center">
                        {formatPrice(price)}
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center justify-center">
                        <div className="flex bg-black/40 border border-white/10 rounded-sm overflow-hidden">
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item._id || item.id,
                                Math.max(1, (item.quantity || 1) - 1),
                              )
                            }
                            className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="w-8 bg-transparent text-center text-xs font-bold text-white focus:outline-none"
                          />
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item._id || item.id,
                                (item.quantity || 1) + 1,
                              )
                            }
                            className="px-3 py-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => removeItem(item._id || item.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <IoTrashOutline className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-white/5 flex justify-between items-center bg-black/20">
              <Link
                to="/"
                className="text-[11px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center"
              >
                <IoChevronForwardOutline className="w-3 h-3 mr-1 rotate-180" />
                Tiếp tục mua hàng
              </Link>
              <button className="text-[10px] font-bold text-gray-400 hover:text-white uppercase transition-colors">
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside>
          <div className="bg-[#0A0A0E]/60 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_15px_rgba(0,102,255,0.5)]"></div>

            <h3 className="font-black italic text-sm tracking-widest text-white mb-6 border-b border-white/5 pb-4">
              THÔNG TIN ĐƠN HÀNG
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                <span className="text-gray-200">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>Phí giao hàng:</span>
                <span className="text-gray-200">{formatPrice(shipping)}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Tổng cộng:
                </span>
                <div className="text-right">
                  <span className="block text-2xl font-black text-white">
                    {formatPrice(total)}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">
                    (Đã bao gồm VAT nếu có)
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full relative group overflow-hidden bg-blue-600 text-white font-black italic tracking-widest py-4 text-sm rounded-sm shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] transition-all">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 w-full flex items-center justify-center">
                TIẾN HÀNH THANH TOÁN{" "}
                <IoChevronForwardOutline className="ml-2 w-4 h-4" />
              </span>
            </button>
          </div>
        </aside>
      </main>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
};

export default CartPage;
