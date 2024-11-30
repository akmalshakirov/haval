import React from "react";
// import { useTranslation } from "react-i18next";
import HeaderNavBar from "./Components/HeaderNavBar";

function App() {
    // const { t, i18n } = useTranslation();

    // const changeLanguage = (lang) => {
    //     i18n.changeLanguage(lang);
    // };
    return (
        <div className='App'>
            <div>
                <HeaderNavBar />
            </div>
        </div>
    );
}

export default App;
