import CardCustom from "@/components/block/card/Card";
import MainLayouts from "@/components/layouts/MainLayouts";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoSearchOutline } from "react-icons/io5";

const products = [
  {
    id: 1,
    name: "Keripik Singkong Original",
    price: 14000,
    stock: 10,
    imageUrl:
      "https://blog.tokowahab.com/wp-content/uploads/2024/07/Cara-Membuat-Resep-Keripik-Singkong-Original-Praktis-3-Bahan-Saja.jpg",
  },
  {
    id: 2,
    name: "Kue Lapis Legit Premium",
    price: 75000,
    stock: 5,
    imageUrl:
      "https://sweetrip.id/wp-content/uploads/2022/03/5202-lapis-legit.jpg",
  },
  {
    id: 3,
    name: "Sambal Bawang Pedas",
    price: 25000,
    stock: 20,
    imageUrl:
      "https://images.tokopedia.net/img/JFrBQq/2022/10/7/e87b5393-2713-42e1-a083-7ac27c81d310.jpg",
  },
  {
    id: 4,
    name: "Madu Hutan Asli",
    price: 120000,
    stock: 8,
    imageUrl:
      "https://d3avoj45mekucs.cloudfront.net/astrogempak/media/articleasset/2018/nov/lov-madu.jpg",
  },
  {
    id: 4,
    name: "Madu Hutan Asli",
    price: 120000,
    stock: 8,
    imageUrl:
      "https://d3avoj45mekucs.cloudfront.net/astrogempak/media/articleasset/2018/nov/lov-madu.jpg",
  },
  {
    id: 4,
    name: "Madu Hutan Asli",
    price: 120000,
    stock: 8,
    imageUrl:
      "https://d3avoj45mekucs.cloudfront.net/astrogempak/media/articleasset/2018/nov/lov-madu.jpg",
  },
];

const UmkmPage = () => {
  return (
    <MainLayouts>
      {/* Bagian Header Halaman */}
      <div className="w-full bg-[#EEEFE0] px-4 md:px-20 py-5">
        <div className="w-full flex flex-col">
          <h1 className="text-2xl font-bold">Produk UMKM Desa</h1>
          <p className="text-muted-foreground">
            Temukan berbagai produk dari UMKM di desa kami
          </p>
        </div>
      </div>

      {/* Bagian Filter dan Pencarian */}
      <div className="px-4 md:px-20 mt-10 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative">
          <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
          <Input placeholder="Cari Produk..." className="w-full md:w-80 pl-9" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="makanan">Makanan</SelectItem>
              <SelectItem value="minuman">Minuman</SelectItem>
              <SelectItem value="kerajinan">Kerajinan</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="terbaru">Terbaru</SelectItem>
              <SelectItem value="termurah">Termurah</SelectItem>
              <SelectItem value="termahal">Termahal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bagian Grid Produk */}
      <div className="px-4 md:px-20 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gunakan .map() untuk me-render setiap kartu produk */}
        {products.map((product) => (
          <CardCustom key={product.id} product={product} />
        ))}
      </div>
    </MainLayouts>
  );
};

export default UmkmPage;
