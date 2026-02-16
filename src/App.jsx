import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";

import api from "./services/api";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import RepairsList from "./components/RepairsList";
import CustomersList from "./components/CustomersList";
import Settings from "./components/Settings";
import RepairModal from "./components/RepairModal";
import CustomerModal from "./components/CustomerModal";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [repairs, setRepairs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [repairForm, setRepairForm] = useState({
    customerId: "",
    customerName: "",
    vehicle: "",
    priority: "Medium",
    description: "",
    status: "Pending",
    cost: 0,
  });

  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Settings form state
  const [adminName, setAdminName] = useState("Elayabarathi M V");
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Editing states
  const [editingRepair, setEditingRepair] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Sort state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Check for existing login on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) {
      const adminData = JSON.parse(savedAdmin);
      setAdmin(adminData);
      setAdminName(adminData.name);
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch data when logged in and tab changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, activeTab]);

  // Search effect
  useEffect(() => {
    if (searchTerm && isLoggedIn) {
      handleSearch();
    } else if (isLoggedIn) {
      fetchData();
    }
  }, [searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === "home" || activeTab === "repairs") {
        const [statsData, repairsData] = await Promise.all([
          api.getStats(),
          api.getRepairs(),
        ]);
        setStats(statsData);
        setRepairs(repairsData);
      } else if (activeTab === "customers") {
        const customersData = await api.getCustomers();
        setCustomers(customersData);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        "Failed to connect to server. Make sure backend is running on port 5000.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (activeTab === "repairs") {
        const results = await api.searchRepairs(searchTerm);
        setRepairs(results);
      } else if (activeTab === "customers") {
        const results = await api.searchCustomers(searchTerm);
        setCustomers(results);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sort function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    // Sort the data locally
    const sortedData = [...repairs].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Handle priority sorting
      if (key === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        aValue = priorityOrder[aValue] || 0;
        bValue = priorityOrder[bValue] || 0;
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setRepairs(sortedData);
  };

  // --- Auth Handlers ---
  const handleLogin = (adminData) => {
    setAdmin(adminData);
    setAdminName(adminData.name);
    localStorage.setItem("admin", JSON.stringify(adminData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setAdmin(null);
    setIsLoggedIn(false);
    localStorage.removeItem("admin");
    setActiveTab("home");
  };

  const handleUpdateAdminName = async () => {
    setSettingsLoading(true);
    try {
      await api.updateAdminName(adminName);
      const updatedAdmin = { ...admin, name: adminName };
      setAdmin(updatedAdmin);
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      alert("Admin name updated successfully!");
    } catch (err) {
      alert("Failed to update admin name");
    } finally {
      setSettingsLoading(false);
    }
  };

  // --- Repair Form Handlers ---
  const handleRepairSubmit = async (e) => {
    e.preventDefault();
    try {
      const repairData = {
        ...repairForm,
        customerName:
          customers.find((c) => c._id === repairForm.customerId)?.name ||
          repairForm.customerName,
      };

      if (editingRepair) {
        await api.updateRepair(editingRepair._id, repairData);
      } else {
        await api.createRepair(repairData);
      }
      setIsModalOpen(false);
      setEditingRepair(null);
      resetRepairForm();
      fetchData();
    } catch (err) {
      console.error("Error saving repair:", err);
      alert("Failed to save repair order");
    }
  };

  const handleDeleteRepair = async (id) => {
    if (window.confirm("Are you sure you want to delete this repair?")) {
      try {
        await api.deleteRepair(id);
        fetchData();
      } catch (err) {
        console.error("Error deleting repair:", err);
        alert("Failed to delete repair");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateRepairStatus(id, newStatus);
      fetchData();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  const openEditRepair = (repair) => {
    setEditingRepair(repair);
    setRepairForm({
      customerId: repair.customerId?._id || "",
      customerName: repair.customerName || "",
      vehicle: repair.vehicle || "",
      priority: repair.priority || "Medium",
      description: repair.description || "",
      status: repair.status || "Pending",
      cost: repair.cost || 0,
    });
    setIsModalOpen(true);
  };

  const resetRepairForm = () => {
    setRepairForm({
      customerId: "",
      customerName: "",
      vehicle: "",
      priority: "Medium",
      description: "",
      status: "Pending",
      cost: 0,
    });
  };

  // --- Customer Form Handlers ---
  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await api.updateCustomer(editingCustomer._id, customerForm);
      } else {
        await api.createCustomer(customerForm);
      }
      setIsCustomerModalOpen(false);
      setEditingCustomer(null);
      resetCustomerForm();
      fetchData();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to save customer";
      alert(errorMessage);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this customer? All related repairs will also be deleted.",
      )
    ) {
      try {
        await api.deleteCustomer(id);
        fetchData();
      } catch (err) {
        console.error("Error deleting customer:", err);
        alert("Failed to delete customer");
      }
    }
  };

  const openEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setCustomerForm({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
    });
    setIsCustomerModalOpen(true);
  };

  const resetCustomerForm = () => {
    setCustomerForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  // Modal openers
  const openNewRepair = () => {
    setEditingRepair(null);
    resetRepairForm();
    setIsModalOpen(true);
  };

  const openNewCustomer = () => {
    setEditingCustomer(null);
    resetCustomerForm();
    setIsCustomerModalOpen(true);
  };

  // --- Render ---
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSearchTerm("");
        }}
        adminName={adminName}
        onLogout={handleLogout}
      />

      <main className="flex-1 ml-64 p-10 max-w-7xl mx-auto w-full">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight capitalize">
              {activeTab === "home" ? "Workshop Overview" : activeTab}
            </h1>
            <p className="text-slate-500 mt-1">
              {activeTab === "home" &&
                "Efficiently manage your garage operations."}
              {activeTab === "repairs" && "Track and manage all repair orders"}
              {activeTab === "customers" && "Manage your customer database"}
              {activeTab === "settings" && "Manage your account settings"}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {(activeTab === "repairs" || activeTab === "customers") && (
              <button
                onClick={
                  activeTab === "repairs" ? openNewRepair : openNewCustomer
                }
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
              >
                <Plus size={20} />
                Add {activeTab === "repairs" ? "Repair" : "Customer"}
              </button>
            )}
          </div>
        </header>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
            {error}
          </div>
        ) : (
          <>
            {activeTab === "home" && (
              <Dashboard
                stats={stats}
                repairs={repairs}
                customers={customers}
                onViewAllRepairs={() => setActiveTab("repairs")}
              />
            )}

            {activeTab === "repairs" && (
              <RepairsList
                repairs={repairs}
                onEdit={openEditRepair}
                onDelete={handleDeleteRepair}
                onStatusChange={handleStatusChange}
                onSort={handleSort}
                sortConfig={sortConfig}
              />
            )}

            {activeTab === "customers" && (
              <CustomersList
                customers={customers}
                repairs={repairs}
                onEdit={openEditCustomer}
                onDelete={handleDeleteCustomer}
              />
            )}

            {activeTab === "settings" && (
              <Settings
                adminName={adminName}
                setAdminName={setAdminName}
                onSave={handleUpdateAdminName}
                loading={settingsLoading}
                stats={stats}
                repairs={repairs}
                customers={customers}
              />
            )}
          </>
        )}
      </main>

      <RepairModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRepair(null);
          resetRepairForm();
        }}
        onSubmit={handleRepairSubmit}
        form={repairForm}
        setForm={setRepairForm}
        customers={customers}
        editingRepair={editingRepair}
      />

      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => {
          setIsCustomerModalOpen(false);
          setEditingCustomer(null);
          resetCustomerForm();
        }}
        onSubmit={handleCustomerSubmit}
        form={customerForm}
        setForm={setCustomerForm}
        editingCustomer={editingCustomer}
      />
    </div>
  );
}
