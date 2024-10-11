import './AnimatedButton.css';
import PropTypes from 'prop-types'

const AnimatedButton = ({ onClick }) => {
    return (
        <button className='card' onClick={onClick}>
            <div className="text-white text-lg">
                Get Started!
            </div>
        </button>
    );
}

export default AnimatedButton;


AnimatedButton.propTypes = {
    onClick: PropTypes.node
}

