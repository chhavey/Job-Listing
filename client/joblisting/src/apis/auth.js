import axios from 'axios';

export const login = async (email, password) => {
    try {
        // const backendUrl = process.env.BACKEND_URL;
        const reqUrl = `http://localhost:4000/user/login`;
        const reqPayload = {
            email: email,
            password: password,
        };
        const response = await axios.post(reqUrl, reqPayload);
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("loggedInUser", response.data.recruiterName);
        }
        return response.data.message;
    }
    catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message || 'Login failed!');
    }
}

export const register = async (email, name, mobile, password) => {
    try {
        const reqUrl = `http://localhost:4000/user/register`;
        const reqPayload = {
            email: email,
            name: name,
            mobile: mobile,
            password: password,
        };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data.message;
    }
    catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message || 'Registration failed!');
    }
}