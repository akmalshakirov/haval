import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Magnetic.css";
function Magnetic() {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;

        if (button) {
            let boundingRect = button.getBoundingClientRect();

            const handleResize = () => {
                boundingRect = button.getBoundingClientRect();
            };

            const handleMouseMove = (e) => {
                const mousePosX = e.clientX - boundingRect.left;
                const mousePosY = e.clientY - boundingRect.top;
                const xMove = (mousePosX - boundingRect.width / 2) * 0.4;
                const yMove = (mousePosY - boundingRect.height / 2) * 0.4;

                gsap.to(button, {
                    x: xMove,
                    y: yMove,
                    duration: 0.3,
                    ease: "power3.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 1)",
                });
            };

            window.addEventListener("resize", handleResize);
            button.addEventListener("mousemove", handleMouseMove);
            button.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                window.removeEventListener("resize", handleResize);
                button.removeEventListener("mousemove", handleMouseMove);
                button.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);
    return (
        <button className='magnetic-button' ref={buttonRef}>
            Hover Me
        </button>
    );
}

export default Magnetic;
