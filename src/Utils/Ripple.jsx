import { useState } from "react";
import "./Ripple.css";

const Ripple = ({ children, onClick }) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { x, y, id: Date.now() };

        setRipples((prevRipples) => [...prevRipples, newRipple]);

        setTimeout(() => {
            setRipples((prevRipples) =>
                prevRipples.filter((r) => r.id !== newRipple.id)
            );
        }, 555);

        if (onClick) onClick(e);
    };

    return (
        <div className='ripple-container' onClick={handleClick}>
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className='ripple'
                    style={{ top: ripple.y - 10, left: ripple.x - 10 }}
                />
            ))}
            {children}
        </div>
    );
};

export default Ripple;
