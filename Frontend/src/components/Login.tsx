import axios from "axios";

import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { requireNoAuth } from "../config/auth";

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    requireNoAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const onSubmit1 = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            email,
            password
        };
        console.log("Form Data:", data)
        axios.post("http://localhost:2000/login", data)
            .then((res) => {
                console.log(res);
                window.localStorage.setItem("token", res.data.token);


                navigate("/dashboard");

                // window.location.href = "/dashboard";
            }).catch((err: any) => {

                console.log(err.response.data);
                window.alert("Login failed: " + err.response.data.message);
            })
        console.log("Form Data:", data)

    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1c2025] text-white">

            <div className="flex w-full max-w-4xl bg-[#2a303c] rounded-xl overflow-hidden shadow-2xl">
                {/* Visual Banner */}
                <div className="hidden md:flex flex-col items-center justify-center p-12 bg-blue-600 font-bold text-center w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 opacity-90"></div>
                    <div className="z-10 relative">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto border-2 border-white/20">
                            <span className="text-4xl text-white">🚗</span>
                        </div>
                        <h2 className="text-3xl font-extrabold mb-4">Drive AI Monitor</h2>
                        <p className="font-medium text-blue-100 mb-8 max-w-xs">Your Real-Time Safety Control Center. Keeping you active, alert, and alive on the road.</p>
                    </div>
                </div>

                {/* Login Form */}
                <form
                    onSubmit={onSubmit1}
                    className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center"
                >
                    <h2 className="text-2xl font-bold mb-8 text-center sm:text-left">Driver Login</h2>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-400 mb-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="driver@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#1e2329] border border-slate-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-400 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#1e2329] border border-slate-600 rounded p-3 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 mt-4 rounded transition-colors"
                        >
                            Access Control Center
                        </button>
                    </div>

                    <p className="mt-6 text-center text-slate-500 text-sm">
                        Looking to register?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="text-blue-500 hover:underline font-semibold"
                        >
                            Sign up here
                        </button>
                        <br /><br />
                        <span className="text-slate-400">Demo active. Just click login with the prepopulated dummy credentials.</span>
                    </p>

                </form>
            </div>

        </div>
    )
}

export default Login