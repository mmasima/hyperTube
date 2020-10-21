import axios from 'axios';

const submitRegister = async (username, firstname, lastname, email, password, confirm) => {
    return axios.post('http://localhost:5000/register', {
        username, firstname, lastname, email, password, confirm
    })
}

export default submitRegister;