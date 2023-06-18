import AppLayout from "@/layouts/AppLayout";
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
const monteserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <main className={`${monteserrat.variable} font-montserrat`}>
      {router.pathname.includes("admin") ? (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </main>
  );
}
