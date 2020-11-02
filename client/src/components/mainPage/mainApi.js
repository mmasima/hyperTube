import axios from 'axios'


const token = () => {
    return JSON.parse(localStorage.getItem("login"));
}

const submitComment = async (id, comment) => {
    const data = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token().token}`
        }
    }
    var res = axios.post('http://localhost:5000/comments', {
        id, comment
    }, data)
    return res;
}

const getComments = async (id) => {
    const data = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token().token}`
        }
    }
    axios.post('http://localhost:5000/comments/getComments', {id}, data)
    .then((res) => {
        console.log(res);
    })
}

export default {
    submitComment,
    getComments
}