import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar />
      

      <main className="flex-1 bg-[#F8FAFC] overflow-y-auto p-10">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;