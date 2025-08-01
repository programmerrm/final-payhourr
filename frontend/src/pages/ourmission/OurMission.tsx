import { Link } from "react-router-dom";
import Logo from "../../assets/images/payourr-white-logo.png";
import { useGetOurMissionQuery } from "../../redux/features/configuration/configurationApi";
import { MEDIA_URL } from "../../utils/Api";

export default function OurMission() {
    const { data } = useGetOurMissionQuery(undefined, { refetchOnMountOrArgChange: true });
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen bg-[#001429] text-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full h-full">
                <div className="flex flex-col flex-wrap gap-y-10 items-center justify-center w-full h-full">
                    <Link to="/">
                        <img className="w-40 md:w-48" src={data?.logo ? (`${MEDIA_URL}${data?.logo}`) : Logo} alt="payhourr" />
                    </Link>
                    <div className="flex flex-col flex-wrap justify-start items-start gap-y-2.5 w-full">
                        <h2 className="text-2xl font-bold">Our Mission</h2>
                        <div className="flex flex-col flex-wrap pl-[2%]">
                            <p className="text-base font-normal">{data?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
