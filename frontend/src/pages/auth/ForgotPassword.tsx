import { useDispatch } from "react-redux";
import { toggleAuthForm, toggleForm } from "../../redux/features/status/statusSlice";
import { ForgotPasswordForm } from "../../components/forms/ForgotPassword";
import Logo from "../../assets/images/png-color.png";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const dispatch = useDispatch();
    
    const handleLoginClick = () => {
        dispatch(toggleAuthForm());
        dispatch(toggleForm('login'));
    }
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen bg-black">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full h-full flex items-center justify-center overflow-auto">
                <div className="bg-white rounded-lg p-6 shadow w-full lg:w-[30%]">
                    <div className="text-center space-y-1.5 mb-6">
                        <Link className="w-fit mx-auto" to={"/"}>
                            <img className="w-28 md:w-40 mx-auto" src={Logo} alt="payhourr" />
                        </Link>
                        <h2 className="text-2xl font-semibold text-gray-800 mt-5">Forgot Password?</h2>
                        <p className="mt-1 text-gray-500 text-sm">Enter your email to reset password</p>
                    </div>
                    <ForgotPasswordForm />
                    <div className="text-center mt-4 text-sm text-gray-600">
                        <p>Know your password? <button className="text-purple-600 hover:underline" type="button" onClick={handleLoginClick}>Back to Login</button></p>
                    </div>
                </div>
            </div>
        </section>
    );
}
