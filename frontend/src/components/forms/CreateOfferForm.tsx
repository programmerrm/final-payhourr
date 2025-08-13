import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../field/field";
import { toast } from "react-toastify";
import { useAddInitPaymentMutation } from "../../redux/features/orders/ordersApi";
import { useDispatch } from "react-redux";
import { setOrderData } from "../../redux/features/orders/orderSlice";

interface UserInfo {
    id: number;
    username: string;
    image?: string | null;
    email: string;
}

interface FormData {
    title: string;
    amount: string;
    currency: string;
    requirement: string;
    delivery_time: string;
    reference_file?: FileList;
}

interface CreateOfferFormProps {
    onClose: () => void;
    participantsInfo: UserInfo;
}

export const CreateOfferForm: React.FC<CreateOfferFormProps> = ({
    onClose,
    participantsInfo,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [fileName, setFileName] = useState("");
    const dispatch = useDispatch();
    const receiverId = participantsInfo?.id;
    const email = participantsInfo?.email;
    const [addInitPayment] = useAddInitPaymentMutation();

    const onSubmitForm = async (data: FormData) => {
        try {
            dispatch(
                setOrderData({
                    receiver: receiverId.toString(),
                    title: data.title,
                    amount: data.amount,
                    requirement: data.requirement,
                    delivery_time: data.delivery_time,
                    reference_file: data.reference_file ? data.reference_file[0] : null,
                    redirect_url: window.location.href,
                })
            );

            const paymentResponse = await addInitPayment({
                title: data.title,
                amount: data.amount,
                currency: data.currency,
                email: email,
            }).unwrap();

            if (!paymentResponse.payment_url) {
                toast.error("Payment initiation failed");
                return;
            }

            window.location.href = paymentResponse.payment_url;

        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    console.log('participantsInfo : ', participantsInfo);

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">

                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex justify-center items-center"
                    aria-label="Close form"
                    type="button"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold text-center pb-5 text-[#1F2942]">
                    Create Offer
                </h2>

                <form
                    className="grid grid-cols-2 gap-5"
                    onSubmit={handleSubmit(onSubmitForm)}
                >

                    <div className="col-span-2">
                        <Field label="Main Service Title" error={errors.title}>
                            <input
                                {...register("title", { required: "Title is required" })}
                                type="text"
                                id="title"
                                className="py-2.5 px-5 rounded-full border w-full"
                                placeholder="Enter service title"
                            />
                        </Field>
                    </div>

                    <div>
                        <Field label="Amount" error={errors.amount}>
                            <input
                                {...register("amount", { required: "Amount is required" })}
                                type="number"
                                step="0.01"
                                id="amount"
                                className="py-2.5 px-5 rounded-full border w-full"
                                placeholder="Enter amount"
                            />
                        </Field>
                    </div>

                    <div>
                        <Field label="Currency" error={errors.currency}>
                            <select
                                {...register("currency", { required: "Currency is required" })}
                                id="currency"
                                className="py-2.5 px-5 rounded-full border w-full"
                            >
                                <option value="BDT">BDT (৳)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </Field>
                    </div>


                    <div className="col-span-2">
                        <Field label="Delivery Time" error={errors.delivery_time}>
                            <input
                                {...register("delivery_time", { required: "Delivery time is required" })}
                                type="datetime-local"
                                id="delivery_time"
                                className="py-2.5 px-5 rounded-full border w-full"
                            />
                        </Field>
                    </div>

                    <div className="col-span-2">
                        <Field label="Requirement" error={errors.requirement}>
                            <textarea
                                {...register("requirement", { required: "Requirement is required" })}
                                id="requirement"
                                className="py-2.5 px-5 rounded-lg border w-full"
                                rows={4}
                                placeholder="Describe your requirements..."
                            />
                        </Field>
                    </div>

                    <div className="col-span-full">
                        <Field label="Upload Reference File (optional)">
                            <>
                                <label
                                    htmlFor="reference_file"
                                    className="block border-2 border-dashed p-4 rounded-md cursor-pointer text-center hover:border-blue-400"
                                >
                                    <div className="flex flex-col items-center justify-center space-y-2 h-40">
                                        <img
                                            src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                            alt="Upload"
                                            className="w-12 h-12 opacity-60"
                                        />
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium text-blue-600">Click to upload</span> or drag & drop
                                        </p>
                                        <p className="text-xs text-gray-400">PNG, JPG, or PDF (Max 50MB)</p>
                                    </div>
                                </label>
                                <input
                                    id="reference_file"
                                    type="file"
                                    {...register("reference_file")}
                                    onChange={(e) => {
                                        if (e.target.files?.length) setFileName(e.target.files[0].name);
                                        else setFileName("");
                                    }}
                                    className="hidden"
                                />
                                {fileName && (
                                    <p className="text-xs text-gray-500 mt-1">Selected file: {fileName}</p>
                                )}
                            </>
                        </Field>
                    </div>

                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="py-3 px-5 text-white bg-[#1F2942] hover:bg-[#ED1B24] rounded-full w-full"
                        >
                            Submit Offer
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};
