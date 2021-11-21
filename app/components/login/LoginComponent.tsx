import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as types from "../../types/Types";
import useLogin from "../../hooks/useLogin";
import { useStore } from "../../store";
import { useRouter } from "next/router";
const LoginComponent: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { token } = useStore();
  useEffect(() => {
    if (token !== "") {
      router.push("/map");
    }
  });
  const { login, logout, error } = useLogin();
  const router = useRouter();
  const onSubmit = (data: types.LoginForm) => {
    login(data);
    // console.log(token);
    if (error) {
      login(data);
    } else if (token !== "") {
      router.push("/map");
    }

    // if(isLoggedIn)
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center min-h-screen">
      <Image src="/Halan-Egypt.png" alt="logo" width={750} height={300} />
      <div className=" flex flex-col justify-center items-center">
        <div>
          <input
            type="text"
            className={`p-2 text-black border-base-content border-2 rounded-md text-xl mb-4`}
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
            className={`p-2 text-black border-base-content border-2 rounded-md text-xl mb-4`}
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
        <div className="flex flex-col">
          <button
            className={`bg-blue-500 text-black-content p-4 px-8 hover:bg-primary-focus rounded-box`}
            type="submit"
            aria-label="submitbutton"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
          {error && (
            <div className="mb-3 text-normal text-error">
              username or password is incorrect
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
