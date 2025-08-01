import { AdminLayout } from "@/components/layouts/Adminlayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import productServices from "@/services/productManagement.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

// Skema Zod untuk form Tambah/Edit Produk
const productFormSchema = z.object({
  name: z.string().min(3, { message: "Nama produk minimal 3 karakter." }),
  description: z
    .string()
    .min(10, { message: "Deskripsi minimal 10 karakter." }),
  price: z.coerce.number().positive({ message: "Harga harus angka positif." }),
  stock: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Stok harus angka positif." }),
  category: z.string().min(2, { message: "Kategori wajib diisi." }),
  productImage: z
    .instanceof(FileList)
    .refine(
      (files) => files?.length < 2,
      "Hanya satu gambar yang bisa diupload."
    )
    .optional(),
});

// Skema Zod untuk form Hapus Produk
const deleteProductsSchema = z.object({
  ids: z
    .array(z.string())
    .min(1, { message: "Pilih setidaknya satu produk untuk dihapus." }),
});

const ProductManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const defaultFormValues = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    productImage: undefined,
  };

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultFormValues,
  });

  const deleteForm = useForm({
    resolver: zodResolver(deleteProductsSchema),
    defaultValues: { ids: [] },
  });

  const { data: productsData, isPending: isLoadingProducts } = useQuery({
    queryKey: ["all-products-management"],
    queryFn: async () => {
      const response = await productServices.product();

      return response.data;
    },
  });

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: (newProduct) => productServices.addProduct(newProduct),
    onSuccess: () => {
      toast.success("Produk berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["all-products-management"] });
      setIsDialogOpen(false);
    },
    onError: (error) => toast.error(`Gagal menambahkan: ${error.message}`),
  });

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, formData }) =>
      productServices.updateProduct(id, formData),
    onSuccess: () => {
      toast.success("Produk berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["all-products-management"] });
      setIsDialogOpen(false);
    },
    onError: (error) => toast.error(`Gagal memperbarui: ${error.message}`),
  });

  const { mutate: deleteProducts, isPending: isDeleting } = useMutation({
    mutationFn: (productIds) => productServices.deleteData(productIds),
    onSuccess: () => {
      toast.success("Produk terpilih berhasil dihapus!");
      deleteForm.reset();
      queryClient.invalidateQueries({ queryKey: ["all-products-management"] });
    },
    onError: (error) => toast.error(`Gagal menghapus: ${error.message}`),
  });

  const handleProductSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    formData.append("stock", String(values.stock));
    formData.append("category", values.category);

    if (values.productImage && values.productImage.length > 0) {
      formData.append("productImage", values.productImage[0]);
    }

    if (editingProduct) {
      updateProduct({ id: editingProduct._id, formData });
    } else {
      if (!values.productImage || values.productImage.length === 0) {
        form.setError("productImage", {
          type: "manual",
          message: "Gambar produk wajib diupload saat membuat produk baru.",
        });
        return;
      }
      addProduct(formData);
    }
  };

  const handleDeleteSubmit = (values) => {
    console.log("Deleting products with IDs:", values.ids);

    deleteProducts(values);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (editingProduct && isDialogOpen) {
      form.reset({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        stock: editingProduct.stock,
        category: editingProduct.category,
        productImage: undefined,
      });
    } else {
      form.reset(defaultFormValues);
      if (!isDialogOpen) {
        setEditingProduct(null);
      }
    }
  }, [editingProduct, isDialogOpen, form]);

  const productImageRef = form.register("productImage");

  return (
    <Form {...deleteForm}>
      <form onSubmit={deleteForm.handleSubmit(handleDeleteSubmit)}>
        <AdminLayout
          title={"Product Management"}
          description={"Management for all of our products"}
          rightBtn={
            <div className="flex items-center gap-5">
              {deleteForm.watch("ids", []).length > 0 && (
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isDeleting}
                >
                  {isDeleting
                    ? "Menghapus..."
                    : `Delete ${deleteForm.watch("ids").length} Product(s)`}
                </Button>
              )}

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingProduct(null)}>
                    <IoAdd className="w-6 h-6 mr-1" />
                    Add product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProduct
                        ? "Ubah detail produk di bawah ini."
                        : "Isi detail di bawah untuk menambah produk baru."}
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleProductSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Produk</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="cth: Krepes Coklat Keju"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="cth: Krepes renyah dengan topping..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Harga</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="cth: 5000"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stok</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="cth: 25"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kategori</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="cth: Makanan Ringan"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="productImage"
                        render={() => (
                          <FormItem>
                            <FormLabel>
                              Gambar Produk {editingProduct && "(Opsional)"}
                            </FormLabel>
                            {editingProduct && (
                              <p className="text-sm text-muted-foreground">
                                Biarkan kosong jika tidak ingin mengubah gambar.
                              </p>
                            )}
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                {...productImageRef}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit" disabled={isAdding || isUpdating}>
                          {isAdding
                            ? "Menambahkan..."
                            : isUpdating
                            ? "Menyimpan..."
                            : editingProduct
                            ? "Simpan Perubahan"
                            : "Tambah Produk"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          }
        >
          <FormField
            control={deleteForm.control}
            name="ids"
            render={({ field }) => (
              <FormItem>
                <Table className="p-4 mt-8 border rounded-md">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            productsData?.data.length > 0 &&
                            field.value.length === productsData?.data.length
                          }
                          onCheckedChange={(checked) =>
                            field.onChange(
                              checked ? productsData.data.map((p) => p._id) : []
                            )
                          }
                        />
                      </TableHead>
                      <TableHead>Nama Produk</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Stok</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingProducts ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          Loading products...
                        </TableCell>
                      </TableRow>
                    ) : productsData?.data.length > 0 ? (
                      productsData.data.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <Checkbox
                              checked={field.value?.includes(item._id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item._id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item._id
                                      )
                                    );
                              }}
                            />
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            Rp{item.price.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditClick(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <FormMessage />
              </FormItem>
            )}
          />
        </AdminLayout>
      </form>
    </Form>
  );
};

export default ProductManagement;
