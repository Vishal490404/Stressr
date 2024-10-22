import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { jwtDecode } from 'jwt-decode';
import MainEditor from './Components/MainEditor'; 
// import { SelectorMenu } from './Components/TestGeneratorSelector';


const Dashboard = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [userId, setUserId] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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
                    setProfileImage(profileImageUrl);
                    setUserId(decodedToken.sub || decodedToken.user_id);
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        setLoading(true);
        logout();
        localStorage.removeItem('userName');
        toast.success('You have successfully logged out.', {
            style: {
                background: 'white',
                color: 'black',
            },
            duration: 2000,
        });

        setTimeout(() => {
            setLoading(false);
            navigate('/login');
        }, 2000);
    };

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
                                <Link to="/dashboard" className="hover:text-gray-300 transition-colors duration-200">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/history" className="hover:text-gray-300 transition-colors duration-200">
                                    History
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-gray-300 transition-colors duration-200">
                                    User Guide
                                </Link>
                            </li>
                            {profileImage && (
                                <li className="relative" ref={dropdownRef}>
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full cursor-pointer"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    />
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <Link
                                                to="/history"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                History
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className="h-screen w-screen flex flex-col justify-center items-center z-10 absolute">
                        <h2 className="text-3xl font-bold mb-4 text-white">Code</h2>
                        <MainEditor userId={userId}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
