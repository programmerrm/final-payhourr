import React from "react";
import BuyerBg from "../../assets/images/buyer-bg.jpg";
import BuyerImg from "../../assets/images/buyer.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { toggleAuthForm, toggleForm } from "../../redux/features/status/statusSlice";
import { motion, type Variants, easeOut } from "framer-motion";

export const Buyer: React.FC = () => {
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

  const textVariant: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } }
  };

  const imageVariant: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } }
  };

  return (
    <section
      className="bg-no-repeat bg-right-top bg-cover lg:bg-center py-8 lg:py-10 flex items-center"
      style={{ backgroundImage: `url(${BuyerBg})` }}
    >
      <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 flex items-center gap-5 flex-col-reverse lg:flex-row">
        <motion.div
          className="lg:w-1/2 space-y-2.5 md:space-y-3"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl xl:text-8xl text-[#001429] font-bold">
            Trust Every Deal Buy with Confidence.
          </h2>
          <p className="text-sm md:text-base font-semibold text-[#001429]">
            Securely order the products or services you need. Payhourr holds payments in advance so that every transaction is worry-free.
          </p>
          <button
            className="inline-block py-2.5 px-4 rounded text-white text-sm md:text-base font-medium bg-[#ED1B24] transition-all ease-linear duration-300 hover:bg-[#1F2942]"
            type="button"
            onClick={() => handleRoleClick("buyer")}
          >
            Become a Buyer
          </button>
        </motion.div>
        <motion.div
          className="lg:w-1/2"
          variants={imageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img className="w-full h-64 lg:h-auto" src={BuyerImg} alt="Buyer" />
        </motion.div>
      </div>
    </section>
  );
};
