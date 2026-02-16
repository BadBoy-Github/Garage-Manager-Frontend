import { Save, Users, Wrench, DollarSign } from "lucide-react";

export default function Settings({
  adminName,
  setAdminName,
  onSave,
  loading,
  repairs,
  customers,
}) {
  // Calculate total revenue only for completed jobs
  const completedRepairs = repairs.filter((r) => r.status === "Finished");
  const totalRevenue = completedRepairs.reduce(
    (sum, r) => sum + (r.cost || 0),
    0,
  );
  const totalRepairs = repairs.length;
  const totalCustomersCount = customers.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Admin Profile - Left side */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 lg:w-1/2">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Admin Profile
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Admin Name
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                placeholder="Enter admin name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value="elayabarathiedison@gmail.com"
                readOnly
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            <button
              onClick={onSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Stats Cards - Right side */}
        <div className="lg:w-1/2 flex flex-col justify-between items-between">
          {/* Top row - 2 cards */}
          <div className="grid grid-cols-2 gap-4 h-[45%]">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-xl bg-purple-50">
                  <Users className="text-purple-600" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900">
                {totalCustomersCount}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Total Customers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-xl bg-blue-50">
                  <Wrench className="text-black" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900">
                {totalRepairs}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Total Repairs</p>
            </div>
          </div>
          {/* Bottom row - 1 card full width */}
          <div className="bg-white rounded-2xl p-6 h-[50%] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 rounded-xl bg-green-50">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900">
              ${totalRevenue.toLocaleString()}
            </h3>
            <p className="text-slate-500 text-sm mt-1">Total Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
