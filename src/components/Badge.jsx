export default function Badge({ children, type = "primary" }) {
  const types = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white font-medium",
    secondary: "bg-blue-500 hover:bg-blue-600 text-white font-medium",
    selesai: "bg-green-600 text-white hover:bg-green-700 text-white font-medium",
    habis: "bg-red-500 hover:bg-red-600 text-white font-medium",
  };

  return (
    <span className={`${types[type] || types.primary} px-3 py-1 rounded-full text-sm`}>
      {children}
    </span>
  );
}