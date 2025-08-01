import React from "react"
import { Link } from "react-router-dom";
import Logo from "../../assets/images/png-color.png";
import SSL from "../../assets/images/sslcommerz-pay-with-logo.png";
import AppStore from "../../assets/images/app-store.png";
import GooglePay from "../../assets/images/google-pay.png";
import BG from "../../assets/images/footer-bg.jpg";
import { ReactIcons } from "../../utils/ReactIcons";

export const Footer: React.FC = () => {
    const { FaFacebook, FaInstagram, FaLinkedin } = ReactIcons;
    return (
        <footer
            className="!h-screen text-white pt-15 pb-5 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <div className="max-w-screen-2xl conatiner mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap w-full py-20">
                    <div className="flex flex-col flex-wrap w-full">
                        <div className="flex flex-col flex-wrap gap-y-8 w-full h-full">
                            <Link to="/">
                                <img className="w-40" src={Logo} alt="" />
                            </Link>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                                <div className="flex flex-col gap-y-6 text-black text-xl font-normal capitalize">
                                    <h3 className="text-2xl font-bold text-black">Company</h3>
                                    <ul className="space-y-1.5 font-medium text-base">
                                        <li>
                                            <Link to="/what-is-payhourr/">What is PayHourr?</Link>
                                        </li>
                                        <li>
                                            <Link to="/why-use-payhourr/">Why Use PayHourr?</Link>
                                        </li>
                                        <li>
                                            <Link to="/our-mission/">Our Mission</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact/">Contact</Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-y-6 text-black text-xl font-normal capitalize">
                                    <h3 className="text-2xl font-bold text-black">
                                        How it Works
                                    </h3>
                                    <ul className="space-y-1.5 font-medium text-base">
                                        <li>
                                            <Link to="/buyer-guide/">Buyer Guide </Link>
                                        </li>
                                        <li>
                                            <Link to="/seller-guide/">Seller Guide </Link>
                                        </li>
                                        <li>
                                            <Link to="/secure-payment-process/">Secure Payment Process </Link>
                                        </li>
                                        <li>
                                            <Link to="/faq/">FAQ</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-y-6 text-black text-xl font-normal capitalize">
                                    <h3 className="text-2xl font-bold text-black">Legal</h3>
                                    <ul className="space-y-1.5 font-medium text-base">
                                        <li>
                                            <Link to="/terms-of-services/">Terms of Service </Link>
                                        </li>
                                        <li>
                                            <Link to="/privacy-policy/">Privacy Policy </Link>
                                        </li>
                                        <li>
                                            <Link to="/dispute-policy/">Dispute Policy </Link>
                                        </li>
                                        <li>
                                            <Link to="/refund-policy/">Refund Policy </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-y-6 text-black text-xl font-normal capitalize">
                                    <h3 className="text-2xl font-bold text-black">
                                        Get in Touch
                                    </h3>
                                    <ul className="space-y-2.5 font-medium text-base">
                                        <li className="flex flex-row flex-wrap items-center gap-x-5">
                                            <Link to="/">
                                                <FaFacebook className="text-2xl" />
                                            </Link>
                                            <Link to="/">
                                                <FaInstagram className="text-2xl" />
                                            </Link>
                                            <Link to="/">
                                                <FaLinkedin className="text-2xl" />
                                            </Link>
                                        </li>
                                        <li className="pt-2">Newsletter Subscribe</li>
                                        <li>
                                            <form
                                                action=""
                                                className="flex border-4 border-black rounded-lg mt-2"
                                            >
                                                <input
                                                    className="w-full focus:outline-0 px-4 py-2"
                                                    type="text"
                                                    placeholder="Email or Number..."
                                                />
                                                <button
                                                    className="py-2.5 px-4 bg-black rounded text-white text-xl font-bold cursor-pointer shrink-0"
                                                    type="submit"
                                                >
                                                    Subscribe
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Link className="inline-flex items-center justify-center" to="#">
                            <img className="w-[60%]" src={SSL} alt="" />
                        </Link>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between items-center w-full text-black mt-20">
                        <p className="text-base font-normal">
                            © 2025 Payhourr. All rights reserved. Develop by{" "}
                            <a href="https://dreamlabit.com/" target="_blank">
                                Dreamlabit
                            </a>
                            .
                        </p>
                        <div className="flex flex-col items-end gap-y-1.5">
                            <p className="text-xl font-semibold">Download Payhourr App</p>
                            <div className="flex items-center gap-x-5">
                                <Link to="#">
                                    <img className="w-[150px] rounded" src={AppStore} alt="" />
                                </Link>
                                <Link to="#">
                                    <img className="w-[150px] rounded" src={GooglePay} alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
