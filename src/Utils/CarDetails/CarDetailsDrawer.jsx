import {
    CarOutlined,
    CreditCardOutlined,
    DollarOutlined,
} from "@ant-design/icons";
import { Card, Divider, Drawer, Space, Spin, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./CarDetails.module.css";
import "./CarDetailsDrawer.css";

const variantOptions = [
    { label: "55 KM Active", value: "55km_active", price: 273900000 },
    { label: "55 KM Luxe", value: "55km_luxe", price: 288100000 },
    { label: "CHAZOR 120km Comfort", value: "120km_comfort", price: 302300000 },
    {
        label: "CHAZOR 120km Flagship",
        value: "120km_flagship",
        price: 315200000,
    },
];

const CarDetailsDrawer = ({ car, open, onClose }) => {
    const userData = JSON?.parse(localStorage.getItem("userData"));
    const userName = userData ? userData[0].name : userData;
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const basePrice = car?.price || 0;
    const [selectedVariant, setSelectedVariant] = useState(
        variantOptions[0].value
    );
    const [currentPrice, setCurrentPrice] = useState(
        variantOptions[0].price || basePrice
    );

    const [formData, setFormData] = useState({
        userId: localStorage.getItem("userID"),
        fullname: userName || "Loading user name...",
        model: car?.model,
        color: car?.color,
        engine: car?.engine,
        transmission: car?.transmission,
        payment: car?.payment || "Yo'q",
        price: variantOptions[0].price || basePrice,
        variant: variantOptions[0].value,
    });

    useEffect(() => {
        document.title = `LIMON-AUTO | ${car?.model}`;
    }, [car]);

    const selectVariant = (value) => {
        const variant = variantOptions.find((opt) => opt.value === value);
        const newPrice = variant ? variant.price : basePrice;
        setSelectedVariant(value);
        setCurrentPrice(newPrice);
        setFormData((prev) => ({ ...prev, variant: value, price: newPrice }));
    };

    const handleBuy = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axios.post(
                "https://haval-xx6f.onrender.com/generate-pdf",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 201) {
                onClose();
                toast.success(
                    `HAVALning ${car?.model} (${
                        variantOptions.find((v) => v.value === selectedVariant)
                            ?.label
                    }) modeliga shartnoma muvaffaqiyatli olindi.`,
                    { autoClose: 7777, draggable: "mouse", closeButton: false }
                );
                navigate("/user");
            } else {
                toast.info(response?.data?.message || response?.data?.error);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || error?.response?.data?.error
            );
        } finally {
            setLoader(false);
        }
    };

    return (
        <Drawer
            classNames={{
                mask: styles.carDrawerMask,
                wrapper: styles.carDrawerWrapper,
                body: styles.carDrawerBody,
            }}
            title={
                <div className={styles.drawerHeader}>
                    Avtomobil tafsilotlari
                </div>
            }
            placement='right'
            closable
            onClose={onClose}
            open={open}
            width={500}>
            {loader ? (
                <div className={styles.loadingContainer}>
                    <Spin size='large' />
                    <h3 className={styles.loadingText}>Yuklanmoqda...</h3>
                </div>
            ) : (
                <form onSubmit={handleBuy}>
                    <Card bordered={false} className={styles.heroCard}>
                        <div className={styles.carImageContainer}>
                            {car?.image ? (
                                <img
                                    src={car.image}
                                    alt={car?.model}
                                    className={styles.carImage}
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display =
                                            "flex";
                                    }}
                                />
                            ) : null}
                            <div
                                className={styles.placeholderImage}
                                style={{
                                    display: car?.image ? "none" : "flex",
                                }}>
                                <CarOutlined
                                    className={styles.placeholderIcon}
                                />
                                <p className={styles.placeholderText}>
                                    Rasm yuklanmoqda...
                                </p>
                            </div>
                        </div>
                        <h2 className={styles.heroTitle}>{car?.model}</h2>
                    </Card>

                    <Space
                        direction='vertical'
                        size='middle'
                        style={{ width: "100%" }}>
                        {/* Variantlarni Card ko'rinishida ko'rsatish */}
                        <div className={styles.variantGrid}>
                            {variantOptions.map((opt) => (
                                <Card
                                    key={opt.value}
                                    hoverable
                                    bordered
                                    className={`${styles.variantCard} ${
                                        selectedVariant === opt.value
                                            ? styles.selectedCard
                                            : ""
                                    }`}
                                    onClick={() => selectVariant(opt.value)}>
                                    <div className={styles.variantLabel}>
                                        {opt.label}
                                    </div>
                                    <div className={styles.variantPrice}>
                                        {opt.price.toLocaleString("uz-UZ")} so'm
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card size='small' className={styles.contentCard}>
                            <Space
                                direction='vertical'
                                size='middle'
                                style={{ width: "100%" }}>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>
                                        Rangi:
                                    </span>
                                    <Tag
                                        color='blue'
                                        className={styles.colorTag}>
                                        {car?.color}
                                    </Tag>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>
                                        <DollarOutlined
                                            className={styles.infoIcon}
                                        />{" "}
                                        Narxi:
                                    </span>
                                    <span className={styles.priceValue}>
                                        {currentPrice.toLocaleString("uz-UZ")}{" "}
                                        so'm
                                    </span>
                                </div>
                            </Space>
                        </Card>

                        <Card size='small' className={styles.contentCard}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                    <CreditCardOutlined
                                        className={styles.infoIcon}
                                    />{" "}
                                    To'lov turi:
                                </span>
                                <Tag
                                    color='green'
                                    className={styles.paymentTag}>
                                    {car?.payment}
                                </Tag>
                            </div>
                        </Card>
                    </Space>

                    <Divider />

                    <div className={styles.buttonContainer}>
                        <button
                            type='button'
                            onClick={onClose}
                            className={`${styles.customButton} ${styles.cancelButton}`}>
                            Bekor qilish
                        </button>
                        <button
                            type='submit'
                            disabled={loader}
                            className={`${styles.customButton} ${styles.buyButton}`}>
                            {loader ? "Yuklanmoqda..." : "Sotib olish"}
                        </button>
                    </div>
                </form>
            )}
        </Drawer>
    );
};

export default CarDetailsDrawer;
