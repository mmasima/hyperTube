import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';


const token = () => {
    return JSON.parse(localStorage.getItem("login"));
}

const getUser =  async () => {
    const data = {
        headers: {
            'x-auth-token': `${token().token}`
        }
    }
    var res = axios.get('http://localhost:5000/editProfile/userDetails', data)
    return (res);
}

const fileUpload = async (e) => {
    const fd = new FormData();
    fd.append('image', e);
    const data = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': `${token().token}`

        }
    }
    var res = axios.post('http://localhost:5000/editProfile/updateImage', fd, data)
    return res;
}

const submitProfile = async (username, firstname, lastname, password, confirm) => {
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

export default {
    token,
    getUser,
    submitProfile,
    fileUpload
}
