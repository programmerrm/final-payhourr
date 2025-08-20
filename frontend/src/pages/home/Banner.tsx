import type React from "react";
import BannerVideo from "../../assets/videos/banner-video.mp4";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { toggleAuthForm, toggleForm } from "../../redux/features/status/statusSlice";
import { toast } from "react-toastify";

export const Banner: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        dispatch(toggleAuthForm());
        dispatch(toggleForm("login"));
    };

    const handleRoleClick = (role: "buyer" | "seller") => {
        if (!auth) {
            handleLoginClick();
            return;
        }

        if (auth.role === role) {
            navigate(`/dashboard/${auth.username}/`);
        } else {
            toast.warning(`Your role is ${auth.role}, you cannot access ${role}.`);
        }
    };

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
                    <h1 className="text-center text-[26px] sm:text-3xl md:text-[80px] font-bold w-[80%] leading-[36px] md:leading-[90px]">
                        Securely connect with sellers Pay after you're satisfied.
                    </h1>

                    <div className="flex flex-row flex-wrap justify-center items-center gap-x-5 md:gap-x-10 w-full">
                        <button
                            type="button"
                            onClick={() => handleRoleClick("buyer")}
                            className="text-base md:text-lg font-medium py-2.5 md:py-3.5 px-10 md:px-16 rounded bg-[#ED1B24]/70 transition-all ease-linear duration-300 hover:bg-[#1F2942]"
                        >
                            Buyer
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleClick("seller")}
                            className="text-base md:text-lg font-medium py-2.5 md:py-3.5 px-10 md:px-16 rounded bg-[#1F2942]/70 transition-all ease-linear duration-300 hover:bg-[#ED1B24]"
                        >
                            Seller
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
