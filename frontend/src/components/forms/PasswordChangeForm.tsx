import React, { useState } from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import { ReactIcons } from "../../utils/ReactIcons";
import { toast } from "react-toastify";
import { useAddPasswordChangeMutation } from "../../redux/features/user/userApi";

export const PasswordChangeForm: React.FC = () => {
    const [show, setShow] = useState({
        old_password: false,
        new_password: false,
        confirm_password: false,
    });
    const [activeField, setActiveField] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [addPasswordChange, { isLoading }] = useAddPasswordChangeMutation();

    const { IoMdEye, IoMdEyeOff } = ReactIcons;

    const oldPass = watch("old_password") || "";
    const newPass = watch("new_password") || "";
    const confirmPass = watch("confirm_password") || "";

    // Password validation rules
    const validatePassword = (password: string) => ({
        length: password.length >= 6,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });

    const getStrengthScore = (password: string) => {
        const rules = validatePassword(password);
        return Object.values(rules).filter(Boolean).length;
    };

    const renderValidation = (password: string) => {
        const rules = validatePassword(password);
        const score = getStrengthScore(password);
        const percent = (score / 5) * 100;

        return (
            <div className="mt-2">
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded h-2 mb-2">
                    <div
                        className={`h-2 rounded ${percent <= 40
                                ? "bg-red-500"
                                : percent <= 60
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                        style={{ width: `${percent}%` }}
                    />
                </div>

                {/* Validation rules */}
                <ul className="text-sm space-y-1">
                    <li className={rules.length ? "text-green-600" : "text-red-500"}>
                        • At least 6 characters
                    </li>
                    <li className={rules.upper ? "text-green-600" : "text-red-500"}>
                        • At least 1 uppercase
                    </li>
                    <li className={rules.lower ? "text-green-600" : "text-red-500"}>
                        • At least 1 lowercase
                    </li>
                    <li className={rules.number ? "text-green-600" : "text-red-500"}>
                        • At least 1 number
                    </li>
                    <li className={rules.special ? "text-green-600" : "text-red-500"}>
                        • At least 1 special character
                    </li>
                </ul>
            </div>
        );
    };

    const onSubmitForm = async (formData: any) => {
        try {
            await addPasswordChange(formData).unwrap();
            toast.success("Password changed successfully");
            reset();
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

    return (
        <form
            className="flex flex-col gap-4 w-[500px]"
            onSubmit={handleSubmit(onSubmitForm)}
        >
            {/* Old Password */}
            <Field label="Current Password" error={errors.old_password}>
                <div className="relative flex flex-col gap-2">
                    <div className="relative flex items-center">
                        <input
                            {...register("old_password", {
                                required: "Old password is required",
                                validate: (value) => {
                                    const rules = validatePassword(value);
                                    if (!rules.length) return "Must be at least 6 characters";
                                    if (!rules.upper) return "Must contain an uppercase letter";
                                    if (!rules.lower) return "Must contain a lowercase letter";
                                    if (!rules.number) return "Must contain a number";
                                    if (!rules.special) return "Must contain a special character";
                                    return true;
                                },
                            })}
                            className="py-2 px-3 pr-10 outline-none rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                            type={show.old_password ? "text" : "password"}
                            placeholder="********"
                            onFocus={() => setActiveField("old_password")}
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

                    {activeField === "old_password" &&
                        oldPass.length > 0 &&
                        renderValidation(oldPass)}

                    {errors.old_password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.old_password.message as string}
                        </p>
                    )}
                </div>
            </Field>

            {/* New Password */}
            <Field label="New Password" error={errors.new_password}>
                <div className="relative flex flex-col gap-2">
                    <div className="relative flex items-center">
                        <input
                            {...register("new_password", {
                                required: "New password is required",
                                validate: (value) => {
                                    const rules = validatePassword(value);
                                    if (!rules.length) return "Must be at least 6 characters";
                                    if (!rules.upper) return "Must contain an uppercase letter";
                                    if (!rules.lower) return "Must contain a lowercase letter";
                                    if (!rules.number) return "Must contain a number";
                                    if (!rules.special) return "Must contain a special character";
                                    return true;
                                },
                            })}
                            className="py-2 px-3 pr-10 outline-none rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                            type={show.new_password ? "text" : "password"}
                            placeholder="********"
                            onFocus={() => setActiveField("new_password")}
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

                    {activeField === "new_password" &&
                        newPass.length > 0 &&
                        renderValidation(newPass)}

                    {errors.new_password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.new_password.message as string}
                        </p>
                    )}
                </div>
            </Field>

            {/* Confirm Password */}
            <Field label="Confirm Password" error={errors.confirm_password}>
                <div className="relative flex flex-col gap-2">
                    <div className="relative flex items-center">
                        <input
                            {...register("confirm_password", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === newPass || "Passwords do not match",
                            })}
                            className="py-2 px-3 pr-10 outline-none rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                            type={show.confirm_password ? "text" : "password"}
                            placeholder="********"
                            onFocus={() => setActiveField("confirm_password")}
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

                    {activeField === "confirm_password" && confirmPass.length > 0 && (
                        <p
                            className={`text-sm ${confirmPass === newPass ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {confirmPass === newPass
                                ? "✓ Passwords match"
                                : "✗ Passwords do not match"}
                        </p>
                    )}

                    {errors.confirm_password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirm_password.message as string}
                        </p>
                    )}
                </div>
            </Field>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition"
            >
                {isLoading ? "Processing..." : "Submit"}
            </button>
        </form>
    );
};
