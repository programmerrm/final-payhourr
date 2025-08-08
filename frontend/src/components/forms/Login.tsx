import { Field } from "../field/field";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ReactIcons } from "../../utils/ReactIcons";
import { useDispatch } from "react-redux";
import type { LoginProps } from "../../types/auth/LoginProps";
import { resetForms, toggleForm } from "../../redux/features/status/statusSlice";
import { useAddLogingUserMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/images/png-color.png";

export const LoginForm:React.FC = () => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState<boolean>(false);
    const { AiFillEye, AiFillEyeInvisible, IoCloseSharp } = ReactIcons;

    const dispatch = useDispatch();
    const [addLogingUser] = useAddLogingUserMutation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginProps>();

    // Close the login form
    const handleCloseForm = () => {
        dispatch(resetForms());
    };

    // Switch to register form
    const handleSwitchToRegister = () => {
        dispatch(toggleForm("register"));
    };

    const onSubmitForm = async (formData: LoginProps) => {
        try {
            const { data } = await addLogingUser(formData).unwrap();
            const username = data.user.username;
            reset();
            dispatch(resetForms());
            navigate(`/dashboard/${username}/`);
            toast.success("Login successfully");
        } catch (error: any) {
            const errorData = error?.data;
            const errors = errorData?.errors;
            if (errors && typeof errors === 'object') {
                const firstKey = Object.keys(errors)[0];
                const firstErrorMessage = errors[firstKey]?.[0];
                toast.error(firstErrorMessage);
            } else {
                toast.error('No structured errors found.');
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-5 py-6 px-2 sm:py-10 sm:px-8 w-full max-w-xl bg-white rounded-2xl relative mx-auto overflow-y-auto max-h-[90vh]">
            <button
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex justify-center items-center"
                type="button"
                onClick={handleCloseForm}
            >
                <IoCloseSharp className="text-2xl" />
            </button>
            <Link className="flex justify-center items-center w-fit mx-auto" to="/" onClick={handleCloseForm}>
                <img className="w-28 md:w-40" src={Logo} alt="" />
            </Link>
            <h2 className="text-3xl font-bold text-center pb-5">Login Form</h2>
            <form className="flex flex-col gap-y-5 w-full" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="flex flex-col gap-y-1.5">
                    <Field label={"Email/username"} error={errors.identifier}>
                        <input
                            className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                            {...register("identifier", {
                                required: "Email or username is required.",
                            })}
                            type="text"
                            name="identifier"
                            id="identifier"
                            placeholder="Email/username"
                        />
                    </Field>
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <Field label={"Password"} error={errors.password}>
                        <div className="flex flex-col gap-y-1.5 relative">
                            <input
                                className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                                {...register("password", {
                                    required: "Password is required.",
                                })}
                                type={isShow ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                            <button
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                type="button"
                                onClick={() => setIsShow(!isShow)}
                            >
                                {isShow ? (
                                    <AiFillEyeInvisible className="text-xl text-gray-600" />
                                ) : (
                                    <AiFillEye className="text-xl text-gray-600" />
                                )}
                            </button>
                        </div>
                    </Field>
                </div>
                <div>
                    <Link className="text-[#1F2942] text-base font-medium underline" to={"/forgot-password/"} onClick={handleCloseForm}>Forgot Password</Link>
                </div>
                <div className="flex flex-col">
                    <button className="text-base font-medium py-3 px-5 transition-all duration-300 ease-linear text-white bg-[#1F2942] hover:bg-[#ED1B24] rounded-full border cursor-pointer" type="submit">
                        Login
                    </button>
                </div>
            </form>
            <div className="flex flex-col justify-center items-center w-full">
                <p className="text-base font-medium">
                    Don't have an account?{" "}
                    <button className="text-[#1F2942] underline" type="button" onClick={handleSwitchToRegister}>
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};
