import React from "react";

export const PageLoading:React.FC = () => {
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen bg-[#001429] text-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full h-full">
                <div className="flex flex-col flex-wrap gap-y-10 md:gap-y-16 items-center justify-center w-full h-full">
                    <p className="text-white text-base font-medium">Loadin...</p>
                </div>
            </div>
        </section>
    );
}
