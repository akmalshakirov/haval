import DownloadPdf from "../../Components/DownloadPdf/DownloadPdf";
import HeaderNavBar from "../../Components/Header/HeaderNavBar";
import "./BDealer.css";

function BDealer() {
    return (
        <div className='b-dealer'>
            <div className='b-dealer-wrapper'>
                <>
                    <HeaderNavBar />
                </>
            </div>
            <h3 className='b-dealer-header-hero-title'>
                HAVAL dileriga aylaning
            </h3>

            <div className='b-dealer-container'>
                <ul className='b-dealer-ul'>
                    <li>
                        <a href='/'>Bosh sahifa</a>
                    </li>
                    <span>{">"}</span>
                    <li>
                        <a href='/'>Great Wall Motor haqida</a>
                    </li>
                    <span>{">"}</span>
                    <li>
                        <span>HAVAL dileriga aylaning</span>
                    </li>
                </ul>
                <h1>Hamkor tanlash</h1>
                <p className='b-dealer-text'>
                    Har bir hududdagi diler tanlovi konkurs asosida va biznesni
                    rivojlantirishning ustuvor yo’nalishlariga muvofiq amalga
                    oshirilishiga e’tiboringizni qaratmoqdamiz. Har bir
                    dilerlikka nomzod yanada samarali hamkorlikni amalga
                    oshirish uchun to’ldirilgan anketani dilerlik tarmog’ini
                    rivojlantirish bo’yicha mutaxassisga taqdim etadi.
                </p>
                <ul>
                    <li className='b-dealer-info'>
                        To’ldirilgan anketa elektron pochta orqali quyidagi
                        manziliga yuborilishi lozim:{" "}
                        <a href='/'>development@roodell.uz</a>
                    </li>
                </ul>
            </div>
            <DownloadPdf />
        </div>
    );
}

export default BDealer;
