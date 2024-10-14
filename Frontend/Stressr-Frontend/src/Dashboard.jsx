import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error('Please login to access the Dashboard');
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center z-20 absolute">
            <h1 className='text-white'>Dashboard Content</h1>
        </div>
    );
};

export default Dashboard;
