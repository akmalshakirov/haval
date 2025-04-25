import "./Models.css";
import HeaderNavBar from "../../Components/Header/HeaderNavBar";
import havalH9 from "../../Images/haval-h9.jpg";
import havalDargo from "../../Images/haval-dargo.jpg";
import havalJolion from "../../Images/haval-jolion.jpg";
import havalH6 from "../../Images/haval-h6.jpg";
import havalM6 from "../../Images/haval-m6.jpg";
import gwmWingle7 from "../../Images/gwm-wingle-7.jpg";
import { Link } from "react-router-dom";
import FooterComponent from "../../Components/Footer/Footer";

function Models() {
    const carModels = [
        {
            id: 1,
            name: "Haval H9",
            image: havalH9,
            price: "Tez orada",
            specs: "Tez orada",
            link: "/models",
        },
        {
            id: 2,
            name: "Haval DARGO",
            image: havalDargo,
            price: "399 900 000 so'mdan",
            link: "/models/haval-dargo",
        },
        {
            id: 3,
            name: "Haval Jolion",
            image: havalJolion,
            price: "399 900 000  so'mdan",
            link: "/models/haval-jolion",
        },
        {
            id: 4,
            name: "Haval H6",
            image: havalH6,
            price: "324 900 000 so'mdan",
            link: "/models/haval-h6",
        },
        {
            id: 5,
            name: "Haval M6",
            image: havalM6,
            price: "249 900 000 so'mdan",
            link: "/models/haval-m6",
        },
        {
            id: 6,
            name: "GWM Wingle 7",
            image: gwmWingle7,
            price: "359 900 000 so'mdan",
            link: "/models/gwm-wingle-7",
        },
    ];

    return (
        <div className='models'>
            <div>
                <HeaderNavBar />
            </div>
            <div className='models-container'>
                <ul className='to-home'>
                    <li>
                        <Link to='/'>Bosh sahifa</Link>
                    </li>
                    <li>
                        <span> {">"} </span>
                    </li>
                    <li>
                        <Link to='/models'>Modellar</Link>
                    </li>
                </ul>
                <h1 className='models-title'>HAVAL modellar qatori</h1>
                <p className='models-description'>
                    Tanlov sizda! O'zbekiston sharoitlariga moslashtirilgan
                    texnologik jihatdan ilg'or HAVAL krossoverlari va yo'l
                    tanalamas avtomobillariga baho bering.
                </p>
                <h1>Mavjud avtomobillar</h1>
                <div className='models-grid'>
                    {carModels.map((model) => (
                        <div key={model.id} className='model-card'>
                            <div className='model-image'>
                                <img src={model.image} alt={model.name} />
                            </div>
                            <div className='model-info'>
                                <h3>{model.name}</h3>
                                <p className='model-price'>{model.price}</p>
                                <Link
                                    className='model-details-btn'
                                    to={model.link}>
                                    Batafsil
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{
                    marginTop: "60px",
                }}>
                <FooterComponent />
            </div>
        </div>
    );
}

export default Models;
