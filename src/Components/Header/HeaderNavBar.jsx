import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../Images/logo.png";
import havalLogo from "../../Images/haval.svg";
import "./Header.css";

function HeaderNavBar() {
    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);

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
                <a href='' className='header__logo'>
                    <img src={Logo} alt={t("company")} />
                </a>
                <div className='header__nav'>
                    <ul className='header-nav__links'>
                        <li>
                            <a href='/models' className='header-nav__link'>
                                {t("models")}
                            </a>
                        </li>
                        <li>
                            <a href='#'>{t("selection")}</a>
                        </li>
                        <li>
                            <a href='#'>{t("dealers")}</a>
                        </li>
                        <li>
                            <a href='#'>{t("owners")}</a>
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
