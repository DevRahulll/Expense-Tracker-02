import axios from "axios";

export const apiInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
});

// apiInstance.interceptors.response.use(
//     (response)=>response,

//     async(error)=>{
//         const originalRequest=error.config,

//         if(
//             error.response?.status===401 &&!originalRequest.retry&&originalRequest.url!=="/auth/profile"
//         ){
//             originalRequest.retry=true;

//             try {
//                 await apiInstance.get("/auth/get-accessToken");

//                 return apiInstance(originalRequest);
//             } catch (refreshError) {
//                 window.location.href("/");
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// )
