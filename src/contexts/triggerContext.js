import React from "react";
import { createContext, useState } from "react";

export const TriggerContext = createContext(null);

const TriggerProvider = ({ children }) => {
  const [trigger, setTrigger] = useState(false);

  function triggerRender() {
    if (trigger === true) {
      setTrigger(false);
    } else {
      setTrigger(true);
    }
  }

  return (
    <TriggerContext.Provider value={[trigger, setTrigger, triggerRender]}>
      {children}
    </TriggerContext.Provider>
  );
};

export default TriggerProvider;
