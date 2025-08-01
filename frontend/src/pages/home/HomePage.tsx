import { Footer } from "../../components/footer/Footer";
import { Buyer } from "./Buyer";
import { Seller } from "./Seller";
import { Header } from "../../components/header/Header";
import { Banner } from "./Banner";

export default function HomePage() {
    return (
        <main className="relative w-full h-screen">
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
