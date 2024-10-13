export function slideInFromLeft(delay) {
    return {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: delay,
                duration: 0.5,
            },
        },
    };
}

export function slideInFromRight(delay) {
    return {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: delay,
                duration: 0.5,
            },
        },
    };
}

export const slideInFromTop = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5,
        },
    },
};



export const revealVariant = {
    visible: { opacity: 1, x:0,transition: { duration: 1 } },
    hidden: { opacity: 0,x:-200}
};

export const revealVariant2 = {
    visible: { opacity: 1, x:0,transition: { duration: 0.5 } },
    hidden: { opacity: 0,x:-100}
};