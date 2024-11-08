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
        // Animation fade-out transition, from opacity 1 to 0, and then set the visibility to false
        document.querySelector('.loader').style.opacity = 0;
        document.querySelector('.loader').style.transition = 'opacity 1s';
        setTimeout(() => {
            setIsVisible(false);
        }, 2000);
    };

    return (
        isVisible && (
            <div className="loader">
                {/* Background video */}
                <video
                    className="background-video"
                    src="/example.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline // Ensures autoplay works on mobile browsers
                />

                {/* Countdown and Skip Button */}
                {
                    countdown > 0 ? (
                        <div className="loadercontainer opacity">
                            <h1>Skip ad in {countdown}s</h1>
                        </div>
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
