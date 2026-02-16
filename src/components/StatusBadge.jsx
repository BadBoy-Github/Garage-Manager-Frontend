// --- Status Badge Component ---
export default function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status) {
      case "Finished":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  const getDotColor = () => {
    switch (status) {
      case "Finished":
        return "bg-green-500";
      case "In Progress":
        return "bg-blue-500";
      default:
        return "bg-orange-500";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusClass()}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${getDotColor()}`} />
      {status}
    </span>
  );
}
