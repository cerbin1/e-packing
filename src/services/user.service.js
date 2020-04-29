import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getAllNotes() {
     // todo: dodać potem pobieranie notatek tylko danego usera (zalogowanego)
    return axios.get('http://localhost:8081/notes', { headers: authHeader() });
  }

  getOneNote(id) {
    // todo: dodać potem pobieranie notatek tylko danego usera (zalogowanego)
   return axios.get('http://localhost:8081/note?id=' + id , { headers: authHeader() });
 }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getNotesByUserId(id) {
    return axios.get('http://localhost:8081/userNotes?userId=' + id, { headers: authHeader() });
  }
}
export default new UserService();