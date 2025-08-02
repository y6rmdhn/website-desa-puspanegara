import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import authServices from "@/services/auth.services";
import type { RootState } from "@/store/store";
import { setUserData } from "@/store/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {
  const userSelector = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: () => authServices.logout(),
    onSuccess: () => {
      //@ts-ignore
      dispatch(setUserData(null));
      localStorage.removeItem("token");
      toast.success("Logout berhasil!");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout gagal:", error);
      //@ts-ignore
      dispatch(setUserData(null));
      localStorage.removeItem("token");
      navigate("/login");
    },
  });

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <nav className="h-20 max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/img/1753327261723.png"
              alt="Logo Puspanegara"
              className="w-14 h-14 object-cover rounded-md"
            />
          </Link>

          <h1 className="text-xl font-semibold">Puspasite</h1>
        </div>

        {/* Navigation Links */}
        <ul className="font-semibold text-slate-600 flex items-center gap-6 text-base">
          <Link to="/" className="hover:text-green-600 transition-colors">
            <li>Home</li>
          </Link>
          <Link to="/umkm" className="hover:text-green-600 transition-colors">
            <li>UMKM</li>
          </Link>
          <Link
            to="/produk-management"
            className="hover:text-green-600 transition-colors"
          >
            <li>Add Product</li>
          </Link>
        </ul>

        {/* Action Button */}
        <div>
          {userSelector.username ? (
            <Popover>
              <PopoverTrigger>{`Hello, ${userSelector.username}`}</PopoverTrigger>
              <PopoverContent>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full"
                >
                  Log out
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link to="/login">
              <Button className="bg-green-600 hover:bg-green-700">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
