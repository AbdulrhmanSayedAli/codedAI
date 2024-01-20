import { createContext } from "react";
import useCustomReactFlow from "./useCustomReactFlow";

export const CustomReactFlowContext = createContext(null);

export const CustomReactFlowProvider = ({ children }) => {
  const customReactFlowInstance = useCustomReactFlow();

  return (
    <CustomReactFlowContext.Provider value={{ ...customReactFlowInstance }}>
      {children}
    </CustomReactFlowContext.Provider>
  );
};
