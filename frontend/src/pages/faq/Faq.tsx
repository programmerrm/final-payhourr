import { Link } from "react-router-dom";
import Logo from "../../assets/images/payourr-white-logo.png";
import { useGetFaqQuery } from "../../redux/features/configuration/configurationApi";
import { MEDIA_URL } from "../../utils/Api";

export default function Faq() {
    const { data } = useGetFaqQuery(undefined, { refetchOnMountOrArgChange: true });
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen bg-[#001429] text-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full h-full">
                <div className="flex flex-col flex-wrap gap-y-10 md:gap-y-16 items-center justify-center w-full h-full">
                    <Link to="/">
                        <img className="w-40 md:w-48" src={data?.logo ? (`${MEDIA_URL}${data?.logo}`) : Logo} alt="payhourr" />
                    </Link>
                    <div className="flex flex-col flex-wrap justify-start items-start gap-y-2.5 md:w-1/2">
                        <h2 className="text-xl md:text-2xl font-bold mb-3.5">{data?.title}</h2>
                        <p>{data?.short_title}</p>
                        <div className="flex flex-col flex-wrap pl-[2%]">
                            <ul className="text-sm md:text-base list-disc list-inside space-y-3.5">
                                {data?.items?.map((item: any) => {
                                    return <li key={item.id}>{item.item}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
