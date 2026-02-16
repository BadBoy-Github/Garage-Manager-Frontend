import { LayoutDashboard, Users, Wrench, Settings, LogOut } from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  adminName,
  onLogout,
}) {
  const navItems = [
    { id: "home", label: "Dashboard", icon: LayoutDashboard },
    { id: "repairs", label: "Repairs", icon: Wrench },
    { id: "customers", label: "Customers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white fixed h-full flex flex-col shadow-2xl z-20">
      <div className="p-6 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center mb-2">
          <Settings size={28} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          Garage<span className="text-blue-500">&nbsp;Manager</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
              activeTab === item.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <item.icon
              size={20}
              className={
                activeTab === item.id
                  ? "text-white"
                  : "group-hover:text-blue-400"
              }
            />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-slate-800/40 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-bold border-2 border-slate-700">
            {adminName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2) || "A"}
          </div>
          <div className="flex-1 overflow-hidden text-sm">
            <p className="font-semibold truncate">{adminName}</p>
            <p className="text-slate-500 text-xs truncate">Administrator</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200 cursor-pointer"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
