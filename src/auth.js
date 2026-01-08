// src/auth.js
export const isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
};