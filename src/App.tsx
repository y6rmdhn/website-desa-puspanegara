import { Route, Routes } from "react-router-dom";
import UmkmPage from "./components/view/umkm";
import HomePage from "./components/view/homePage";
import DetailProduk from "./components/view/detailProduk";
import Login from "./components/view/login";
import { Toaster } from "@/components/ui/sonner";
import { useHydration } from "./hooks/useHydration";
import ProductManagement from "./components/view/ProductManagement";

function App() {
  const { isHydrate } = useHydration();

  if (!isHydrate) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/umkm" element={<UmkmPage />} />
        <Route path="/detail-produk/:id" element={<DetailProduk />} />
        <Route path="/produk-management" element={<ProductManagement />} />
      </Routes>
    </>
  );
}

export default App;
