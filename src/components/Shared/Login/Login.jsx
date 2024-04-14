import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { signIn, allUsers } = useContext(AuthContext);

  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");

  const { createUser, updateUser, providerLogin } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        setLoginUserEmail(data.email);
        const user = result.user;
        let findUser = allUsers.find((u) => u.email === user.email);
        if (findUser) {
          navigate(from, { replace: true });
        } else {
          saveUser(user.displayName, user.email);
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("User not found");
          setLoginError("Email did not matched");
        } else {
          setLoginError(error.message);
        }
        console.log(error.message);
      });
  };

  const googleSignIn = (event) => {
    event.preventDefault();
    const Provider = new GoogleAuthProvider();
    providerLogin(Provider)
      .then((result) => {
        const user = result.user;
        let findUser = allUsers.find((u) => u.email === user.email);
        if (findUser) {
          navigate(from, { replace: true });
        } else {
          saveUser(user.displayName, user.email);
          navigate(from, { replace: true });
        }
      })
      .catch((error) => console.error(error));
  };

  const saveUser = (name, email, photoURL) => {
    const user = { name, email, photoURL };
    fetch(`${import.meta.env.VITE_SERVER_URL}/adduser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("save user", data);
        // setCreatedUserEmail(email)
      });
  };

  return (
    <div className=" ">
      <div className="grid grid-cols-2 place-content-center justify-items-center ">
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-primary to-secondary">
          <img
            className="max-w-xl"
            src="https://i.ibb.co/PwNgB5h/login-page.png"
            alt=""
          />
        </div>
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-accent">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -left-28 -top-40 h-96 drop-shadow-xl"
          >
            <path
              fill="#4E7AEF"
              d="M70.2,-15.8C79.4,5.5,67.3,40.7,44.1,56.6C20.9,72.4,-13.3,69,-37.3,51.5C-61.3,34,-75.1,2.6,-67.1,-16.9C-59.2,-36.4,-29.6,-44,0.5,-44.1C30.5,-44.3,61,-37,70.2,-15.8Z"
              transform="translate(100 100)"
            />
          </svg>
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -right-28 -bottom-40 h-96 drop-shadow-xl"
          >
            <path
              fill="#4E7AEF"
              d="M55.6,-14.9C64.6,9.4,59,41.5,40.4,54.8C21.8,68.2,-10,62.8,-33.8,45.7C-57.7,28.5,-73.7,-0.3,-66.8,-21.8C-59.8,-43.4,-29.9,-57.6,-3.3,-56.5C23.4,-55.4,46.7,-39.1,55.6,-14.9Z"
              transform="translate(100 100)"
            />
          </svg>
          <div className="mx-auto w-96 space-y-3 rounded-xl bg-gradient-to-b from-secondary to-primary p-8 shadow-2xl">
            <h1 className="text-center text-3xl font-bold text-white">Login</h1>
            <form
              onSubmit={handleSubmit(handleLogin)}
              noValidate=""
              action=""
              className="ng-untouched ng-pristine ng-valid space-y-6"
            >
              <div className="space-y-1 text-sm">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  defaultValue={"visitor@gmail.com"}
                  className="input-bordered input w-full max-w-xs"
                />
                {errors.email && (
                  <p className="text-blue-100 underline decoration-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="space-y-1 text-sm">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 character or longer",
                    },
                  })}
                  defaultValue={"12345678"}
                  className="input-bordered input w-full max-w-xs"
                />
                {errors.password && (
                  <p className="text-blue-100 underline decoration-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <input
                className="btn-secondary btn w-full border border-white"
                value="Login"
                type="submit"
              />
              <div>
                {loginError && (
                  <p className="text-blue-100 underline decoration-red-500">
                    {loginError}
                  </p>
                )}
              </div>
            </form>
            <div className="flex items-center space-x-1 pt-4">
              <div className="h-px flex-1 bg-white sm:w-16"></div>
              <p className="px-3 text-sm text-white">Login with Google</p>
              <div className="h-px flex-1 bg-white sm:w-16"></div>
            </div>
            <div className="flex justify-center space-x-4 text-white">
              <button
                onClick={googleSignIn}
                aria-label="Log in with Google"
                className="rounded-sm p-3"
              >
                <FaGoogle className="text-2xl" />
              </button>
            </div>
            <p className="text-center text-xs text-white sm:px-6">
              Don't have an account?
              <Link
                to="/register"
                rel="noopener noreferrer"
                href="#"
                className="mx-1 font-semibold underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
