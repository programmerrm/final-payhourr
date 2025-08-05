import React from "react";
import BuyerBg from "../../assets/images/buyer-bg.png";
import BuyerImg from "../../assets/images/buyer.png";

export const Buyer: React.FC = () => {
  return (
    <section className="bg-no-repeat bg-right-top bg-cover lg:bg-center py-8 lg:py-10 flex items-center" style={{ backgroundImage: `url(${BuyerBg})` }}>
      <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 flex items-center gap-5 flex-col-reverse lg:flex-row">
        <div className="lg:w-1/2 space-y-2.5 md:space-y-3">
          <h2 className="text-2xl xl:text-8xl text-[#001429] font-bold">Trust Every Deal Buy with Confidence.</h2>
          <p className="text-sm md:text-base font-semibold text-[#001429]">
            Securely order the products or services you need. Payhourr holds payments in advance so that every transaction is worry-free.
          </p>
          <button className="inline-block py-2.5 px-4 rounded text-white text-sm md:text-base font-medium bg-[#ED1B24] transition-all ease-linear duration-300 hover:bg-[#1F2942]" type="button">
            Become a Buyer
          </button>
        </div>
        <div className="lg:w-1/2">
          <img className="w-full h-64 lg:h-auto" src={BuyerImg} alt="" />
        </div>
      </div>
    </section>
  );
};
