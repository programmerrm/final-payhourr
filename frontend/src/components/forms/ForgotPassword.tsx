import type React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { Field } from "../field/field";

export const ForgotPasswordForm: React.FC = () => {
  const [addForgotPassword, { isLoading }] = useAddForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmitForm = async (formData: any) => {
    try {
      await addForgotPassword(formData).unwrap();
      reset();
      toast.success("Please check your inbox.");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Sorry! Something went wrong.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-col gap-y-1.5 mb-4">
        <Field label="Email Address" error={errors.email}>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            className="w-full text-black placeholder:text-black text-sm md:text-base font-normal placeholder:text-sm md:placeholder:text-base placeholder:font-normal py-3 px-3.5 border border-black rounded-xl"
            required
          />
        </Field>
      </div>
      <button disabled={isLoading} type="submit" className="w-full bg-black text-white text-sm md:text-base font-medium px-10 py-3.5 rounded-xl cursor-pointer hover:bg-gray-800 transition">
        {isLoading ? "Processing..." : "Send Reset Link"}
      </button>
    </form>
  );
};
