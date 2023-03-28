import axios from "axios"; // used to import the axios package

const instance = axios.create({
    baseURL: 'http://localhost:8000',
});

export default instance;