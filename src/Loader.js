import React, { useEffect, useState } from 'react';

export default function Loader() {
    const [countdown, setCountdown] = useState(5); // Initial countdown set to 5
    const [isVisible, setIsVisible] = useState(true); // State to control visibility of the loader

    // Countdown effect from 5 to 0 during 5 seconds
    useEffect(() => {
        if (countdown === 0) return;

        const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000); // Decrement every second

        return () => clearInterval(interval);
    }, [countdown]);

    // Function to hide the loader when the button is clicked
    const handleHideLoader = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="loader">
                {
                    countdown > 0 ? (
                        <>
                            <div className="loadercontainer">
                                <h1>Skip ad in {countdown}s</h1>
                            </div>
                        </>
                    ) : (
                        <div className="loadercontainer">
                            <button onClick={handleHideLoader}><h1>Skip ad</h1></button>
                        </div>
                    )
                }
            </div>
        )
    );
}
