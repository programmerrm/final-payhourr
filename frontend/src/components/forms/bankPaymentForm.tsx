import type React from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";

export const BankMethodPaymentForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitForm = async (formData: any) => {
        try {
            console.log(formData);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <form className="flex flex-col flex-wrap gap-y-2.5 w-full" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex flex-col flex-wrap w-full gap-y-1.5">
                <Field label="Account Holder Name" error={errors.account_holder_name}>
                    <input
                        className="w-full text-black text-sm md:text-base py-3 px-3.5 border border-black rounded-xl"
                        {...register("account_holder_name", {
                            required: "Account holder name is required",
                        })}
                        type="text"
                        id="account_holder_name"
                        name="account_holder_name"
                        placeholder="Account Holder Name"
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1.5">
                <Field label="Account Number" error={errors.account_number}>
                    <input
                        className="w-full text-black text-sm md:text-base py-3 px-3.5 border border-black rounded-xl"
                        {...register("account_number", {
                            required: "Account number is required",
                        })}
                        type="number"
                        id="account_number"
                        name="account_number"
                        placeholder="Account Number"
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1.5">
                <Field label="Bank Name" error={errors.bank_name}>
                    <input
                        className="w-full text-black text-sm md:text-base py-3 px-3.5 border border-black rounded-xl"
                        {...register("bank_name", {
                            required: "Bank name is required",
                        })}
                        type="text"
                        id="bank_name"
                        name="bank_name"
                        placeholder="Bank Name"
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1.5">
                <Field label="Branch Name" error={errors.branch_name}>
                    <input
                        className="w-full text-black text-sm md:text-base py-3 px-3.5 border border-black rounded-xl"
                        {...register("branch_name", {
                            required: "Branch name is required",
                        })}
                        type="text"
                        id="branch_name"
                        name="branch_name"
                        placeholder="Branch Name"
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full mt-3.5">
                <button className="bg-[#1E2841] text-white py-3.5 px-5 rounded-xl">Send</button>
            </div>
        </form>
    )
}