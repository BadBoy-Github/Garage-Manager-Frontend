import { Edit, Trash2, Car } from "lucide-react";

export default function CustomersList({
  customers,
  repairs,
  onEdit,
  onDelete,
}) {
  const getCustomerRepairCount = (customerId) => {
    return repairs.filter((r) => r.customerId?._id === customerId).length;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer._id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center font-bold text-white text-lg">
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(customer)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(customer._id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-lg mb-1">
              {customer.name}
            </h3>
            <p className="text-slate-500 text-sm mb-4">{customer.email}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="font-semibold">Phone:</span>
                {customer.phone || "N/A"}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Car size={16} />
                <span className="font-semibold">Repairs:</span>
                {getCustomerRepairCount(customer._id)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {customers.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
          <p className="text-slate-500">No customers found</p>
        </div>
      )}
    </div>
  );
}
