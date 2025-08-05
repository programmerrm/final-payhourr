import React from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import { useAddconnectionRequestUserMutation } from "../../redux/features/chat/connectionRequests";
import { toast } from "react-toastify";

interface RequestFormProps {
    placeholderValue: string;
}

interface FormValues {
    user_id: string;
}

export const RequestForm: React.FC<RequestFormProps> = ({ placeholderValue }) => {
    const [addconnectionRequestUser] = useAddconnectionRequestUserMutation();
    const { handleSubmit, register, reset, formState: { errors } } = useForm<FormValues>();

    const onSubmitForm = async (formData: FormValues) => {
        try {
            const trimmedData = {
                ...formData,
                user_id: formData.user_id.trim(),
            };

            const { data } = await addconnectionRequestUser(trimmedData).unwrap();
            toast.success("Connection request sent!");
            console.log(data);
            reset();
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <form className="flex flex-row flex-wrap items-center" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="relative flex flex-row flex-wrap items-center border-2 border-black rounded-full">
                <Field label="" error={errors.user_id}>
                    <input
                        {...register("user_id", {
                            required: "User ID is required",
                        })}
                        className="border-none outline-none px-5 max-w-56"
                        type="text"
                        name="user_id"
                        id="user_id"
                        placeholder={placeholderValue}
                    />
                </Field>
                <button className="bg-black text-white px-5 py-3.5 rounded-full" type="submit">Send a Request</button>
            </div>
        </form>
    );
}
