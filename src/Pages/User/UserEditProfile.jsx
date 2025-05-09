import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AVA from "../../Images/userimage.png";
import "./UserEditProfile.css";
import { UserService } from "./UserService.tsx";

const UserEditProfile = ({ theme }) => {
    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");
    const [newImg, setNewImg] = useState([]);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem("userData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                setUserData((prev) => ({ ...prev, ...parsedData[0] }));
            } else {
                setUserData((prev) => ({ ...prev, ...parsedData }));
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!token) {
                toast.warning("Token topilmadi, tizimga boshqadan kiring");
                return;
            }
            const formData = {
                name: userData.name || "",
                email: userData.email || "",
                password: userData.password || "",
            };
            const response = await axios.put(
                `http://localhost:3000/profil-edit/${userID}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${UserService.TOKEN}`,
                    },
                }
            );
            toast.success(response.data.message);
            localStorage.setItem("userData", JSON.stringify([response.data]));
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Yangilashda xatolik yuz berdi"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChangeFile = (e) => {
        const filesArray = Array.from(e.target.files);
        setNewImg(filesArray);
    };

    const handleReset = () => {
        setNewImg([]);
    };

    return (
        <div className='user-edit-profile-wrapper'>
            <div
                className='user-edit-profile-content'
                style={{
                    backgroundColor: theme === "Oq" ? "#ededed" : "#061f3a44",
                }}>
                <h2>Mening profilim</h2>
                <div className='user-profile-top'>
                    {newImg.length > 0 && newImg[0] instanceof Blob ? (
                        <img
                            src={URL.createObjectURL(newImg[0])}
                            alt='Avatar'
                            width={90}
                            height={90}
                            style={{
                                objectFit: "cover",
                                marginTop: "10px",
                                borderRadius: "5px",
                            }}
                        />
                    ) : (
                        <img
                            src={AVA}
                            alt='Avatar'
                            width={90}
                            height={90}
                            style={{
                                objectFit: "cover",
                                marginTop: "10px",
                                borderRadius: "5px",
                            }}
                        />
                    )}

                    <div>
                        <label
                            className='user-profile-upload-img'
                            htmlFor='upload'>
                            <input
                                type='file'
                                hidden
                                id='upload'
                                accept='image/png, image/jpeg'
                                onChange={handleChangeFile}
                            />
                            <span>Yangi rasm yuklash</span>
                        </label>
                        <button
                            className='user-profile-reset cancel-btn'
                            onClick={handleReset}>
                            Bekor qilish
                            {/* Orqaga qaytarish */}
                        </button>
                        <p
                            style={{
                                margin: "5px 0 0 10px",
                            }}>
                            Faqat PNG, JPG yuklash mumkin.
                        </p>
                    </div>
                </div>
                <div className='user-edit-profile-form'>
                    <form onSubmit={handleSubmit} className='edit-profile-form'>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                            }}>
                            <div
                                style={{
                                    width: "50%",
                                }}>
                                <label htmlFor='user-edit-first-name'>
                                    To'liq ism, familiya:
                                </label>
                                <input
                                    style={{
                                        maxWidth: "250px",
                                        backgroundColor:
                                            theme === "Oq"
                                                ? "#ededed"
                                                : "#061f3a44",
                                        color: theme === "Oq" ? "#000" : "#fff",
                                    }}
                                    autoComplete='off'
                                    id='user-edit-first-name'
                                    type='text'
                                    name='name'
                                    value={userData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div
                                style={{
                                    width: "50%",
                                }}>
                                <label htmlFor='user-edit-email'>Email:</label>
                                <input
                                    autoComplete='off'
                                    id='user-edit-email'
                                    type='email'
                                    name='email'
                                    value={userData.email}
                                    onChange={handleChange}
                                    style={{
                                        backgroundColor:
                                            theme === "Oq"
                                                ? "#ededed"
                                                : "#061f3a44",
                                        color: theme === "Oq" ? "#000" : "#fff",
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='user-edit-password'>Parol:</label>
                            <input
                                autoComplete='off'
                                type='password'
                                name='password'
                                value={userData.password}
                                onChange={handleChange}
                                id='user-edit-password'
                                placeholder="To'ldirish shart emas (not required)"
                                style={{
                                    backgroundColor:
                                        theme === "Oq"
                                            ? "#ededed"
                                            : "#061f3a44",
                                    color: theme === "Oq" ? "#000" : "#fff",
                                }}
                            />
                        </div>
                        <div
                            className='user-profile-submit'
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: " 10px",
                            }}>
                            <button type='submit' disabled={loading}>
                                {loading ? "Yuklanmoqda..." : "Yangilash"}
                            </button>
                            <button
                                className='cancel-btn'
                                type='reset'
                                style={{
                                    color: theme === "Oq" ? "#000" : "#fff",
                                }}>
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEditProfile;
