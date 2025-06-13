import HAVAL_LOGO from "../../Images/haval.svg";
import "./Footer.css";

const FooterComponent = () => {
    return (
        <>
            <footer className='footer'>
                <div>
                    <p>
                        Saytda joylashtirilgan LIMON-AUTO brendi mahsulotlari
                        narxlari haqidagi ma'lumotlar faqat axborot tariqasida
                        keltirilgan. Ko'rsatilgan narxlar LIMON-AUTO
                        dilerlaridagi haqiqiy narxlardan farq qilishi mumkin.
                        Joriy mahsulot narxlari haqida batafsil ma'lumotlarni
                        olish uchun HAVALning dilerlariga murojaat qiling. Har
                        qanday LIMON-AUTO brendi mahsulotini sotib olish shaxsiy
                        oldi-sotdi shartnomasi shartlariga muvofiq amalga
                        oshiriladi. Ko'rsatilgan avtomobil tasvirlari
                        sotilayotgan avtomobilnikidan farq qilishi mumkin.
                    </p>
                    <hr
                        style={{
                            margin: "40px 0",
                        }}
                    />
                </div>
                <div className='footer-info'>
                    <div>
                        <a href='/'>
                            <img src={HAVAL_LOGO} alt='footer-logo' />
                        </a>
                        <h3
                            style={{
                                color: "#b7babb",
                                margin: "7px 0",
                            }}>
                            LIMON-AUTO axborot liniyasi
                        </h3>
                        <a
                            href='tel:+998712878888'
                            style={{
                                display: "inline-block",
                                margin: "0 0 7px 0",
                            }}>
                            +998 (71) 287-88-88
                        </a>
                        <div>
                            <p
                                style={{
                                    margin: "0 0 7px 0",
                                }}>
                                LIMON-AUTO ijtimoiy tarmoqlarda
                            </p>
                            <div className='footer-info-social'>
                                <a href='https://t.me' target='_blank'>
                                    <i className='fa-brands fa-telegram'></i>
                                </a>
                                <a href='https://instagram.com' target='_blank'>
                                    <i className='fa-brands fa-instagram'></i>
                                </a>
                                <a href='https://facebook.com' target='_blank'>
                                    <i className='fa-brands fa-facebook'></i>
                                </a>
                                <a
                                    href='https://youtube.com/@HavalUzbekistan'
                                    target='_blank'>
                                    <i className='fa-brands fa-youtube'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='footer-actions'>
                        <ul>
                            <li>
                                <a href='/models'>Modellar</a>
                            </li>
                            <li>
                                <a href='/'>Configurator</a>
                            </li>
                            <li>
                                <a href='/'>Maxsus takliflar</a>
                            </li>
                            <li>
                                <a href='/dealers'>Dilerlar</a>
                            </li>
                            <li>
                                <a href='/test-drive'>Test-drayvga yozilish</a>
                            </li>
                        </ul>
                        <ul>
                            <h2>LIMON-AUTO brendi</h2>
                            <li>
                                <a href='/'>Configurator</a>
                            </li>
                            <li>
                                <a href='/'>Qayta aloqa</a>
                            </li>
                        </ul>
                        <ul>
                            <h2>LIMON-AUTO O'zbekistonda</h2>
                            <li>
                                <a href='/dealers'>Dilerlar</a>
                            </li>
                            <li>
                                <a href='/about-gwm/haval-v-uzbekistane/how-become-dealer'>
                                    Qanday qilib diler bo'lish mumkin
                                </a>
                            </li>
                            <li>
                                <a href='/'>Yangiliklar</a>
                            </li>
                        </ul>
                        <ul>
                            <h2>Servis</h2>
                            <li>
                                <a href='/guarantee'>Kafolat</a>
                            </li>
                        </ul>
                        <ul>
                            <h2>Kontaktlar</h2>
                            <li>
                                <a href='/'>
                                    <i className='fa-solid fa-envelope'></i>
                                    info@limon.uz
                                </a>
                            </li>
                            <li>
                                <a href='tel:+998712878888'>
                                    <i className='fa-solid fa-phone'></i>
                                    +998 (71) 287-88-88
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div
                        style={{
                            marginTop: "30px",
                        }}>
                        <p>&copy; Barcha huquqlar himoyalangan.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterComponent;
