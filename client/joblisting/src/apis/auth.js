import axios from 'axios';
// const backendUrl = process.env.BACKEND_URL;

export const login = async (email, password) => {
    try {
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
        return response.data;
    }
    catch (error) {
        console.log(error);
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
        // if (response.status === 200) {
        //     const loginResponse = await login(email, password);
        //     return loginResponse.data;
        // }
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}