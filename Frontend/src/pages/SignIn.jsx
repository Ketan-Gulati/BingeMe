import React, { useId, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchCurrentUser, loginUser } from '../Redux/slice/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

function SignIn() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");

    const id = useId();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!input || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // backend accepts either email or username
        dispatch(loginUser({ email: input, userName: input, password }))
            .unwrap()    //converts the result into normal promise
            .then(()=>{
                dispatch(fetchCurrentUser());
                navigate("/");
            })
            .catch((err)=>{
                console.log("Login failed:", err);
                alert("Invalid credentials");
            }) 
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        {/* Email or Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor={id}>
            Email or Username
          </label>
          <input
            id={id}
            type="text"
            placeholder="Enter your email or username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor={id}>
            Password
          </label>
          <input
            id={id}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

    </div>
  )
}

export default SignIn