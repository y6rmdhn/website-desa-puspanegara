import MainLayouts from "@/components/layouts/MainLayouts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";

const HomePage = () => {
  const banners = ["/carousel/DSC_0816.JPG", "/carousel/DSC_0834.JPG"];

  return (
    <MainLayouts>
      {/* Hero Section: Swiper Carousel */}
      <div className="w-full h-[50vh] md:h-[60vh] relative text-white overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="h-full"
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={banner}
                  alt={`banner-${idx}`}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    Selamat Datang di Puspanegara
                  </h1>
                  <p className="text-lg md:text-xl mt-4 max-w-2xl">
                    Temukan produk UMKM terbaik dari desa kami.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bagian Video UMKM */}
      <div className="px-4 md:px-20 py-16">
        <p className="text-sm font-semibold text-green-600">Kenali UMKM</p>
        <h2 className="text-2xl font-semibold mt-1">
          Profil UMKM Desa Puspanegara
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-prose">
          Berikut adalah video singkat mengenai UMKM di Desa Puspanegara. Simak
          video berikut untuk mengetahui bagaimana masyarakat Desa Puspanegara
          mengembangkan potensi usaha mereka!
        </p>

        <div className="mt-6">
          <iframe
            className="w-full aspect-video rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </MainLayouts>
  );
};

export default HomePage;
