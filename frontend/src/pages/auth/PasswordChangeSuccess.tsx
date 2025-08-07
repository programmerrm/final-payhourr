import { useDispatch } from "react-redux";
import { toggleAuthForm, toggleForm } from "../../redux/features/status/statusSlice";

export default function PasswordChangeSuccess() {
    const dispatch = useDispatch();

    const handleLoginClick = () => {
        dispatch(toggleAuthForm());
        dispatch(toggleForm("login"));
    };

    return (
        <section className="relative w-full h-screen bg-black flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-md w-full text-center">
                <div className="flex flex-col items-center space-y-4">

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Password Changed!</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        Your password has been successfully updated. You can now log in with your new credentials.
                    </p>
                    <button
                        onClick={handleLoginClick}
                        type="button"
                        className="mt-4 bg-black text-white text-sm md:text-base px-6 py-2.5 rounded-xl hover:bg-gray-800 transition"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </section>
    );
}
