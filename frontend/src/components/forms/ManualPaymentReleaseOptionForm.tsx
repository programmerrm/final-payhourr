import React from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import { useAddPaymentMethodMutation } from "../../redux/features/payments/paymentsApi";
import { toast } from "react-toastify";
import { ReactIcons } from "../../utils/ReactIcons";

interface ManualPaymentReleaseOptionFormProps {
    closeForm: () => void;
    refetch: () => void;
}

export const ManualPaymentReleaseOptionForm: React.FC<ManualPaymentReleaseOptionFormProps> = ({ closeForm, refetch }) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [addPaymentMethod] = useAddPaymentMethodMutation();
    const { IoMdClose } = ReactIcons;

    const onSubmitForm = async (formData: any) => {
        try {
            await addPaymentMethod(formData).unwrap();
            toast.success("Payment method added successfully");
            reset();
            refetch();
            closeForm(); // Close after success
        } catch (error: any) {
            toast.error("Failed to add payment method");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="relative bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={closeForm}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                >
                    <IoMdClose size={22} />
                </button>

                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
                    <div>
                        <Field label="Method" error={errors.name}>
                            <input
                                {...register("name", { required: "Method is required" })}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter method name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Field>
                    </div>

                    <div>
                        <Field label="Number" error={errors.number}>
                            <input
                                {...register("number", { required: "Number is required" })}
                                type="text"
                                name="number"
                                id="number"
                                placeholder="Enter number"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Field>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-300 w-full"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
