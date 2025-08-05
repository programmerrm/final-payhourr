import { Link } from "react-router-dom";
import Logo from "../../assets/images/payourr-white-logo.png";
import { useGetTermsOfServiceQuery } from "../../redux/features/configuration/configurationApi";
import { MEDIA_URL } from "../../utils/Api";

export default function TermsOfServices() {
  const { data } = useGetTermsOfServiceQuery(undefined, { refetchOnMountOrArgChange: true });
  return (
     <section className="fixed right-0 w-full h-screen z-[99999] top-0 left-0 py-8 lg:py-10 bg-[#001429] text-white flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full max-w-[95%] sm:max-w-4/5 h-[90%] container mx-auto px-2.5 lg:px-5 overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col py-6 px-2 sm:py-10 sm:px-8 w-full rounded-2xl mx-auto overflow-y-auto max-h-[90vh] scrollbar-hidden gap-y-10 md:gap-y-16 items-center justify-start h-full">
          <Link to="/">
            <img className="w-40 md:w-48" src={data?.logo ? `${MEDIA_URL}${data?.logo}` : Logo} alt="payhourr" />
          </Link>
          <div className="flex flex-col justify-start items-start w-full gap-y-2.5 md:w-1/2">
            <h2 className="text-xl md:text-2xl font-bold mb-3.5">{data?.title}</h2>
            <p>{data?.short_title}</p>
            <div className="flex flex-col pl-[2%]">
              <ul className="text-sm md:text-base list-disc list-inside space-y-3.5">
                {data?.items?.map((item: any) => {
                  return <li key={item.id}>{item.item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
