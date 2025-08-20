import React from "react";
import { Field } from "../field/field";

export const SellerRegisterForm: React.FC<any> = ({
    register,
    errors,
    handleFileChange,
    nidFrontPreview,
    nidBackPreview,
}) => {
    return (
        <>
            <div className="flex flex-col gap-y-1.5">
                <Field label="First Name (NID card)" error={errors.first_name}>
                    <input
                        {...register("first_name", { required: "First name is required." })}
                        type="text"
                        placeholder="Enter your first name"
                        className="text-base py-2.5 px-5 rounded-full border outline-none"
                    />
                </Field>
            </div>

            <div className="flex flex-col gap-y-1.5">
                <Field label="Last Name (NID card)" error={errors.last_name}>
                    <input
                        {...register("last_name", { required: "Last name is required." })}
                        type="text"
                        placeholder="Enter your last name"
                        className="text-base py-2.5 px-5 rounded-full border outline-none"
                    />
                </Field>
            </div>

            <div className="flex flex-col gap-y-1.5">
                <Field label="NID card number" error={errors.nid_card_number}>
                    <input
                        {...register("nid_card_number", { required: "NID card number is required." })}
                        type="text"
                        placeholder="Enter your nid card number"
                        className="text-base py-2.5 px-5 rounded-full border outline-none"
                    />
                </Field>
            </div>

            <div className="flex flex-col gap-y-1.5">
                <Field label="Date of birth (NID card)" error={errors.date_of_birth}>
                    <input
                        {...register("date_of_birth", { required: "Date of birth is required." })}
                        type="date"
                        className="text-base py-2.5 px-5 rounded-full border outline-none"
                    />
                </Field>
            </div>

            <div className="flex flex-col gap-y-1.5">
                <Field label="Phone Number" error={errors.number}>
                    <input
                        {...register("number", { required: "Number is required." })}
                        type="text"
                        placeholder="+880 1xxxxxxxxx"
                        className="text-base py-2.5 px-5 rounded-full border outline-none"
                    />
                </Field>
            </div>

            <div className="flex flex-col gap-y-1.5">
                <Field label="Payment Number" error={errors.payment_number}>
                    <input
                        {...register("payment_number", { required: "Payment number is required." })}
                        type="text"
                        placeholder="+880 1xxxxxxxxx"
                        className="text-base py-2.5 px-5 rounded-full border outline-none"
                    />
                </Field>
            </div>

            <div className="flex flex-col gap-y-1.5">
                <Field label="Upload NID Front" error={errors.nid_front_side}>
                    <div className="w-full">
                        <input
                            id="nid_front"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "front")}
                        />
                        <label
                            htmlFor="nid_front"
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-40 cursor-pointer hover:border-blue-500"
                        >
                            {nidFrontPreview ? (
                                <img src={nidFrontPreview} className="h-full object-cover rounded-md" alt="NID Front" />
                            ) : (
                                <span className="text-gray-500 text-sm">Click here to upload NID Front</span>
                            )}
                        </label>
                    </div>
                </Field>
            </div>

            <div className="flex flex-col gap-y-1.5">
                <Field label="Upload NID Back" error={errors.nid_back_side}>
                    <div className="w-full">
                        <input
                            id="nid_back"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "back")}
                        />
                        <label
                            htmlFor="nid_back"
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-40 cursor-pointer hover:border-blue-500"
                        >
                            {nidBackPreview ? (
                                <img src={nidBackPreview} className="h-full object-cover rounded-md" alt="NID Back" />
                            ) : (
                                <span className="text-gray-500 text-sm">Click here to upload NID Back</span>
                            )}
                        </label>
                    </div>
                </Field>
            </div>
        </>
    );
}
