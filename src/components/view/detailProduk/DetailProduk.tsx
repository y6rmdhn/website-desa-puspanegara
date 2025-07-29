import { useState } from "react";

// Asumsi Anda menggunakan library seperti shadcn/ui atau sejenisnya
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Library untuk notifikasi (opsional, bisa dihapus)

// Import Ikon
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import MainLayouts from "@/components/layouts/MainLayouts";

// --- Data Dummy ---
// Data ini menggantikan data yang seharusnya datang dari API.
const dummyProduct = {
  id: "dummy-001",
  name: "Kopi Robusta Gayo - Biji Pilihan (Dummy)",
  price: 125000,
  stock: 25,
  imageUrl:
    "https://images.tokopedia.net/img/cache/500-square/aphluv/1997/1/1/8cef8c3ed42d4a4d9f496fd2c3ad9b1a~.jpeg.webp?ect=4g",
  description:
    "Ini adalah deskripsi dummy. Nikmati kekayaan rasa Kopi Robusta asli dari dataran tinggi Gayo. Diproses secara teliti dari biji kopi pilihan untuk menghasilkan aroma yang kuat dan cita rasa yang tak terlupakan.",
};

const DetailProduk = () => {
  // State untuk kuantitas produk, berfungsi di sisi klien
  const [quantity, setQuantity] = useState(1);

  // Fungsi dummy untuk menambah kuantitas
  const increment = () => {
    if (quantity < dummyProduct.stock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.info(`Stok produk hanya tersisa ${dummyProduct.stock} buah.`);
    }
  };

  // Fungsi dummy untuk mengurangi kuantitas
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Fungsi dummy untuk handle penambahan ke keranjang
  const handleAddToCart = () => {
    // Aksi ini hanya akan menampilkan notifikasi atau log di console
    console.log({
      productId: dummyProduct.id,
      quantity: quantity,
      totalPrice: dummyProduct.price * quantity,
    });
    toast.success(
      `${quantity} ${dummyProduct.name} telah ditambahkan ke keranjang!`
    );
  };

  return (
    <MainLayouts>
      <div className="grid md:grid-cols-2 gap-12 items-start mt-10 px-20 overflow-hidden pb-20">
        {/* Kolom Gambar */}
        <div className="w-full">
          <img
            src={dummyProduct.imageUrl}
            alt={dummyProduct.name}
            className="w-96 h-auto aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Kolom Detail & Aksi */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-slate-800">
            {dummyProduct.name}
          </h1>

          <h3 className="text-4xl font-bold text-slate-900 mt-2">
            Rp {dummyProduct.price.toLocaleString("id-ID")}
          </h3>

          <p className="text-base text-muted-foreground mt-4 leading-relaxed">
            {dummyProduct.description}
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
                disabled={quantity >= dummyProduct.stock}
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
              disabled={quantity === 0 || dummyProduct.stock === 0}
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
