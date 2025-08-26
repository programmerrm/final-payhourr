import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/images/png-color.png";
import { useAddRegisterUserMutation } from "../../redux/features/auth/authApi";
import { resetForms, toggleForm } from "../../redux/features/status/statusSlice";
import type { RegisterProps } from "../../types/auth/RegisterProps";
import { ReactIcons } from "../../utils/ReactIcons";
import { Field } from "../field/field";
import { SellerRegisterForm } from "../auth/SellerRegisterForm";
import { BuyerRegisterForm } from "../auth/BuyerRegisterForm";

export const RegisterForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<RegisterProps>({ defaultValues: { role: "buyer" } }); // ✅ default buyer

    const [nidFrontPreview, setNidFrontPreview] = useState<string | null>(null);
    const [nidBackPreview, setNidBackPreview] = useState<string | null>(null);
    const [show, setShow] = useState({ password: false, confirm: false });

    const selectedRole = watch("role");
    const [addRegisterUser] = useAddRegisterUserMutation();
    const dispatch = useDispatch();
    const { IoCloseSharp, IoMdEye, IoMdEyeOff } = ReactIcons;

    const toggleVisibility = (field: "password" | "confirm") => {
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back") => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (type === "front") {
            setValue("nid_front_side", files);
            setNidFrontPreview(URL.createObjectURL(files[0]));
        } else {
            setValue("nid_back_side", files);
            setNidBackPreview(URL.createObjectURL(files[0]));
        }
    };

    const onSubmitForm = async (formData: RegisterProps) => {
        if (formData.role === "seller") {
            if (!formData.nid_front_side || !formData.nid_back_side) {
                toast.error("Please upload both NID front and back files.");
                return;
            }
        }

        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("first_name", formData.first_name);
        formDataToSend.append("last_name", formData.last_name);


        if (formData.role === "seller") {
            formDataToSend.append("nid_card_number", formData.nid_card_number);
            formDataToSend.append("date_of_birth", formData.date_of_birth);
            formDataToSend.append("number", formData.number || "");
            formDataToSend.append("payment_number", formData.payment_number || "");
            formDataToSend.append("nid_front_side", formData.nid_front_side[0]);
            formDataToSend.append("nid_back_side", formData.nid_back_side[0]);
        }

        formDataToSend.append("password", formData.password);
        formDataToSend.append("confirm_password", formData.confirm_password);
        formDataToSend.append("role", formData.role);
        formDataToSend.append("terms_accept", String(formData.terms_accept));

        try {
            await addRegisterUser(formDataToSend).unwrap();
            reset();
            dispatch(toggleForm("login"));
            toast.success("Registration successful. Please login.");
        } catch (error: any) {
            const errorData = error?.data;
            const errors = errorData?.errors;
            if (errors && typeof errors === "object") {
                const firstKey = Object.keys(errors)[0];
                const firstErrorMessage = errors[firstKey]?.[0];
                toast.error(firstErrorMessage);
            } else {
                toast.error("No structured errors found.");
            }
        }
    };


    const handleCloseForm = () => {
        dispatch(resetForms());
    };

    const handleSwitchToLogin = () => {
        dispatch(toggleForm("login"));
    };

    return (
        <div className="flex flex-col gap-y-5 py-6 px-2 sm:py-10 sm:px-8 w-full max-w-2xl shadow bg-white rounded-2xl relative mx-auto overflow-y-auto max-h-[90vh] scrollbar-hidden">
            <button
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex justify-center items-center"
                type="button"
                onClick={handleCloseForm}
            >
                <IoCloseSharp className="text-2xl" />
            </button>

            <Link
                className="flex justify-center items-center w-fit mx-auto"
                to="/"
                onClick={handleCloseForm}
            >
                <img className="w-28 md:w-40" src={Logo} alt="" />
            </Link>

            <h2 className="text-3xl font-bold text-center pb-5">Register Form</h2>

            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full"
                onSubmit={handleSubmit(onSubmitForm)}
            >
                {/* Role Selection */}
                <div className="flex flex-col col-span-full">
                    <div className="flex gap-x-5">
                        <label className="flex items-center gap-x-2.5 cursor-pointer">
                            <input
                                className="w-4 h-4"
                                type="radio"
                                value="buyer"
                                {...register("role", { required: "Select your role." })}
                                checked={selectedRole === "buyer"}
                                onChange={() => setValue("role", "buyer")}
                            />
                            Buyer
                        </label>
                        <label className="flex items-center gap-x-2.5 cursor-pointer">
                            <input
                                className="w-4 h-4"
                                type="radio"
                                value="seller"
                                {...register("role", { required: "Select your role." })}
                                checked={selectedRole === "seller"}
                                onChange={() => setValue("role", "seller")}
                            />
                            Seller
                        </label>
                    </div>
                    {errors.role && (
                        <p className="text-[#ED1B24] text-sm" role="alert">
                            {errors.role.message}
                        </p>
                    )}
                </div>
                {/* Common fields */}
                <div className="flex flex-col gap-y-1.5">
                    <Field label="Username / Domain name" error={errors.username}>
                        <input
                            {...register("username", { required: "Username is required." })}
                            type="text"
                            placeholder="username / domain name"
                            className="text-base font-medium py-2.5 px-5 rounded-full border outline-none"
                        />
                    </Field>
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <Field label="Email" error={errors.email}>
                        <input
                            {...register("email", { required: "Email is required." })}
                            type="email"
                            placeholder="Enter your email"
                            className="text-base font-medium py-2.5 px-5 rounded-full border outline-none"
                        />
                    </Field>
                </div>
                {/* Role Based Forms */}
                <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedRole === "buyer" && (
                        <BuyerRegisterForm register={register} errors={errors} />
                    )}
                    {selectedRole === "seller" && (
                        <SellerRegisterForm
                            register={register}
                            errors={errors}
                            handleFileChange={handleFileChange}
                            nidFrontPreview={nidFrontPreview}
                            nidBackPreview={nidBackPreview}
                        />
                    )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-y-1">
                    <Field label="Password" error={errors.password}>
                        <div className="w-full relative">
                            <input
                                {...register("password", { required: "Password is required." })}
                                type={show.password ? "text" : "password"}
                                placeholder="Enter your password"
                                className="text-base font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                                onClick={() => toggleVisibility("password")}
                            >
                                {show.password ? <IoMdEyeOff /> : <IoMdEye />}
                            </button>
                        </div>
                    </Field>
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col gap-y-1">
                    <Field label="Confirm Password" error={errors.confirm_password}>
                        <div className="w-full relative">
                            <input
                                {...register("confirm_password", { required: "Confirm password is required." })}
                                type={show.confirm ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="text-base font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                                onClick={() => toggleVisibility("confirm")}
                            >
                                {show.confirm ? <IoMdEyeOff /> : <IoMdEye />}
                            </button>
                        </div>
                    </Field>
                </div>
                {/* Terms */}
                <div className="col-span-full">
                    <label className="flex items-start gap-x-2.5 cursor-pointer">
                        <input
                            {...register("terms_accept", {
                                required: "You must accept the terms and conditions.",
                            })}
                            type="checkbox"
                            className="w-4 h-4 mt-1"
                        />
                        <span className="text-sm font-medium">
                            I agree to the{" "}
                            <Link to="/terms-and-conditions/" className="text-blue-500 hover:underline">
                                Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy-policy/" className="text-blue-500 hover:underline">
                                Privacy Policy
                            </Link>
                        </span>
                    </label>
                    {errors.terms_accept && (
                        <p className="text-[#ED1B24] text-sm">{errors.terms_accept.message}</p>
                    )}
                </div>
                {/* Submit */}
                <div className="col-span-full">
                    <button
                        type="submit"
                        className="text-base font-medium py-3 px-5 text-white bg-[#1F2942] hover:bg-[#ED1B24] transition rounded-full w-full"
                    >
                        Register
                    </button>
                </div>
            </form>
            <div className="flex justify-center items-center mt-2">
                <p className="text-base">
                    Already have an account?{" "}
                    <button
                        className="text-[#1F2942] underline"
                        type="button"
                        onClick={handleSwitchToLogin}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
