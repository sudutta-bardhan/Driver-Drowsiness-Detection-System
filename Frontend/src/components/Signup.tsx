import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        dateOfBirth: "",
        contactNumber: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // matches your backend port 2000 and route /register
            const response = await axios.post("http://localhost:2000/register", formData);
            
            if (response.data.user) {
                alert("Registration successful!");
                navigate("/login"); // Navigate to login after success
            }
        } catch (error: any) {
            console.error("Signup error:", error.response?.data);
            alert(error.response?.data?.message || "Error during registration");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1c2025] text-white">
            <form onSubmit={handleSignup} className="bg-[#2a303c] p-8 rounded-xl shadow-2xl w-96 flex flex-col gap-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Driver Registration</h2>

                <input
                    name="userName"
                    type="text"
                    placeholder="Full Name"
                    value={formData.userName}
                    onChange={handleChange}
                    className="bg-[#1e2329] border border-slate-600 rounded p-2 text-white focus:border-blue-500 outline-none"
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#1e2329] border border-slate-600 rounded p-2 text-white focus:border-blue-500 outline-none"
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-[#1e2329] border border-slate-600 rounded p-2 text-white focus:border-blue-500 outline-none"
                    required
                />

                <input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="bg-[#1e2329] border border-slate-600 rounded p-2 text-white focus:border-blue-500 outline-none"
                    required
                />

                <input
                    name="contactNumber"
                    type="text"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="bg-[#1e2329] border border-slate-600 rounded p-2 text-white focus:border-blue-500 outline-none"
                    required
                />

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 mt-2 rounded transition-colors">
                    Create Account
                </button>

                <p className="text-center text-sm text-slate-400 mt-2">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;