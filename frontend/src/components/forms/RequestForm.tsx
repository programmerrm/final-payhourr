import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddconnectionRequestUserMutation } from "../../redux/features/chat/connectionRequests";
import { Field } from "../field/field";
import { ReactIcons } from "../../utils/ReactIcons";

interface RequestFormProps {
    placeholderValue: string;
}

interface FormValues {
    user_id: string;
}

export const RequestForm: React.FC<RequestFormProps> = ({ placeholderValue }) => {
    const [addconnectionRequestUser] = useAddconnectionRequestUserMutation();
    const { handleSubmit, register, reset, formState: { errors } } = useForm<FormValues>();
    const {IoSearchOutline} = ReactIcons;

    const onSubmitForm = async (formData: FormValues) => {
        try {
            const trimmedData = {
                ...formData,
                user_id: formData.user_id.trim(),
            };

            await addconnectionRequestUser(trimmedData).unwrap();
            toast.success("Connection request sent!");
            reset();
        } catch (error: any) {
            console.log(error.message);
            toast.error("Faild send request");
        }
    };

    return (
        <form className="flex flex-row basis-full md:basis-auto flex-wrap items-center justify-center order-3" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="relative flex flex-row flex-wrap items-center border-2 border-black rounded-full">
                <Field label="" error={errors.user_id}>
                    <input
                        {...register("user_id", {
                            required: "",
                        })}
                        className="placeholder:text-sm text-sm md:text-base border-none outline-none px-5 max-w-56"
                        type="text"
                        name="user_id"
                        id="user_id"
                        placeholder={placeholderValue}
                    />
                </Field>
                <button className="bg-black text-white p-2 md:px-5 md:py-3.5 rounded-full" type="submit">
                    <span className="hidden md:block">Send a Request</span>
                    <span className="md:hidden">
                        <IoSearchOutline className="text-lg" />
                    </span>
                </button>
            </div>
        </form>
    );
}
