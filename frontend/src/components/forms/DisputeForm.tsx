import React, { useEffect, useState } from "react";
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
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        setValue("room_name", roomName);
    }, [roomName, setValue]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);

        if (file.type.startsWith("image/") || file.type === "application/pdf") {
            setFilePreview(URL.createObjectURL(file));
        } else {
            setFilePreview(null);
            toast.error("Only images or PDFs are allowed");
        }
    };

    const onSubmitForm = async (formData: any) => {
        try {
            const data = new FormData();
            data.append("room_name", formData.room_name);
            data.append("title", formData.title);
            data.append("type", formData.type);
            data.append("description", formData.description);
            data.append("solution", formData.solution || "");
            if (selectedFile) {
                data.append("attach_proof", selectedFile);
            }

            await addDispute(data).unwrap();
            toast.success("Dispute submitted successfully.");
            reset();
            setFilePreview(null);
            setSelectedFile(null);
        } catch (error: any) {
            const errorData = error?.data;
            const errors = errorData?.errors;
            if (errors) {
                toast.error(errors);
            } else {
                toast.error('No structured errors found.');
            }
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmitForm)}>
            <input type="hidden" {...register("room_name")} />

            <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-y-1.5">
                    <Field label="Dispute Title" error={errors.title}>
                        <input
                            {...register("title", { required: "Dispute title is required" })}
                            type="text"
                            className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                            placeholder="Enter title for the dispute"
                        />
                    </Field>
                </div>

                <div className="flex flex-col gap-y-1.5">
                    <Field label="Dispute Type" error={errors.type}>
                        <input
                            {...register("type", { required: "Dispute type is required" })}
                            type="text"
                            className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                            placeholder="Enter type for the dispute"
                        />
                    </Field>
                </div>

                <div className="flex flex-col gap-y-1.5 col-span-full">
                    <Field label="Dispute Description" error={errors.description}>
                        <textarea
                            {...register("description", { required: "Dispute description is required" })}
                            className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-lg border outline-none w-full"
                            placeholder="Describe your issue clearly"
                            rows={4}
                        ></textarea>
                    </Field>
                </div>

                <div className="flex flex-col gap-y-1.5 col-span-full">
                    <Field label="Attach Proof (image/pdf)" error={errors.attach_proof}>
                        <div className="w-full">
                            <input
                                id="attach_proof"
                                type="file"
                                accept="image/*,application/pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="attach_proof"
                                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-36 cursor-pointer hover:border-blue-500"
                            >
                                {filePreview && selectedFile ? (
                                    selectedFile.type.startsWith("image/") ? (
                                        <img
                                            src={filePreview}
                                            className="w-full h-full object-cover rounded-md"
                                            alt="Proof Preview"
                                        />
                                    ) : selectedFile.type === "application/pdf" ? (
                                        <iframe
                                            src={filePreview}
                                            title="PDF Preview"
                                            className="w-full h-full border rounded-md"
                                        />
                                    ) : null
                                ) : (
                                    <span className="text-gray-500 text-sm">
                                        Click here to upload an image or PDF
                                    </span>
                                )}
                            </label>
                        </div>
                    </Field>
                </div>

                <div className="flex flex-col gap-y-1.5 col-span-full">
                    <Field label="Suggested Solution" error={errors.solution}>
                        <textarea
                            {...register("solution")}
                            className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-lg border outline-none w-full"
                            placeholder="Explain your issue in detail so we can help you better"
                            rows={4}
                        ></textarea>
                    </Field>
                </div>
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
