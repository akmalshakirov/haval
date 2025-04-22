import { Button, Drawer } from "antd";
import { useState } from "react";
import "./CarDetailsDrawer.css";

const CarDetailsDrawer = ({ car, open, onClose }) => {
    const userData = JSON?.parse(localStorage.getItem("userData"));
    const userName = userData ? userData[0].name : userData;
    const [formData, setFormData] = useState({
        userId: localStorage.getItem("userID"),
        fullname: userName ? userName : "USER",
        phone: "",
        model: car?.model,
        color: car?.color,
        engine: car?.engine,
        transmission: car?.transmission,
        payment: car?.payment || "Yo'q",
        price: car?.price,
    });

    const handleChange = (e) => {
        const input = e.target.value;
        let numbers = input.replace(/\D/g, "");
        numbers = numbers.substring(0, 9);

        let formatted = "";
        for (let i = 0; i < numbers.length; i++) {
            if (i === 2) formatted += "-";
            if (i === 5) formatted += "-";
            if (i === 7) formatted += "-";
            formatted += numbers[i];
        }
        setFormData((prev) => ({ ...prev, phone: formatted }));
    };

    // const handleSelectChange = (e) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         engine: e.target.value,
    //     }));
    //     console.log("------", formData.engine);
    // };

    const handleChangeInput = (e) => {
        if (!car.engine.includes(e.target.value)) {
            return;
        } else {
            setFormData((prev) => ({
                ...prev,
                engine: e.target.value,
            }));
        }
    };

    const handleBuy = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Drawer
            classNames={{
                mask: "car-drawer-mask",
                wrapper: "car-drawer-wrapper",
                body: "car-drawer-body",
            }}
            title='Avtomobil tafsilotlari'
            placement='right'
            closable={true}
            onClose={onClose}
            open={open}>
            <form onSubmit={handleBuy}>
                <p>
                    <strong>To'liq ism</strong>: {formData.fullname}
                </p>
                <div>
                    <b>
                        <label htmlFor='phoneNumber'>Telefon raqam:</label>
                    </b>
                    <input
                        type='tel'
                        id='phoneNumber'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder='+998'
                    />
                </div>
                <p>
                    <strong>Model:</strong> {car?.model}
                </p>
                <p>
                    <strong>Rangi:</strong> {car?.color}
                </p>
                <p>
                    <strong>Narxi:</strong> {car?.price}
                </p>
                <p>
                    <strong>Drayv:</strong> {car?.transmission}
                </p>
                <div>
                    <label
                        htmlFor='transmission'
                        style={{
                            fontWeight: "bold",
                        }}>
                        Uzatmalar qutisi:
                    </label>
                    <input
                        type='text'
                        name='engine'
                        id='transmission'
                        list='engine-list'
                        multiple
                        required
                        onChange={handleChangeInput}
                    />
                    <datalist id='engine-list'>
                        {car.engine && car.engine.length > 0 ? (
                            car.engine.map((eng, index) => (
                                <option value={eng} key={index}>
                                    {eng}
                                </option>
                            ))
                        ) : (
                            <option value="Ma'lumotlar topilmadi">Yo'q</option>
                        )}
                    </datalist>
                </div>

                <p>
                    <strong>To'lov turi:</strong> {car?.payment}
                </p>
                <div className='car-details-drawer-footer'>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Bekor qilish
                    </Button>
                    <Button type='primary' htmlType='submit'>
                        Sotib olish
                    </Button>
                </div>
            </form>
        </Drawer>
    );
};

export default CarDetailsDrawer;
