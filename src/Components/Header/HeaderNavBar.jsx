import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../Images/logo.png";
import havalLogo from "../../Images/haval.svg";
import "./Header.css";
import HavalDargo from "../../Images/m-haval-dargo.png";
import GWMwingle7 from "../../Images/m-gwm-wingle-7.png";
import HavalJolion from "../../Images/m-haval-jolion.png";
import headerAsideBtnPhone from "../../Images/header-aside-btn-phone.png";
// import headerAsideBtnCar from "../../Images/header-aside-btn-car.png";
import a from "../../Images/header-aside-btn-car.png";
import aa from "../../Images/aa.png";

function HeaderNavBar() {
    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);
    const [isOwnOpen, setOwnOpen] = useState(false);
    const [isOpenModels, setOpenModels] = useState(false);
    const [isAsideOpen, setAsideOpen] = useState(false);
    const [isAsideListHovered, setAsideListHovered] = useState(false);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

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
        window.addEventListener("scroll", headerActive);
        return () => {
            window.removeEventListener("scroll", headerActive);
        };
    });

    const headerActive = () => {
        const header = document.querySelector(".header-section");
        const headerItem = document.querySelector(".header__item");
        const scrollTop = window.scrollY;
        if (scrollTop >= 70) {
            header.classList.add("header-active");
            headerItem.classList.add("header-item-active");
        } else {
            header.classList.remove("header-active");
            headerItem.classList.remove("header-item-active");
        }
    };

    return (
        <div className={`${headerClass} header-section`}>
            <div className='header__inner'>
                <a href='/' className='header__logo'>
                    <img src={Logo} alt={t("company")} />
                </a>
                {/* <div className='header__burger'>
                    <button className='burger-btn'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div> */}
                <div className='header__nav'>
                    <ul className='header-nav__links'>
                        <li>
                            <button
                                className='header-nav-btn owner-btn'
                                onClick={() => setOpenModels(true)}>
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
                                            <h3>Mavjud avtomobillar</h3>
                                            <div className='models-modal-cards'>
                                                {/* 1 */}
                                                <div className='models-modal-card'>
                                                    <a href='/models/gwm-wingle-7'>
                                                        <img
                                                            src={GWMwingle7}
                                                            alt='haval-dargo'
                                                        />
                                                    </a>
                                                    <div>
                                                        <a href='/models/gwm-wingle-7'>
                                                            GWM WINGLE 7
                                                        </a>
                                                        <p>359 900 000 so'm</p>
                                                    </div>
                                                </div>
                                                {/* 2 */}
                                                <div className='models-modal-card'>
                                                    <a href='/models/haval-dargo'>
                                                        <img
                                                            src={HavalDargo}
                                                            alt='haval-dargo'
                                                        />
                                                    </a>
                                                    <div>
                                                        <a href='/models/haval-dargo'>
                                                            HAVAL DARGO
                                                        </a>
                                                        <p>
                                                            399 900 000 so'mdan
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* 3 */}
                                                <div className='models-modal-card'>
                                                    <a href='/models/haval-jolion'>
                                                        <img
                                                            src={HavalJolion}
                                                            alt='haval-dargo'
                                                        />
                                                    </a>
                                                    <div>
                                                        <a href='/models/haval-jolion'>
                                                            HAVAL JOLION
                                                        </a>
                                                        <p>
                                                            399 900 000 so'mdan
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <a href='#'>{t("selection")}</a>
                        </li>
                        <li>
                            <a href='/dealers'>{t("dealers")}</a>
                        </li>
                        <li>
                            <button
                                onClick={() => setOwnOpen(true)}
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
                                            <a href='/owners/service/guarantee'>
                                                Avtomobilga kafolat
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <a href='#'>{t("company")}</a>
                        </li>
                        <li>
                            <a href='#'>{t("statistics")}</a>
                        </li>
                    </ul>
                </div>
                <div className='header__item'>
                    <a href='tel:+998712878888'>
                        <i className='fa-solid fa-phone'></i>
                    </a>
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
                                        <a
                                            href='#ru'
                                            onClick={() =>
                                                changeLanguage("ru")
                                            }>
                                            {currentLang === "ru" ? "Uz" : "Ru"}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <a href='/'>
                        <img src={havalLogo} />
                    </a>
                </div>
            </div>
            <div className={`aside ${isAsideOpen ? "active" : ""}`}>
                <ul
                    className={`aside__list ${
                        isAsideListHovered ? "hovered" : ""
                    }`}
                    onMouseEnter={() => setAsideListHovered(true)}
                    onMouseLeave={() => setAsideListHovered(false)}>
                    <li className='aside__item'>
                        <a href='/' className='aside__link'>
                            <span className='aside__link-text'>
                                Modellar qatori
                            </span>
                            <button className='aside__btn'>
                                <img src={a} alt='aside-btn-icon' />
                            </button>
                        </a>
                    </li>
                    <li className='aside__item'>
                        <a href='/' className='aside__link'>
                            <span className='aside__link-text'>Telefon</span>
                            <button
                                className='aside__btn'
                                onMouseEnter={() => setAsideListHovered(true)}
                                onMouseLeave={() => setAsideListHovered(false)}>
                                <img src={aa} alt='aside-btn-icon' />
                            </button>
                        </a>
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
