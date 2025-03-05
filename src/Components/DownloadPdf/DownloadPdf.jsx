import { useState } from "react";
import "./DownloadPdf.css";
import axios from "axios";

export default function DownloadPdf() {
    const CarModelsArr = [
        { id: 1, model: "HAVAL Dargo", value: "Dargo", price: "399 900 000" },
        { id: 2, model: "HAVAL Jolion", value: "Jolion", price: "279 900 000" },
        { id: 3, model: "HAVAL M6", value: "M6", price: "249 900 000" },
        { id: 4, model: "HAVAL H6", value: "H6", price: "324 900 000" },
        {
            id: 5,
            model: "GWM WINGLE 7",
            value: "GWM WINGLE 7",
            price: "399 900 000",
        },
    ];

    const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        model: "",
        color: "",
        engine: "",
        transmission: "",
        payment: "",
        price: "",
    });

    const formatPhoneNumber = (value) => {
        let cleaned = value.replace(/\D/g, "").slice(0, 9);
        if (cleaned.length <= 2) return cleaned;
        return `(${cleaned.slice(0, 2)})-${cleaned.slice(2, 5)}-${cleaned.slice(
            5,
            7
        )}-${cleaned.slice(7, 9)}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            let formattedValue = formatPhoneNumber(value);
            setFormData({ ...formData, [name]: formattedValue });
        } else if (name === "model") {
            const selectedCar = CarModelsArr.find((car) => car.value === value);
            setFormData({
                ...formData,
                model: value,
                price: selectedCar ? selectedCar.price : "",
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // const generatePDF = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:3000/generate-pdf",
    //             formData,
    //             {
    //                 headers: { "Content-Type": "application/json" },
    //             }
    //         );

    //         const data = await response.json();
    //         if (response.ok) {
    //             downloadPDF(data.filename);
    //         } else {
    //             console.log("Xatolik yuz berdi: " + data.error);
    //         }
    //     } catch (error) {
    //         console.error("Serverga ulanishda xatolik:", error);
    //     }
    // };

    // const downloadPDF = async (filename) => {
    //     try {
    //         const response = await axios.get(
    //             `http://localhost:3000/download-pdf/${filename}`,
    //             {
    //                 responseType: "blob",
    //             }
    //         );
    //         if (!response.ok) throw new Error("PDF yuklab olishda xatolik!");

    //         const blob = new Blob([response.data], { type: "application/pdf" });
    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         link.download = filename;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const generatePDF = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/generate-pdf",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                downloadPDF(response.data.filename);
            } else {
                console.error("Xatolik yuz berdi:", response.data.error);
            }
        } catch (error) {
            console.error("Serverga ulanishda xatolik:", error);
        }
    };

    const downloadPDF = async (filename) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/download-pdf/${filename}`,
                { responseType: "application/pdf" }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("PDF yuklab olishda xatolik:", error);
        }
    };

    return (
        <div className='download-pdf-page'>
            <div className='download-pdf-container'>
                <form onSubmit={generatePDF} className='download-pdf-form'>
                    <div>
                        <label htmlFor='toliq-ism'>Ism, Familiya:</label>
                        <input
                            id='toliq-ism'
                            name='fullname'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='telefon-raqam'>Telefon raqam:</label>
                        <input
                            id='telefon-raqam'
                            type='tel'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='modelni-tanlash'>Model:</label>
                        <select
                            name='model'
                            id='modelni-tanlash'
                            onChange={handleChange}
                            required>
                            <option value='' selected></option>
                            {CarModelsArr.map((car) => (
                                <option key={car.id} value={car.value}>
                                    {car.model}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='rangi'>Avtomobilni rangi:</label>
                        <select
                            name='color'
                            id='rangi'
                            onChange={handleChange}
                            required>
                            <option value='' selected></option>
                            <option value='oq'>Oq</option>
                            <option value='qora'>Qora</option>
                            <option value='kulrang'>Kulrang</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='dvigatel-hajmi'>Dvigatel hajmi:</label>
                        <select
                            name='engine'
                            id='dvigatel-hajmi'
                            onChange={handleChange}
                            required>
                            <option value='' selected></option>
                            <option value='1.5 Turbo'>1.5 Turbo</option>
                            <option value='2.0 Turbo'>2.0 Turbo</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='uzatmalar-qutisi'>
                            Uzatmalar qutisi:
                        </label>
                        <select
                            name='transmission'
                            id='uzatmalar-qutisi'
                            onChange={handleChange}
                            required>
                            <option value='' selected></option>
                            <option value='Avtomat'>Avtomat</option>
                            <option value='Mexanik'>Mexanik</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='tolov-turi'>To'lov turi:</label>
                        <select
                            name='payment'
                            id='tolov-turi'
                            onChange={handleChange}
                            required>
                            <option value='' selected></option>
                            <option value='Naqd'>Naqd</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='price'>
                            Tanlangan avtomobilni narxi:
                        </label>
                        <input
                            id='price'
                            type='text'
                            name='price'
                            value={formData.price}
                            readOnly
                            placeholder='Oldin modelni tanglang'
                        />
                    </div>
                    <button type='submit' className='submit-btn'>
                        Yuborish
                    </button>
                </form>
            </div>
        </div>
    );
}
