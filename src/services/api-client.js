import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://phi-mart-five.vercel.app/api/v1",
});

export default apiClient;


// import axios from "axios";

// export default axios.create({
//     // baseURL: "http://127.0.0.1:8000/api/v1",
//     baseURL: "https://phimarts.vercel.app/api/v1",
// });
