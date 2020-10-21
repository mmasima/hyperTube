import axios from 'axios';

const submitLogin = (username, password) => {
    return axios.post('http://localhost:5000/login',{
        username,password
    }).then((res) => {
        return res;
    })
}

export default submitLogin;
