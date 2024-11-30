// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

// function Login({ onLogin }) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (email === "admin@gmail.com" && password === "admin") {
//             alert("Login qilding...");
//             onLogin();
//             navigate("/");
//         } else {
//             alert("Username yoki parol xato kiritildi!");
//         }
//     };

//     return (
//         <div className='login'>
//             <div>
//                 <h1>Kirish</h1>
//             </div>
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <div className='email'>
//                         <label htmlFor='email'>Email:</label>
//                         <input
//                             type='email'
//                             name='email'
//                             id='email'
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className='password'>
//                         <label htmlFor='password'>Password:</label>
//                         <input
//                             type='password'
//                             name='password'
//                             id='password'
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className='to-register'>
//                         Sizda xaligacha akkaunt yoqmi?{" "}
//                         <a href='/register'>Registratsiya</a>
//                     </div>
//                     <div>
//                         <button type='submit' className='submit'>
//                             Login
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isUserValid = users.some(
            (user) => user.email === email && user.password === password
        );

        if (isUserValid) {
            alert("Login qilding...");
            onLogin();
            navigate("/");
        } else {
            alert("Email yoki parol noto'g'ri!");
        }
    };

    return (
        <div className='login'>
            <h1>Kirish</h1>
            <form onSubmit={handleSubmit} className='login-form'>
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
                <div className='no-account'>
                    Sizda xaligacha akkaunt yoqmi?
                    <a href='/register' className='register-btn'>
                        Registratsiya
                    </a>
                </div>
                <button type='submit' className='submit'>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
