import React, { useState } from "react";
import "./AdminDealer.css";

const defaultDealer = {
    title: "",
    phone: "",
    address: "",
    region: "Toshkent",
    days: 1,
    startTime: "09:00",
    endTime: "18:00",
};

const regions = [
    "HAVAL Yakkasaray",
    "Sayor Motors Tashkent",
    "ADM-ASTER Toshkent",
    "HAVAL Kibray",
    "HAVAL Samarqand - 1",
    "HAVAL Samarqand - 2",
    "HAVAL Farg'ona",
    "HAVAL Namangan",
    "ADM-ASTER Namangan",
    "HAVAL Andijon",
    "HAVAL Shahrisabz",
    "HAVAL Qarshi",
    "HAVAL Termiz",
    "HAVAL Buxoro",
    "HAVAL Navoi",
];

const AdminDealer = () => {
    const [dealer, setDealer] = useState(defaultDealer);
    const [editing, setEditing] = useState(true);

    const handleSave = () => {
        const { title, phone, address } = dealer;
        if (!title || !phone || !address) {
            alert("Majburiy maydonlarni to'ldiring!");
            return;
        }
        console.log("Saved dealer", dealer);
        alert("Diler muvaffaqiyatli qo'shildi!");
        setEditing(false);
    };

    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>
                    {editing ? "Yangi Diler Qo‘shish" : "Diler Ma‘lumotlari"}
                </h3>
                {!editing && (
                    <button
                        className='btn icon-btn'
                        onClick={() => {
                            setDealer(defaultDealer);
                            setEditing(true);
                        }}>
                        +
                    </button>
                )}
            </div>
            <div className='card-body'>
                <div className='descriptions'>
                    {[
                        ["Sarlavha", "title"],
                        ["Telefon raqam", "phone"],
                        ["Manzil", "address"],
                    ].map(([label, key]) => (
                        <div className='descriptions-row' key={key}>
                            <div className='descriptions-label'>{label}</div>
                            <div className='descriptions-content'>
                                {editing ? (
                                    <input
                                        className='input'
                                        value={dealer[key]}
                                        onChange={(e) =>
                                            setDealer((prev) => ({
                                                ...prev,
                                                [key]: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    dealer[key] || "(kiritilmagan)"
                                )}
                            </div>
                        </div>
                    ))}

                    <div className='descriptions-row'>
                        <div className='descriptions-label'>Hudud</div>
                        <div className='descriptions-content'>
                            {editing ? (
                                <select
                                    className='select'
                                    value={dealer.region}
                                    onChange={(e) =>
                                        setDealer((prev) => ({
                                            ...prev,
                                            region: e.target.value,
                                        }))
                                    }>
                                    {regions.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                dealer.region
                            )}
                        </div>
                    </div>

                    <div className='descriptions-row'>
                        <div className='descriptions-label'>Ish kunlari</div>
                        <div className='descriptions-content'>
                            {editing ? (
                                <input
                                    type='number'
                                    className='input-number'
                                    min='1'
                                    value={dealer.days}
                                    onChange={(e) =>
                                        setDealer((prev) => ({
                                            ...prev,
                                            days: +e.target.value,
                                        }))
                                    }
                                />
                            ) : (
                                dealer.days
                            )}
                        </div>
                    </div>

                    {[
                        ["Ish boshlanish vaqti", "startTime"],
                        ["Ish tugash vaqti", "endTime"],
                    ].map(([label, key]) => (
                        <div className='descriptions-row' key={key}>
                            <div className='descriptions-label'>{label}</div>
                            <div className='descriptions-content'>
                                {editing ? (
                                    <input
                                        type='time'
                                        className='time-input'
                                        value={dealer[key]}
                                        onChange={(e) =>
                                            setDealer((prev) => ({
                                                ...prev,
                                                [key]: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    dealer[key]
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {editing && (
                    <button className='btn primary-btn' onClick={handleSave}>
                        Saqlash
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminDealer;
