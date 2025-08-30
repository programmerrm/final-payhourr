import { useForm } from "react-hook-form";
import { Field } from "../field/field";

export const MobilePaymentForm = () => {
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
                <Field label="Method Name" error={errors.method_name}>
                    <input
                        className="w-full text-black text-sm md:text-base py-3 px-3.5 border border-black rounded-xl"
                        {...register("method_name", {
                            required: "Method name is required",
                        })}
                        type="text"
                        id="method_name"
                        name="method_name"
                        placeholder="Method Name"
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1.5">
                <Field label="Number" error={errors.account_number}>
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
            <div className="flex flex-col flex-wrap w-full mt-3.5">
                <button className="bg-[#1E2841] text-white py-3.5 px-5 rounded-xl">Send</button>
            </div>
        </form>
    );
}
