import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MEDIA_URL } from "../../utils/Api";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { Field } from "../field/field";
import { toast } from "react-toastify";
import { useAddUpdateUserMutation } from "../../redux/features/user/userApi";

export const DocumentUploadForm: React.FC = () => {
    const [nidFrontPreview, setNidFrontPreview] = useState<string | null>(null);
    const [nidBackPreview, setNidBackPreview] = useState<string | null>(null);
    const auth = useSelector((state: RootState) => state.auth);
    const userId = auth?.user?.id;
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const [addUpdateUser, { isLoading }] = useAddUpdateUserMutation();

    const { data: userData } = useGetUserQuery(userId!);
    const user = userData?.data;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            if (field === "nid_front_side") {
                setNidFrontPreview(previewUrl);
            } else if (field === "nid_back_side") {
                setNidBackPreview(previewUrl);
            }
            setValue(field, file);
        }
    };

    useEffect(() => {
        if (user?.nid_front_side) {
            setNidFrontPreview(`${MEDIA_URL}${user.nid_front_side}`);
        }
        if (user?.nid_back_side) {
            setNidBackPreview(`${MEDIA_URL}${user.nid_back_side}`);
        }
    }, [user]);

    const onSubmitForm = async (formData: any) => {
        try {
            const formDataToSend = new FormData();

            if (formData.nid_front_side) formDataToSend.append("nid_front_side", formData.nid_front_side);
            if (formData.nid_back_side) formDataToSend.append("nid_back_side", formData.nid_back_side);
            if (formData.nid_card_number) formDataToSend.append("nid_card_number", formData.nid_card_number);
            if (formData.date_of_birth) formDataToSend.append("date_of_birth", formData.date_of_birth);
            if (formData.number) formDataToSend.append("number", formData.number);
            if (formData.payment_number) formDataToSend.append("payment_number", formData.payment_number);


            await addUpdateUser({ id: userId!, formData: formDataToSend }).unwrap();
            toast.success("User updated successfully!");
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
        <form className="grid grid-cols-2 gap-5 w-[70%]" onSubmit={handleSubmit(onSubmitForm)}>
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
            {/* NID Front Side */}
            <div className="flex flex-col flex-wrap">
                <Field label={"NID Front Side"} error={errors.nid_front_side}>
                    <div className="flex flex-col items-center">
                        <div className="relative w-full">
                            {nidFrontPreview ? (
                                <img
                                    src={nidFrontPreview}
                                    alt="NID Front Preview"
                                    className="w-full h-36 object-cover border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition rounded-lg"
                                    onClick={() => document.getElementById("nid_front_side")?.click()}
                                />
                            ) : (
                                <div
                                    className="w-full h-36 flex items-center justify-center border-2 border-gray-200 rounded-lg text-gray-400 cursor-pointer hover:border-blue-500 transition"
                                    onClick={() => document.getElementById("nid_front_side")?.click()}
                                >
                                    No Image
                                </div>
                            )}
                            <div
                                className="flex justify-center items-center absolute bottom-1 right-1 bg-blue-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-blue-600"
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
            {/* NID Back Side */}
            <div className="flex flex-col flex-wrap">
                <Field label={"NID Back Side"} error={errors.nid_back_side}>
                    <div className="flex flex-col items-center">
                        <div className="relative w-full">
                            {nidBackPreview ? (
                                <img
                                    src={nidBackPreview}
                                    alt="NID Back Preview"
                                    className="w-full h-36 object-cover border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition rounded-lg"
                                    onClick={() => document.getElementById("nid_back_side")?.click()}
                                />
                            ) : (
                                <div
                                    className="w-full h-36 flex items-center justify-center border-2 border-gray-200 rounded-lg text-gray-400 cursor-pointer hover:border-blue-500 transition"
                                    onClick={() => document.getElementById("nid_back_side")?.click()}
                                >
                                    No Image
                                </div>
                            )}
                            <div
                                className="flex justify-center items-center absolute bottom-1 right-1 bg-blue-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-blue-600"
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
            <div className="flex flex-col flex-wrap col-span-full">
                <button
                    type="submit"
                    className="w-full py-3 bg-[#1C2640] hover:bg-[#1C2640]/80 text-white font-medium rounded-lg shadow-md transition"
                >
                    {isLoading ? "Processing..." : "Update Profile"}
                </button>
            </div>
        </form>
    );
}
