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
    const [isAsideOpen, setAsideOpen] = useState(false);
    const [isAsideCallOpen, setAsideCallOpen] = useState(false);

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
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    });

    const isSticky = (e) => {
        const header = document.querySelector(".header-section");
        const scrollTop = window.scrollY;
        scrollTop >= 60
            ? header.classList.add("header-active")
            : header.classList.remove("header-active");
    };

    return (
        <div className={`${headerClass} header-section`}>
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
                    <a href='/'>
                        <img src={havalLogo} />
                    </a>
                </div>
            </div>
            <div className={`aside ${isAsideOpen ? "active" : ""}`}>
                <ul className='aside__list'>
                    <li className='aside__item'>
                        <a href='/' className='aside__link'>
                            <span className='aside__link-text'>
                                Modellar qatori
                            </span>
                            <span className='aside__btn'>
                                <svg
                                    width='32'
                                    height='32'
                                    viewBox='0 0 32 32'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M30.9943 24C30.9605 24.2985 30.904 24.5898 30.8192 24.8155C30.6667 25.216 30.5198 25.2524 29.9435 25.216C29.1977 25.1723 28.1299 25.216 27 25.2743C27 25.6748 27.0113 25.8641 27.0113 25.8641C27.0847 26.9636 27.4689 27 27.6215 27H30.0508C30.2655 27 30.4633 27 30.6158 26.8689C30.8136 26.7015 30.8983 26.2136 30.9718 25.3617C30.9831 25.2379 30.9887 25.0777 30.9943 24.8884V24.8811C30.9943 24.8228 31 24.75 31 24.6699V24.5898C31 24.3932 31 24.1748 30.9943 24Z'></path>
                                    <path d='M0.00564971 24C0.039548 24.2985 0.0960452 24.5898 0.180791 24.8155C0.333333 25.216 0.480226 25.2524 1.0565 25.216C1.80226 25.1723 2.87006 25.216 4 25.2743C4 25.6748 3.9887 25.8641 3.9887 25.8641C3.91525 26.9636 3.53107 27 3.37853 27H0.949153C0.734463 27 0.553672 27 0.384181 26.8689C0.180791 26.716 0.101695 26.2136 0.0282486 25.3617C0.0169492 25.2379 0.0112994 25.0777 0.00564971 24.8884V24.8811C0.00564971 24.8228 0 24.75 0 24.6699V24.5898C0.00564972 24.3932 0.00564971 24.1748 0.00564971 24Z'></path>
                                    <path d='M32 18.4598C32 16.5503 31.75 14.6843 31.65 14.4791C31.575 14.3298 31.0938 13.938 30 13.1978C28.8937 12.4452 28.9188 12.5571 28.7188 12.0658C28.9 12.0098 29.075 11.9041 29.1812 11.8916C29.4187 11.8667 29.4312 12.0907 29.925 12.0907C30.4187 12.0907 31.4875 11.96 31.7062 11.7423C31.925 11.5246 31.9937 11.45 31.9937 11.2572C31.9937 11.0644 31.8813 10.6663 31.6688 10.4299C31.4563 10.1936 30.55 10.0754 30.0187 10.007C29.4875 9.93858 29.4125 10.007 29.275 10.0941C29.0562 10.2309 29.0438 11.4811 29.0438 11.4811L28.525 11.4935C28.1875 10.6663 27.7188 8.99938 26.9875 7.68698C26.1875 6.25641 25.35 5.80858 25 5.69663C24.6562 5.59089 24.3438 5.51625 22 5.27989C19.6063 5.0311 17.7 5 16 5C14.3 5 12.3938 5.03732 10 5.27989C7.65625 5.52247 7.34375 5.59089 7 5.69663C6.65625 5.80236 5.8125 6.25641 5.0125 7.68698C4.28125 8.99938 3.8125 10.6663 3.475 11.4935L2.95625 11.4811C2.95625 11.4811 2.95 10.2309 2.725 10.0941C2.5875 10.007 2.5125 9.93236 1.98125 10.007C1.45 10.0816 0.54375 10.1936 0.33125 10.4299C0.11875 10.6663 0.00625 11.0644 0.00625 11.2572C0.00625 11.45 0.075 11.5309 0.29375 11.7423C0.5125 11.96 1.58125 12.0907 2.075 12.0907C2.56875 12.0907 2.58125 11.8667 2.81875 11.8916C2.925 11.9041 3.10625 12.0098 3.28125 12.0658C3.075 12.5571 3.10625 12.4452 2 13.1978C0.90625 13.9442 0.41875 14.3298 0.35 14.4791C0.25 14.6843 0 16.5503 0 18.4598C0 20.3693 0.1375 22.086 0.1375 22.6955C0.1375 22.9506 0.1375 23.3984 0.19375 23.8276C0.23125 24.0826 0.2875 24.3314 0.3875 24.5242C0.55625 24.8663 0.7125 24.8974 1.35625 24.8663C2.18125 24.829 3.375 24.8663 4.60625 24.916C5.43125 24.9471 6.275 24.9782 7.025 24.9969C8.9 25.0342 8.35 24.7232 9.15 24.7357C9.95 24.7481 13.1062 24.8787 15.9937 24.8787C18.8813 24.8787 22.0437 24.7481 22.8375 24.7357C23.6375 24.7232 23.0875 25.0342 24.9625 24.9969C25.7125 24.9844 26.5562 24.9471 27.3813 24.916C28.6125 24.8725 29.8125 24.829 30.6313 24.8663C31.275 24.8974 31.4312 24.8663 31.6 24.5242C31.6938 24.3314 31.7563 24.0826 31.7938 23.8276C31.8563 23.3984 31.85 22.9506 31.85 22.6955C31.8625 22.0922 32 20.3693 32 18.4598ZM5.3875 9.04292C5.6875 8.34629 6.5875 6.94682 7.025 6.69803C7.13125 6.63583 8.0625 6.34349 10.3938 6.188C12.5375 6.04494 14.9062 5.98896 16.0063 5.98896C17.1063 5.98896 19.475 6.04494 21.6187 6.188C23.9438 6.34349 24.8875 6.62961 24.9875 6.69803C25.55 7.08366 26.325 8.34629 26.625 9.04292C26.925 9.73954 27.325 11.1079 27.25 11.2945C27.175 11.4811 27.325 11.5744 26.3125 11.4935C25.3062 11.4189 18.9875 11.338 16.0125 11.338C13.0438 11.338 6.725 11.4189 5.7125 11.4935C4.7 11.5682 4.85 11.4811 4.775 11.2945C4.6875 11.1079 5.0875 9.74576 5.3875 9.04292ZM7.6875 16.8302C7.2375 16.9422 6.96875 17.1847 6.40625 17.1785C5.84375 17.1785 4.325 16.9235 4 16.9111C3.675 16.8986 3.3875 17.1287 3.21875 17.1723C3.05 17.2158 2.71875 17.0977 2.21875 16.9422C1.71875 16.7867 1.425 16.8302 1.2625 16.1522C1.09375 15.4805 1.2625 14.5164 1.2625 14.5164C2.34375 14.4666 3.3875 14.5662 5.34375 15.1135C7.3 15.6609 8.3875 16.712 8.3875 16.712C8.3875 16.712 8.1375 16.7182 7.6875 16.8302ZM22.3875 21.7315C21.4938 21.8496 17.75 21.8807 16 21.8807C14.25 21.8807 10.5063 21.8434 9.6125 21.7315C8.7 21.6133 7.5125 20.5248 8.33125 19.6602C9.4375 18.4847 9.23125 18.522 11.7437 18.1986C13.9187 17.9187 15.5688 17.9062 16 17.9062C16.425 17.9062 18.0813 17.9249 20.2563 18.1986C22.7688 18.522 22.5625 18.4847 23.6688 19.6602C24.4875 20.5248 23.3 21.6133 22.3875 21.7315ZM30.7375 16.1585C30.5687 16.8302 30.2812 16.7929 29.7812 16.9484C29.2812 17.1039 28.95 17.2158 28.7812 17.1785C28.6125 17.1412 28.325 16.9111 28 16.9173C27.675 16.9297 26.1562 17.1847 25.5938 17.1847C25.0312 17.1847 24.7625 16.9484 24.3125 16.8364C23.8625 16.7245 23.6125 16.7245 23.6125 16.7245C23.6125 16.7245 24.6938 15.6671 26.6562 15.126C28.6125 14.5786 29.6562 14.4791 30.7375 14.5288C30.7375 14.5164 30.9062 15.4805 30.7375 16.1585Z'></path>
                                </svg>
                            </span>
                        </a>
                    </li>
                    <li className='aside__item'>
                        <a href='/' className='aside__link'>
                            <span className='aside__link-text'>Telefon</span>
                            <span className='aside__btn'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='28'
                                    width='28'
                                    viewBox='0 -960 960 960'>
                                    <path d='M777.614-140.001q-113.076 0-227.191-52.577-114.115-52.577-209.884-148.346-95.384-95.769-147.961-209.691-52.577-113.923-52.577-226.999 0-18 12-30.192 12-12.193 30-12.193h130.46q15.154 0 26.731 9.885 11.577 9.885 14.73 24.423L376.845-668q2.385 16.385-1 28.154-3.384 11.769-12.154 19.769l-92.384 89.923q22.308 40.846 50.962 77.269 28.654 36.424 62.038 69.578 32.924 32.923 70.001 61.154 37.077 28.231 80.077 52.538l89.769-90.538q9.385-9.769 22.731-13.692 13.346-3.923 27.731-1.923l111.075 22.615q15.154 4 24.731 15.461 9.577 11.462 9.577 26.001v129.69q0 18-12.193 30-12.192 12-30.192 12Z'></path>
                                </svg>
                            </span>
                        </a>
                    </li>
                </ul>
                <div
                    className={`aside__btn-call ${
                        isAsideCallOpen ? "" : "active"
                    }`}
                    onClick={() => setAsideOpen(!isAsideOpen)}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 -960 960 960'>
                        <path d='M140.001-520v-299.999H440V-520H140.001Zm0 379.999V-440H440v299.999H140.001ZM520-520v-299.999h299.999V-520H520Zm0 379.999V-440h299.999v299.999H520ZM200-579.999h180.001V-760H200v180.001Zm379.999 0H760V-760H579.999v180.001Zm0 379.999H760v-180.001H579.999V-200ZM200-200h180.001v-180.001H200V-200Zm379.999-379.999Zm0 199.998Zm-199.998 0Zm0-199.998Z'></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default HeaderNavBar;
