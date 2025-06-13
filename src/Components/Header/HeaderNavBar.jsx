import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import headerAsideBtnPhone from "../../Images/aa.png";
import havalLogo from "../../Images/haval.svg";
import headerAsideBtnCar from "../../Images/header-aside-btn-car.png";
// import Logo from "../../Images/logo.png";
import Logo from "../../Images/limonauto.png";
import LogoBlack from "../../Images/limonauto-black.png";
import GWMwingle7 from "../../Images/m-gwm-wingle-7.png";
import HavalDargo from "../../Images/m-haval-dargo.png";
import HavalJolion from "../../Images/m-haval-jolion.png";
import BYDChazorM from "../../Images/byd-chazor-m.webp";
import BYDSongProDmiM from "../../Images/byd-song-pro-dmi-m.webp";
import BYDSongPlusEvM from "../../Images/byd-song-plus-ev-m.webp";
import BYDSongPlusDmiCHampionM from "../../Images/byd-song-plus-champion-m.webp";
import "./Header.css";

const HeaderModels = [
    {
        id: 1,
        title: "BYD CHAZOR CHAMPION",
        link: "/models/chazor",
        price: "249 900 000",
        img: BYDChazorM,
    },
    {
        id: 2,
        title: "SONG PRO DM-i Champion",
        link: "/models",
        price: "249 900 000",
        img: BYDSongProDmiM,
    },
    {
        id: 3,
        title: "SONG PLUS EV Champion",
        link: "/models",
        price: "249 900 000",
        img: BYDSongPlusEvM,
    },
    {
        id: 4,
        title: "SONG PLUS DM-i Champion",
        link: "/models",
        price: "249 900 000",
        img: BYDSongPlusDmiCHampionM,
    },
];

function HeaderNavBar() {
    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);
    const [isOwnOpen, setOwnOpen] = useState(false);
    const [isOpenModels, setOpenModels] = useState(false);
    const [isAsideOpen, setAsideOpen] = useState(false);
    const [isAboutGwmOpen, setAboutGwmOpen] = useState(false);
    const [isSelection, setIsSelection] = useState(false);
    const token = localStorage.getItem("token");
    const [header, setHeader] = useState(false);
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);
    const [headerClass, setHeaderClass] = useState("header");
    useEffect(() => {
        if (window.location.hash === "#ru") {
            setHeaderClass("header header-ru");
        } else {
            setHeaderClass("header");
        }
    }, [window.location.href]);

    useEffect(() => {
        document.title = "LIMON-AUTO`ning O'zbekistondagi rasmiy distribyutori";
        window.addEventListener("scroll", headerActive);
        return () => {
            window.removeEventListener("scroll", headerActive);
        };
    }, []);

    const headerActive = () => {
        const header = document.querySelector(".header-section");
        const headerItem = document.querySelector(".header__item");
        const scrollTop = window.scrollY;
        if (scrollTop >= 70) {
            setHeader(true);
            header?.classList?.add("header-active");
            headerItem?.classList?.add("header-item-active");
        } else {
            setHeader(false);
            header?.classList?.remove("header-active");
            headerItem?.classList?.remove("header-item-active");
        }
    };

    useEffect(() => {
        const body = document.querySelector("body");
        if (isNavbarOpen) {
            body.classList.add("no-scroll");
        } else {
            body.classList.remove("no-scroll");
        }
    }, [isNavbarOpen]);

    return (
        <div className={`${headerClass} header-section`}>
            <div className='header__inner'>
                <Link to='/' className='header__logo'>
                    <img src={header ? LogoBlack : Logo} alt={t("company")} />
                </Link>
                <div
                    className='header__burger'
                    onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {/* <HEADER RESPONSIVE> */}
                <div
                    className={`header__responsive ${
                        isNavbarOpen ? "show" : ""
                    }`}
                    onClick={() => setIsNavbarOpen(false)}>
                    <ul
                        className='header-responsive__links'
                        onClick={(e) => e.stopPropagation()}>
                        <li>
                            <button
                                className='header-nav-btn owner-btn'
                                onClick={() => setOpenModels(!isOpenModels)}>
                                {t("models")}
                                <span>{"→"}</span>
                            </button>
                            {isOpenModels && (
                                <div
                                    className='header__responsive-models'
                                    onClick={() => setOpenModels(false)}>
                                    <div
                                        className={`header__responsive-modal ${
                                            isOpenModels ? "active" : ""
                                        }`}
                                        onClick={(e) => e.stopPropagation()}>
                                        <div
                                            className='cancel'
                                            onClick={() =>
                                                setOpenModels(false)
                                            }>
                                            {"<"} <span>Orqaga</span>
                                        </div>
                                        <h3>Mavjud avtomobillar </h3>
                                        <div className='header__models-modal-cards'>
                                            {/* 1 */}
                                            <div className='header__models-modal-card'>
                                                <Link to='/models/gwm-wingle-7'>
                                                    <img
                                                        src={GWMwingle7}
                                                        alt='haval-dargo'
                                                    />
                                                </Link>
                                                <div>
                                                    <Link to='/models/gwm-wingle-7'>
                                                        GWM WINGLE 7
                                                    </Link>
                                                    <p>359 900 000 so'm</p>
                                                </div>
                                            </div>
                                            {/* 2 */}
                                            <div className='header__models-modal-card'>
                                                <Link to='/models/haval-dargo'>
                                                    <img
                                                        src={HavalDargo}
                                                        alt='haval-dargo'
                                                    />
                                                </Link>
                                                <div>
                                                    <Link to='/models/haval-dargo'>
                                                        HAVAL DARGO
                                                    </Link>
                                                    <p>399 900 000 so'mdan</p>
                                                </div>
                                            </div>
                                            {/* 3 */}
                                            <div className='header__models-modal-card'>
                                                <Link to='/models/haval-jolion'>
                                                    <img
                                                        src={HavalJolion}
                                                        alt='haval-dargo'
                                                    />
                                                </Link>
                                                <div>
                                                    <Link to='/models/haval-jolion'>
                                                        HAVAL JOLION
                                                    </Link>
                                                    <p>399 900 000 so'mdan</p>
                                                </div>
                                            </div>
                                            {/* 4 */}
                                            <div className='header__models-modal-card'>
                                                <Link to='/models/haval-jolion'>
                                                    <img
                                                        src={BYDSongProDmiM}
                                                        alt='haval-dargo'
                                                    />
                                                </Link>
                                                <div>
                                                    <Link to='/models/haval-m6'>
                                                        HAVAL M6
                                                    </Link>
                                                    <p>249 900 000 so'mdan</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <button
                                className='selection'
                                onClick={() => setIsSelection(!isSelection)}>
                                {t("selection")}
                                <span>{"→"}</span>
                            </button>
                            {isSelection && (
                                <div
                                    className='owners-modal-overlay selection-modal'
                                    onClick={() =>
                                        setIsSelection(!isSelection)
                                    }>
                                    <div
                                        className={`selection-modal ${
                                            isSelection ? "active" : ""
                                        }`}
                                        onClick={(e) => e.stopPropagation()}>
                                        <div>
                                            <p>Yangi avtomobil</p>
                                            <ul>
                                                <li>
                                                    <Link to='/models'>
                                                        Modellar qatori
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/test-drive'>
                                                        Test-drayvga yozilish
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/'>
                                                        Maxsus takliflar
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/'>
                                                        Configurator
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/dealers'>
                                                        Dilerlar
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link to='/dealers'>{t("dealers")}</Link>
                        </li>
                        <li>
                            <button
                                onClick={() => setOwnOpen(!isOwnOpen)}
                                className='owner-btn'>
                                {t("owners")}
                                <span>{"→"}</span>
                            </button>
                            {isOwnOpen && (
                                <div
                                    className='owners-modal-overlay'
                                    onClick={() => setOwnOpen(false)}>
                                    <div
                                        className={`owners-modal ${
                                            isOwnOpen ? "active" : ""
                                        }`}
                                        onClick={(e) => e.stopPropagation()}>
                                        <div>
                                            <h3>Servis</h3>
                                            <Link to='/owners/service/guarantee'>
                                                Avtomobilga kafolat
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <button
                                className='about-gwm owner-btn'
                                onClick={() =>
                                    setAboutGwmOpen(!isAboutGwmOpen)
                                }>
                                {t("company")}
                                <span>{"→"}</span>
                            </button>
                            {isAboutGwmOpen && (
                                <div
                                    className='about-gwm-modal owners-modal-overlay'
                                    onClick={() => setAboutGwmOpen(false)}>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className='about-gwm-active'>
                                        <div className='about-gwm-active-one'>
                                            <h3>HAVAL O'zbekistonda</h3>
                                            <ul>
                                                <li>Biz haqimizda</li>
                                                <Link to='/about-gwm/haval-v-uzbekistane/how-become-dealer'>
                                                    Qanday qilib diler bo'lish
                                                    mumkin
                                                </Link>
                                                <li>
                                                    Diler qo'ng'irog'iga
                                                    buyurtma berish
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='about-gwm-active-two'>
                                            <h3>Media markazi</h3>
                                            <ul>
                                                <li>Video sharhlar</li>
                                                <li>Yangiliklar</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link to='/'>{t("statistics")}</Link>
                        </li>
                        {token ? (
                            <Link to='/user'>Shaxsiy kabinet</Link>
                        ) : (
                            <li>
                                <Link to='/login' style={{ marginTop: "4px" }}>
                                    Kirish
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                {/*    <HEADER RESPONSIVE />  */}
                <div className='header__nav'>
                    <ul className='header-nav__links'>
                        <li>
                            <button
                                className='header-nav-btn owner-btn'
                                onClick={() => setOpenModels(!isOpenModels)}>
                                {t("models")}
                            </button>
                            {isOpenModels && (
                                <div
                                    className='owners-modal-overlay owner-models_modal__overlay'
                                    onClick={() => setOpenModels(false)}>
                                    <div
                                        className={`models-modal owners-modal ${
                                            isOpenModels ? "active" : ""
                                        }`}
                                        onClick={(e) => e.stopPropagation()}>
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}>
                                                <h3>Mavjud avtomobillar</h3>
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                        padding: "5px 9px",
                                                        backgroundColor:
                                                            "rgba(0,0,0,0.2)",
                                                        borderRadius: "5px",
                                                    }}
                                                    onClick={() =>
                                                        setOpenModels(false)
                                                    }>
                                                    <i
                                                        class='fa-solid fa-xmark'
                                                        style={{
                                                            fontSize: "20px",
                                                        }}></i>
                                                </span>
                                            </div>
                                            <div className='header__models-modal-cards'>
                                                {HeaderModels.map((model) => (
                                                    <Link
                                                        to={model.link}
                                                        key={model.id}>
                                                        <div className='header__models-modal-card'>
                                                            <img
                                                                src={model.img}
                                                                alt={
                                                                    model.title
                                                                }
                                                                width={300}
                                                            />
                                                            <div>
                                                                <Link
                                                                    to={
                                                                        model.link
                                                                    }>
                                                                    {
                                                                        model.title
                                                                    }
                                                                </Link>
                                                                <p>
                                                                    {
                                                                        model.price
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <button
                                className='selection'
                                onClick={() => setIsSelection(!isSelection)}>
                                {t("selection")}
                            </button>
                            {isSelection && (
                                <div
                                    className='owners-modal-overlay selection-modal'
                                    onClick={() =>
                                        setIsSelection(!isSelection)
                                    }>
                                    <div
                                        className={`selection-modal ${
                                            isSelection ? "active" : ""
                                        }`}
                                        onClick={(e) => e.stopPropagation()}>
                                        <div>
                                            <p>Yangi avtomobil</p>
                                            <ul>
                                                <li>
                                                    <Link to='/models'>
                                                        Modellar qatori
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/test-drive'>
                                                        Test-drayvga yozilish
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/'>
                                                        Maxsus takliflar
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/'>
                                                        Configurator
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/dealers'>
                                                        Dilerlar
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link to='/dealers'>{t("dealers")}</Link>
                        </li>
                        <li>
                            <button
                                onClick={() => setOwnOpen(!isOwnOpen)}
                                className='owner-btn'>
                                {t("owners")}
                            </button>
                            {isOwnOpen && (
                                <div
                                    className='owners-modal-overlay'
                                    onClick={() => setOwnOpen(false)}>
                                    <div
                                        className={`owners-modal ${
                                            isOwnOpen ? "active" : ""
                                        }`}
                                        onClick={(e) => e.stopPropagation()}>
                                        <div>
                                            <h3>Servis</h3>
                                            <Link to='/owners/service/guarantee'>
                                                Avtomobilga kafolat
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <button
                                className='about-gwm owner-btn'
                                onClick={() =>
                                    setAboutGwmOpen(!isAboutGwmOpen)
                                }>
                                {t("company")}
                            </button>
                            {isAboutGwmOpen && (
                                <div
                                    className='about-gwm-modal owners-modal-overlay'
                                    onClick={() => setAboutGwmOpen(false)}>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className='about-gwm-active'>
                                        <div className='about-gwm-active-one'>
                                            <h3>HAVAL O'zbekistonda</h3>
                                            <ul>
                                                <li>Biz haqimizda</li>
                                                <Link to='/about-gwm/haval-v-uzbekistane/how-become-dealer'>
                                                    Qanday qilib diler bo'lish
                                                    mumkin
                                                </Link>
                                                <li>
                                                    Diler qo'ng'irog'iga
                                                    buyurtma berish
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='about-gwm-active-two'>
                                            <h3>Media markazi</h3>
                                            <ul>
                                                <li>Video sharhlar</li>
                                                <li>Yangiliklar</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link to='/'>{t("statistics")}</Link>
                        </li>
                        {token ? (
                            <Link to='/user' className='login-link'>
                                <i className='fa-light fa-user user-icon'></i>
                            </Link>
                        ) : (
                            <li>
                                <Link to='/login' style={{ marginTop: "4px" }}>
                                    Kirish
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='header__item'>
                    <Link to='tel:+998712878888'>
                        <i className='fa-solid fa-phone'></i>
                    </Link>
                    <div className='header__lang'>
                        <ul>
                            <li>
                                <button
                                    className='language-btn'
                                    onClick={() =>
                                        changeLanguage("uz")
                                            ? changeLanguage("ru")
                                            : changeLanguage("uz")
                                    }>
                                    {currentLang === "uz" ? "Uz" : "Ru"}
                                    <i className='fa-solid fa-angle-down'></i>
                                </button>
                                <ul className='ru'>
                                    <li>
                                        <Link
                                            to='#ru'
                                            onClick={() =>
                                                changeLanguage("ru")
                                            }>
                                            {currentLang === "ru" ? "Uz" : "Ru"}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={`aside ${isAsideOpen ? "active" : ""}`}>
                <ul className='aside__list'>
                    <li className='aside__item' title="Bog'lanish">
                        <a href='tel:+998712878888' className='aside__link'>
                            <button className='aside__btn'>
                                <img
                                    src={headerAsideBtnPhone}
                                    alt='aside-btn-icon'
                                />
                            </button>
                        </a>
                    </li>
                    <li className='aside__item' title='Modellar qatori'>
                        <Link to='/models' className='aside__link'>
                            <button className='aside__btn'>
                                <img
                                    src={headerAsideBtnCar}
                                    alt='aside-btn-icon'
                                />
                            </button>
                        </Link>
                    </li>
                </ul>
                <div
                    className={`aside__btn-call ${isAsideOpen ? "active" : ""}`}
                    onClick={() => setAsideOpen(!isAsideOpen)}>
                    {isAsideOpen ? (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 -960 960 960'>
                            <path d='M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z'></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 -960 960 960'>
                            <path d='M140.001-520v-299.999H440V-520H140.001Zm0 379.999V-440H440v299.999H140.001ZM520-520v-299.999h299.999V-520H520Zm0 379.999V-440h299.999v299.999H520ZM200-579.999h180.001V-760H200v180.001Zm379.999 0H760V-760H579.999v180.001Zm0 379.999H760v-180.001H579.999V-200ZM200-200h180.001v-180.001H200V-200Zm379.999-379.999Zm0 199.998Zm-199.998 0Zm0-199.998Z'></path>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderNavBar;
