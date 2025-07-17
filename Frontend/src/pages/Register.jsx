/* import React, { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser, registerUser } from '../Redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [coverImagePreview, setCoverImagePreview] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
    const id = useId();
    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        const reader = new FileReader();
        reader.onload = () => setAvatarPreview(reader.result);   //reader.onload triggers when reading is complete,  Set preview when loaded
        if (file) reader.readAsDataURL(file);    // Start reading file, reader.readAsDataURL() converts the image to a Base64 string
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        setCoverImage(file);
        const reader = new FileReader();
        reader.onload = () => setCoverImagePreview(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (!fullName || !userName || !email || !password || !avatar) {
            setError("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        // Email format validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email");
            setIsSubmitting(false);
            return;
        }

        // Password strength (example: min 8 chars)
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            setIsSubmitting(false);
            return;
        }

        //FormData() => To send files + text data together in one HTTP request. Required when uploading files via axios/fetch
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('userName', userName.toLowerCase()); // Normalize username
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);
        if (coverImage) formData.append('coverImage', coverImage);

        try {
            await dispatch(registerUser(formData)).unwrap();
            await dispatch(fetchCurrentUser()).unwrap();
            navigate("/");
        } catch (err) {
            if (err.status === 409) {
                setError("Username or email already exists");
            } else {
                setError(err.message || "Registration failed. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }

        /* dispatch(registerUser(formData))
            .unwrap()
            .then(() => {
                dispatch(fetchCurrentUser());
                navigate("/");
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Registration failed. Please try again.");
        }); 
    };

    

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-2 text-center">Welcome to BingeMe</h2>
                <p className="text-gray-600 text-center mb-6">Create your account to get started</p>
                
                {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-fullName`}>Full Name *</label>
                    <input 
                        id={`${id}-fullName`} 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => { setFullName(e.target.value); setError(''); }} 
                        placeholder="Enter your full name" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-userName`}>Username *</label>
                    <input 
                        id={`${id}-userName`} 
                        autoComplete="username" 
                        type="text" 
                        value={userName} 
                        onChange={(e) => { setUserName(e.target.value); setError(''); }} 
                        placeholder="Choose a username" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-email`}>Email *</label>
                    <input 
                        id={`${id}-email`} 
                        type="email" 
                        value={email} 
                        onChange={(e) => { setEmail(e.target.value); setError(''); }} 
                        placeholder="Enter your email" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-password`}>Password *</label>
                    <input 
                        id={`${id}-password`} 
                        autoComplete="new-password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => { setPassword(e.target.value); setError(''); }} 
                        placeholder="Create a password" 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-avatar`}>Profile Picture *</label>
                    <input 
                        id={`${id}-avatar`} 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                    {avatarPreview && (
                        <div className="mt-2">
                            <img src={avatarPreview} alt="Avatar preview" className="h-20 w-20 rounded-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-coverImage`}>Cover Image (Optional)</label>
                    <input 
                        id={`${id}-coverImage`} 
                        type="file" 
                        accept="image/*" 
                        onChange={handleCoverImageChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    {coverImagePreview && (
                        <div className="mt-2">
                            <img src={coverImagePreview} alt="Cover preview" className="h-32 w-full rounded-lg object-cover" />
                        </div>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>

            <div className='w-full max-w-md bg-white flex flex-col gap-4 items-center rounded-lg shadow-md p-6'>
                <div className='flex gap-3 items-center text-sm text-gray-600'>
                    <span>Already have an account?</span>
                    <Link to="/signin" className='font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors'>Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default Register; */

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
            
            // Create preview
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validations remain the same
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
        
        // Register user and wait for it to complete
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

    /* // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simple validation
        if (!formData.fullName || !formData.userName || !formData.email || !formData.password || !avatar) {
            setError("Please fill all required fields");
            setIsLoading(false);
            return;
        }

        // Email validation
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setError("Please enter a valid email");
            setIsLoading(false);
            return;
        }

        // Password validation
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            setIsLoading(false);
            return;
        }

        try {
            // Create FormData
            const data = new FormData();
            data.append('fullName', formData.fullName);
            data.append('userName', formData.userName.toLowerCase());
            data.append('email', formData.email);
            data.append('password', formData.password);
            data.append('avatar', avatar);
            if (coverImage) data.append('coverImage', coverImage);

            // Register user
            await dispatch(registerUser(data)).unwrap();
            
            // Get current user
            await dispatch(fetchCurrentUser()).unwrap();
            
            // Redirect on success
            navigate('/');
            
        } catch (err) {
            // Handle different error types
            if (err.status === 409) {
                setError("Username or email already exists");
            } else {
                setError(err.message || "Registration failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }; */

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-2 text-center">Welcome to BingeMe</h2>
                <p className="text-gray-600 text-center mb-6">Create your account</p>
                
                {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

                {/* Text Inputs */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-fullName`}>
                        Full Name *
                    </label>
                    <input
                        id={`${id}-fullName`}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-userName`}>
                        Username *
                    </label>
                    <input
                        id={`${id}-userName`}
                        autoComplete="username" 
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-email`}>
                        Email *
                    </label>
                    <input
                        id={`${id}-email`}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor={`${id}-password`}>
                        Password *
                    </label>
                    <input
                        id={`${id}-password`}
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* File Inputs with Previews */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Profile Picture *
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setAvatar, setAvatarPreview)}
                        className="w-full px-4 py-2 border rounded-lg mb-2"
                        required
                    />
                    {avatarPreview && (
                        <div className="mt-2 flex justify-center">
                            <img 
                                src={avatarPreview} 
                                alt="Avatar preview" 
                                className="h-20 w-20 rounded-full object-cover border"
                            />
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Cover Image (Optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setCoverImage, setCoverImagePreview)}
                        className="w-full px-4 py-2 border rounded-lg mb-2"
                    />
                    {coverImagePreview && (
                        <div className="mt-2">
                            <img 
                                src={coverImagePreview} 
                                alt="Cover preview" 
                                className="w-full h-32 rounded-lg object-cover border"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Registering...
                        </span>
                    ) : 'Register'}
                </button>
            </form>

            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-blue-600 hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;