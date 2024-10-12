import './AnimatedButton.css';
import PropTypes from 'prop-types';

const AnimatedButton = ({ onClick }) => {
    return (
        <button className="card" onClick={onClick}>
            <span className="text-white text-lg">
                Get Started!
            </span>
        </button>
    );
};

AnimatedButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default AnimatedButton;
