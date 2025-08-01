import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom"; // Pastikan import Link

const Footer = () => {
  return (
    <div className="bg-slate-800 text-slate-300 px-10 py-16 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Logo Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/img/1753327261723.png"
              alt="logo"
              className="w-14 h-14 object-cover rounded-md"
            />
            <img
              src="/img/Lambang_Kabupaten_Bogor.png"
              alt="logo"
              className="w-10 h-10 object-cover rounded-md"
            />
          </div>
          <p className="text-slate-400">
            Platform digital untuk memamerkan dan memajukan produk-produk
            unggulan dari Usaha Mikro, Kecil, dan Menengah (UMKM) di Kelurahan
            Puspanegara.
          </p>
        </div>

        {/* Tautan Section */}
        <div>
          <h3 className="text-lg font-semibold text-white">Tautan</h3>
          <div className="flex flex-col gap-3 mt-4">
            <Link to="/" className="hover:text-green-500 transition-colors">
              Home
            </Link>
            <Link to="/umkm" className="hover:text-green-500 transition-colors">
              UMKM
            </Link>
          </div>
        </div>

        {/* Kontak Kami Section */}
        <div>
          <h3 className="text-lg font-semibold text-white">Kontak Kami</h3>
          <div className="flex flex-col gap-3 mt-4 text-slate-400">
            <p className="flex items-start gap-3">
              <SlLocationPin className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
              <span>
                Jl. Baru Puspa Negara No.49, Puspanegara, Kec. Citeureup,
                Kabupaten Bogor, Jawa Barat 16810
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-700 mt-12 pt-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} KKN KELOMPOK 30 Desa Puspanegara. All
        rights reserved.
      </div>
    </div>
  );
};

export default Footer;
