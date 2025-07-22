import React, { useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, loginUser } from '../Redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

function SignIn() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");

    const inputId = useId();
    const passwordId = useId();
    const navigate = useNavigate();

    const theme = useSelector((state) => state.theme.theme);
    const isDark = theme === "dark";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!input || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // backend accepts either email or username
        dispatch(loginUser({ email: input, userName: input, password }))
            .unwrap()    // converts the result into normal promise
            .then(() => {
                dispatch(fetchCurrentUser());
                navigate("/", {replace:true});
            })
            .catch((err) => {
                console.log("Login failed:", err);
                alert("Invalid credentials");
            })
    };


    return (
        <>
            <div className={clsx("flex flex-col items-center",isDark ? 'bg-[#0f0f0f]' : 'bg-gray-100')}>
                <span className={clsx('font-bold', isDark ? 'text-white' : 'text-black')}>sample login details:-</span>
                <p className={clsx(isDark ? 'text-gray-300' : 'text-gray-800')}>email: user@user.com</p>
                <p className={clsx(isDark ? 'text-gray-300' : 'text-gray-800')}>password: 1234567890</p>
            </div>

            <div className={clsx("min-h-screen flex flex-col gap-4 items-center justify-center px-4",
                isDark ? 'bg-[#0f0f0f]' : 'bg-gray-100')}>
                <form
                    onSubmit={handleSubmit}
                    className={clsx("p-8 rounded-lg shadow-md w-full max-w-md",
                        isDark ? 'bg-[#1f1f1f] text-white' : 'bg-white text-black')}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

                    {/* Email or Username */}
                    <div className="mb-4">
                        <label className={clsx("block font-medium mb-2", isDark ? 'text-gray-300' : 'text-gray-700')} htmlFor={inputId}>
                            Email or Username
                        </label>
                        <input
                            id={inputId}
                            type="text"
                            placeholder="Enter your email or username"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={clsx("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2",
                                isDark
                                    ? 'bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                                    : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500'
                            )}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className={clsx("block font-medium mb-2", isDark ? 'text-gray-300' : 'text-gray-700')} htmlFor={passwordId}>
                            Password
                        </label>
                        <input
                            id={passwordId}
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={clsx("w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2",
                                isDark
                                    ? 'bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                                    : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500'
                            )}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                <div className={clsx("w-full max-w-md flex flex-col gap-4 items-center rounded-lg shadow-md p-6",
                    isDark ? 'bg-[#1f1f1f] text-gray-300' : 'bg-white text-gray-600')}>
                    <div className='flex gap-3 items-center text-sm'>
                        <span>Don't have an account?</span>
                        <Link to={"/register"} className='font-medium text-blue-500 hover:text-blue-700 hover:underline transition-colors'>
                            Register
                        </Link>
                    </div>

                    <div className='flex gap-3 items-center text-sm'>
                        <span>Forgot password?</span>
                        <Link to={""} className='font-medium text-blue-500 hover:text-blue-700 hover:underline transition-colors'>
                            Reset password
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SignIn
