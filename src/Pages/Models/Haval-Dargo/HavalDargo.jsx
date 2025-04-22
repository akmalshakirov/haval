import Aos from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../../../Components/Footer/Footer";
import HeaderNavBar from "../../../Components/Header/HeaderNavBar";
import GWM_WINGLE_7_eksteryer from "../../../Images/gwm-wingle-7-eksteryer-1.jpg";
import GWM_WINGLE_7 from "../../../Images/gwm-wingle-7-large.jpg";
import GWM_WINGLE_7_PNG_WHITE from "../../../Images/m-gwm-wingle-7-white.png";
import GWM_WINGLE_7_PNG from "../../../Images/m-gwm-wingle-7.png";
import "../GWM-wingle-7/GWM-wingle-7.css";

function HavalDargo() {
    const [carImg, setCarImg] = useState(GWM_WINGLE_7_PNG);

    useEffect(() => {
        Aos.init();
    }, []);

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
                                <h2 about='OAIUXHNBYOXIUAHNAOUYBI'>HAVAL</h2>
                                <h1>GWM WINGLE 7</h1>
                                <hr />
                            </div>
                            <h1>Modifikatsiya</h1>
                            <div className='add-agreement-model-color'>
                                <p>Kuzov rangi:</p>
                                <span
                                    id='one'
                                    onClick={() =>
                                        setCarImg(GWM_WINGLE_7_PNG)
                                    }></span>
                                <span
                                    id='two'
                                    onClick={() =>
                                        setCarImg(GWM_WINGLE_7_PNG_WHITE)
                                    }></span>
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
                                        <b>359 000 000 so'm</b>
                                    </span>
                                </p>
                                <button>Sotib olish</button>
                            </div>
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
                                src={GWM_WINGLE_7_eksteryer}
                                alt={GWM_WINGLE_7_eksteryer}
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
                                GWM Wingle 7 ni kutib oling. Ishonchli va
                                bardoshli pikap. GWM Wingle 7 pikaplarning
                                klassik belgilari bilan zamonaviy va tajovuzkor
                                ko‘rinishni uyg‘unlashtiradi. Uning yo‘ltanlamas
                                xususiyatini radiatorning yirik panjarasi va
                                baland g‘ildirak arkalari belgilaydi. <br />
                                <br />
                                Oldinda juda ko‘p muhim maqsadlar kutganda,
                                haqiqatan ham ishonsa bo‘ladiganiga ehtiyoj
                                seziladi. Benzinli dvigatel, to‘liqyuritmali
                                transmissiya, keng salon va kuzov. Siz unga eng
                                mashaqqatli vazifalarni ishonib topshirishingiz
                                va natijasiga ishonchingiz komil bo‘lishi
                                mumkin.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='gwm-wingle-7-page-intro'>
                    <div
                        style={{
                            padding: "10px",
                        }}>
                        <h3>GWM WINGLE 7</h3>
                        <span>|</span>
                        <p>359 900 000 so'm</p>
                    </div>
                    <div className='gwm-wingle-7-page-hero'>
                        <div className='gwm-wingle-7-page-hero-info'>
                            <img
                                className='gwm-wingle-7-page-hero-img'
                                src={GWM_WINGLE_7}
                                alt='gwm-wingle-7-page-hero-img'
                            />
                            <span></span>
                            <div>
                                <h1>GWM WINGLE 7</h1>
                                <p>KO‘PROQ JOY - KO‘PROQ IMKONIYATLAR</p>
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
