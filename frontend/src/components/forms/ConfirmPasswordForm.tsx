import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Field } from "../field/field";
import { useAddConfirmPasswordMutation } from "../../redux/features/auth/authApi";
import { ReactIcons } from "../../utils/ReactIcons";
import { useNavigate } from "react-router-dom";

interface ConfirmPasswordFormProps {
    uidb64: string;
    token: string;
}

export const ConfirmPasswordForm: React.FC<ConfirmPasswordFormProps> = ({ uidb64, token }) => {
    const nagative = useNavigate();
    const [addConfirmPassword, { isLoading }] = useAddConfirmPasswordMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { IoMdEye, IoMdEyeOff } = ReactIcons;
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmitForm = async (formData: any) => {
        try {
            const payload = {
                uidb64,
                token,
                data: {
                    new_password: formData.new_password,
                    confirm_password: formData.confirm_password,
                },
            };

            await addConfirmPassword(payload).unwrap();
            reset();
            toast.success("Password has been updated.");
            nagative("/password-change-success/");
        } catch (error: any) {
            toast.error(error?.data?.errors || "Link expired or invalid.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            {/* New Password */}
            <div className="flex flex-col gap-y-1.5 mb-4">
                <Field label="New Password" error={errors.new_password}>
                    <div className="relative">
                        <input
                            {...register("new_password", {
                                required: "New password is required",
                            })}
                            type={showNewPassword ? "text" : "password"}
                            id="new_password"
                            placeholder="********"
                            className="w-full text-black text-sm md:text-base py-3 px-3.5 border border-black rounded-xl pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-600 hover:text-black"
                        >
                            {showNewPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </button>
                    </div>
                </Field>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-y-1.5 mb-4">
                <Field label="Confirm Password" error={errors.confirm_password}>
                    <div className="relative">
                        <input
                            {...register("confirm_password", {
                                required: "Confirm password is required",
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm_password"
                            placeholder="********"
                            className="w-full text-black text-sm md:text-base py-3 px-3.5 border border-black rounded-xl pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-600 hover:text-black"
                        >
                            {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </button>
                    </div>
                </Field>
            </div>

            {/* Submit Button */}
            <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-black text-white text-sm md:text-base font-medium px-10 py-3.5 rounded-xl cursor-pointer hover:bg-gray-800 transition"
            >
                {isLoading ? "Processing..." : "Confirm"}
            </button>
        </form>
    );
};
