import { useState } from "react";
import "./DownloadPdf.css";

export default function DownloadPdf() {
    const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        model: "",
        color: "",
        engine: "",
        transmission: "",
        payment: "",
        prepayment: "",
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
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const generatePDF = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/generate-pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                downloadPDF(data.filename);
            } else {
                console.log("Xatolik yuz berdi: " + data.error);
            }
        } catch (error) {
            console.error("Serverga ulanishda xatolik:", error);
        }
    };

    const downloadPDF = async (filename) => {
        try {
            const response = await fetch(
                `http://localhost:3000/download-pdf/${filename}`
            );
            if (!response.ok) throw new Error("PDF yuklab olishda xatolik!");

            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='download-pdf-page'>
            <div className='download-pdf-container'>
                <form onSubmit={generatePDF} className='download-pdf-form'>
                    <h3>HAVAL Avtomobilini Sotib Olish</h3>
                    <input
                        name='fullname'
                        placeholder='Ism, Familiya'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='tel'
                        name='phone'
                        placeholder='Telefon raqami'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <select name='model' onChange={handleChange} required>
                        <option value=''>Model tanlang</option>
                        <option value='Dargo'>HAVAL Dargo</option>
                        <option value='Jolion'>HAVAL Jolion</option>
                        <option value='M6'>HAVAL M6</option>
                        <option value='H6'>HAVAL H6</option>
                        <option value='GWM-WINGLE-7'>GWM WINGLE 7</option>
                    </select>
                    <select name='color' onChange={handleChange} required>
                        <option value=''>Rang tanlang</option>
                        <option value='oq'>Oq</option>
                        <option value='qora'>Qora</option>
                        <option value='kulrang'>Kulrang</option>
                    </select>
                    <select name='engine' onChange={handleChange} required>
                        <option value=''>Dvigatel hajmi</option>
                        <option value='1.5 Turbo'>1.5 Turbo</option>
                        <option value='2.0 Turbo'>2.0 Turbo</option>
                    </select>
                    <select
                        name='transmission'
                        onChange={handleChange}
                        required>
                        <option value=''>Uzatmalar qutisi</option>
                        <option value='Avtomat'>Avtomat</option>
                        <option value='Mexanik'>Mexanik</option>
                    </select>
                    <select name='payment' onChange={handleChange} required>
                        <option value=''>To'lov turi</option>
                        <option value='Naqd'>Naqd</option>
                        <option value='Kredit'>Kredit</option>
                        <option value='Lizing'>Lizing</option>
                    </select>
                    <input
                        name='prepayment'
                        placeholder="Oldindan to'lov (so'm)"
                        type='number'
                        min={1}
                        onChange={handleChange}
                        required
                    />
                    <button type='submit' className='submit-btn'>
                        PDF Yaratish
                    </button>
                </form>
            </div>
        </div>
    );
}
