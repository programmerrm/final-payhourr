import React from "react";
import { Field } from "../field/field";

export const BuyerRegisterForm: React.FC<any> = ({ register, errors }) => {
    return (
        <>
            <div className="flex flex-col gap-y-1.5">
                <Field label="First Name" error={errors.first_name}>
                    <input
                        {...register("first_name", { required: "First name is required." })}
                        type="text"
                        placeholder="Enter your first name"
                        className="text-base py-2.5 px-5 rounded-full border outline-none"
                    />
                </Field>
            </div>

            <div className="flex flex-col gap-y-1.5">
                <Field label="Last Name" error={errors.last_name}>
                    <input
                        {...register("last_name", { required: "Last name is required." })}
                        type="text"
                        placeholder="Enter your last name"
                        className="text-base py-2.5 px-5 rounded-full border outline-none"
                    />
                </Field>
            </div>
        </>
    );
}
