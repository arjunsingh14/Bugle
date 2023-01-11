import axios from "axios"
const baseURL = "http://localhost:3001/api/v1/login";
interface loginCredentials {
    email: string,
    password: string,
}
const loginUser = async (credentials: loginCredentials) => {
    try {
        const res = await axios.post(baseURL, credentials);
        return res.data;
    } catch (error) {
        console.log(error)
    }
    
}

export default {loginUser}