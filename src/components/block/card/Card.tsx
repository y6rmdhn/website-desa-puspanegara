import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};

const CardCustom = ({ product }: { product: Product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col border bg-white rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-square overflow-hidden w-full">
        <img
          className="w-full h-full object-cover"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-md font-medium">{product.name}</p>
        <p className="text-xl font-semibold mt-1">
          {formatPrice(product.price)}
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Stok: {product.stock}
        </p>

        <Link to={"/detail-produk/" + product._id} className="w-full">
          <Button className="mt-2 bg-[#D1D8BE] text-black hover:bg-[#EEEFE0] w-full">
            Add to cart
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CardCustom;
