import Aos from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import FooterComponent from "../../../Components/Footer/Footer";
import HeaderNavBar from "../../../Components/Header/HeaderNavBar";
import HAVAL_JOLION from "../../../Images/m-haval-jolion-blue.png";
import HAVAL_JOLION_BLACK from "../../../Images/m-haval-jolion-black.png";
import HAVAL_JOLION_GRAY from "../../../Images/m-haval-jolion-gray.png";
import HAVAL_JOLION_WHITE from "../../../Images/m-haval-jolion-white.png";
import HAVAL_JOLION_eksteryer from "../../../Images/haval-jolion-large.jpg";
import HAVAL_JOLION_large from "../../../Images/haval-jolion.jpg";
import CarDetailsDrawer from "../../../Utils/CarDetails/CarDetailsDrawer";
import { UserService } from "../../User/UserService";
import "./HavalJolion.css";

function HavalJolion() {
    const [carImg, setCarImg] = useState(HAVAL_JOLION);
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        Aos.init();
        document.title = `HAVAL | ${car?.model}`;
    }, []);

    const handleCheckColor = (color) => {
        if (color === HAVAL_JOLION) {
            return "Samoviy metall";
        } else if (color === HAVAL_JOLION_BLACK) {
            return "Qora metall";
        } else if (color === HAVAL_JOLION_GRAY) {
            return "Kulrang metall";
        } else if (color === HAVAL_JOLION_WHITE) {
            return "Oq";
        } else {
            return "Samoviy metall";
        }
    };

    const car = {
        model: "HAVAL JOLION",
        price: "279 900 000",
        transmission: "To'liq",
        engine: ["Avtomatik"],
        payment: "Naqd",
        description: "ZAMONAVIY SHAHAR KROSSOVERI",
        color: handleCheckColor(carImg),
    };

    const handleBuy = () => {
        if (!UserService.TOKEN) {
            toast.warning("Avtomobil sotib olish uchun login qilish shart!");
        } else {
            setDrawerVisible(true);
        }
    };

    return (
        <div className='gwm-wingle-7-page'>
            <ToastContainer limit={3} />
            <>
                <HeaderNavBar />
            </>
            <div className='add-agreement-wrapper'>
                <div>
                    <div
                        className='add-agreement-image'
                        data-aos='fade-right'
                        data-aos-duration='1555'
                        data-aos-easign='linear'>
                        <img src={carImg} alt='add-car-agreement' />
                    </div>
                    <div
                        className='modifikatsiya'
                        data-aos='fade-left'
                        data-aos-duration='1555'
                        data-aos-easign='linear'
                        data-aos-delay='300'>
                        <div>
                            <div
                                style={{
                                    marginBottom: "100px",
                                }}>
                                <h1>{car.model}</h1>
                                <hr />
                            </div>
                            <h1>Modifikatsiya</h1>
                            <div className='add-agreement-model-color'>
                                <p>Kuzov rangi:</p>
                                <span
                                    title={handleCheckColor(HAVAL_JOLION)}
                                    id='one'
                                    onClick={() =>
                                        setCarImg(HAVAL_JOLION)
                                    }></span>
                                <span
                                    title={handleCheckColor(HAVAL_JOLION_BLACK)}
                                    id='two'
                                    onClick={() =>
                                        setCarImg(HAVAL_JOLION_BLACK)
                                    }></span>
                                <span
                                    title={handleCheckColor(HAVAL_JOLION_GRAY)}
                                    id='three'
                                    onClick={() =>
                                        setCarImg(HAVAL_JOLION_GRAY)
                                    }></span>
                                <span
                                    title={handleCheckColor(HAVAL_JOLION_WHITE)}
                                    id='four'
                                    onClick={() =>
                                        setCarImg(HAVAL_JOLION_WHITE)
                                    }></span>
                            </div>
                            <span style={{ fontFamily: "var(--font-roboto)" }}>
                                ({car.color})
                            </span>
                            <ul
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    fontFamily: "var(--font-roboto)",
                                    color: "inherit",
                                    fontSize: "16px",
                                    marginTop: "5px",
                                }}>
                                <li>Dvigatel</li>
                                <li>2.4(4WD)MT</li>
                                <li>149</li>
                                <li>Benzin</li>
                            </ul>
                            <hr
                                style={{
                                    marginTop: "20px",
                                }}
                            />
                            <div className='add-agreement-buy'>
                                <p>
                                    Narxi:{" "}
                                    <span>
                                        <b>{car.price} so'm</b>
                                    </span>
                                </p>
                                <button onClick={handleBuy}>Sotib olish</button>
                            </div>
                            <CarDetailsDrawer
                                car={car}
                                open={drawerVisible}
                                onClose={() => setDrawerVisible(false)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main className='gwm-wingle-7-page-main'>
                <div>
                    <ul
                        style={{
                            display: "flex",
                            gap: "5px",
                            padding: "10px",
                        }}>
                        <li>
                            <Link to='/'>Bosh sahifa</Link>
                        </li>
                        <span>{">"}</span>
                        <li>
                            <Link to='/models'>Modellar</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <div
                        style={{
                            width: "100%",
                            height: "93px",
                            backgroundColor: "#d4d9dc",
                        }}></div>
                </div>
                <div className='gwm-wingle-7-main-cards'>
                    <div className='gwm-wingle-7-main-card'>
                        <div>
                            <img
                                data-aos='fade-right'
                                data-aos-duration='1555'
                                data-aos-easign='linear'
                                data-aos-offset='300'
                                src={HAVAL_JOLION_eksteryer}
                                alt={HAVAL_JOLION_eksteryer}
                            />
                        </div>
                        <div
                            data-aos='fade-left'
                            data-aos-duration='1555'
                            data-aos-easign='linear'
                            data-aos-offset='300'>
                            <h1>HAVAL JOLION BILAN KO'PROQ IMKONIYATLAR</h1>
                            <p>
                                <br />
                                Zamonaviy shahar krossoveri HAVAL JOLION doim
                                diqqat markazida bo'lish uchun yaratilgan.
                                Avtomobilning yorqin, jozibali siluetini shahar
                                oqimida birgina qarashda oson tanib olish
                                mumkin, uning super zamonaviy optsiyalari esa
                                har bir sayohatni yanada qulayroq qilishga
                                yordam beradi.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='gwm-wingle-7-page-intro'>
                    <div
                        style={{
                            padding: "10px",
                        }}>
                        <h3>{car.model}</h3>
                        <span>|</span>
                        <p>{car?.price} so'm</p>
                    </div>
                    <div className='gwm-wingle-7-page-hero'>
                        <div className='gwm-wingle-7-page-hero-info'>
                            <img
                                className='gwm-wingle-7-page-hero-img'
                                src={HAVAL_JOLION_large}
                                alt='gwm-wingle-7-page-hero-img'
                            />
                            <span></span>
                            <div>
                                <h1>{car.model}</h1>
                                <p>{car.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FooterComponent />
        </div>
    );
}

export default HavalJolion;
