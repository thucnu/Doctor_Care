import axios from '../axios';

const getUserChats = (userId) => {
    return axios.get(`/api/get-user-chats?id=${userId}` );
}

export{
    getUserChats
}