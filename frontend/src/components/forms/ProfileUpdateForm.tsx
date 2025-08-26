import React, { useState, useEffect } from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { MEDIA_URL } from "../../utils/Api";
import { useAddUpdateUserMutation } from "../../redux/features/user/userApi";
import { toast } from "react-toastify";

export const ProfileUpdateForm: React.FC = () => {
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const [addUpdateUser, { isLoading }] = useAddUpdateUserMutation();
    const { data: userData, refetch, isLoading: userDataLoading } = useGetUserQuery(userId!, {
        refetchOnMountOrArgChange: true,
    });
    const user = userData?.data;

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [nidFrontPreview, setNidFrontPreview] = useState<string | null>(null);
    const [nidBackPreview, setNidBackPreview] = useState<string | null>(null);

    useEffect(() => {
        if (user?.image) {
            setImagePreview(`${MEDIA_URL}${user.image}`);
        }
        if (user?.nid_front_side) {
            setNidFrontPreview(`${MEDIA_URL}${user.nid_front_side}`);
        }
        if (user?.nid_back_side) {
            setNidBackPreview(`${MEDIA_URL}${user.nid_back_side}`);
        }
    }, [user]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            if (field === "image") {
                setImagePreview(previewUrl);
            } else if (field === "nid_front_side") {
                setNidFrontPreview(previewUrl);
            } else if (field === "nid_back_side") {
                setNidBackPreview(previewUrl);
            }
            setValue(field, file);
        }
    };

    const onSubmitForm = async (formData: any) => {
        try {
            const formDataToSend = new FormData();
            if (formData.first_name) formDataToSend.append("first_name", formData.first_name);
            if (formData.last_name) formDataToSend.append("last_name", formData.last_name);
            if (formData.nid_card_number) formDataToSend.append("nid_card_number", formData.nid_card_number);
            if (formData.date_of_birth) formDataToSend.append("date_of_birth", formData.date_of_birth);
            if (formData.number) formDataToSend.append("number", formData.number);
            if (formData.payment_number) formDataToSend.append("payment_number", formData.payment_number);
            if (formData.address) formDataToSend.append("address", formData.address);
            if (formData.zip_code) formDataToSend.append("zip_code", formData.zip_code);
            if (formData.country) formDataToSend.append("country", formData.country);
            if (formData.gender) formDataToSend.append("gender", formData.gender);

            if (formData.image) formDataToSend.append("image", formData.image);
            if (formData.nid_front_side) formDataToSend.append("nid_front_side", formData.nid_front_side);
            if (formData.nid_back_side) formDataToSend.append("nid_back_side", formData.nid_back_side);

            await addUpdateUser({ id: userId!, formData: formDataToSend }).unwrap();
            toast.success("User updated successfully!");
            reset();
            refetch();
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

    if (userDataLoading) {
        return (
            <div className="sm:w-[500px] sm:h-[500px] flex flex-col gap-4 p-5 animate-pulse">
                <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <div key={idx} className="h-12 bg-gray-200 rounded"></div>
                    ))}
                </div>
                <div className="h-12 bg-gray-200 rounded mt-4"></div>
            </div>
        );
    }

    return (
        <form className="flex flex-col gap-4 sm:w-[500px] sm:h-[500px] mx-auto overflow-y-scroll scrollbar-hidden" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex flex-col flex-wrap">
                <Field label={""} error={errors.image}>
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={imagePreview || "/placeholder-profile.png"}
                                alt="Profile Preview"
                                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition"
                                onClick={() => document.getElementById("image")?.click()}
                            />
                            <div
                                className="flex justify-center items-center absolute bottom-0 right-0 bg-blue-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-blue-600"
                                onClick={() => document.getElementById("image")?.click()}
                            >
                                ✎
                            </div>
                        </div>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            style={{ display: "none" }}
                            onChange={(e) => handleImageChange(e, "image")}
                        />
                    </div>
                </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 ml-0.5 mr-0.5">
                <div className="flex flex-col flex-wrap">
                    <Field label={"First Name (NID card)"} error={errors.first_name}>
                        <input
                            {...register("first_name")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="text"
                            name="first_name"
                            id="first_name"
                            defaultValue={user?.first_name}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"Last Name (NID card)"} error={errors.last_name}>
                        <input
                            {...register("last_name")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="text"
                            name="last_name"
                            id="last_name"
                            defaultValue={user?.last_name}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"NID card number"} error={errors.nid_card_number}>
                        <input
                            {...register("nid_card_number")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="text"
                            name="nid_card_number"
                            id="nid_card_number"
                            defaultValue={user?.nid_card_number}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"Date of birth (NID card)"} error={errors.date_of_birth}>
                        <input
                            {...register("date_of_birth")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="date"
                            name="date_of_birth"
                            id="date_of_birth"
                            defaultValue={user?.date_of_birth}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"Number"} error={errors.number}>
                        <input
                            {...register("number")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="text"
                            id="number"
                            name="number"
                            defaultValue={user?.number}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"Payment Number"} error={errors.payment_number}>
                        <input
                            {...register("payment_number")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="text"
                            name="payment_number"
                            id="payment_number"
                            defaultValue={user?.payment_number}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"NID Front Side"} error={errors.nid_front_side}>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full">
                                <img
                                    src={nidFrontPreview || "/placeholder-nid.png"}
                                    alt="NID Front Preview"
                                    className="w-full h-36 object-cover border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition rounded-lg"
                                    onClick={() => document.getElementById("nid_front_side")?.click()}
                                />
                                <div
                                    className="flex justify-center items-center absolute bottom-0 right-0 bg-blue-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-blue-600"
                                    onClick={() => document.getElementById("nid_front_side")?.click()}
                                >
                                    ✎
                                </div>
                            </div>
                            <input
                                type="file"
                                id="nid_front_side"
                                name="nid_front_side"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageChange(e, "nid_front_side")}
                            />
                        </div>
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"NID Back Side"} error={errors.nid_back_side}>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full">
                                <img
                                    src={nidBackPreview || "/placeholder-nid.png"}
                                    alt="NID Back Preview"
                                    className="w-full h-36 object-cover border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition rounded-lg"
                                    onClick={() => document.getElementById("nid_back_side")?.click()}
                                />
                                <div
                                    className="flex justify-center items-center absolute bottom-0 right-0 bg-blue-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-blue-600"
                                    onClick={() => document.getElementById("nid_back_side")?.click()}
                                >
                                    ✎
                                </div>
                            </div>
                            <input
                                type="file"
                                id="nid_back_side"
                                name="nid_back_side"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageChange(e, "nid_back_side")}
                            />
                        </div>
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"Address"} error={errors.address}>
                        <input
                            {...register("address")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="text"
                            name="address"
                            id="address"
                            defaultValue={user?.address}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"Zip code"} error={errors.zip_code}>
                        <input
                            {...register("zip_code")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="text"
                            name="zip_code"
                            id="zip_code"
                            defaultValue={user?.zip_code}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"Country"} error={errors.country}>
                        <input
                            {...register("country")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            type="text"
                            name="country"
                            id="country"
                            defaultValue={user?.country}
                        />
                    </Field>
                </div>
                <div className="flex flex-col flex-wrap">
                    <Field label={"Gender"} error={errors.gender}>
                        <select
                            {...register("gender")}
                            className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition"
                            name="gender"
                            id="gender"
                            defaultValue={user?.gender || ""}
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </Field>
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition"
            >
                {isLoading ? "Processing..." : "Update Profile"}
            </button>
        </form>
    );
}
