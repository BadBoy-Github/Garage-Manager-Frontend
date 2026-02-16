// --- Priority Badge Component ---
export default function PriorityBadge({ priority }) {
  const getPriorityClass = () => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-orange-500";
      default:
        return "text-slate-500";
    }
  };

  return (
    <span className={`text-sm font-semibold ${getPriorityClass()}`}>
      {priority}
    </span>
  );
}
