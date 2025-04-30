import React, { useState } from "react";
import "./AdminDealer.css";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "antd";

const defaultDealer = {
    title: "",
    phone: "",
    address: "",
    region: "Toshkent",
    days: 1,
    startTime: "09:00",
    endTime: "18:00",
};

const locations = [
    {
        id: 1,
        name: "HAVAL Yakkasaray",
        description: "Toshkent sh., Yakkasaroy tumani, Bobur ko'chasi, 87B/1",
        coordinates: { lat: 41.2699249144779, lng: 69.26286508142417 },
    },
    {
        id: 2,
        name: "Sayor Motors Tashkent",
        description: "Toshkent sh., Bektemir tumani, Tuena 10",
        coordinates: { lat: 41.2424, lng: 69.33754 },
    },
    {
        id: 3,
        name: "ADM-ASTER Toshkent",
        description: "Toshkent sh., Olmazor tumani, Kichik halqa yo'li, 36",
        coordinates: { lat: 41.3161, lng: 69.2047 },
    },
    {
        id: 4,
        name: "HAVAL Kibray",
        description:
            "Toshkent viloyati, Qibray tumani, Alisher Navoiy ko'chasi, 14 uy",
        coordinates: { lat: 41.3899, lng: 69.4412 },
    },
    {
        id: 5,
        name: "HAVAL Samarqand - 1",
        description: "Samarqand sh., Chupon-ota massivi, 50A",
        coordinates: { lat: 39.674390440223405, lng: 67.02450250871217 },
    },
    {
        id: 6,
        name: "HAVAL Samarqand - 2",
        description: "Toshkent viloyati, Qibray tumani, A14",
        coordinates: { lat: 39.609496659318545, lng: 66.89656814710446 },
    },
    {
        id: 7,
        name: "HAVAL Farg'ona",
        description: "Farg'ona sh., Sohibqiron Temur ko'chasi, 295-son",
        coordinates: { lat: 40.38081163718974, lng: 71.7523114820093 },
    },
    {
        id: 8,
        name: "HAVAL Namangan",
        description: "Namangan sh, Mamarasulov ko'chasi, 15 ",
        coordinates: { lat: 41.01697695406887, lng: 71.67526053257912 },
    },
    {
        id: 9,
        name: "ADM-ASTER Namangan",
        description: "Namangan sh., Kosonsoy ko'chasi-86A",
        coordinates: { lat: 41.00868115192557, lng: 71.64229932834473 },
    },
    {
        id: 10,
        name: "HAVAL Andijon",
        description: "Andijon sh., Oltinqul Shox, 82",
        coordinates: { lat: 40.756916025873615, lng: 72.28845633715235 },
    },
    {
        id: 11,
        name: "HAVAL Shahrisabz",
        description: "Qashqadaryo viloyati, Shahrisabz tumani, Ravot",
        coordinates: { lat: 41.00868115192557, lng: 71.64229932834473 },
    },
    {
        id: 12,
        name: "HAVAL Qarshi",
        description: "Qashqadaryo viloyati, Qarshi shahar, Jayhun ko'chasi, 33",
        coordinates: { lat: 41.00868115192557, lng: 71.64229932834473 },
    },
    {
        id: 13,
        name: "HAVAL Termiz",
        description:
            "Surxondaryo viloyati, Termiz sh., Shimoliy Darvoza ko'chasi, 17k",
        coordinates: { lat: 41.00868115192557, lng: 71.64229932834473 },
    },
    {
        id: 14,
        name: "HAVAL Buxoro",
        description: "Buxoro sh., Oq masjid ko'chasi, 4",
        coordinates: { lat: 41.00868115192557, lng: 71.64229932834473 },
    },
    {
        id: 15,
        name: "HAVAL Navoi",
        description: "Navoiy sh., Me'morlar ko'chasi, 36A",
        coordinates: { lat: 41.00868115192557, lng: 71.64229932834473 },
    },
];

const AdminDealer = () => {
    return (
        <div className='admin-dealers'>
            <Button
                type='primary'
                style={{
                    display: "inline-block",
                    marginBottom: "20px",
                }}
                onClick={() => alert("XILLO")}>
                Diler qo'shish
            </Button>
            <table className='admin-dealers-table'>
                <thead className='admin-dealers-table-head'>
                    <tr>
                        <th scope='col'>Dilerning soni</th>
                    </tr>
                    <tr>
                        <th scope='col'>Dilerning nomi</th>
                    </tr>
                    <tr>
                        <th scope='col'>Dilerning manzili</th>
                    </tr>
                    <tr></tr>
                </thead>
                {locations.map((location) => (
                    <tbody
                        className='admin-dealers-table-body'
                        key={location.id}>
                        <tr>
                            <td scope='row'>#{location.id}</td>
                        </tr>
                        <tr>
                            <td scope='row'>{location.name}</td>
                        </tr>
                        <tr>
                            <td scope='row'>{location.description}</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to='/dealers'>Batafsil</Link>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
};

export default AdminDealer;
