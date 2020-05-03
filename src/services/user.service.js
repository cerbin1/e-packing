import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://epackingbackend.herokuapp.com/api/test/';
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getAllNotes() {
    return axios.get('https://epackingbackend.herokuapp.com/notes', { headers: authHeader() });
  }

  getOneNote(id) {
   return axios.get('https://epackingbackend.herokuapp.com/note?id=' + id , { headers: authHeader() });
 }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getNotesByUserId(id) {
    return axios.get('https://epackingbackend.herokuapp.com/userNotes?userId=' + id, { headers: authHeader() });
  }

    updateComment(id, commentValue) {
        return axios.put('https://epackingbackend.herokuapp.com/addComment?id=' + id,
            {value: commentValue},
            {headers: authHeader()})
    }
}
export default new UserService();