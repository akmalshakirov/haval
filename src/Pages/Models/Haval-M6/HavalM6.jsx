import Aos from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FooterComponent from "../../../Components/Footer/Footer";
import HeaderNavBar from "../../../Components/Header/HeaderNavBar";
import HAVAL_M6_large from "../../../Images/haval-m6-large.jpg";
import {
    default as HAVAL_M6_BLACK,
    default as HAVAL_M6_eksteryer,
    default as HAVAL_M6_GRAY,
    default as HAVAL_M6_WHITE,
} from "../../../Images/haval-m6.jpg";
import HAVAL_M6 from "../../../Images/m-haval-m6.png";
import CarDetailsDrawer from "../../../Utils/CarDetails/CarDetailsDrawer";
import { UserService } from "../../User/UserService";
import "./HavalM6.css";

function HavalM6() {
    const [carImg, setCarImg] = useState(HAVAL_M6);
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        Aos.init();
        document.title = `LIMON-AUTO | ${car?.model}`;
    }, []);

    const handleCheckColor = (color) => {
        if (color === HAVAL_M6) {
            return "Samoviy metall";
        }
        // } else if (color === HAVAL_JOLION_BLACK) {
        //     return "Qora metall";
        // } else if (color === HAVAL_JOLION_GRAY) {
        //     return "Kulrang metall";
        // } else if (color === HAVAL_JOLION_WHITE) {
        //     return "Oq";
        // } else {
        //     return "Samoviy metall";
        // }
    };

    const car = {
        model: "HAVAL M6",
        price: "249 900 000",
        transmission: "To'liq",
        engine: ["Avtomatik"],
        payment: "Naqd",
        description: "XARID UCHUN ENG QULAY MAVJUD KROSSOVERLARDAN BIRI",
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
                                    title={handleCheckColor(HAVAL_M6)}
                                    id='one'
                                    onClick={() => setCarImg(HAVAL_M6)}></span>
                                <span
                                    title={handleCheckColor(HAVAL_M6_BLACK)}
                                    id='two'
                                    onClick={() =>
                                        setCarImg(HAVAL_M6_BLACK)
                                    }></span>
                                <span
                                    title={handleCheckColor(HAVAL_M6_GRAY)}
                                    id='three'
                                    onClick={() =>
                                        setCarImg(HAVAL_M6_GRAY)
                                    }></span>
                                <span
                                    title={handleCheckColor(HAVAL_M6_WHITE)}
                                    id='four'
                                    onClick={() =>
                                        setCarImg(HAVAL_M6_WHITE)
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
                                src={HAVAL_M6_eksteryer}
                                alt={HAVAL_M6_eksteryer}
                            />
                        </div>
                        <div
                            data-aos='fade-left'
                            data-aos-duration='1555'
                            data-aos-easign='linear'
                            data-aos-offset='300'>
                            <h1>DOIM ACTUAL BO‘LGAN HOKISORLIK</h1>
                            <p>
                                <br />
                                HAVAL M6 - ideal oilaviy avtomobildir. Keng,
                                qulay va xavfsiz. Unda ishonchli, vaqt sinovidan
                                o'tgan texnik yechimlar qo‘llanilgan.
                                Avtomobilning eksteryerida doimo dolzarb bo'lib
                                qoladigan hislatlardan, ya’ni - sifat va
                                hokisorlikdan mohirona foydalanilgan.
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
                                src={HAVAL_M6_large}
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

export default HavalM6;
