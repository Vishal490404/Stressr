import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { jwtDecode } from 'jwt-decode';  // Correct import here
import axios from 'axios';

const History = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [history, setHistory] = useState([]);
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
      toast.error('Please login to access the History');
      navigate('/login');
    } else {
      const authToken = getCookie('auth_token');
      if (authToken) {
        try {
          const decodedToken = jwtDecode(authToken);
          if (decodedToken.picture) setProfileImage(decodedToken.picture); 
          setUserId(decodedToken.sub || decodedToken.user_id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (userId) {
        try {
          // console.log(userId)
          const response = await axios.get(`http://localhost:9563/history?user_id=${userId}`);
          // console.log(response.data)
          setHistory(response.data || []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching history:", error);
          toast.error('Failed to fetch history');
          setLoading(false);
        }
      }
    };

    fetchHistory();
  }, [userId]);

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
          <div className="h-screen w-screen flex flex-col items-center z-10 absolute pt-16">
            <h2 className="text-3xl font-bold mb-4 text-white">History</h2>
            <div className="w-3/4 bg-gray-800 rounded-lg p-6 overflow-y-auto max-h-[70vh]">
              {/* {console.log(history.history)} */}
              {history && history.history && history.history.code1.length > 0 ? (
                
                history.history.code1.map((item, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-700 rounded-lg">
                    {/* {console.log(item)} */}
                    <p className="text-white">{item}</p>
                  </div>
                ))
              ) : (
                <p className="text-white text-center">No history available.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default History;


/* 
{history: {…}}
history
: 
code1
: 
['for _ in range(int(input())):\n    a = int(input())…list(map(int,input().split()))\n    print(sum(x))\n']
code2
: 
['#include<bits/stdc++.h>\n\n\n\nusing namespace std;\n\n\n…1;\n        }\n        cout << sum << endl;\n    }\n}']
generator_id
: 
[5]
generator_params
: 
['1 1000 0 20']
language1
: 
['python']
language2
: 
['cpp']
test_cases
: 
[Array(1)]
_id
: 
"117815826491527942729"
[[Prototype]]
: 
Object
[[Prototype]]
: 
Object



*/
