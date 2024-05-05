import Swal from "sweetalert2";
import signinLottie from "../../../public/assets/lottieAnimation/signin-lottie.json";
import signinLoadingLottie from "../../../public/assets/lottieAnimation/registration_loading.json";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";

const Login = () => {
    const navigate = useNavigate();
    const [isShowPass, setIsShowPass] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { user, setUser, loading, setLoading, signIn, } = useAuth()

    useEffect(() => {
        if (user) {
            return navigate("/home");
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors },
    } = useForm();
    const handleSigninFunc = (form) => {
        setLoading(true);
        setError("");
        const { email, password } = form;

        // const user = { email, password };
        signIn(email, password)
            .then((res) => {
                const loggedUser = res.user;
                setLoading(false);
                setUser(loggedUser);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSuccess('user signin by email & password!')
                reset()
                navigate("/");
            })
            .catch((e) => {
                setLoading(false);
                if (e.code === "auth/user-not-found") {
                    setError('User not found')
                } else if (e.code === "auth/invalid-email") {
                    setError('Invalid email')
                } else if (e.code === "auth/wrong-password") {
                    setError('wrong password')
                } else if (e.code === "auth/too-many-requests") {
                    setError("Access to this account has been temporarily disabled due to many failed login attempts. Please reset your password or try again later.")
                } else {
                    setError(e.message)
                }
            });
    };
    return (
        <div
            className="bg-cover bg-center bg-slate-800 bg-blend-overlay pl-16 xl:pl-0"
        // style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="min-h-screen grid grid-col-1 md:grid-cols-2 gap-4 xl:gap-8 items-center my-container">
                <div className="p-5 lg:p-10 bg-purple-500 bg-opacity-25 shadow rounded">
                    <form onSubmit={handleSubmit(handleSigninFunc)} className="space-y-3">
                        <h2 className="font-bold text-3xl text-white mb-6">
                            Signin to your account
                        </h2>

                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-slate-300 dark:text-white"
                            >
                                email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="my-inp"
                                {...register("email", { required: true })}
                                placeholder="Your email here"
                            />
                            {errors.email && (
                                <p className="text-red-500">This field is required</p>
                            )}
                        </div>

                        {/* password */}
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-slate-300 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type={`${isShowPass ? "text" : "password"}`}
                                id="password"
                                className="my-inp"
                                {...register("password", { required: true })}
                                placeholder="••••••••"
                            />
                            <span
                                className="absolute right-2 top-11 text-slate-300 cursor-pointer"
                                onClick={() => setIsShowPass(!isShowPass)}
                            >
                                {" "}
                                {isShowPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}{" "}
                            </span>
                            {errors.password && (
                                <p className="text-red-500">This field is required</p>
                            )}
                        </div>

                        {/* remember me */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
                                        name="remember"
                                        aria-describedby="remember"
                                        type="checkbox"

                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-slate-300">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="text-sm font-medium text-slate-300 hover:underline dark:text-primary-500"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {error && <p className="text-red-500">*{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}

                        <button
                            className={`${loading ? "my-btn-one-disable" : "my-btn-one"
                                } w-full`}
                            type="submit"
                        >
                            {loading ? "Signing In.." : "Sign In"}
                        </button>
                        <p className="text-sm font-light text-slate-300">
                            New user?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Register
                            </Link>
                        </p>
                    </form>

                    <div className="flex items-center my-2">
                        <hr className="flex-grow" />
                        <span className="mx-2 text-slate-300">Or sign in with</span>
                        <hr className="flex-grow" />
                    </div>
                    <div className="flex justify-evenly gap-4 flex-col sm:flex-row">
                        {/* <button className="my-btn-one-outline !flex items-center justify-center">
                                          <FaGoogle className="mr-2"></FaGoogle> Google
                                    </button>
                                    <button className="my-btn-one-outline !flex items-center justify-center">
                                          <FaGithub className="mr-2"></FaGithub> Github
                                    </button> */}
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>

                <Lottie
                    animationData={loading ? signinLoadingLottie : signinLottie}
                    loop={true}
                    className="h-full w-full"
                />
            </div>
        </div>
    );
};

export default Login;