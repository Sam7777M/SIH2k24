import React, { createContext, useState } from "react";

const QrCodeContext = createContext();

export const QrCodeProvider = ({ children }) => {
    const [qrData, setQrData] = useState(null);

    return (
        <QrCodeContext.Provider value={{ qrData, setQrData }}>
            {children}
        </QrCodeContext.Provider>
    );
};

export default QrCodeContext;
