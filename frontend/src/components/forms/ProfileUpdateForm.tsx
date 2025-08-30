import React from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
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
        formState: { errors },
    } = useForm();

    const onSubmitForm = async (formData: any) => {
        try {
            const formDataToSend = new FormData();
            if (formData.first_name) formDataToSend.append("first_name", formData.first_name);
            if (formData.last_name) formDataToSend.append("last_name", formData.last_name);
            if (formData.address) formDataToSend.append("address", formData.address);
            if (formData.zip_code) formDataToSend.append("zip_code", formData.zip_code);
            if (formData.country) formDataToSend.append("country", formData.country);
            if (formData.gender) formDataToSend.append("gender", formData.gender);
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
            <div className="w-[500px] h-[500px] flex flex-col gap-4 p-5 animate-pulse">
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
        <form className="flex flex-col justify-center items-center gap-5 w-[600px] h-full overflow-y-scroll scrollbar-hidden" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="grid grid-cols-2 gap-5 w-full px-2.5">
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
                <div className="flex flex-col flex-wrap col-span-full">
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#1C2640] hover:bg-[#1C2640]/80 text-white font-medium rounded-lg shadow-md transition"
                    >
                        {isLoading ? "Processing..." : "Update Profile"}
                    </button>
                </div>
            </div>
        </form>
    );
}
