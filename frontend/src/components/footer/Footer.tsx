import React from "react";
import { Link } from "react-router-dom";
import AppStore from "../../assets/images/app-store.png";
import GooglePay from "../../assets/images/google-pay.png";
import Logo from "../../assets/images/png-color.png";
import SSL from "../../assets/images/sslcommerz-pay-with-logo.png";
import { ReactIcons } from "../../utils/ReactIcons";
import { motion, type Variants, easeOut } from "framer-motion";

export const Footer: React.FC = () => {
    const { FaFacebook, FaInstagram, FaLinkedin } = ReactIcons;

    // Individual content animation
    const itemVariant: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
    };

    // Container for stagger effect
    const containerVariant: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    return (
        <footer className="text-white pt-16 lg:pt-24 bg-[#0d1c3b]">
            <motion.div
                className="bg-white"
                variants={containerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                    <motion.div variants={itemVariant} className="flex flex-col w-full pt-10 pb-4">
                        {/* Logo */}
                        <motion.div variants={itemVariant} className="mb-8">
                            <Link to="/">
                                <img className="w-40" src={Logo} alt="Payhourr Logo" />
                            </Link>
                        </motion.div>

                        {/* Grid columns */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10"
                            variants={containerVariant}
                        >
                            {/* Company */}
                            <motion.div variants={itemVariant} className="flex flex-col gap-y-6 text-black text-xl font-normal capitalize">
                                <h3 className="text-2xl font-bold text-black">Company</h3>
                                <ul className="space-y-1.5 font-medium text-base">
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/what-is-payhourr/">What is PayHourr?</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/why-use-payhourr/">Why Use PayHourr?</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/our-mission/">Our Mission</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/contact/">Contact</Link></li>
                                </ul>
                            </motion.div>

                            {/* How it Works */}
                            <motion.div variants={itemVariant} className="flex flex-col gap-y-6 text-black text-xl font-normal capitalize">
                                <h3 className="text-2xl font-bold text-black">How it Works</h3>
                                <ul className="space-y-1.5 font-medium text-base">
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/buyer-guide/">Buyer Guide</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/seller-guide/">Seller Guide</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/secure-payment-process/">Secure Payment Process</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/faq/">FAQ</Link></li>
                                </ul>
                            </motion.div>

                            {/* Legal */}
                            <motion.div variants={itemVariant} className="flex flex-col gap-y-6 text-black text-xl font-normal capitalize">
                                <h3 className="text-2xl font-bold text-black">Legal</h3>
                                <ul className="space-y-1.5 font-medium text-base">
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/terms-of-services/">Terms of Service</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/privacy-policy/">Privacy Policy</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/dispute-policy/">Dispute Policy</Link></li>
                                    <li><Link className="inline-block transition-all duration-300 ease-linear hover:translate-x-[10px]" to="/refund-policy/">Refund Policy</Link></li>
                                </ul>
                            </motion.div>

                            {/* Get in Touch */}
                            <motion.div variants={itemVariant} className="flex flex-col gap-y-6 text-black text-xl font-normal capitalize">
                                <h3 className="text-2xl font-bold text-black">Get in Touch</h3>
                                <ul className="space-y-2.5 font-medium text-base">
                                    <li className="flex flex-row flex-wrap items-center gap-x-5">
                                        <Link className="inline-block transition-all duration-300 ease-linear hover:-translate-y-[10px]" to="/"><FaFacebook className="text-2xl" /></Link>
                                        <Link className="inline-block transition-all duration-300 ease-linear hover:-translate-y-[10px]" to="/"><FaInstagram className="text-2xl" /></Link>
                                        <Link className="inline-block transition-all duration-300 ease-linear hover:-translate-y-[10px]" to="/"><FaLinkedin className="text-2xl" /></Link>
                                    </li>
                                    <li className="pt-2">Newsletter Subscribe</li>
                                    <li>
                                        <form action="" className="flex border-2 border-black rounded-lg mt-2">
                                            <input className="w-full focus:outline-0 px-4 py-2" type="text" placeholder="Email or Number..." />
                                            <button className="py-2.5 px-4 bg-black rounded text-white text-xl font-medium cursor-pointer shrink-0" type="submit">Subscribe</button>
                                        </form>
                                    </li>
                                </ul>
                            </motion.div>
                        </motion.div>

                        {/* SSL and bottom */}
                        <motion.div variants={itemVariant} className="mt-10 flex items-center justify-center">
                            <Link className="flex justify-center items-center" to="#"><img className="w-full md:w-[60%]" src={SSL} alt="SSL" /></Link>
                        </motion.div>

                        {/* Bottom Footer */}
                        <motion.div variants={itemVariant} className="flex flex-row flex-wrap justify-between items-center w-full text-black mt-10 md:mt-20 gap-5">
                            <p className="text-base font-normal">
                                © 2025 Payhourr. All rights reserved. Development by{" "}
                                <a className="text-blue-600 font-bold underline" href="https://dreamlabit.com/" target="_blank">
                                    Dreamlabit
                                </a>
                            </p>
                            <div className="flex flex-col items-center md:items-end gap-y-1.5">
                                <p className="text-xl font-semibold">Download Payhourr App</p>
                                <div className="flex items-center gap-x-5">
                                    <Link to="#"><img className="w-[150px] rounded" src={AppStore} alt="App Store" /></Link>
                                    <Link to="#"><img className="w-[150px] rounded" src={GooglePay} alt="Google Play" /></Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                {/* Decorative Bottom */}
                <div className="h-[50px] lg:h-[150px] bg-[#0d1c3b] [clip-path:polygon(0%_0%,50%_80%,100%_0%,100%_100%,0%_100%)]"></div>
            </motion.div>
        </footer>
    );
};
