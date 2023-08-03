import "@/styles/globals.css";
import "@/styles/custom-swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
