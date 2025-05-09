import Aos from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FooterComponent from "../../../Components/Footer/Footer";
import HeaderNavBar from "../../../Components/Header/HeaderNavBar";
import HAVAL_DARGO_eksteryer from "../../../Images/haval-dargo-large.jpg";
import HAVAL_DARGO_LARGE from "../../../Images/haval-dargo.jpg";
import HAVAL_DARGO_BLACK from "../../../Images/m-haval-dargo-black.png";
import HAVAL_DARGO_BLUE from "../../../Images/m-haval-dargo-blue.png";
import HAVAL_DARGO_WHITE from "../../../Images/m-haval-dargo-white.png";
import HAVAL_DARGO from "../../../Images/m-haval-dargo.png";
import CarDetailsDrawer from "../../../Utils/CarDetails/CarDetailsDrawer";
import { UserService } from "../../User/UserService";
import "./HavalDargo.css";

function HavalDargo() {
    const [carImg, setCarImg] = useState(HAVAL_DARGO);
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        Aos.init();
        document.title = `HAVAL | ${car?.model}`;
    }, []);

    const handleCheckColor = (color) => {
        if (color === HAVAL_DARGO) {
            return "Olov rang";
        } else if (color === HAVAL_DARGO_BLUE) {
            return "Ko'k";
        } else if (color === HAVAL_DARGO_BLACK) {
            return "Qora";
        } else if (color === HAVAL_DARGO_WHITE) {
            return "Oq";
        } else {
            return "Olov rang";
        }
    };

    const car = {
        model: "HAVAL DARGO",
        price: "399 900 000",
        transmission: "To'liq",
        engine: ["Avtomatik", "Mexanik"],
        payment: "Naqd",
        description: "TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.",
        color: handleCheckColor(carImg),
    };

    const handleBuy = () => {
        if (!UserService.TOKEN) {
            toast.warning("Avtomobil sotib olish uchun login qilish shart!", [
                4,
            ]);
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
                                    id='one'
                                    onClick={() =>
                                        setCarImg(HAVAL_DARGO)
                                    }></span>
                                <span
                                    id='two'
                                    onClick={() =>
                                        setCarImg(HAVAL_DARGO_BLUE)
                                    }></span>
                                <span
                                    id='three'
                                    onClick={() =>
                                        setCarImg(HAVAL_DARGO_BLACK)
                                    }></span>
                                <span
                                    id='four'
                                    onClick={() =>
                                        setCarImg(HAVAL_DARGO_WHITE)
                                    }></span>
                            </div>
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
                                src={HAVAL_DARGO_eksteryer}
                                alt={HAVAL_DARGO_eksteryer}
                            />
                        </div>
                        <div
                            data-aos='fade-left'
                            data-aos-duration='1555'
                            data-aos-easign='linear'
                            data-aos-offset='300'>
                            <h1>EKSTERYER</h1>
                            <p>
                                <br />
                                PERFOROTSIYALANGAN HAQIQIY CHARM BILAN
                                BEZATILGAN O'RINDIQLAR
                                <br />
                                HAVAL DARGOning o'rindiqlari Perforotsiyalangan
                                haqiqiy charmdan ishlangan, nafas oladigan
                                material yuqori darajadagi qulaylikni
                                ta'minlaydi.
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
                        <p>359 900 000 so'm</p>
                    </div>
                    <div className='gwm-wingle-7-page-hero'>
                        <div className='gwm-wingle-7-page-hero-info'>
                            <img
                                className='gwm-wingle-7-page-hero-img'
                                src={HAVAL_DARGO_LARGE}
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

export default HavalDargo;
