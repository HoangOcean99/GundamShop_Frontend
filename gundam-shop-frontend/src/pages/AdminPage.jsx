import React, { useState, useEffect, useMemo } from "react";
import {
  IoSearchOutline,
  IoSettingsOutline,
  IoPricetagOutline,
  IoAddCircleOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoPeopleOutline,
  IoDocumentTextOutline,
  IoCloseOutline,
} from "react-icons/io5";
import AdminHeader from "../components/AdminHeader";
import { getAllUsers, createUser, updateUser, deleteUser } from "../api/userApi";
import { getAllOrders, updateOrder } from "../api/orderApi";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../api/productApi";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products-japan");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    brand: "Bandai",
    mainCategory: "Gundam Nhật Bản",
    subCategory: "HG",
    scale: "",
    price: "",
    stock: "",
    images: [""],
    description: "",
  });

  // User modal states
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  // Order modal states
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFormData, setOrderFormData] = useState({
    status: "pending",
  });

  const isProductsTab = activeTab.startsWith("products-");
  const productCategory = activeTab === "products-japan" ? "Gundam Nhật Bản" : "Gundam Trung Quốc";

  // Sort products by stock ascending
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => (a.stock || 0) - (b.stock || 0));
  }, [products]);

  // Subcategory options based on mainCategory
  const subCategoryOptions = useMemo(() => {
    if (formData.mainCategory === "Gundam Nhật Bản") {
      return ["HG", "RG", "MG", "PG", "SD"];
    } else {
      return ["1/144", "1/100", "1/60", "Original Mecha"];
    }
  }, [formData.mainCategory]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (isProductsTab) {
          const productsData = await getAllProducts({ mainCategory: productCategory });
          setProducts(productsData);
        } else if (activeTab === "users") {
          const usersData = await getAllUsers();
          setUsers(usersData);
        } else if (activeTab === "orders") {
          const ordersData = await getAllOrders();
          setOrders(ordersData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab, isProductsTab, productCategory]);

  const handleStockChange = (id, newStock) => {
    setProducts(
      products.map((p) =>
        p._id === id ? { ...p, stock: parseInt(newStock) || 0 } : p
      )
    );
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      code: product.code || "",
      brand: product.brand || "Bandai",
      mainCategory: product.mainCategory || "Gundam Nhật Bản",
      subCategory: product.subCategory || "HG",
      scale: product.scale || "",
      price: product.price || "",
      stock: product.stock || "",
      images: product.images || [""],
      description: product.description || "",
    });
    setShowEditModal(true);
  };

  const handleAddProduct = () => {
    setFormData({
      name: "",
      code: "",
      brand: "Bandai",
      mainCategory: productCategory,
      subCategory: productCategory === "Gundam Nhật Bản" ? "HG" : "1/144",
      scale: "",
      price: "",
      stock: "",
      images: [""],
      description: "",
    });
    setShowAddModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        images: formData.images.filter(img => img.trim() !== ""),
      };

      if (showAddModal) {
        await createProduct(data);
        setShowAddModal(false);
        // Reload products
        const productsData = await getAllProducts({ mainCategory: productCategory });
        setProducts(productsData);
      } else if (showEditModal && selectedProduct) {
        await updateProduct(selectedProduct._id, data);
        setShowEditModal(false);
        // Reload products
        const productsData = await getAllProducts({ mainCategory: productCategory });
        setProducts(productsData);
      }
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Lỗi khi lưu sản phẩm: " + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Lỗi khi xóa sản phẩm: " + err.message);
      }
    }
  };

  // User handlers
  const handleAddUser = () => {
    setUserFormData({
      name: "",
      email: "",
      role: "user",
    });
    setShowAddUserModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
    });
    setShowEditUserModal(true);
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (showAddUserModal) {
        await createUser(userFormData);
        setShowAddUserModal(false);
        // Reload users
        const usersData = await getAllUsers();
        setUsers(usersData);
      } else if (showEditUserModal && selectedUser) {
        await updateUser(selectedUser._id, userFormData);
        setShowEditUserModal(false);
        // Reload users
        const usersData = await getAllUsers();
        setUsers(usersData);
      }
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Lỗi khi lưu người dùng: " + err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Lỗi khi xóa người dùng: " + err.message);
      }
    }
  };

  // Order handlers
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOrderFormData({
      status: order.status || "pending",
    });
    setShowEditOrderModal(true);
  };

  const handleOrderFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (showEditOrderModal && selectedOrder) {
        await updateOrder(selectedOrder._id, orderFormData);
        setShowEditOrderModal(false);
        // Reload orders
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      }
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Lỗi khi cập nhật đơn hàng: " + err.message);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mainCategory") {
      setFormData({
        ...formData,
        mainCategory: value,
        subCategory: value === "Gundam Nhật Bản" ? "HG" : "1/144",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (isProductsTab) {
          const productsData = await getAllProducts({ mainCategory: productCategory });
          setProducts(productsData);
        } else if (activeTab === "users") {
          const usersData = await getAllUsers();
          setUsers(usersData);
        } else if (activeTab === "orders") {
          const ordersData = await getAllOrders();
          setOrders(ordersData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab, isProductsTab, productCategory]);

  return (
    <div
      className="w-full bg-fixed bg-cover bg-center min-h-screen relative flex flex-col font-sans"
      style={{ backgroundImage: "url('../src/assets/jpGundamBG.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 z-0 backdrop-blur-sm"></div>

      {/* --- ADMIN TOP NAVBAR --- */}
      <AdminHeader />

      {/* --- ADMIN MAIN CONTENT --- */}
      <main className="flex-grow w-full grid grid-cols-1 lg:grid-cols-[250px_1fr] relative z-20">

        {/* Admin Sidebar */}
        <aside className="hidden lg:flex bg-[#0A0A0E]/80 backdrop-blur-xl border-r border-white/10 p-6 flex-col h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="space-y-2 flex-grow">
            <div className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-4 ml-2">
              QUẢN QUẢN LÝ
            </div>

            <button
              onClick={() => setActiveTab("products-japan")}
              className={`w-full flex items-center justify-between p-3 rounded-sm transition-all ${activeTab === "products-japan"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[inset_0_0_15px_rgba(0,102,255,0.2)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                } cursor-pointer`}
            >
              <div className="flex items-center font-bold text-xs tracking-widest uppercase">
                <IoPricetagOutline className="w-4 h-4 mr-3" />
                Gundam Nhật Bản
              </div>
            </button>

            <button
              onClick={() => setActiveTab("products-china")}
              className={`w-full flex items-center justify-between p-3 rounded-sm transition-all ${activeTab === "products-china"
                  ? "bg-red-600/20 text-red-400 border border-red-500/30 shadow-[inset_0_0_15px_rgba(255,50,0,0.2)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                } cursor-pointer`}
            >
              <div className="flex items-center font-bold text-xs tracking-widest uppercase">
                <IoPricetagOutline className="w-4 h-4 mr-3" />
                Gundam Trung Quốc
              </div>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center justify-between p-3 rounded-sm transition-all ${activeTab === "users"
                  ? "bg-green-600/20 text-green-400 border border-green-500/30 shadow-[inset_0_0_15px_rgba(0,255,0,0.2)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                } cursor-pointer`}
            >
              <div className="flex items-center font-bold text-xs tracking-widest uppercase">
                <IoPeopleOutline className="w-4 h-4 mr-3" />
                Quản lý Users
              </div>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between p-3 rounded-sm transition-all ${activeTab === "orders"
                  ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[inset_0_0_15px_rgba(128,0,128,0.2)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                } cursor-pointer`}
            >
              <div className="flex items-center font-bold text-xs tracking-widest uppercase">
                <IoDocumentTextOutline className="w-4 h-4 mr-3" />
                Quản lý Đơn hàng
              </div>
            </button>

            <div className="my-6 border-b border-white/5"></div>

          </div>
        </aside>

        {/* Admin Workspace */}
        <div className="p-4 md:p-10 h-[calc(100vh-73px)] overflow-y-auto">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 md:mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className={`text-2xl md:text-3xl font-black italic tracking-wider uppercase drop-shadow-lg ${activeTab === 'products-japan' ? 'text-blue-400' :
                  activeTab === 'products-china' ? 'text-red-500' :
                    activeTab === 'users' ? 'text-green-400' : 'text-purple-400'
                }`}>
                {activeTab === "products-japan" ? "QUẢN LÝ GUNDAM NHẬT BẢN" :
                  activeTab === "products-china" ? "QUẢN LÝ GUNDAM TRUNG QUỐC" :
                    activeTab === "users" ? "QUẢN LÝ NGƯỜI DÙNG" : "QUẢN LÝ ĐƠN HÀNG"}
              </h1>
              <p className="text-xs tracking-[0.2em] font-bold text-gray-400 mt-2 uppercase">
                {loading ? "Đang tải..." :
                  error ? "Lỗi tải dữ liệu" :
                    isProductsTab ? `${products.length} sản phẩm đang hiển thị` :
                      activeTab === "users" ? `${users.length} người dùng` : `${orders.length} đơn hàng`}
              </p>
            </div>

            {isProductsTab && (
              <button
                onClick={handleAddProduct}
                className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-2.5 rounded-sm font-black text-xs uppercase tracking-widest border transition-all shadow-lg text-white ${activeTab === 'products-japan'
                    ? 'bg-blue-600/80 border-blue-400 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(0,102,255,0.6)]'
                    : 'bg-red-600/80 border-red-400 hover:bg-red-500 hover:shadow-[0_0_20px_rgba(255,50,0,0.6)]'} cursor-pointer`}
              >
                <IoAddCircleOutline className="w-4 md:w-5 h-4 md:h-5" />
                <span>Thêm sản phẩm</span>
              </button>
            )}

            {activeTab === "users" && (
              <button
                onClick={handleAddUser}
                className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-2.5 rounded-sm font-black text-xs uppercase tracking-widest border transition-all shadow-lg text-white bg-green-600/80 border-green-400 hover:bg-green-500 hover:shadow-[0_0_20px_rgba(0,255,0,0.6)] cursor-pointer"
              >
                <IoAddCircleOutline className="w-4 md:w-5 h-4 md:h-5" />
                <span>Thêm người dùng</span>
              </button>
            )}

            {activeTab === "orders" && (
              <div className="text-xs text-gray-400 font-bold tracking-widest uppercase text-center md:text-right">
                Chỉ có thể chỉnh sửa trạng thái đơn hàng
              </div>
            )}
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
            {isProductsTab ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <th className="p-2 md:p-4 w-20 text-center">ID</th>
                      <th className="p-2 md:p-4">Tên Sản Phẩm</th>
                      <th className="p-2 md:p-4 w-32 text-center">Tỷ Lệ</th>
                      <th className="p-2 md:p-4 w-48 text-right">Giá (VNĐ)</th>
                      <th className="p-2 md:p-4 w-40 text-center">Tồn Kho</th>
                      <th className="p-2 md:p-4 w-32 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sortedProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-2 md:p-4 text-xs font-bold text-gray-500 text-center">#{product.code || product._id.slice(-6)}</td>
                        <td className="p-2 md:p-4 text-sm font-bold text-white tracking-widest">
                          {product.name}
                        </td>
                        <td className="p-2 md:p-4 text-center">
                          <span className={`inline-block px-2 py-1 text-[9px] font-bold rounded uppercase border ${activeTab === 'products-japan' ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' : 'bg-red-900/30 text-red-300 border-red-500/30'
                            }`}>
                            {product.scale || product.subCategory}
                          </span>
                        </td>
                        <td className="p-2 md:p-4 text-sm font-bold text-gray-300 text-right">
                          {formatPrice(product.price)}
                        </td>
                        <td className="p-2 md:p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <input
                              type="number"
                              value={product.stock}
                              onChange={(e) => handleStockChange(product._id, e.target.value)}
                              className={`w-16 bg-black/60 border ${product.stock <= 5 ? 'border-amber-500/50 text-amber-400 focus:border-amber-400' : 'border-white/10 text-white focus:border-blue-400'} px-2 py-1 rounded-sm text-center text-xs font-bold focus:outline-none focus:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-colors`}
                              min="0"
                            />
                            {product.stock <= 5 && product.stock > 0 && <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest absolute -mt-8 bg-amber-500/10 px-1 rounded border border-amber-500/20 backdrop-blur-sm">Sắp hết</span>}
                            {product.stock === 0 && <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest absolute -mt-8 bg-red-500/10 px-1 rounded border border-red-500/20 backdrop-blur-sm">Hết hàng</span>}
                          </div>
                        </td>
                        <td className="p-2 md:p-4">
                          <div className="flex justify-center items-center space-x-3">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-400/10 rounded cursor-pointer"
                            >
                              <IoPencilOutline className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <IoTrashOutline className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : activeTab === "users" ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <th className="p-2 md:p-4 w-20 text-center">ID</th>
                      <th className="p-2 md:p-4">Tên</th>
                      <th className="p-2 md:p-4">Email</th>
                      <th className="p-2 md:p-4 w-32 text-center">Vai trò</th>
                      <th className="p-2 md:p-4 w-40 text-center">Ngày tạo</th>
                      <th className="p-2 md:p-4 w-32 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-2 md:p-4 text-xs font-bold text-gray-500 text-center">#{user._id.slice(-6)}</td>
                        <td className="p-2 md:p-4 text-sm font-bold text-white tracking-widest">
                          {user.name || "N/A"}
                        </td>
                        <td className="p-2 md:p-4 text-sm font-bold text-gray-300">
                          {user.email || "N/A"}
                        </td>
                        <td className="p-2 md:p-4 text-center">
                          <span className={`inline-block px-2 py-1 text-[9px] font-bold rounded uppercase border ${user.role === 'admin' ? 'bg-red-900/30 text-red-300 border-red-500/30' : 'bg-green-900/30 text-green-300 border-green-500/30'
                            }`}>
                            {user.role || "user"}
                          </span>
                        </td>
                        <td className="p-2 md:p-4 text-sm font-bold text-gray-300 text-center">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="p-2 md:p-4">
                          <div className="flex justify-center items-center space-x-3">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-400/10 rounded cursor-pointer"
                            >
                              <IoPencilOutline className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-500/10 rounded cursor-pointer"
                            >
                              <IoTrashOutline className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <th className="p-2 md:p-4 w-20 text-center">ID</th>
                      <th className="p-2 md:p-4">Khách hàng</th>
                      <th className="p-2 md:p-4 w-48 text-right">Tổng tiền</th>
                      <th className="p-2 md:p-4 w-32 text-center">Trạng thái</th>
                      <th className="p-2 md:p-4 w-40 text-center">Ngày đặt</th>
                      <th className="p-2 md:p-4 w-32 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-2 md:p-4 text-xs font-bold text-gray-500 text-center">#{order._id.slice(-6)}</td>
                        <td className="p-2 md:p-4 text-sm font-bold text-white tracking-widest">
                          {order.user?.name || "N/A"}
                        </td>
                        <td className="p-2 md:p-4 text-sm font-bold text-gray-300 text-right">
                          {formatPrice(order.totalPrice)}
                        </td>
                        <td className="p-2 md:p-4 text-center">
                          <span className={`inline-block px-2 py-1 text-[9px] font-bold rounded uppercase border ${order.status === 'done' ? 'bg-green-900/30 text-green-300 border-green-500/30' :
                              order.status === 'pending' ? 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30' :
                                order.status === 'shipping' ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' :
                                  'bg-red-900/30 text-red-300 border-red-500/30'
                            }`}>
                            {order.status || "pending"}
                          </span>
                        </td>
                        <td className="p-2 md:p-4 text-sm font-bold text-gray-300 text-center">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="p-2 md:p-4">
                          <div className="flex justify-center items-center space-x-3">
                            <button
                              onClick={() => handleEditOrder(order)}
                              className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-400/10 rounded cursor-pointer"
                            >
                              <IoPencilOutline className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>
            )}
            {(isProductsTab && products.length === 0) ||
              (activeTab === "users" && users.length === 0) ||
              (activeTab === "orders" && orders.length === 0) ? (
              <div className="p-10 text-center text-sm font-bold text-gray-500 tracking-widest uppercase">
                Không tìm thấy dữ liệu nào
              </div>
            ) : null}
          </div>
        </div>

      </main>

      {/* Product Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A0E]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
              <h2 className="text-lg md:text-xl font-black italic tracking-wider text-white uppercase">
                {showAddModal ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <IoCloseOutline className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-4 md:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Tên sản phẩm</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Mã sản phẩm</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Thương hiệu</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Danh mục chính</label>
                  <select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none cursor-pointer"
                  >
                    <option value="Gundam Nhật Bản">Gundam Nhật Bản</option>
                    <option value="Gundam Trung Quốc">Gundam Trung Quốc</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Danh mục con</label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none cursor-pointer"
                  >
                    {subCategoryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Tỷ lệ</label>
                  <input
                    type="text"
                    name="scale"
                    value={formData.scale}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    placeholder="e.g. 1/144"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Giá (VNĐ)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Tồn kho</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">URL Hình ảnh</label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="text-red-400 hover:text-red-300 p-2 cursor-pointer"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-blue-400 hover:text-blue-300 text-sm font-bold cursor-pointer"
                >
                  + Thêm hình ảnh
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                  placeholder="Mô tả sản phẩm..."
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="px-4 md:px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded font-bold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className={`px-4 md:px-6 py-2 text-white rounded font-bold transition-colors cursor-pointer ${activeTab === 'products-japan'
                      ? 'bg-blue-600 hover:bg-blue-500'
                      : 'bg-red-600 hover:bg-red-500'
                    }`}
                >
                  {showAddModal ? "Thêm sản phẩm" : "Cập nhật"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Add/Edit Modal */}
      {(showAddUserModal || showEditUserModal) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A0E]/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
              <h2 className="text-lg md:text-xl font-black text-white tracking-wider uppercase">
                {showAddUserModal ? "Thêm người dùng mới" : "Chỉnh sửa người dùng"}
              </h2>
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setShowEditUserModal(false);
                }}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <IoCloseOutline className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>

            <form onSubmit={handleUserFormSubmit} className="p-4 md:p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                  disabled={true}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Vai trò
                </label>
                <select
                  name="role"
                  value={userFormData.role}
                  onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddUserModal(false);
                    setShowEditUserModal(false);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-bold transition-colors cursor-pointer"
                >
                  {showAddUserModal ? "Thêm người dùng" : "Cập nhật"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Edit Modal */}
      {showEditOrderModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A0E]/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
              <h2 className="text-lg md:text-xl font-black text-white tracking-wider uppercase">
                Chỉnh sửa đơn hàng
              </h2>
              <button
                onClick={() => setShowEditOrderModal(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <IoCloseOutline className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>

            <form onSubmit={handleOrderFormSubmit} className="p-4 md:p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  ID Đơn hàng
                </label>
                <input
                  type="text"
                  value={selectedOrder?._id || ""}
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-gray-400 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Khách hàng
                </label>
                <input
                  type="text"
                  value={selectedOrder?.user?.name || "N/A"}
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-gray-400 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Tổng tiền
                </label>
                <input
                  type="text"
                  value={formatPrice(selectedOrder?.totalPrice || 0)}
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-gray-400 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={orderFormData.status}
                  onChange={(e) => setOrderFormData({ ...orderFormData, status: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white focus:border-purple-400 focus:outline-none cursor-pointer"
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="shipping">Đang giao</option>
                  <option value="done">Hoàn thành</option>
                  <option value="cancel">Đã hủy</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditOrderModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold transition-colors cursor-pointer"
                >
                  Cập nhật đơn hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
