import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import HashLoader from 'react-spinners/HashLoader';
import Faq from "react-faq-component";
import './AboutPage.css'
import { Scrollbars } from 'react-custom-scrollbars';

const data = {
    title: <> FAQ&apos;s (Frequently Asked Questions) </>,
    rows: [
        {
            title: <>Lorem ipsum dolor sit amet,</>,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
        },
        {
            title: <> Nunc maximus, magna at ultricies elementum</>,
            content: "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <> Curabitur laoreet, mauris vel blandit fringilla</>,
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: <>What is the package version</>,
            content: <p>current version is 1.2.1</p>,
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
        const cookieArray = decodedCookie.split(';');
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
        bgColor: '#1c1c1c',
        titleTextColor: 'white',
        rowTitleColor: "white",
        rowContentColor: 'white',
        arrowColor: "white",

        rowTitleTextSize: '20px',
        rowContentTextSize: '16px',
        rowTitleBorderRadius: '5px',
        rowContentBorderRadius: '5px',
    };

    useEffect(() => {
        const authToken = getCookie('auth_token');

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
                                <button onClick={() => window.location.href = '/'}>
                                    Stressr
                                </button>
                            </h1>
                            <ul className="flex space-x-6 text-white items-center">
                                <li><a href="/dashboard" className="cursor-pointer">Dashboard</a></li>
                                {!isLoggedIn ? (
                                    <li><a href="/login" className="cursor-pointer">Login</a></li>
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
                        <Scrollbars style={{ width: '100%', height: 'calc(100vh)' }} className="scrollbar-container">
                            <div className='faq-container flex items-center justify-center'>
                                <Faq
                                    data={data}
                                    styles={styles}
                                    config={config}
                                />
                            </div>
                        </Scrollbars>

                    </>
                )}
            </div>
        </>
    );
};

export default AboutPage;
