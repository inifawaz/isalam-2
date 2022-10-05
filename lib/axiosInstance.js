import Axios from "axios";

export const axios = Axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    "Content-Type": "application/json",
    Accept: "application/json",
});

// export const axios = Axios.create({
//     baseURL: "https://api.isalamwakaf.com/api",
//     "Content-Type": "application/json",
//     Accept: "application/json",
// });
