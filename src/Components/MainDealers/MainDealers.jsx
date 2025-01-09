import React, { useState } from "react";
import "../MainDealers/MainDealers.css";

const locations = [
    {
        id: 1,
        name: "HAVAL Yakkasaray",
        description: "Toshkent sh., Yakkasaroy tumani, Bobur ko'chasi, 87B/1",
        // a: "Toshkent sh., Yakkasaroy tumani, Bobur ko'chasi, 87B/1",
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
        description: "Toshkent viloyati, Qibray tumani, A,ccg,hg14 kyg,fuy",
        coordinates: { lat: 39.609496659318545, lng: 66.89656814710446 },
    },
    {
        id: 7,
        name: "HAVAL Farg'ona",
        description: "Farg'ona sh., Sohibqiron Temur ko'chasi, 295-son",
        coordinates: { lat: 40.380813130712774, lng: 71.75231555107636 },
    },
    {
        id: 8,
        name: "HAVAL Namangan",
        description: "Namangan sh, Mamarasulov ko'chasi, 15",
        coordinates: { lat: 40.380813130712774, lng: 71.75231555107636 },
    },
];

const MainDealers = () => {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
    };

    return (
        <div className='main-dealers'>
            <div className='main-dealers-list'>
                {locations.map((location) => (
                    <div
                        key={location.id}
                        onClick={() => handleLocationClick(location)}
                        style={{
                            backgroundColor:
                                selectedLocation.id === location.id
                                    ? "#d1d1d1"
                                    : "#fff",
                        }}
                        className='main-dealers-item-map'>
                        <h3
                            style={{ margin: 0 }}
                            className='main-dealers-list-item-title'>
                            {location.name}
                        </h3>
                        <p
                            style={{ margin: "5px 0 0" }}
                            className='main-dealers-list-item-address'>
                            {location.description}
                        </p>
                    </div>
                ))}
            </div>
            <div style={{ flex: 1, position: "relative" }}>
                <iframe
                    title='Map'
                    width='100%'
                    height='100%'
                    style={{ border: 0, borderRadius: "7px" }}
                    loading='lazy'
                    about='Map'
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}&z=15&output=embed`}></iframe>
            </div>
        </div>
    );
};

export default MainDealers;
