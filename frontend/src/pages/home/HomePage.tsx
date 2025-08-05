import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Banner } from "./Banner";
import { Buyer } from "./Buyer";
import { Seller } from "./Seller";

export default function HomePage() {
  return (
    <main className="relative w-full">
      <Header />
      <section className="relative w-full h-full">
        <Banner />
        <Seller />
        <Buyer />
        <Footer />
      </section>
    </main>
  );
}
