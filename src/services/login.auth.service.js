import axios from 'axios';

const LoginAuth = {};
export default LoginAuth

export async function login(email, password) {
    const data = {
        email,
        password
    }
    return axios({
        method: 'post',
        url: `http://18.237.7.208:3000/v1/auth/login`,
        data
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return { status: 0, message: error.message };
        })
}