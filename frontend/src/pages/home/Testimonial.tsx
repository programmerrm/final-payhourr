import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';

export const Testimonial: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(1);
    return (
        <section className="py-8 lg:py-10 !h-screen">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5">
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                    <h2 className="text-center text-3xl xl:text-8xl text-[#001429] font-bold">Testimonial</h2>
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            className="mySwiper"
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 3,
                                },
                                640: {
                                    slidesPerView: 1,
                                },
                            }}
                        >
                            {[0, 1, 2, 3].map((slideIndex) => (
                                <SwiperSlide key={slideIndex}>
                                    <div
                                        className={`w-full ${slideIndex === activeIndex + 1 ? "bg-[#ED1B24]" : "bg-black"
                                            } transition-all duration-300 rounded-3xl text-white`}
                                    >
                                        <div className="pt-5 md:pt-8 px-2.5 md:px-3 rounded-tl-4xl rounded-tr-4xl overflow-hidden space-y-3 md:space-y-5">
                                            <h3 className="font-bold text-xl text-center">Previous buyer's feedback</h3>
                                            <p className="text-sm md:text-base">
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, porro blanditiis.
                                            </p>
                                            <div className="size-20 flex items-center justify-center bg-white rounded-full -mb-4 p-1 mx-auto">
                                                <img className="size-full rounded-full object-cover" src="./profile.jpg" alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center">
                                                {Array(5).fill(0).map((_, i) => (
                                                    <img key={i} className="size-5" src="./star-svgrepo-com.svg" alt="star" />
                                                ))}
                                            </div>
                                            <h4 className="text-center text-xl font-bold text-[#001429]">Payhourr</h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="bg-[url('./testimonial-bg.jpg')] bg-no-repeat bg-cover bg-center h-[120px] mt-5"></div>
        </section>
    );
}
