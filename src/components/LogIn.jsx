'use client';
import { useState } from "react"
import LoginButton from "../components/LoginButton"
import { useEffect } from "react";
import { fLoginService } from "../services/auth.services";
import { useRouter } from "next/navigation";
import ActionButton from "../components/ActionButton"
export default function LogIn() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (!message) {
            return;
        }
        const timer = setTimeout(() => {
            setMessage("");
        }, 2000);
        return () => clearTimeout(timer);

    }, [message]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username && !password) {
            setMessage("Enter Username and Password");
            setIsSuccess(false);
            return;
        }
        else if (!username) {
            setMessage("Enter Username");
            setIsSuccess(false);
            return;
        }
        else if (!password) {
            setMessage("Enter password");
            setIsSuccess(false);
            return;
        }
        try {
            const credentials = {
                username: username,
                password: password
            }
            await fLoginService(credentials);
            router.push('/');
            setPassword("");
            setUsername("");

            setIsSuccess(true);

        } catch (err) {
            setIsSuccess(false);
            console.error(err);
            setMessage(err.message || "something went wrong");
        }

    }


    return (
        <div className="flex w-screen h-screen items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-md rounded-xl bg-[#020617] border border-[#34d399] p-6">
                <div className="flex flex-col items-center gap-6">

                    <h1 className="text-[#34d399] text-4xl font-bold">LogIn</h1>

                    <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>


                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-md h-10 px-4 bg-transparent border border-white text-white focus:border-[#34d399] outline-none transition-all"
                            />
                        </div>


                        <div className="relative flex w-full items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md h-10 pl-4 pr-12 bg-transparent border border-white text-white focus:border-[#34d399] outline-none transition-all"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <ActionButton onToggle={() => setShowPassword(!showPassword)} />
                            </div>
                        </div>

                        {message && (
                            <p className={`text-sm text-center w-full ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                                {message}
                            </p>
                        )}


                        <div className="w-full flex justify-center mt-2">
                            <LoginButton label="LogIn"/>
                        </div>


                        <p className="text-xs text-center w-full text-slate-400 mt-2">
                            {`Don't have an Account? `}
                            <span className="text-blue-400 text-xs cursor-pointer hover:underline">Fuck Off</span>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    );
}