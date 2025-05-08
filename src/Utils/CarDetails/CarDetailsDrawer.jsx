import { Button, Drawer, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./CarDetailsDrawer.css";

const CarDetailsDrawer = ({ car, open, onClose }) => {
    const userData = JSON?.parse(localStorage.getItem("userData"));
    const userName = userData ? userData[0].name : userData;
    const [loader, setLoader] = useState(false);
    const { engine } = car;
    const [selectedEngine, setSelectedEngine] = useState(engine[0]);
    const [formData, setFormData] = useState({
        userId: localStorage.getItem("userID"),
        fullname: userName ? userName : "Loading user name...",
        phone: "",
        model: car?.model,
        color: car?.color,
        engine: selectedEngine,
        transmission: car?.transmission,
        payment: car?.payment || "Yo'q",
        price: car?.price,
    });

    useEffect(() => {
        document.title = `HAVAL | ${car?.model}`;
    }, []);

    // const handleChangeInput = (e) => {
    //     if (!car.engine.includes(e.target.value)) {
    //         return;
    //     } else {
    //         setFormData((prev) => ({
    //             ...prev,
    //             engine: e.target.value,
    //         }));
    //     }
    // };

    const handleBuy = async (e) => {
        e.preventDefault();
        // setLoader(true);
        // setTimeout(() => {
        //     setLoader(false);
        // }, 2000);
        console.log(formData);
        // try {
        //     const response = await axios.post(
        //         "http://localhost:3000/generate-pdf",
        //         formData,
        //         { headers: { "Content-Type": "application/json" } }
        //     );

        //     if (response.status === 201) {
        //         onClose();
        //         toast.success(
        //             `HAVALning ${car?.model} modeliga shartnoma muvaffaqiyatli olindi.`,
        //             {
        //                 autoClose: 7777,
        //                 draggable: "mouse",
        //                 closeButton: false,
        //             }
        //         );
        //         toast.success(
        //             "Barcha shartnomalarni shaxsiy kabinetingizda ko'rishingiz mumkin.",
        //             {
        //                 delay: 7777,
        //                 autoClose: 7777,
        //                 draggable: "mouse",
        //                 closeButton: false,
        //             }
        //         );
        //     } else {
        //         toast.info(response?.data?.message || response?.data?.error);
        //     }
        // } catch (error) {
        //     toast.error(error?.response?.data?.message);
        // } finally {
        //     setLoader(false);
        // }
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
            {loader ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                        marginTop: "50px",
                    }}>
                    <h1>Yuklanmoqda</h1>
                    <Spin size='large' />
                </div>
            ) : (
                <form onSubmit={handleBuy}>
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
                                marginRight: "10px",
                            }}>
                            Uzatmalar qutisi:
                        </label>
                        <select
                            value={selectedEngine}
                            onChange={(e) => setSelectedEngine(e.target.value)}
                            disabled={engine?.length === 1}>
                            {engine?.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <p>
                        <strong>To'lov turi:</strong> {car?.payment}
                    </p>
                    <div className='car-details-drawer-footer'>
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Bekor qilish
                        </Button>
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={loader}>
                            Sotib olish
                        </Button>
                    </div>
                </form>
            )}
        </Drawer>
    );
};

export default CarDetailsDrawer;
