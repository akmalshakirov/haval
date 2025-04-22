import {
    CarOutlined,
    FieldNumberOutlined,
    PieChartOutlined,
} from "@ant-design/icons";
import "./UserMainMenu.css";

const UserMainMenu = ({ data, theme }) => {
    return (
        <>
            <div className='user-main-men'>
                <div
                    className='user-menu-cards'
                    style={{
                        transition: "12ms",
                    }}>
                    <div
                        className='user-menu-card'
                        style={{
                            backgroundColor:
                                theme === "Oq" ? "#fcfcfc" : "#01172e",
                        }}>
                        <div>
                            <PieChartOutlined />
                            Jami shartnomalarim:{" "}
                            <b>{data.length ? data.length : "Yo'q"}</b>
                        </div>
                    </div>
                    <div
                        className='user-menu-card'
                        style={{
                            backgroundColor:
                                theme === "Oq" ? "#fcfcfc" : "#01172e",
                        }}>
                        <div>
                            <CarOutlined />
                            Mavjud avtomobillar: <b>5</b>
                        </div>
                    </div>
                    <div
                        className='user-menu-card'
                        style={{
                            backgroundColor:
                                theme === "Oq" ? "#fcfcfc" : "#01172e",
                        }}>
                        <div>
                            <FieldNumberOutlined />
                            Avtomobil raqami: 777
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserMainMenu;
