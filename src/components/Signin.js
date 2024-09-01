import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";
import {BeatLoader} from "react-spinners";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/UserContext";

export default function SignIn() {
    const { userLoggedIn } = useAuth();

    const pushMain = () => {
        window.location = '/candidates';
    }

    if (userLoggedIn) pushMain();
    return (
        <div className="relative text-white h-[100vh] flex justify-center items-center">
            <img
                src="https://c1.wallpaperflare.com/preview/1/1010/561/table-work-computer-study-reading.jpg"
                className="h-screen w-screen absolute object-cover"
            />
            <TheForm />
        </div>
    );
}

function TheForm() {
    const [showLogin, setShowLogin] = useState(false);

    const handleShow = (bool) => {
        setShowLogin(bool);
    }

    return (
        <div className="bg-black bg-opacity-80 backdrop-filter backdrop-blur-sm absolute z-10 w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/4 h-4/5 left-1/2 transform -translate-x-1/2 rounded-md shadow-md">
            <Register handleShow={handleShow} showLogin={showLogin}/>
            <Login showLogin={showLogin} handleShow={handleShow} />
        </div>
    );
}

function Register({ handleShow, showLogin }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        if (!email.includes("@gmail.com")) {
            toast.error("Your email must have @gmail.com");
            return;
        }
        if (password.length < 6) {
            toast.error("Your password must have more than 6 characters");
            return;
        }
        // avatar: avatarData[index]
        try {
            if (!isSigningUp && password === confirmPass) {
                setIsSigningUp(true);
                // const index = getRandomInt(1, avatarData.length - 1);
                const newUserData = {
                    email: email, username: name, password: password, 
                }
                await axios.post('/auth/signup', newUserData);
                toast.success("Create account successfully");
                handleShow(true);
            }
            else if (password !== confirmPass) {
                toast.error("Confirm your Password correctly!")
            }
        } catch (e) {
            toast.error("Error occurred! Please try again later or contact the owner");
        } finally {
            setEmail("")
            setName("")
            setPassword("")
            setConfirmPass("")
            setIsSigningUp(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12 mt-8 px-4 sm:px-8" onClick={() => handleShow(false)}>
            <div className="flex flex-col gap-4 md:gap-6">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-white hover:text-purple-500">Sign Up</h1>
                <h2 className="text-lg md:text-xl text-center text-white hover:text-purple-500">New here! Create your own account</h2>
            </div>
            <form className="flex flex-col gap-4 md:gap-6" onSubmit={onSubmit}>
                <div className="relative my-4">
                    <input 
                        type="email" 
                        className="block w-full sm:w-[400px] md:w-[500px] py-2.3 px-0 text-lg md:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                        placeholder=""
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="" className="absolute text-lg md:text-xl text-white duration-300 transform -translate-y-6 scale-75 top-1 left-0 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
                    <BiUser className="absolute top-2 right-4 text-lg md:text-xl" />
                </div>

                <div className="relative my-4">
                    <input 
                        type="text" 
                        className="block w-full sm:w-[400px] md:w-[500px] py-2.3 px-0 text-lg md:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                        placeholder=""
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor="" className="absolute text-lg md:text-xl text-white duration-300 transform -translate-y-6 scale-75 top-1 left-0 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
                    <BiUser className="absolute top-2 right-4 text-lg md:text-xl" />
                </div>
                    
                <div className="relative my-4">
                    <input 
                        type="password" 
                        className="block w-full sm:w-[400px] md:w-[500px] py-2.3 px-0 text-lg md:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                        placeholder=""
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="" className="absolute text-lg md:text-xl text-white duration-300 transform -translate-y-6 scale-75 top-1 left-0 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
                    <AiOutlineUnlock className="absolute top-2 right-4 text-lg md:text-xl" />
                </div>

                <div className="relative my-4">
                    <input 
                        type="password" 
                        className="block w-full sm:w-[400px] md:w-[500px] py-2.3 px-0 text-lg md:text-xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                        placeholder=""
                        value={confirmPass}
                        onChange={e => setConfirmPass(e.target.value)}
                    />
                    <label htmlFor="" className="absolute text-lg md:text-xl text-white duration-300 transform -translate-y-6 scale-75 top-1 left-0 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm your Password</label>
                    <AiOutlineUnlock className="absolute top-2 right-4 text-lg md:text-xl" />
                </div>
                    
                <button className="w-full sm:w-[400px] md:w-[500px] text-[16px] md:text-[18px] mt-6 rounded-full bg-white text-purple-600 hover:bg-purple-600 hover:text-white py-2 transition-colors duration-300">
                    {isSigningUp ? <BeatLoader color="black" /> : "Create Account"}
                </button>
            </form>
        </div>
    )
}

function Login({ showLogin, handleShow }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const { setCurrentUser, setUserLoggedIn, fetchUser } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSigningIn(true);
        try {
            const {data} = await axios.post('/auth/login', new URLSearchParams({
                username: email,
                password: password
            }));
            if (data.error) {
                console.log(data.error);
                toast.error(data.error);
                setIsSigningIn(false);
            } else {
                console.log(data.token);
                setPassword("");
                setEmail("");
                setCurrentUser();
                localStorage.setItem("user_token", data["access_token"])
                setUserLoggedIn(true);
                setIsSigningIn(false);
                fetchUser();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.detail)
            setIsSigningIn(false);
        }
    }

    return (
        <div
            className={`bg-white absolute z-20 top-20 w-full ${
                showLogin ? "rounded-t-full h-full" : "translate-y-[500px] h-20"
            } duration-300 transform overflow-hidden flex flex-col items-center justify-center gap-8 sm:gap-12 px-4 sm:px-8 mt-8`}
            onClick={() => handleShow(true)}
        >
            <div className="flex flex-col gap-4 md:gap-6 md:mt-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center hover:text-purple-500 text-black">Sign In</h1>
                {showLogin && <h2 className="text-lg md:text-xl text-center hover:text-purple-500 text-black">Log in to access your account</h2>}
            </div>
            {showLogin && (<form className="flex flex-col gap-4 md:gap-6" onSubmit={onSubmit}>
                <div className="relative my-4">
                    <input 
                        type="email" 
                        className="block w-full sm:w-[400px] md:w-[500px] py-2.3 px-0 text-lg md:text-xl text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                        placeholder=""
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="" className="absolute text-lg md:text-xl text-black duration-300 transform -translate-y-6 scale-75 top-1 left-0 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
                    <BiUser className="absolute top-2 right-4 text-lg md:text-xl" />
                </div>

                <div className="relative my-4">
                    <input 
                        type="password" 
                        className="block w-full sm:w-[400px] md:w-[500px] py-2.3 px-0 text-lg md:text-xl text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                        placeholder=""
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="" className="absolute text-lg md:text-xl text-black duration-300 transform -translate-y-6 scale-75 top-1 left-0 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
                    <AiOutlineUnlock className="absolute top-2 right-4 text-lg md:text-xl" />
                </div>
                    
                <button className="w-full sm:w-[400px] md:w-[500px] text-[16px] md:text-[18px] mt-6 rounded-full bg-purple-600 text-white hover:bg-black hover:text-white py-2 transition-colors duration-300">
                    {isSigningIn ? <BeatLoader color="white" /> : "Sign In"}
                </button>
            </form>)}
        </div>
    );
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
