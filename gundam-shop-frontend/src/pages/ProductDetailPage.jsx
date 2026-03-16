import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoChevronBackOutline, IoCartOutline, IoBagCheckOutline, IoStar, IoCloseOutline, IoAddOutline, IoRemoveOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProductById } from "../api/productApi";
import { getAllCarts, createCart, updateCart } from "../api/cartApi";
import { getUserByFirebaseId } from "../api/userApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const BuyNowModal = ({ product, isOpen, onClose, onConfirm, accentColor, formatPrice }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#0A0A0E] border border-white/10 w-full max-w-md p-6 rounded-sm shadow-2xl overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1 ${accentColor === 'blue' ? 'bg-blue-600' : 'bg-red-600'}`}></div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer">
          <IoCloseOutline size={24} />
        </button>

        <h3 className="text-xl font-black italic uppercase tracking-wider text-white mb-6">Xác nhận mua hàng</h3>
        
        <div className="flex gap-4 mb-8">
          <div className="w-24 h-24 bg-black/40 border border-white/5 rounded-sm overflow-hidden shrink-0">
            <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-contain p-2" />
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="text-sm font-bold text-white uppercase line-clamp-2 mb-1">{product.name}</h4>
            <span className={`text-[10px] font-black uppercase tracking-widest ${accentColor === 'blue' ? 'text-blue-400' : 'text-red-400'} mb-2`}>{product.subCategory} / {product.scale}</span>
            <span className="text-lg font-black text-white italic">{formatPrice(product.price)}</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Số lượng sản phẩm</label>
          <div className="flex items-center justify-between bg-black/40 border border-white/10 p-2 rounded-sm">
            <button 
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <IoRemoveOutline />
            </button>
            <span className="text-lg font-black text-white">{quantity}</span>
            <button 
              onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <IoAddOutline />
            </button>
          </div>
          {quantity >= product.stock && (
            <p className="text-[10px] font-bold text-red-500 uppercase text-center mt-2">Đã đạt giới hạn tồn kho ({product.stock})</p>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:bg-white/5 transition-all cursor-pointer">Hủy</button>
          <button 
             onClick={handleConfirm}
             className={`flex-1 py-3 ${accentColor === 'blue' ? 'bg-blue-600 shadow-[0_0_20px_rgba(0,102,255,0.3)]' : 'bg-red-600 shadow-[0_0_20px_rgba(255,51,0,0.3)]'} text-white text-[10px] font-black uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all cursor-pointer`}
          >
            Vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [id]);

  const formatPrice = (price) => {
    if (price == null) return "Liên hệ";
    return price.toLocaleString("vi-VN") + "đ";
  };

  const handleAddToCart = async (qty = 1, showToast = true) => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để thực hiện tác vụ!");
      navigate("/login");
      return false;
    }

    try {
      const userRes = await getUserByFirebaseId(currentUser.uid);
      const userId = userRes._id;
      
      const carts = await getAllCarts();
      let userCart = carts.find(c => (c.user?._id === userId || c.user === userId));
      
      const productToAdd = {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: product.images?.[0],
        scale: product.subCategory
      };

      if (!userCart) {
        await createCart({ user: userId, items: [productToAdd] });
      } else {
        const itemIndex = userCart.items.findIndex(item => (item.product?._id || item.product) === product._id);
        if (itemIndex > -1) {
          const newQty = userCart.items[itemIndex].quantity + qty;
          if (newQty > product.stock) {
            toast.error(`Rất tiếc, số lượng trong giỏ (${userCart.items[itemIndex].quantity}) cộng thêm (${qty}) đã vượt quá tồn kho (${product.stock})!`);
            return false;
          }
          userCart.items[itemIndex].quantity = newQty;
        } else {
          userCart.items.push(productToAdd);
        }
        await updateCart(userCart._id, { items: userCart.items });
      }
      if (showToast) toast.success("Đã thêm vào giỏ hàng!");
      return true;
    } catch (err) {
      console.error("Cart error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Lỗi không xác định";
      toast.error(`Có lỗi xảy ra khi cập nhật giỏ hàng: ${errorMessage}`);
      return false;
    }
  };

  const handleBuyNowConfirm = async (qty) => {
    const success = await handleAddToCart(qty, false);
    if (success) {
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 rounded-sm font-bold uppercase text-xs cursor-pointer"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const isJapan = product.mainCategory === "Gundam Nhật Bản";
  const bgImage = isJapan
    ? "/src/assets/jpGundamBG.png"
    : "/src/assets/cnGundamBG.png";
  const accentColor = isJapan ? "blue" : "red";

  return (
    <div
      className="w-full min-h-screen bg-fixed bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <Header />

      <main className="relative z-10 flex-1 container mx-auto px-4 md:px-4 py-8 md:py-12 max-w-[1200px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8 group cursor-pointer"
        >
          <IoChevronBackOutline className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Quay lại danh sách</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-6 md:gap-12 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-sm p-4 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Dynamic Glow Ornament */}
          <div className={`absolute top-0 right-0 w-64 h-64 ${accentColor === 'blue' ? 'bg-blue-600/10' : 'bg-red-600/10'} blur-[100px] -z-10`}></div>
          
          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className={`aspect-square bg-black/60 border border-white/5 rounded-sm overflow-hidden relative group shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center`}>
              <img
                src={product.images?.[selectedImage] || "https://via.placeholder.com/600x600"}
                alt={product.name}
                className="max-w-full max-h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none`}></div>
            </div>
            
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 flex-shrink-0 bg-black/40 border ${
                      selectedImage === idx ? `border-${accentColor}-500 shadow-[0_0_10px_rgba(${isJapan ? '0,102,255' : '255,51,0'},0.3)]` : 'border-white/10'
                    } rounded-sm overflow-hidden transition-all cursor-pointer`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-gray-400">
                <span className={accentColor === 'blue' ? 'text-blue-400' : 'text-red-400'}>{product.brand}</span>
                <span>/</span>
                <span>{product.subCategory}</span>
                <span>/</span>
                <span>{product.scale}</span>
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-white italic tracking-tight uppercase leading-none mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                {product.name}
              </h1>
              <div className="flex items-center space-x-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <IoStar key={s} className="text-yellow-500 w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-[10px] text-gray-500 font-bold ml-2 uppercase tracking-widest">(12 Đánh giá)</span>
              </div>
              <div className={`text-2xl font-black text-white bg-white/5 inline-block px-4 py-2 border-l-4 ${accentColor === 'blue' ? 'border-blue-500' : 'border-red-500'} italic tracking-widest`}>
                {formatPrice(product.price)}
              </div>
            </div>

            <div className="space-y-6 flex-1 py-8">
              <div>
                <h3 className={`text-[11px] font-black ${accentColor === 'blue' ? 'text-blue-400' : 'text-red-400'} uppercase tracking-widest mb-3 flex items-center`}>
                  Mô tả sản phẩm <div className={`ml-4 flex-1 h-[1px] bg-white/5`}></div>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-black/20 p-3 border border-white/5 rounded-sm">
                  <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 text-center">Mã sản phẩm</span>
                  <span className="text-white font-black italic text-xs uppercase tracking-wider block text-center">{product.code || "N/A"}</span>
                </div>
                <div className="bg-black/20 p-3 border border-white/5 rounded-sm">
                  <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 text-center">Tình trạng</span>
                  <span className={`font-black italic text-xs uppercase tracking-wider block text-center ${product.stock > 0 ? 'text-green-400' : 'text-red-500 shadow-[0_0_10px_rgba(255,0,0,0.2)]'}`}>
                    {product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              {product.stock > 0 ? (
                <>
                  <button 
                    onClick={() => handleAddToCart()}
                    className={`flex-1 flex items-center justify-center space-x-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest py-4 rounded-sm transition-all cursor-pointer`}
                  >
                    <IoCartOutline className="text-xl" />
                    <span>Thêm vào giỏ</span>
                  </button>
                  <button 
                    onClick={() => setIsBuyNowOpen(true)}
                    className={`flex-1 flex items-center justify-center space-x-3 ${accentColor === 'blue' ? 'bg-blue-600 shadow-[0_0_20px_rgba(0,102,255,0.3)]' : 'bg-red-600 shadow-[0_0_20px_rgba(255,51,0,0.3)]'} text-white text-xs font-black uppercase tracking-widest py-4 rounded-sm transition-all hover:brightness-110 active:scale-95 cursor-pointer`}
                  >
                    <IoBagCheckOutline className="text-xl" />
                    <span>Mua ngay</span>
                  </button>
                </>
              ) : (
                <button 
                  className="w-full flex items-center justify-center space-x-3 bg-red-900/20 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest py-4 rounded-sm transition-all cursor-pointer"
                  onClick={() => toast("Vui lòng liên hệ với chúng tôi để đặt trước!", { icon: '📞' })}
                >
                  <IoChatbubbleEllipsesOutline className="text-xl" />
                  <span>Liên hệ chúng tôi</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <BuyNowModal 
        product={product} 
        isOpen={isBuyNowOpen} 
        onClose={() => setIsBuyNowOpen(false)} 
        onConfirm={handleBuyNowConfirm}
        accentColor={accentColor}
        formatPrice={formatPrice}
      />

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
