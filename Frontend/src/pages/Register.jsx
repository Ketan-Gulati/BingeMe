import React, { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser, registerUser } from '../Redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form states
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: ''
    });
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [coverImagePreview, setCoverImagePreview] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const id = useId();

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    // Handle file uploads with preview
    const handleFileChange = (e, setFile, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.fullName || !formData.userName || !formData.email || !formData.password || !avatar) {
            setError("Please fill all required fields");
            setIsLoading(false);
            return;
        }

        try {
            const formDataObj = new FormData();
            formDataObj.append('fullName', formData.fullName);
            formDataObj.append('userName', formData.userName.toLowerCase());
            formDataObj.append('email', formData.email);
            formDataObj.append('password', formData.password);
            formDataObj.append('avatar', avatar);
            if (coverImage) formDataObj.append('coverImage', coverImage);

            await dispatch(registerUser(formDataObj)).unwrap();
            navigate('/');
        } catch (err) {
            if (err.payload?.status === 409) {
                setError("Username or email already exists");
            } else {
                setError(err.payload?.message || "Registration failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-[#121212] px-4">
            <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">Welcome to BingeMe</h2>
                <p className="text-gray-400 text-center mb-6">Create your account</p>

                {error && <div className="mb-4 p-2 bg-red-500/20 text-red-400 rounded text-sm">{error}</div>}

                {/* Full Name */}
                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2" htmlFor={`${id}-fullName`}>Full Name *</label>
                    <input
                        id={`${id}-fullName`}
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Username */}
                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2" htmlFor={`${id}-userName`}>Username *</label>
                    <input
                        id={`${id}-userName`}
                        name="userName"
                        autoComplete="username"
                        type="text"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2" htmlFor={`${id}-email`}>Email *</label>
                    <input
                        id={`${id}-email`}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2" htmlFor={`${id}-password`}>Password *</label>
                    <input
                        id={`${id}-password`}
                        name="password"
                        autoComplete="new-password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Avatar */}
                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2">Profile Picture *</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setAvatar, setAvatarPreview)}
                        className="w-full text-gray-200 px-4 py-2 bg-[#1f1f1f] border border-gray-600 rounded-lg mb-2"
                        required
                    />
                    {avatarPreview && (
                        <div className="mt-2 flex justify-center">
                            <img src={avatarPreview} alt="Avatar preview" className="h-20 w-20 rounded-full object-cover border border-gray-600" />
                        </div>
                    )}
                </div>

                {/* Cover Image */}
                <div className="mb-6">
                    <label className="block text-gray-300 font-medium mb-2">Cover Image (Optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setCoverImage, setCoverImagePreview)}
                        className="w-full text-gray-200 px-4 py-2 bg-[#1f1f1f] border border-gray-600 rounded-lg mb-2"
                    />
                    {coverImagePreview && (
                        <div className="mt-2">
                            <img src={coverImagePreview} alt="Cover preview" className="w-full h-32 rounded-lg object-cover border border-gray-600" />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Registering...
                        </span>
                    ) : 'Register'}
                </button>
            </form>

            <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-blue-500 hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
