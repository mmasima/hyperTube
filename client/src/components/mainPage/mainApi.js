import axios from 'axios'


const token = () => {
    return JSON.parse(localStorage.getItem("login"));
  }

const submitComment = (id, comment) => {
    console.log("hello world")
    console.log(comment)
    const data = {
        headers: {
          'Content-Type': 'application/json',
            'x-auth-token': `${token().token}`
        }
    }
    var res = axios.post('http://localhost:5000/comments',{
        id, comment
    }, data)
    return res;
}


export default {
    submitComment
}