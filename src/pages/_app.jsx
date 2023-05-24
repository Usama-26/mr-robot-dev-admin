import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
const monteserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export default function App({ Component, pageProps }) {
  return (
    <main className={`${monteserrat.variable} font-montserrat`}>
      <Component {...pageProps} />
    </main>
  );
}
