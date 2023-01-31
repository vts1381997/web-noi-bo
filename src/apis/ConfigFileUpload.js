import axios from 'axios'
import cookie from 'react-cookies'
const token = cookie.load('token');
export default function Request(endpoint, method, body) {
    return axios({
        method: method,
        url: process.env.NODE_ENV === 'production'? `http://103.74.122.80:5000/${endpoint}` :`http://localhost:5000/${endpoint}`,
        data: body,
        headers: {
            "access-token": token
        }
    }).catch(err => {
        console.log(err);
    })
}