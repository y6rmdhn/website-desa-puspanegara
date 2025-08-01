import { useState, useEffect } from "react"; // 1. Impor useEffect di sini
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import MainLayouts from "@/components/layouts/MainLayouts";
import { useQuery } from "@tanstack/react-query";
import productServices from "@/services/productManagement.services";
import { useParams } from "react-router-dom";

const DetailProduk = () => {
  const [quantity, setQuantity] = useState(1);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Gunakan 'auto' jika tidak ingin efek scroll
    });
  }, []); // Dependency array kosong agar hanya berjalan sekali saat mount

  const { data: productData } = useQuery({
    queryKey: ["detail-products"],
    queryFn: async () => {
      const response = await productServices.productDetail(params.id);
      return response.data.data;
    },
  });

  const increment = () => {
    if (quantity < productData.stock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.info(`Stok produk hanya tersisa ${productData.stock} buah.`);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log({
      productId: productData.id,
      quantity: quantity,
      totalPrice: productData.price * quantity,
    });
    toast.success(
      `${quantity} ${productData.name} telah ditambahkan ke keranjang!`
    );
  };

  return (
    <MainLayouts>
      <div className="grid md:grid-cols-2 gap-12 items-start mt-10 px-20 overflow-hidden pb-20">
        <div className="w-full">
          <img
            src={productData?.imageUrl}
            alt={productData?.name}
            className="w-96 h-auto aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Kolom Detail & Aksi */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-slate-800">
            {productData?.name}
          </h1>

          <h3 className="text-4xl font-bold text-slate-900 mt-2">
            Rp {productData?.price?.toLocaleString("id-ID")}
          </h3>

          <p className="text-base text-muted-foreground mt-4 leading-relaxed">
            {productData?.description}
          </p>

          {/* Kontrol Kuantitas */}
          <div className="flex items-center gap-4 mt-6">
            <p className="font-semibold">Jumlah:</p>
            <div className="flex items-center border rounded-lg">
              <Button
                onClick={decrement}
                disabled={quantity <= 1}
                size="icon"
                variant="ghost"
              >
                <IoIosRemove className="w-5 h-5" />
              </Button>

              <p className="w-12 text-center font-bold text-lg">{quantity}</p>

              <Button
                onClick={increment}
                disabled={quantity >= productData?.stock}
                size="icon"
                variant="ghost"
              >
                <IoIosAdd className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center gap-4 mt-8 w-full">
            <Button
              onClick={handleAddToCart}
              disabled={quantity === 0 || productData?.stock === 0}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Chat to WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </MainLayouts>
  );
};

export default DetailProduk;
