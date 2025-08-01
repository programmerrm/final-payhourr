import { useMatches } from "react-router-dom";

type RouteHandle = {
    title?: string;
};

export const TopBar: React.FC = () => {
    const matches = useMatches();

    const currentTitle = matches.find((match) => {
        const handle = match.handle as RouteHandle;
        return !!handle?.title;
    })?.handle as RouteHandle | undefined;

    return (
        <div className="flex justify-between items-center mb-6 gap-x-4">
            <h2 className="text-2xl font-bold shrink-0" id="tab-title">
                {currentTitle?.title}
            </h2>
            <div>
                <button className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    Icon
                </button>
            </div>
        </div>
    );
}
