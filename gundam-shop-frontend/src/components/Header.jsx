import { useEffect, useState, useRef } from "react";
import { IoCartOutline, IoHeartOutline, IoPersonOutline, IoSearchOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { getUserByFirebaseId } from "../api/userApi";
import { getAllProducts } from "../api/productApi";

const Header = () => {
    const [avatar, setAvatar] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                fetchAvatar();
                await fetchData(user.uid);
            } else {
                setAvatar(null);
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchAvatar = () => {
        const avatarTemp = localStorage.getItem('avatar');
        setAvatar(avatarTemp);
    };

    const fetchData = async (uid) => {
        try {
            const response = await getUserByFirebaseId(uid);
            const userData = response;
            console.log('ress', response)
            setIsAdmin(userData.role === 'admin');
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsAdmin(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setAvatar(null);
            setCurrentUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Search Logic
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const data = await getAllProducts();
                setAllProducts(data);
            } catch (error) {
                console.error("Failed to load search data:", error);
            }
        };
        fetchInitial();
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults(allProducts.slice(0, 5));
            return;
        }

        const filtered = allProducts
            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 5);
        setSearchResults(filtered);
    }, [searchQuery, allProducts]);

    const formatPrice = (price) => {
        if (price == null) return "";
        return price.toLocaleString("vi-VN") + "đ";
    };
    return (
        <nav className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-[#060608]/5 backdrop-blur-md sticky top-0 z-50">
            <Link to="/" className="flex items-center space-x-4 cursor-pointer">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-20 h-10 object-contain mix-blend-screen"
                />
                <span className="font-black italic text-3xl tracking-tighter drop-shadow-lg text-white">
                    GUNDAM STORE
                </span>
            </Link>

            <div className="hidden md:flex space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                {[
                    { name: "Trang chủ", path: "/" },
                    { name: "Sản phẩm", path: "/products" },
                    { name: "Tin tức", path: "#" },
                    { name: "Hướng dẫn", path: "#" },
                    { name: "Liên hệ", path: "#" },
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="relative pb-1 transition-all duration-300 group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:from-[50%] hover:to-red-500 hover:to-[50%] drop-shadow-sm"
                    >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 from-[50%] to-red-500 to-[50%] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </div>

            <div className="flex items-center space-x-6">
                <div 
                    ref={searchRef}
                    className="flex items-center bg-white/5 hover:bg-white/10 transition-colors px-4 py-1.5 rounded-full border border-white/10 focus-within:border-white/30 focus-within:bg-white/10 relative"
                >
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSearchDropdown(true);
                        }}
                        onFocus={() => setShowSearchDropdown(true)}
                        className="bg-transparent text-[11px] focus:outline-none w-32 placeholder-gray-500 text-gray-200"
                    />
                    <IoSearchOutline className="text-gray-400 w-4 h-4 ml-2 cursor-pointer hover:text-white transition" />

                    {/* Search Results Dropdown */}
                    {showSearchDropdown && (
                        <div className="absolute top-full right-0 mt-3 w-72 bg-[#0A0A0E]/95 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl overflow-hidden z-[100]">
                            <div className="p-2 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-2 italic">Kết quả tìm kiếm</span>
                                {isSearching && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-2"></div>}
                            </div>
                            
                            <div className="max-h-80 overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    searchResults.map((p) => (
                                        <div
                                            key={p._id}
                                            onClick={() => {
                                                navigate(`/product/${p._id}`);
                                                setShowSearchDropdown(false);
                                                setSearchQuery("");
                                            }}
                                            className="flex items-center p-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0 group"
                                        >
                                            <div className="w-10 h-10 bg-white/5 rounded-sm p-1 mr-3 flex-shrink-0">
                                                <img 
                                                    src={p.images?.[0] || "https://via.placeholder.com/50"} 
                                                    alt={p.name} 
                                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <h4 className="text-[10px] font-bold text-gray-200 truncate group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                                    {p.name}
                                                </h4>
                                                <p className="text-[9px] font-black text-white italic tracking-widest mt-0.5">
                                                    {formatPrice(p.price)}
                                                </p>
                                            </div>
                                            <IoChevronForwardOutline className="w-3 h-3 text-gray-600 group-hover:text-blue-500 transition-colors ml-2" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center">
                                        <p className="text-[10px] text-gray-500 italic">Không tìm thấy sản phẩm phù hợp.</p>
                                    </div>
                                )}
                            </div>
                            
                            {searchResults.length > 0 && (
                                <Link 
                                    to="/products"
                                    onClick={() => setShowSearchDropdown(false)}
                                    className="block p-3 text-center bg-blue-600/10 hover:bg-blue-600/20 text-[9px] font-black text-blue-400 uppercase tracking-widest transition-colors border-t border-white/5"
                                >
                                    Xem tất cả sản phẩm
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-4 text-gray-400">
                    <div className="relative cursor-pointer hover:text-white transition" onClick={() => navigate('/cart')}>
                        <IoCartOutline
                            className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-red-600 w-2.5 h-2.5 rounded-full border border-black"></span>
                    </div>
                    <div className="relative z-999">
                        {avatar ? (
                            <div>
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    onClick={() => setIsShow(!isShow)}
                                    className="w-8 h-8 rounded-full cursor-pointer object-cover"
                                />

                                {isShow && (
                                    <div className="absolute right-0 mt-2 w-40 bg-gray-800/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg">
                                        <div className="px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors">
                                            <Link to="/profile" className="text-white text-sm">Xem hồ sơ</Link>
                                        </div>
                                        {isAdmin && (
                                            <div className="px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors">
                                                <Link to="/admin" className="text-white text-sm">Trang Admin</Link>
                                            </div>
                                        )}
                                        <div
                                            onClick={handleLogout}
                                            className="px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors text-white text-sm"
                                        >
                                            Đăng xuất
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">
                                <IoPersonOutline className="w-6 h-6 cursor-pointer" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Header;