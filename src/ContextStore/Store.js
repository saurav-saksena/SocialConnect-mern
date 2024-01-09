import React from "react";
import SocialContext from "./SocialContext";
export default function Store({ children }) {
  return <SocialContext.Provider value={{}}>{children}</SocialContext.Provider>;
}
