import React from 'react';

const ProgressBar = ({ completed, gradient = false, state = '', maxWidth = 100, color = 'var(--main-color)' }) => {
    const containerStyles = {
        height: '10px',
        width: `${maxWidth}%`,
        backgroundColor: '#ddd',
        borderRadius: '8px',
        marginTop: '28px',
        marginLeft: '4px',
    };

    const normalStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: `${color}`,
        borderRadius: 'inherit',
    };

    var gradientStyles = {
        height: '100%',
        width: `${completed}%`,
        background:
            'linear-gradient(90deg, rgba(109,240,96,1) 0%, rgba(213,240,45,1) 35%, rgba(239,240,32,1) 70%, rgba(238,96,8,1) 100%)',
        borderRadius: 'inherit',
    };

    var fillerStyles = normalStyles;
    const handleStateGradient = () => {
        if (state == 'good') {
            gradientStyles.background = `linear-gradient(90deg, rgba(109,240,96,1), rgba(109,240,96,1))`;
        } else if (state == 'normal') {
            gradientStyles.background = `linear-gradient(90deg, rgba(109,240,96,1) 0%, rgba(213,240,45,1) 70%, rgba(214,240,45,1) 100%`;
        }
    };

    if (gradient) {
        handleStateGradient();
        fillerStyles = gradientStyles;
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}></div>
        </div>
    );
};

export default ProgressBar;
