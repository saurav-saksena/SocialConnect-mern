import React, { useEffect, useState } from "react";
import SocialContext from "./SocialContext";
import { toast } from "react-toastify";

export default function Store({ children }) {
  const [userinfo, setUserinfo] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("socialToken");
    if (token) {
      verifiedUserDetails();
    }
    // eslint-disable-next-line
  }, []);
  //success msg alert
  // const successAlert = (success) => {
  //   toast.success(success, {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 1000,
  //     className: "toast--message",
  //   });
  // };

  //error alert
  const errorAlert = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      className: "toast--message",
    });
  };

  // login function
  // const loginApi = async (item) => {
  //   let response = await fetch("http://localhost:8000/api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(item),
  //   });
  //   response = await response.json();
  //   if (response.success) {
  //     verifiedUserDetails(response.authToken);
  //     localStorage.setItem("socialToken", response.authToken);
  //   } else {
  //     errorAlert(response.msg);
  //   }
  // };

  //store usedetails in a variable after login for global state
  const verifiedUserDetails = async (token) => {
    const response = await fetch(
      "http://localhost:8000/api/auth/verifieduserdetails",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("socialToken"),
        },
      }
    );
    let result = await response.json();
    if (result.success) {
      setUserinfo(result.user);
    } else {
      errorAlert(result.msg);
    }
  };

  // // logout
  // const logout = () => {
  //   localStorage.removeItem("socialToken");
  //   setUserinfo({});
  // };
  return (
    <SocialContext.Provider
      value={{ userinfo, errorAlert, verifiedUserDetails }}
    >
      {children}
    </SocialContext.Provider>
  );
}
