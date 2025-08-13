import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/images/png-color.png";
import { useAddRegisterUserMutation } from "../../redux/features/auth/authApi";
import { resetForms, toggleForm } from "../../redux/features/status/statusSlice";
import type { RegisterProps } from "../../types/auth/RegisterProps";
import { ReactIcons } from "../../utils/ReactIcons";
import { Field } from "../field/field";

export const RegisterForm:React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterProps>({ defaultValues: { role: "" } });

  const [nidFrontPreview, setNidFrontPreview] = useState<string | null>(null);
  const [nidBackPreview, setNidBackPreview] = useState<string | null>(null);
  const [show, setShow] = useState({ password: false, confirm: false });
  const selectedRole = watch("role");

  const [addRegisterUser] = useAddRegisterUserMutation();

  const dispatch = useDispatch();
  const { IoCloseSharp, IoMdEye, IoMdEyeOff } = ReactIcons;

  const toggleVisibility = (field: "password" | "confirm") => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === "front") {
      setValue("nid_front_side", files);
      setNidFrontPreview(URL.createObjectURL(files[0]));
    } else {
      setValue("nid_back_side", files);
      setNidBackPreview(URL.createObjectURL(files[0]));
    }
  };

  const onSubmitForm = async (formData: RegisterProps) => {
    if (!formData.nid_front_side || !formData.nid_back_side) {
      console.error("NID files missing");
      toast.error("Please upload both NID front and back files.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("number", formData.number);
    formDataToSend.append("payment_number", formData.payment_number);
    formDataToSend.append("nid_front_side", formData.nid_front_side[0]);
    formDataToSend.append("nid_back_side", formData.nid_back_side[0]);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirm_password", formData.confirm_password);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("terms_accept", String(formData.terms_accept));

    try {
      await addRegisterUser(formDataToSend).unwrap();
      reset();
      dispatch(toggleForm("login"));
      toast.success("Registration successful. Please login.");
    } catch (error: any) {
      const errorData = error?.data;
      const errors = errorData?.errors;
      if (errors && typeof errors === 'object') {
        const firstKey = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstKey]?.[0];
        toast.error(firstErrorMessage);
      } else {
        toast.error('No structured errors found.');
      }
    }
  };

  const handleCloseForm = () => {
    dispatch(resetForms());
  };

  const handleSwitchToRegister = () => {
    dispatch(toggleForm("login"));
  };

  return (
    <div className="flex flex-col gap-y-5 py-6 px-2 sm:py-10 sm:px-8 w-full max-w-2xl shadow bg-white rounded-2xl relative mx-auto overflow-y-auto max-h-[90vh] scrollbar-hidden">
      <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex justify-center items-center" type="button" onClick={handleCloseForm}>
        <IoCloseSharp className="text-2xl" />
      </button>
      <Link className="flex justify-center items-center w-fit mx-auto" to="/" onClick={handleCloseForm}>
        <img className="w-28 md:w-40" src={Logo} alt="" />
      </Link>
      <h2 className="text-3xl font-bold text-center pb-5">Register Form</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-y-1.5">
          <Field label="Username / Domain name" error={errors.username}>
            <input
              {...register("username", { required: "Username is required." })}
              type="text"
              name="username"
              id="username"
              placeholder="username / domain name"
              className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none"
            />
          </Field>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required." })}
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none"
            />
          </Field>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <Field label="First Name (NID card)" error={errors.first_name}>
            <input
              {...register("first_name", { required: "First name is required." })}
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Enter your first name"
              className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none"
            />
          </Field>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <Field label="Last Name (NID card)" error={errors.last_name}>
            <input
              {...register("last_name", { required: "Last name is required." })}
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Enter your last name"
              className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Field label="NID card number" error={errors.number}>
            <input
              {...register("nid_card_number", { required: "nid card number is required." })}
              type="text"
              name="nid_card_number"
              id="nid_card_number"
              placeholder="Enter your nid card number"
              className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Field label="Date of birth (NID card)" error={errors.number}>
            <input
              {...register("date_of_birth", { required: "Date of birth is required." })}
              type="date"
              name="date_of_birth"
              id="date_of_birth"
              placeholder="Enter your date of birth"
              className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-y-1.5">
          <Field label="Phone Number" error={errors.number}>
            <input
              {...register("number", { required: "Number is required." })}
              type="text"
              name="number"
              id="number"
              placeholder="+880 1xxxxxxxxx"
              className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none"
            />
          </Field>
        </div>
        <div className="flex flex-col gap-y-1">
          <Field label={"Payment Number"} error={errors.payment_number}>
            <input
              {...register("payment_number", { required: "Payment number is required." })}
              type="text"
              name="payment_number"
              id="payment_number"
              placeholder="+880 1xxxxxxxxx"
              className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none"
            />
          </Field>
        </div>
        <div className="flex flex-col gap-y-1">
          <Field label={"Password"} error={errors.password}>
            <div className="w-full relative">
              <input
                {...register("password", { required: "password is required." })}
                type={show.password ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer z-50" type="button" onClick={() => toggleVisibility("password")}>
                {show.password ? <IoMdEyeOff className="text-gray-500 text-lg md:text-xl" /> : <IoMdEye className="text-gray-500 text-lg md:text-xl" />}
              </button>
            </div>
          </Field>
        </div>
        <div className="flex flex-col gap-y-1">
          <Field label={"Confirm Password"} error={errors.confirm_password}>
            <div className="w-full relative">
              <input
                {...register("confirm_password", { required: "Confirm password is required." })}
                type={show.confirm ? "text" : "password"}
                name="confirm_password"
                id="confirm_password"
                placeholder="Your confirm password"
                className="text-base font-medium placeholder:text-base placeholder:font-medium py-2.5 px-5 rounded-full border outline-none w-full"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer z-50" type="button" onClick={() => toggleVisibility("confirm")}>
                {show.confirm ? <IoMdEyeOff className="text-gray-500 text-lg md:text-xl" /> : <IoMdEye className="text-gray-500 text-lg md:text-xl" />}
              </button>
            </div>
          </Field>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <Field label="Upload NID Front" error={errors.nid_front_side}>
            <div className="w-full">
              <input id="nid_front" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "front")} />
              <label
                htmlFor="nid_front"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-40 cursor-pointer hover:border-blue-500 transition-all duration-200"
              >
                {nidFrontPreview ? (
                  <img src={nidFrontPreview} className="h-full w-auto object-cover rounded-md" alt="NID Front" />
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
              <input id="nid_back" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "back")} />
              <label
                htmlFor="nid_back"
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-40 cursor-pointer hover:border-blue-500 transition-all duration-200"
              >
                {nidBackPreview ? (
                  <img src={nidBackPreview} className="h-full w-auto object-cover rounded-md" alt="NID Back" />
                ) : (
                  <span className="text-gray-500 text-sm">Click here to upload NID Back</span>
                )}
              </label>
            </div>
          </Field>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-row flex-wrap items-center gap-x-5">
              <label className="flex items-center gap-x-2.5 cursor-pointer">
                <input type="radio" className="w-4 h-4" checked={selectedRole === "buyer"} onChange={() => setValue("role", selectedRole === "buyer" ? "" : "buyer")} />
                Buyer
              </label>
              <label className="flex items-center gap-x-2.5 cursor-pointer">
                <input type="radio" className="w-4 h-4" checked={selectedRole === "seller"} onChange={() => setValue("role", selectedRole === "seller" ? "" : "seller")} />
                Seller
              </label>
            </div>
            {errors.role && (
              <p className="text-[#ED1B24] font-medium text-sm" role="alert">
                {errors.role.message}
              </p>
            )}
          </div>
          <input type="hidden" {...register("role", { required: "Select your role." })} />
        </div>
        <div className="col-span-full">
          <div className="flex flex-col gap-y-2">
            <label className="flex items-start gap-x-2.5 cursor-pointer">
              <input {...register("terms_accept", { required: "You must accept the terms and conditions." })} type="checkbox" className="w-4 h-4 mt-1" />
              <span className="text-sm font-medium">
                I agree to the{" "}
                <Link to="/terms-and-conditions/" className="text-blue-500 hover:underline" onClick={handleCloseForm}>
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy/" className="text-blue-500 hover:underline" onClick={handleCloseForm}>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </div>
        <div className="col-span-full">
          <button type="submit" className="text-base font-medium py-3 px-5 text-white bg-[#1F2942] hover:bg-[#ED1B24] transition-all duration-300 ease-linear rounded-full w-full">
            Register
          </button>
        </div>
      </form>
      <div className="flex flex-col justify-center items-center w-full mt-2">
        <p className="text-base font-medium ">
          Already have an account?{" "}
          <button className="text-[#1F2942] underline" type="button" onClick={handleSwitchToRegister}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
