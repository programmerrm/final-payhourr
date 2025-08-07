import React, { useEffect, useState } from "react";
import { useAddDepositMutation, useGetPaymentMethodQuery } from "../../redux/features/payments/paymentsApi";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface DepositeFormProps {
    onSuccess?: () => void; // for closing modal after success
}

export const DepositeForm: React.FC<DepositeFormProps> = ({ onSuccess }) => {
    const { handleSubmit, register, reset, setValue, watch, formState: { errors } } = useForm();
    const { data: paymentData } = useGetPaymentMethodQuery();
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<any>(null);

    const [addDeposit] = useAddDepositMutation();

    const watchPaymentOption = watch("payment_option");

    useEffect(() => {
        if (paymentData && watchPaymentOption) {
            const selected = paymentData.results.find((item: any) => item.id === parseInt(watchPaymentOption));
            setSelectedPaymentOption(selected);
            if (selected) {
                setValue("receiver_number", selected.number);
            }
        }
    }, [watchPaymentOption, paymentData, setValue]);

    const onSubmitForm = async (data: any) => {
        try {
            await addDeposit(data).unwrap();
            toast.success("Your deposit successfully")
            reset();
            if (onSuccess) onSuccess(); // close modal
        } catch (error: any) {
            console.error(error.message);
            toast.error("Your deposit faield")
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
            <Field label="Amount" error={errors.amount}>
                <input
                    {...register("amount", { required: "Amount is required" })}
                    type="text"
                    id="amount"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </Field>

            <Field label="Sender Number" error={errors.sender_number}>
                <input
                    {...register("sender_number", { required: "Sender number is required" })}
                    type="text"
                    id="sender_number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </Field>

            <Field label="Payment Option" error={errors.payment_option}>
                <select
                    {...register("payment_option", { required: "Please select a payment option" })}
                    id="payment_option"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">Select a payment method</option>
                    {paymentData?.results.map((option: any) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </Field>

            <Field label="Receiver Number" error={errors.receiver_number}>
                <input
                    {...register("receiver_number", { required: "Receiver number is required" })}
                    type="text"
                    id="receiver_number"
                    readOnly
                    value={selectedPaymentOption?.number || ""}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
            </Field>

            <Field label="TRX Number" error={errors.txr_number}>
                <input
                    {...register("txr_number", { required: "TRX number is required" })}
                    type="text"
                    id="txr_number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </Field>

            <div className="text-right">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Send
                </button>
            </div>
        </form>
    );
};
