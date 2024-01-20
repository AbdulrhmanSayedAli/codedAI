import { useContext } from "react";
import { CustomReactFlowContext } from "./customReactFlowProvider";
import { CustomReactFlowInstance } from "../../Utils/Types";

export const useCustomReactFlowContext = (): CustomReactFlowInstance => {
  const context = useContext(CustomReactFlowContext);

  if (!context) {
    throw new Error("useCounterContext must be used within a CounterProvider");
  }

  return context;
};
