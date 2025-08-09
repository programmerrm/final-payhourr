import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SellerBg from "../../assets/images/seller-bg.jpg";
import SellerImg from "../../assets/images/seller.png";
import { toggleForm } from "../../redux/features/status/statusSlice";
import type { RootState } from "../../redux/store";

export const Seller: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const handleLoginForm = () => {
    dispatch(toggleForm("login"));
  };
  return (
    <section className="bg-no-repeat bg-right-top bg-cover lg:bg-center py-8 lg:py-10 flex items-center" style={{ backgroundImage: `url(${SellerBg})` }}>
      <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 flex items-center gap-5 flex-col-reverse lg:flex-row">
        <div className="lg:w-1/2 space-y-2.5 md:space-y-3">
          <h2 className="text-2xl xl:text-8xl text-[#ED1B24] font-bold">Get paid first, then start working.</h2>
          <p className="text-sm md:text-base font-semibold text-[#001429]">
            Sell your products or services with advance payment confirmation. Hassle-free deals, return guarantees, and the best solution for a seller are all now on Payhourr.
          </p>

          {auth?.user ? (
            <>
              <Link
                className="inline-block py-2.5 px-4 rounded text-white text-sm md:text-base font-medium bg-[#001429] transition-all ease-linear duration-300 hover:bg-[#ED1B24]"
                type="button"
                to={`/dashboard/${auth?.user?.username}/`}
              >
                Become a Seller
              </Link>
            </>
          ) : (
            <>
              <button
                className="inline-block py-2.5 px-4 rounded text-white text-sm md:text-base font-medium bg-[#001429] transition-all ease-linear duration-300 hover:bg-[#ED1B24]"
                type="button"
                onClick={handleLoginForm}
              >
                Become a Seller
              </button>
            </>
          )}
        </div>
        <div className="lg:w-1/2">
          <img className="w-full h-64 lg:h-auto" src={SellerImg} alt="" />
        </div>
      </div>
    </section>
  );
};
