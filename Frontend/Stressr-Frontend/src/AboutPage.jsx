import { useEffect, useState, useRef, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import HashLoader from "react-spinners/HashLoader";
import Faq from "react-faq-component";
import "./AboutPage.css";
import { Scrollbars } from "react-custom-scrollbars";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";

const data = {
  title: <> FAQ&apos;s (Frequently Asked Questions) </>,
  rows: [
    {
      title: <>What is Stress Testing?</>,
      content: `Stress testing in competitive programming is a technique used to evaluate how a solution performs under extreme or boundary conditions. 
        It involves generating a large number of test cases, including random and edge cases, to see if a code can handle the worst-case scenarios efficiently. By running the code through these tests, you can identify potential bugs, inefficiencies, or failure points that may not appear during regular testing with small or average input sizes.
        In essence, stress testing ensures that your solution
        is robust and performs well, 
        even when pushed to its limits.`,
    },
    {
      title: <> What is this website for?</>,
      content:
        "This website helps competitive programmers test their solutions by generating random and edge case test inputs to check how their code handles different scenarios.",
    },
    {
      title: <>  How long does it take to run the tests?</>,
      content: `The time to complete tests depends on the number of cases and the complexity of your solution, typically ranging from a few seconds to minutes. `,
    },
    {
      title: <>  Is my code kept private?</>,
      content: `Yes, your code is secure and only used for testing purposes. We do not share it with third parties.

`,
    },
    {
      title: <> What is time complexity?</>,
      content: `Time complexity is a measure of the amount of time an algorithm takes to run as a function of the input size. It helps estimate how efficiently a solution performs as the input size grows.`,
    },
    {
      title: <> Why is time complexity important in competitive programming?</>,
      content: `In competitive programming, your solution must run within the time limits provided by the problem. An inefficient algorithm may fail to complete within the allowed time, especially for large inputs.`,
    },
    {
      title: <>  How is time complexity calculated?</>,
      content: `Time complexity is calculated by analyzing the number of operations an algorithm performs relative to the input size. Common notations include O(1), O(log n), O(n), O(n log n), O(n²), and so on.`,
    },
    {
      title: <> What is the typical time limit for competitive programming problems?</>,
      content: `Most competitive programming problems have a time limit of 1 to 2 seconds. Solutions need to handle the maximum input size within this limit.

`,
    },
    {
      title: <> How can stress testing help identify time complexity issues?</>,
      content: `Stress testing generates large input cases that push your solution to its limits. If your code takes too long to execute on these inputs, it might indicate that your time complexity is too high and needs optimization.`,
    },
    {
      title: <> What should I do if my solution exceeds the time limit?</>,
      content: `If your solution exceeds the time limit during stress testing, you may need to optimize your algorithm by reducing its time complexity, using better data structures, or implementing more efficient algorithms. `,
    },
    {
      title: <> How can I compare my correct solution with a brute-force one?</>,
      content: `You can upload both your optimized solution and a brute-force version, and our system will run both against the same set of test cases to compare their outputs and execution times.`,
    },
    {
      title: <> What happens if my solution gives the wrong answer on some test cases?</>,
      content: `If your solution produces a wrong answer, the platform will highlight the specific test case where the difference occurs, along with the expected correct output, so you can debug the issue.`,
    },
    {
      title: <> How do I use Stressr?</>,
      content: `Stressr is designed to be intuitive and easy to use. Here's a quick guide:

1. Log in or create an account
2. Navigate to the Dashboard
3. Create a new stress test by clicking the "New Test" button
4. Enter your solution code and the brute force code (if applicable)
5. Set the test parameters (number of test cases, input ranges, etc.)
6. Click "Run Test" to start the stress testing process
7. Review the results, including any differences found between your solution and the brute force method

For a more detailed walkthrough, check out our User Guide section below.`,
    },
  ],
};

const styles = {
  bgColor: 'transparent',
  titleTextColor: "#ffffff",
  rowTitleColor: "#ffffff",
  rowContentColor: '#ffffff',
  arrowColor: "#ffffff",
};

const config = {
  animate: true,
  // arrowIcon: "+",
  expandIcon: "+",
  collapseIcon: "-",
  tabFocus: true
};

const AboutPage = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };

  useEffect(() => {
    const authToken = getCookie("auth_token");

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const profileImageUrl = decodedToken.picture;
        setProfileImage(profileImageUrl);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setLoading(true);
    logout();
    localStorage.removeItem("userName");
    toast.success("You have successfully logged out.", {
      style: {
        background: "white",
        color: "black",
      },
      duration: 2000,
    });

    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  const userGuideSteps = [
    {
      title: "Step 1: Log in or Sign up",
      description: "Create an account or log in to access all features of Stressr.",
      image: "/path/to/login-screenshot.png"
    },
    {
      title: "Step 2: Create a New Test",
      description: "From your dashboard, click on 'New Test' to start a new stress testing session.",
      image: "/path/to/new-test-screenshot.png"
    },
    {
      title: "Step 3: Enter Your Code",
      description: "Paste your solution code and, if applicable, the brute force code into the provided editors.",
      image: "/path/to/code-entry-screenshot.png"
    },
    {
      title: "Step 4: Set Test Parameters",
      description: "Configure the test settings, such as the number of test cases and input ranges.",
      image: "/path/to/test-params-screenshot.png"
    },
    {
      title: "Step 5: Run the Test",
      description: "Click 'Run Test' to start the stress testing process and wait for the results.",
      image: "/path/to/run-test-screenshot.png"
    },
    {
      title: "Step 6: Review Results",
      description: "Analyze the test results, including any differences found between your solution and the brute force method.",
      image: "/path/to/results-screenshot.png"
    }
  ];

  return (
    <>
      <div className="w-screen h-screen absolute z-5 overflow-x-hidden">
        {loading ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <HashLoader color="#ffffff" loading={true} size={60} />
          </div>
        ) : (
          <>
            <nav className="w-screen py-4 px-8 flex justify-between items-center bg-gray-950 z-20 fixed">
              <h1 className="text-2xl font-bold text-white drop-shadow-lg flex items-center space-x-2">
                <button onClick={() => (window.location.href = "/")}>
                  Stressr
                </button>
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
                {isLoggedIn && profileImage && (
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
                {!isLoggedIn && (
                  <li>
                    <Link to="/login" className="hover:text-gray-300 transition-colors duration-200">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            <Scrollbars
              style={{ width: "100%", height: "calc(100vh)" }}
              className="scrollbar-container"
            >
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="faq-container flex items-center justify-center mb-16"
              >
                <Faq 
                  data={data} 
                  styles={styles} 
                  config={config}
                  getRowOptions={() => ({
                    onClick: (e, row, toggleExpand) => {
                      toggleExpand();
                      setExpandedIndex(expandedIndex === row.index ? null : row.index);
                    },
                  })}
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="user-guide-container max-w-4xl mx-auto px-4 py-8 bg-transparent rounded-lg"
              >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">User Guide</h2>
                {userGuideSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-12 bg-gray-800 bg-opacity-50 rounded-lg p-6"
                  >
                    <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 mb-4">{step.description}</p>
                    <img src={step.image} alt={step.title} className="w-full rounded-lg shadow-md" />
                  </motion.div>
                ))}
              </motion.div>
            </Scrollbars>
          </>
        )}
      </div>
    </>
  );
};

export default AboutPage;
