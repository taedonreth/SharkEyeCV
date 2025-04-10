import React, { createContext, useState, useContext } from 'react';
 
 // Create the context
 const ProgressContext = createContext();
 
 // Provider component
 export const ProgressProvider = ({ children }) => {
   const [lastPercentage, setLastPercentage] = useState(0);
 
   const updatePercentage = (newPercentage) => {
     setLastPercentage(newPercentage);
   };
 
   return (
     <ProgressContext.Provider value={{ lastPercentage, updatePercentage }}>
       {children}
     </ProgressContext.Provider>
   );
 };
 
 // Custom hook to use the progress context
 export const useProgress = () => useContext(ProgressContext); 