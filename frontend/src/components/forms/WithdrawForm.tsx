import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Field } from "../field/field";
import { useAddWithdrawMutation } from "../../redux/features/payments/paymentsApi";

interface WithdrawFormProps {
    onSuccess?: () => void;
}

export const WithdrawForm: React.FC<WithdrawFormProps> = ({ onSuccess }) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [addWithdraw] = useAddWithdrawMutation();

    const onSubmitForm = async (data: any) => {
        try {
            await addWithdraw(data).unwrap();
            toast.success("Your withdraw was successful");
            reset();
            if (onSuccess) onSuccess(); 
        } catch (error: any) {
            console.error(error.message);
            toast.error("Your withdraw failed");
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
            

            <Field label="Amount" error={errors.amount}>
                <input
                    {...register("amount", { required: "Amount is required" })}
                    type="text"
                    id="amount"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </Field>

            <Field label="Method" error={errors.method}>
                <input
                    {...register("method", { required: "Method is required" })}
                    type="text"
                    id="method"
                    name="method"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </Field>

            <Field label="Receiver Number" error={errors.receiver_number}>
                <input
                    {...register("receiver_number", { required: "Receiver number is required" })}
                    type="text"
                    id="receiver_number"
                    name="receiver_number"
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
