import React, { createContext, useState } from 'react';

// Create a context
export const EdgeworkContext = createContext();

// Context provider component
function EdgeworkProvider({ children }){
    const [edgework, setEdgework] = useState({
        serialNumber: "",
        portPlates: [],
        batteryHolders: [],
        indicators: []}
    );

    return (
        <EdgeworkContext.Provider value={{ edgework, setEdgework }}>
            {children}
        </EdgeworkContext.Provider>
    );
};

export default EdgeworkProvider;