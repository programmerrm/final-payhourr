import { useParams } from "react-router-dom";
import { ConfirmPasswordForm } from "../../components/forms/ConfirmPasswordForm";

export default function ConfirmPassword() {
    const { uidb64, token } = useParams();
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen bg-black">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full h-full flex items-center justify-center overflow-auto">
                <div className="bg-white rounded-lg p-6 shadow w-full lg:w-[30%]">
                    <div className="text-center space-y-1.5 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Confirm Password?</h2>
                        <p className="mt-1 text-gray-500 text-sm">Enter your new password</p>
                    </div>
                    <ConfirmPasswordForm uidb64={uidb64 || ""} token={token || ""} />
                </div>
            </div>
        </section>
    );
}
