import { Route, Routes } from "react-router-dom";
import UmkmPage from "./components/view/umkm";
import HomePage from "./components/view/homePage";
import DetailProduk from "./components/view/detailProduk";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/umkm" element={<UmkmPage />} />
      <Route path="/detail-produk/:id" element={<DetailProduk />} />
    </Routes>
  );
}

export default App;
