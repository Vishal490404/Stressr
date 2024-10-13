import Typewriter from 'typewriter-effect';
import AnimatedButton from './Components/AnimatedButton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import HashLoader from 'react-spinners/HashLoader';

export default function LandingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center" style={{ position: "absolute", zIndex: 1 }}>
                {loading ? (
                    <div className="flex justify-center items-center w-screen h-screen">
                        <HashLoader color="#ffffff" loading={true} size={60} />
                    </div>
                ) : (
                    <>
                        <div className="text-white text-5xl font-bold text-center">
                            <h1 className="text-4xl mb-2">Welcome to,</h1>
                            <div className="text-9xl mb-10">
                                <Typewriter
                                    options={{
                                        strings: [
                                            `<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Stressr</span>`,
                                            `<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-500 to-green-500">Stressr</span>`,
                                            `<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-amber-500">Stressr</span>`,
                                            `<span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Stressr</span>`,
                                            `<span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-violet-500">Stressr</span>`,
                                            `<span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-lime-500">Stressr</span>`,
                                            `<span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500">Stressr</span>`,
                                            `<span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500">Stressr</span>`
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        cursor: '_',
                                        delay: 75,
                                        deleteSpeed: 50,
                                    }}
                                />
                                <div className='text-lg font-normal m-5 text-gray-300'>
                                    A Stress Testing tool for Competitive Programming
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-10 right-10" style={{ position: "absolute", zIndex: 1 }}>
                            <AnimatedButton onClick={handleLoginClick} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
