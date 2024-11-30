import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Parollar mos kelmadi!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Iltimos, to'g'ri email kiriting!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isUserExists = users.some((user) => user.email === email);

        if (isUserExists) {
            alert("Bu email bilan ro'yxatdan o'tilgan!");
            return;
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
        navigate("/login");
    };

    return (
        <div className='register'>
            <h1>Ro'yhatdan o'tish</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='have-account'>
                    Akkauntingiz bormi? <a href='/login'>Login</a>
                </div>
                <button type='submit' className='submit'>
                    Ro'yxatdan o'tish
                </button>
            </form>
        </div>
    );
}

export default Register;
