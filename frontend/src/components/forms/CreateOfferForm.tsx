import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../field/field";

interface FormData {
    subject: string;
    amount: string;
    message: string;
    file?: FileList;
}

interface CreateOfferFormProps {
    onClose: () => void;
    receiverUsername: string;
}

export const CreateOfferForm: React.FC<CreateOfferFormProps> = ({ onClose, receiverUsername }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [fileName, setFileName] = useState<string>("");

    const onSubmitForm = async (data: FormData) => {
        try {
            console.log("Form Data:", data);
            reset();
            setFileName("");
            onClose();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    console.log('receiverUsername : ', receiverUsername);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">

                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex justify-center items-center"
                    aria-label="Close form"
                    type="button"
                >
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="text-2xl"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path>
                    </svg>
                </button>

                <h2 className="text-3xl font-bold text-center pb-5 text-[#1F2942]">Create Offer</h2>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)} noValidate>

                    <div className="flex flex-col gap-y-1.5">
                        <Field label="Subject" error={errors.subject}>
                            <input
                                {...register("subject", { required: "Subject is required" })}
                                type="text"
                                id="subject"
                                className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                                placeholder="Enter your subject"
                            />
                        </Field>
                    </div>

                    <div className="flex flex-col gap-y-1.5">
                        <Field label="Amount (bdt)" error={errors.amount}>
                            <input
                                {...register("amount", { required: "Amount is required" })}
                                type="text"
                                id="amount"
                                className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
                                placeholder="Enter your amount"
                            />
                        </Field>
                    </div>

                    <div className="flex flex-col gap-y-1.5">
                        <Field label="Message" error={errors.message}>
                            <textarea
                                {...register("message", { required: "Message is required" })}
                                id="message"
                                className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-lg border outline-none w-full"
                                placeholder="Enter your message"
                                rows={4}
                            />
                        </Field>
                    </div>

                    <div className="flex flex-col gap-y-1.5">
                        <Field label="Attach File">
                            <>
                                <label
                                    htmlFor="file-upload"
                                    className="block w-full border-2 border-dashed border-gray-400 rounded-md p-4 cursor-pointer hover:border-blue-400 transition relative text-center"
                                >
                                    <div className="flex flex-col items-center justify-center space-y-2 h-40">
                                        <img
                                            src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                            alt="Upload"
                                            className="w-12 h-12 opacity-60"
                                        />
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium text-blue-600">Click to upload</span> or drag & drop
                                        </p>
                                        <p className="text-xs text-gray-400">SVG, PNG, JPG, or PDF (Max 5MB)</p>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        {...register("file")}
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </label>
                                {fileName && <p className="text-xs text-gray-500 mt-1">Selected file: {fileName}</p>}
                            </>
                        </Field>
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="cursor-pointer text-base font-medium py-3 px-5 text-white bg-[#1F2942] hover:bg-[#ED1B24] transition-all duration-300 ease-linear rounded-full w-full"
                        >
                            Submit Offer
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};
