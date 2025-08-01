import { Link } from "react-router-dom";
import Logo from "../../assets/images/payourr-white-logo.png";
import { MEDIA_URL } from "../../utils/Api";
import { useGetTermsAndConditionsQuery } from "../../redux/features/configuration/configurationApi";

export default function TermsAndConditions() {
    const { data } = useGetTermsAndConditionsQuery(undefined, { refetchOnMountOrArgChange: true });
    return (
        <section className="relative top-0 left-0 right-0 w-full py-10 bg-[#001429] text-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full h-full">
                <div className="flex flex-col flex-wrap gap-y-10 items-center justify-center w-full h-full">
                    <Link to="/">
                        <img className="w-40 md:w-48" src={data?.logo ? (`${MEDIA_URL}${data?.logo}`) : Logo} alt="payhourr" />
                    </Link>
                    <div className="flex flex-col flex-wrap justify-start items-start gap-y-4 w-full">
                        <h2 className="text-2xl font-bold">{data?.title}</h2>
                        <div className="flex flex-col gap-y-5 flex-wrap pl-[2%]">
                            <p>{data?.short_description}</p>

                            {data?.items?.map((item: any) => {
                                return (
                                    <div key={item.id}>
                                        <h3 className="text-xl font-bold">{item.item}</h3>
                                        <div>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
