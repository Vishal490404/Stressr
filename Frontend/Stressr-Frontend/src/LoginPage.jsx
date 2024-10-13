import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import HashLoader from 'react-spinners/HashLoader';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext'; 

const LoginPage = () => {
    const { isLoggedIn, login, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }

        return () => clearTimeout(timer);
    }, []);

    const handleLoginSuccess = (credentialResponse) => {
        const decodedResponse = jwtDecode(credentialResponse.credential);
        const name = decodedResponse.name || "User"; 
        setUserName(name);
        localStorage.setItem('userName', name);

        console.log(decodedResponse);
        login(credentialResponse.credential);
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    const handleLogout = () => {
        setLoading(true); 
        logout();
        localStorage.removeItem('userName');
        setUserName('');
        setTimeout(() => {
            setLoading(false); 
        }, 1500);
    };

    const goToAbout = () => {
        navigate('/about'); 
    };

    return (
        <div className={`w-screen h-screen grid grid-cols-2 transition-opacity duration-300`} style={{ position: "absolute", zIndex: 1 }}>
            {loading ? (
                <div className="flex justify-center items-center w-screen h-screen">
                    <HashLoader color="#ffffff" loading={true} size={60} />
                </div>
            ) : isLoggedIn ? (
                <>
                    <button 
                        onClick={goToAbout} 
                        className="flex flex-col justify-center items-center pr-20 hover:backdrop-blur-sm transition duration-300 z-10 relative group cursor-pointer"
                    >
                        <h1 className="text-5xl font-bold text-white mb-32 text-center">User Guide</h1>
                        <div className="absolute transform transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <span className="block w-6 h-6 border-b-2 border-l-2 border-white transform rotate-45"></span>
                        </div>
                    </button>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col h-48 w-auto bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl shadow-lg border border-white p-6 z-20">
                        <h1 className="text-3xl font-semibold text-white mb-4 text-center">Welcome!</h1>
                        <h1 className="text-4xl font-bold text-white mb-4 text-center">{userName}</h1>
                        <button onClick={handleLogout} className="bg-white text-black px-4 py-2 rounded-3xl hover:bg-gray-300">
                            Logout
                        </button>
                    </div>
                    <div className="flex flex-col justify-center items-center pl-20 hover:backdrop-blur-sm transition duration-300 z-10 relative group cursor-pointer">
                        <h1 className="text-5xl font-bold text-white mb-32 text-center">Dashboard</h1>
                        <div className="absolute transform transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <span className="block w-6 h-6 border-t-2 border-r-2 border-white transform rotate-45"></span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <button 
                        onClick={goToAbout} 
                        className="flex flex-col justify-center items-center pr-20 hover:backdrop-blur-sm transition duration-300 z-10 relative group cursor-pointer"
                    >
                        <h1 className="text-5xl font-bold text-white mb-32 text-center">User Guide</h1>
                        <div className="absolute transform transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <span className="block w-6 h-6 border-b-2 border-l-2 border-white transform rotate-45"></span>
                        </div>
                    </button>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col h-48 w-96 bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl shadow-lg border border-white p-6 z-20">
                        <h1 className="text-3xl font-semibold text-white mb-14 text-center">Hop into Stressr!</h1>

                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                            shape="circle"
                            logo_alignment="center"
                        />
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
