import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import HashLoader from "react-spinners/HashLoader";
import Faq from "react-faq-component";
import "./AboutPage.css";
import { Scrollbars } from "react-custom-scrollbars";

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
  ],
};

const AboutPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const config = {
    animate: true,
    arrowIcon: "V",
    expandIcon: "+",
    collapseIcon: "-",
  };

  const styles = {
    bgColor: "#1c1c1c",
    titleTextColor: "white",
    rowTitleColor: "white",
    rowContentColor: "white",
    arrowColor: "white",

    rowTitleTextSize: "20px",
    rowContentTextSize: "16px",
    rowTitleBorderRadius: "5px",
    rowContentBorderRadius: "5px",
  };

  useEffect(() => {
    const authToken = getCookie("auth_token");

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const profileImageUrl = decodedToken.picture;
        setIsLoggedIn(true);
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

  return (
    <>
      <div className="w-screen h-screen absolute z-5 overflow-x-hidden">
        {loading ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <HashLoader color="#ffffff" loading={true} size={60} />
          </div>
        ) : (
          <>
            <nav className="w-screen  py-4 px-8 flex justify-between items-center bg-gray-950 z-20 fixed">
              <h1 className="text-2xl font-bold text-white drop-shadow-lg flex items-center space-x-2">
                <button onClick={() => (window.location.href = "/")}>
                  Stressr
                </button>
              </h1>
              <ul className="flex space-x-6 text-white items-center">
                <li>
                  <a href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </a>
                </li>
                {!isLoggedIn ? (
                  <li>
                    <a href="/login" className="cursor-pointer">
                      Login
                    </a>
                  </li>
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
            <Scrollbars
              style={{ width: "100%", height: "calc(100vh)" }}
              className="scrollbar-container"
            >
              <div className="faq-container flex items-center justify-center">
                <Faq data={data} styles={styles} config={config} />
              </div>
            </Scrollbars>
          </>
        )}
      </div>
    </>
  );
};

export default AboutPage;