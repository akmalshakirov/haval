import Aos from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FooterComponent from "../../../Components/Footer/Footer";
import HeaderNavBar from "../../../Components/Header/HeaderNavBar";
import BYDChazorM from "../../../Images/byd-chazor-m.webp";
import BYDChazor from "../../../Images/byd-chazor.webp";
import CarDetailsDrawer from "../../../Utils/CarDetails/CarDetailsDrawer";
import { UserService } from "../../User/UserService";
import "./BYD-chazor.css";

function Chazor() {
    const [carImg, setCarImg] = useState(BYDChazorM);
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        Aos.init();
    }, []);

    const car = {
        model: "BYD - Chazor",
        price: "273900000",
        engine: "Avto",
        payment: "Onlayn",
        color: "Qora",
        image: BYDChazorM,
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
                <div className='mx-auto'>
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
                                <p>Kuzov rangi: </p>
                                <span
                                    style={{
                                        fontFamily: "var(--font-roboto)",
                                        marginLeft: "3px",
                                    }}>
                                    {car.color}
                                </span>
                            </div>
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
                                src={BYDChazor}
                                alt={BYDChazor}
                            />
                        </div>
                        <div
                            data-aos='fade-left'
                            data-aos-duration='1555'
                            data-aos-easign='linear'
                            data-aos-offset='300'>
                            <h1>Shaffof panoramik 360° tasvir</h1>
                            <p>
                                <br />
                                Ko'rinmas zonalarini qoldirmasdan barcha
                                tafsilotlarni sezish uchun a'lo darajada
                                jihozlangan. Yuqori aniqlikdagi kameralar
                                yordamida atrofga qarab va oson parkovka qilish
                                uchun hech qanday to'siqlar yo'qligiga ishonch
                                hosil qilasiz.
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
                                src={BYDChazor}
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

export default Chazor;
