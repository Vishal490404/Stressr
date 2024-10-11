import { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';

const LoginPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Hello")
            setLoading(false);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);
    // console.log(loading)
    return (
        <div className={`w-screen h-screen grid grid-cols-2 transition-opacity duration-300`} style={{ position: "absolute", zIndex: 1 }}>
            {loading ? (
                <div className="flex justify-center items-center w-screen h-screen">
                    <HashLoader color="#ffffff" loading={true} size={60} />
                </div>
            ) : (
                <>
                    <div className="flex flex-col justify-center items-center pr-20 hover:backdrop-blur-sm transition duration-300 z-10 relative group cursor-pointer">
                        <h1 className="text-5xl font-bold text-white mb-32 text-center">User Guide</h1>
                        <div className="absolute transform transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <span className="block w-6 h-6 border-b-2 border-l-2 border-white transform rotate-45"></span>
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col h-48 w-96 bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl shadow-lg border border-white p-6 z-20">
                        <h1 className="text-3xl font-semibold text-white mb-14 text-center">Hop into Stressr!</h1>
                        <button className="px-6 py-2 bg-white bg-opacity-50 text-black font-semibold rounded-full hover:bg-opacity-70 transition duration-300 cursor-pointer">
                            Google Login
                        </button>
                    </div>
                    <div className="flex flex-col justify-center items-center pl-20 hover:backdrop-blur-sm transition duration-300 z-10 relative group cursor-pointer">
                        <h1 className="text-5xl font-bold text-white mb-32 text-center">Dashboard</h1>
                        <div className="absolute transform transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <span className="block w-6 h-6 border-t-2 border-r-2 border-white transform rotate-45"></span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginPage;
