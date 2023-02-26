import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa'; 
import { toast } from 'react-hot-toast';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const { signIn } = useContext(AuthContext)

    const [loginError, setLoginError] = useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('')

    const { createUser, updateUser, providerLogin } = useContext(AuthContext)


    const location = useLocation();
    const navigate = useNavigate();


    const from = location.state?.from?.pathname || '/';



    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {

                navigate('/')
                const user = result.user
                setLoginUserEmail(data.email)
            })
            .catch(error => {
                setLoginError(error.message)
            })
    }


    const googleSignIn = event => {
        event.preventDefault();
        const Provider = new GoogleAuthProvider();
        providerLogin(Provider)
            .then(result => {
                const user = result.user;
            })
            .catch(error => console.error(error))
    }
    

    return (
        <div className=' '>
            
            <div className="grid grid-cols-2 justify-items-center place-content-center ">
                <div className='bg-gradient-to-r from-primary to-secondary w-full flex flex-col items-center justify-center h-screen'>
                    <img className='max-w-xl drop-shadow-sm' src="https://i.ibb.co/PwNgB5h/login-page.png" alt="" />
                </div>
                <div className='bg-accent w-full flex flex-col items-center justify-center h-screen relative overflow-hidden'>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='absolute -left-28 -top-40 h-96 drop-shadow-xl'>
                            <path fill="#4E7AEF" d="M70.2,-15.8C79.4,5.5,67.3,40.7,44.1,56.6C20.9,72.4,-13.3,69,-37.3,51.5C-61.3,34,-75.1,2.6,-67.1,-16.9C-59.2,-36.4,-29.6,-44,0.5,-44.1C30.5,-44.3,61,-37,70.2,-15.8Z" transform="translate(100 100)" />
                        </svg>
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"  className='absolute -right-28 -bottom-40 h-96 drop-shadow-xl'>
                            <path fill="#4E7AEF" d="M55.6,-14.9C64.6,9.4,59,41.5,40.4,54.8C21.8,68.2,-10,62.8,-33.8,45.7C-57.7,28.5,-73.7,-0.3,-66.8,-21.8C-59.8,-43.4,-29.9,-57.6,-3.3,-56.5C23.4,-55.4,46.7,-39.1,55.6,-14.9Z" transform="translate(100 100)" />
                        </svg>
                    <div className="shadow-2xl w-96 p-8 space-y-3 rounded-xl bg-gradient-to-b from-secondary to-primary mx-auto">
                        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
                        <form onSubmit={handleSubmit(handleLogin)} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                            <div className="space-y-1 text-sm">
                                <label className="label"><span className="label-text text-white">Email</span></label>
                                <input type="text"
                                    {...register("email", {
                                        required: "Email is required"
                                    })}
                                    className="input input-bordered w-full max-w-xs" />
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>
                            <div className="space-y-1 text-sm">
                                <label className="label"><span className="label-text text-white">Password</span></label>
                                <input type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: 'Password must be 6 character or longer' }
                                    })}
                                    className="input input-bordered w-full max-w-xs" />
                                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                            </div>
                            <input className='btn btn-secondary w-full border border-white' value="Login" type="submit" />
                            <div>
                                {
                                    loginError && <p className='text-red-500'>{loginError}</p>
                                }
                            </div>
                        </form>
                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 bg-white"></div>
                            <p className="px-3 text-sm text-white">Login with Google</p>
                            <div className="flex-1 h-px sm:w-16 bg-white"></div>
                        </div>
                        <div className="text-white flex justify-center space-x-4">
                            <button onClick={googleSignIn} aria-label="Log in with Google" className="p-3 rounded-sm">
                                <FaGoogle className='text-2xl'/>
                            </button>

                        </div>
                        <p className="text-xs text-center sm:px-6 text-white">Don't have an account?
                            <Link to='/register' rel="noopener noreferrer" href="#" className="underline font-semibold mx-1">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;