import React, { useState } from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import { ReactIcons } from "../../utils/ReactIcons";
import { useAddPasswordChangeMutation } from "../../redux/features/user/userApi";
import { toast } from "react-toastify";

export const PasswordChangeForm: React.FC = () => {
    const [show, setShow] = useState({
        old_password: false,
        new_password: false,
        confirm_password: false,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [addPasswordChange, { isLoading }] = useAddPasswordChangeMutation();

    const { IoMdEye, IoMdEyeOff } = ReactIcons;

    const onSubmitForm = async (formData: any) => {
        try {
            await addPasswordChange(formData).unwrap();
            toast.success("Password chnage successfully");
            reset();
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
    };

    return (
        <form
            className="flex flex-col gap-4 w-[500px]"
            onSubmit={handleSubmit(onSubmitForm)}
        >
            <Field label={"Old Password"} error={errors.old_password}>
                <div className="relative flex items-center">
                    <input
                        {...register("old_password", {
                            required: "Old password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="py-2 px-3 pr-10 outline-none rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                        type={show.old_password ? "text" : "password"}
                        id="old_password"
                        placeholder="********"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShow((prev) => ({
                                ...prev,
                                old_password: !prev.old_password,
                            }))
                        }
                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                    >
                        {show.old_password ? <IoMdEyeOff /> : <IoMdEye />}
                    </button>
                </div>
            </Field>

            <Field label={"New Password"} error={errors.new_password}>
                <div className="relative flex items-center">
                    <input
                        {...register("new_password", {
                            required: "New password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="py-2 px-3 pr-10 outline-none rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                        type={show.new_password ? "text" : "password"}
                        id="new_password"
                        placeholder="********"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShow((prev) => ({
                                ...prev,
                                new_password: !prev.new_password,
                            }))
                        }
                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                    >
                        {show.new_password ? <IoMdEyeOff /> : <IoMdEye />}
                    </button>
                </div>
            </Field>
            <Field label={"Confirm Password"} error={errors.confirm_password}>
                <div className="relative flex items-center">
                    <input
                        {...register("confirm_password", {
                            required: "Confirm password is required",
                            validate: (value, formValues: any) =>
                                value === formValues.new_password ||
                                "Passwords do not match",
                        })}
                        className="py-2 px-3 pr-10 outline-none rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                        type={show.confirm_password ? "text" : "password"}
                        id="confirm_password"
                        placeholder="********"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShow((prev) => ({
                                ...prev,
                                confirm_password: !prev.confirm_password,
                            }))
                        }
                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                    >
                        {show.confirm_password ? <IoMdEyeOff /> : <IoMdEye />}
                    </button>
                </div>
            </Field>
            <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition"
            >
                {isLoading ? "Processing..." : "Submit"}
            </button>
        </form>
    );
}
