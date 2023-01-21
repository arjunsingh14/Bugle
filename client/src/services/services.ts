import axios from "axios";
const baseURL = "/api/v1/";
interface loginCredentials {
  email: string;
  password: string;
}
interface registerCredentials {
  email: string ;
  username: string;
  password: string;
}


const loginUser = async (credentials: loginCredentials) => {
  try {
    const res = await axios.post(baseURL + "login", credentials);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (credentials: registerCredentials) => {
  try {
    const res = await axios.post(baseURL + "register", credentials);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};




export default { loginUser, registerUser };
