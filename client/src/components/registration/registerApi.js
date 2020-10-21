import axios from 'axios';

const submitRegister = async (username, firstname, lastname, password, confirm) => {
    const data = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token().token}`

        }
    }
    var res = axios.post('http://localhost:5000/editProfile',{
        username, firstname, lastname, password, confirm
    }, data)
    console.log(res)
    return res;
}

export default submitRegister;