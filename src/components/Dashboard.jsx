import { LayoutDashboard, Wrench, Clock, CheckCircle } from "lucide-react";

export default function Dashboard({
  stats,
  repairs,
  customers,
  onViewAllRepairs,
}) {
  const recentRepairs = repairs.slice(0, 2);

  const getStatusCount = (status) => {
    return repairs.filter((r) => r.status === status).length;
  };

  const totalRepairsCount = repairs.length;
  const pendingCount = getStatusCount("Pending");
  const inProgressCount = getStatusCount("In Progress");
  const completedCount = getStatusCount("Finished");

  const statCards = [
    {
      label: "Total Repairs",
      value: totalRepairsCount,
      icon: Wrench,
      color: "from-blue-600 to-blue-400",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: Clock,
      color: "from-orange-600 to-orange-400",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      label: "In Progress",
      value: inProgressCount,
      icon: Wrench,
      color: "from-blue-600 to-blue-400",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle,
      color: "from-green-600 to-green-400",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={stat.iconColor} size={24} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Repairs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutDashboard size={20} className="text-blue-600" />
            Recent Repairs
          </h2>
          <button
            onClick={onViewAllRepairs}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            All Repairs
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentRepairs.map((repair) => (
                <tr
                  key={repair._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {repair.customerName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {repair.customerId?.phone || "No phone"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Wrench size={16} className="text-slate-400" />
                      <span className="font-medium text-slate-900">
                        {repair.vehicle}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        repair.status === "Finished"
                          ? "bg-green-100 text-green-700"
                          : repair.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {repair.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        repair.priority === "High"
                          ? "text-red-500"
                          : repair.priority === "Medium"
                            ? "text-orange-500"
                            : "text-slate-500"
                      }`}
                    >
                      {repair.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900">
                      ${repair.cost || 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
