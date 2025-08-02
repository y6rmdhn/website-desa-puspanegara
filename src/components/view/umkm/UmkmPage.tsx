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
import productServices from "@/services/productManagement.services";
import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";

const UmkmPage = () => {
  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productServices.product();
      return response.data;
    },
  });

  return (
    <MainLayouts>
      {/* Bagian Header Halaman */}
      <div className="w-full bg-[#EEEFE0] px-4 md:px-20 py-5">
        <div className="w-full flex flex-col">
          <h1 className="text-2xl font-bold">Produk UMKM Kelurahan</h1>
          <p className="text-muted-foreground">
            " Website Kita, Produk Kita, Bangga Bersama! "
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
        {
          //@ts-ignore
          productsData?.data.map((product) => (
            <CardCustom key={product._id} product={product} />
          ))
        }
      </div>
    </MainLayouts>
  );
};

export default UmkmPage;
