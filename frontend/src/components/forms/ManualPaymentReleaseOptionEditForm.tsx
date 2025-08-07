import React, { useEffect } from "react";
import { Field } from './../field/field';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddPaymentMethodUpdateMutation } from "../../redux/features/payments/paymentsApi";

interface ManualPaymentReleaseOptionEditFormProps {
    method: any;
    closeForm: () => void;
    refetch: () => void;
}

export const ManualPaymentReleaseOptionEditForm: React.FC<ManualPaymentReleaseOptionEditFormProps> = ({ method, closeForm, refetch }) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: method.name,
            number: method.number,
        }
    });
    const [addPaymentMethodUpdate] = useAddPaymentMethodUpdateMutation();

    useEffect(() => {
        reset({
            name: method.name,
            number: method.number,
        });
    }, [method, reset]);

    const onSubmitForm = async (formData: any) => {
        try {
            await addPaymentMethodUpdate({ id: method.id, data: formData }).unwrap();
            toast.success("Payment method updated successfully");
            refetch();
            closeForm(); // close edit form
        } catch (error: any) {
            toast.error("Failed to update payment method");
        }
    };

    return (
        <div>
            <h2>Payment Method Details</h2>
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
                <div>
                    <Field label="Method" error={errors.name}>
                        <input
                            {...register("name")}
                            type="text"
                            id="name"
                            placeholder={method.name}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Field>
                </div>

                <div>
                    <Field label="Number" error={errors.number}>
                        <input
                            {...register("number")}
                            type="text"
                            id="number"
                            placeholder={method.number}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Field>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-300 w-full"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};
