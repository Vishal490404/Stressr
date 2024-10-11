import Typewriter from 'typewriter-effect';
import PropTypes from 'prop-types';

const NeonButton = ({ text }) => {
    return (
        <button className="neon-button text-white font-bold py-2 px-6 rounded-3xl">
            {text}
        </button>
    );
}

export default function LandingPage() {

    return (
        <>
            <div className="w-screen h-screen  flex justify-center items-center " style={{ position: "absolute", zIndex: 1 }}>
                <div className="text-white text-5xl font-bold text-center">
                    <h1 className="text-4xl mb-2">Welcome to,</h1>
                    <div className="text-9xl mb-10">
                        <Typewriter
                            options={{
                                strings: ['Stressr'],
                                autoStart: true,
                                loop: true,
                                cursor: '_',
                            }}
                        />
                        <div className='text-lg font-normal m-5 text-gray-300'>A Stress Testing tool for Competitive Programming</div>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-10 right-10' style={{ position: "absolute", zIndex: 1 }}>
                <NeonButton text="Get Started" />
            </div>


            <div className="relative inline-flex  group" style={{ position: "absolute", zIndex: 1 }}    >
                <div
                    className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                </div>
                <a href="#" title="Get quote now"
                    className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button">Get it now
                </a>
            </div>
        </>
    );
}


NeonButton.propTypes = {
    text: PropTypes.string
}





