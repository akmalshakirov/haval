import React, { useState } from "react";
import "../MainDealers/MainDealers.css";

const locations = [
    {
        id: 1,
        name: "HAVAL Yakkasaray",
        address: "Toshkent sh., Yakkasaroy tumani, Bobur ko'chasi, 87B/1",
        coordinates: { lat: 41.2995, lng: 69.2401 },
    },
    {
        id: 2,
        name: "Sayor Motors Tashkent",
        address: "Toshkent sh., Bektemir tumani, Tuena 10",
        coordinates: { lat: 41.2581, lng: 69.1868 },
    },
    {
        id: 3,
        name: "ADM-ASTER Toshkent",
        address: "Toshkent sh., Olmazor tumani, Kichik halqa yo'li, 36",
        coordinates: { lat: 41.3161, lng: 69.2047 },
    },
    {
        id: 4,
        name: "HAVAL Kibray",
        address:
            "Toshkent viloyati, Qibray tumani, Alisher Navoiy ko'chasi, 14 uy",
        coordinates: { lat: 41.3899, lng: 69.4412 },
    },
    {
        id: 5,
        name: "HAVAL asgfauhoieglsjnr",
        address: "Toshkent viloyati, Qibray tumani, Aligzssher awegrhtszs",
        coordinates: { lat: 41.3899, lng: 69.4657 },
    },
    {
        id: 6,
        name: "HAVAL aerjaejehsts",
        address: "Toshkent viloyati, Qibray tumani, A,ccg,hg14 kyg,fuy",
        coordinates: { lat: 41.3899, lng: 69.8734 },
    },
    {
        id: 7,
        name: "HAVAL aagherehasgjh",
        address: "Toshkent viloyati, Qibray tumani, sdb Navoijf uy",
        coordinates: { lat: 41.3899, lng: 69.1222 },
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
                            {location.address}
                        </p>
                    </div>
                ))}
            </div>

            {/* Map Section */}
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
