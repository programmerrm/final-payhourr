import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddDisputeMutation } from "../../redux/features/dispute/disputeApi";
import { Field } from "../field/field";
import { toast } from "react-toastify";

interface DisputeFormProps {
    roomName: string;
}

export const DisputeForm: React.FC<DisputeFormProps> = ({ roomName }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const [addDispute, { isLoading }] = useAddDisputeMutation();

    useEffect(() => {
        setValue("room_name", roomName);
    }, [roomName, setValue]);

    const onSubmitForm = async (formData: any) => {
        try {
            await addDispute(formData).unwrap();
            toast.success("Dispute submitted successfully.");
            reset();
        } catch (error: any) {
            console.error("Error submitting dispute:", error?.message);
            toast.error("Failed to submit dispute.");
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
            <input type="hidden" {...register("room_name")} />
            <div className="flex flex-col gap-y-1.5">
                <Field label="Subject" error={errors.subject}>
                    <input
                        {...register("subject", {
                            required: "Subject is required",
                        })}
                        type="text"
                        className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                        placeholder="Enter subject for the dispute"
                    />
                </Field>
            </div>
            <div className="flex flex-col gap-y-1.5">
                <Field label="Priority" error={errors.priority}>
                    <select
                        {...register("priority", {
                            required: "Priority is required",
                        })}
                        className="text-base font-medium py-2.5 px-5 rounded-full border outline-none w-full bg-white"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select priority level
                        </option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </Field>
            </div>
            <div className="flex flex-col gap-y-1.5">
                <Field label="Description" error={errors.description}>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                        })}
                        className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-lg border outline-none w-full"
                        placeholder="Describe your issue clearly"
                        rows={4}
                    ></textarea>
                </Field>
            </div>
            <div className="text-right">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer text-base font-medium py-3 px-5 text-white bg-[#1F2942] hover:bg-[#ED1B24] transition-all duration-300 ease-linear rounded-full w-full"
                >
                    {isLoading ? "Submitting..." : "Submit Dispute"}
                </button>
            </div>
        </form>
    );
};
