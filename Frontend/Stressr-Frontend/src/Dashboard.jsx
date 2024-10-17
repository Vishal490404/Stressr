import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { jwtDecode } from 'jwt-decode';
import MainEditor from './Components/MainEditor'; 
// import { SelectorMenu } from './Components/TestGeneratorSelector';


const Dashboard = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);

    const [code1, setCode1] = useState('// Write your code here...');
    const [code2, setCode2] = useState('// Compare it with this code...');
    const [language, setLanguage] = useState('javascript');

    const getCookie = (cookieName) => {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;                                    
    };

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error('Please login to access the Dashboard');
            navigate('/login');
        } else {
            const authToken = getCookie('auth_token');
            if (authToken) {
                try {
                    const decodedToken = jwtDecode(authToken);
                    const profileImageUrl = decodedToken.picture;
                    console.log(profileImageUrl)
                    setProfileImage(profileImageUrl);
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="w-screen h-screen absolute z-5 overflow-x-hidden">
            {loading ? (
                <div className="w-screen h-screen flex justify-center items-center">
                    <HashLoader color="#ffffff" loading={true} size={60} />
                </div>
            ) : (
                <>
                    <nav className="w-screen py-4 px-8 flex justify-between items-center bg-gray-950 z-20 fixed">
                        <h1 className="text-2xl font-bold text-white drop-shadow-lg flex items-center space-x-2">
                            <button onClick={() => window.location.href = '/'}>Stressr</button>
                        </h1>
                        <ul className="flex space-x-6 text-white items-center">
                            <li>
                                <Link to="/about" className="hover:text-gray-300 transition-colors duration-200">
                                    User Guide
                                </Link>
                            </li>
                            {!isLoggedIn ? (
                                <li><Link to="/login" className="hover:text-gray-300 transition-colors duration-200">Login</Link></li>
                            ) : (
                                <li>
                                    {profileImage && (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    )}
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className="h-screen w-screen flex flex-col justify-center items-center z-10 absolute">
                        <h2 className="text-3xl font-bold mb-4 text-white">Code</h2>
                        <MainEditor
                            code1={code1}
                            setCode1={setCode1}
                            code2={code2}
                            setCode2={setCode2}
                            language={language}
                            setLanguage={setLanguage}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
