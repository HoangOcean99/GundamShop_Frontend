import { useEffect } from "react";
import { useState } from "react";
import { IoCartOutline, IoHeartOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { getUserByFirebaseId } from "../api/userApi";

const Header = () => {
    const [avatar, setAvatar] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
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
    return (
        <nav className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-[#060608]/10 backdrop-blur-md sticky top-0 z-50">
            <Link to="/" className="flex items-center space-x-4 cursor-pointer">
                <img
                    src="../src/assets/logo.png"
                    alt="Logo"
                    className="w-12 h-12 object-contain mix-blend-screen"
                />
                <span className="font-black italic text-3xl tracking-tighter drop-shadow-lg text-white">
                    GUNDAM STORE
                </span>
            </Link>

            <div className="hidden md:flex space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                {[
                    { name: "Trang chủ", path: "/" },
                    { name: "Sản phẩm", path: "#" },
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
                <div className="flex items-center bg-white/5 hover:bg-white/10 transition-colors px-4 py-1.5 rounded-full border border-white/10 focus-within:border-white/30 focus-within:bg-white/10">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-[11px] focus:outline-none w-32 placeholder-gray-500 text-gray-200"
                    />
                    <IoSearchOutline className="text-gray-400 w-4 h-4 ml-2 cursor-pointer hover:text-white transition" />
                </div>

                <div className="flex items-center space-x-4 text-gray-400">
                    <div className="relative cursor-pointer hover:text-white transition" onClick={() => navigate('/cart')}>
                        <IoCartOutline
                            className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-red-600 w-2.5 h-2.5 rounded-full border border-black"></span>
                    </div>
                    <div className="relative">
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