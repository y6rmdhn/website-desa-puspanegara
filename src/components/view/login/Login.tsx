import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/auth.services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/userSlice";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username minimal harus 3 karakter." })
    .max(16, { message: "Username maksimal 16 karakter." }),
  password: z
    .string()
    .min(6, { message: "Password minimal harus 8 karakter." }),
});

const Login = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    //@ts-ignore
    mutationFn: (data) => authServices.login(data),
    onSuccess: (data) => {
      form.reset();
      toast.success("Login berhasil!");

      const userData = {
        id: data.data.id,
        username: data.data.data.username,
        token: data.data.token,
      };

      localStorage.setItem("token", JSON.stringify(userData));
      dispatch(setUserData(userData));
      navigate("/");
      console.log(data);
    },
    onError: (error) => {
      toast.error(error?.message || "Login gagal, silakan coba lagi.");
    },
  });

  const handleSubmitdata = async (values: any) => {
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitdata)}>
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Login
              </CardTitle>
              <CardDescription className="text-center text-sm text-gray-600">
                Please enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Username need to be between 3 or 16 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div
                          onClick={() =>
                            setIsVisiblePassword(!isVisiblePassword)
                          }
                        >
                          {isVisiblePassword ? (
                            <FaRegEye className="absolute translate-y-1/2 right-2" />
                          ) : (
                            <FaRegEyeSlash className="absolute translate-y-1/2 right-2" />
                          )}
                        </div>
                        <Input
                          {...field}
                          type={isVisiblePassword ? "text" : "password"}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Login;
