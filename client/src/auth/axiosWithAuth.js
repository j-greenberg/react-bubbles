import axios from 'axios';

export const axiosWithAuth = () => {
    
    const token = localStorage.getItem('token');
    console.log("axiosWithAuth was just called! Token: ", token)

    return axios.create({
            baseURL: 'http://localhost:5000', 
            headers: {
            Authorization: token
            }
        })
};