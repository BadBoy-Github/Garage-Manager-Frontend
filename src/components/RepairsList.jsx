import { Edit, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

export default function RepairsList({
  repairs,
  onEdit,
  onDelete,
  onStatusChange,
  onSort,
  sortConfig,
}) {
  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
                  onClick={() => onSort("customerName")}
                >
                  Customer {getSortIcon("customerName")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
                  onClick={() => onSort("status")}
                >
                  Status {getSortIcon("status")}
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
                  onClick={() => onSort("priority")}
                >
                  Priority {getSortIcon("priority")}
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600"
                  onClick={() => onSort("cost")}
                >
                  Cost {getSortIcon("cost")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {repairs.map((repair) => (
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
                    <span className="font-medium text-slate-900">
                      {repair.vehicle}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={repair.status}
                      onChange={(e) =>
                        onStatusChange(repair._id, e.target.value)
                      }
                      className="bg-transparent border-none text-sm font-semibold cursor-pointer focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Finished">Finished</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <PriorityBadge priority={repair.priority} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900">
                      ${repair.cost || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(repair)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(repair._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {repairs.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-500">No repairs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
