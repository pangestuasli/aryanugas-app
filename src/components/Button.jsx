export default function Button({ children, type= "primary" }) {
  const types = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-100",
    login: "bg-[#0ea5e9] hover:bg-[#0284c7] text-white shadow-lg shadow-sky-200",
  };

  return (
    <button className={`${types[type]} px-4 py-2 mr-4 rounded-lg`}>
      {children}
    </button>
  );
}