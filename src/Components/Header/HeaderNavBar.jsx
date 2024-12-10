import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../Images/logo.png";
import havalLogo from "../../Images/haval.svg";
import "./Header.css";
import HavalDargo from "../../Images/m-haval-dargo.png";
import GWMwingle7 from "../../Images/m-gwm-wingle-7.png";
import HavalJolion from "../../Images/m-haval-jolion.png";

function HeaderNavBar() {
    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);
    const [isOwnOpen, setOwnOpen] = useState(false);
    const [isOpenModels, setOpenModels] = useState(false);

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

    return (
        <div className={headerClass}>
            <div className='header__inner'>
                <a href='/' className='header__logo'>
                    <img src={Logo} alt={t("company")} />
                </a>
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
                    <a href=''>
                        <img src={havalLogo} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HeaderNavBar;
