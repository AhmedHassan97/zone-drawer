import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
type FormValues = {
  username: string;
  password: string;
};
const LoginComponent = () => {
  //   const [errMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FormValues) => {
    console.log(data.password, data.username);
  };

  return (
    <div className="bg-base-100 flex flex-col justify-center items-center min-h-screen">
      <Image
        className="text-base-content"
        src="/Halan-Egypt.png"
        alt="logo"
        width={750}
        height={300}
      />
      <div className=" flex flex-col justify-center items-center">
        <div>
          <input
            type="text"
            className={`p-2 text-primary border-base-content border-2 rounded-md text-xl mb-4`}
            aria-label="username"
            placeholder="Username"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && (
            <div className="mb-3 text-normal text-error">
              username is required
            </div>
          )}
        </div>
        <div>
          <input
            type="password"
            className={`p-2 text-primary border-base-content border-2 rounded-md text-xl mb-4`}
            id="password"
            aria-label="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <div className="mb-3 text-normal text-error">
              password is required{" "}
            </div>
          )}
        </div>
        <div>
          <button
            className={`bg-primary text-primary-content p-4 px-8 hover:bg-primary-focus rounded-box`}
            type="submit"
            aria-label="submitbutton"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
