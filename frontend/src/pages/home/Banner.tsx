import type React from "react";
import BannerVideo from "../../assets/videos/banner-video.mp4";
import { Link } from "react-router";

export const Banner: React.FC = () => {
    return (
        <section className="!h-screen overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={BannerVideo}
                autoPlay
                loop
                muted
                playsInline
            ></video>
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
            <div className="max-w-screen-2xl mx-auto px-2.5 lg:px-5 w-full h-full">
                <div className="relative z-20 flex flex-col items-center justify-center gap-y-6 md:gap-y-14 h-full text-white">
                    <h1 className="text-center text-[26px] sm:text-3xl md:text-[80px] font-bold w-[80%] leading-[36px] md:leading-[90px]">Securely connect with sellers Pay after you're satisfied.</h1>

                    <div className="flex flex-row flex-wrap justify-center items-center gap-x-5 md:gap-x-10 w-full">

                        <Link className="text-base md:text-lg font-medium py-2.5 md:py-3.5 px-10 md:px-16 rounded bg-[#ED1B24]" to={"/"}>Buyer</Link>
                        <Link className="text-base md:text-lg font-medium py-2.5 md:py-3.5 px-10 md:px-16 rounded bg-[#1F2942]" to={"/"}>Seller</Link>

                    </div>

                </div>
            </div>
        </section>
    );
}
