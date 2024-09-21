// Import necessary modules and utilities
import axios from 'axios';

/**
 * Axios class to create an instance of axios with base URL and authorization header
 * to be used for API requests
 */
class Axios {
  /**
   * Create an instance of axios with base URL and authorization header
   * the port is included in the base URL
   */
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URI,
      withCredentials: true,
      timeout: 120000,
    });
    // Add an interceptor to set authorization header with user token before requests
    this.api.interceptors.request.use(
      function (config) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log('Token : ', userData);
        config.headers.Authorization = userData?.token;
        config.headers['Content-Type'] = 'application/json';
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  loginUser(data) {
    return this.api.post('/login', data);
  }

  registerUser(data) {
    return this.api.post('/register', data);
  }

  getAvailableUsers() {
    return this.api.get('/users');
  }

  getUserChats() {
    return this.api.get('/chats');
  }

  getOrCreateUserChat(receiverId) {
    return this.api.post(`/chats/${receiverId}`, {});
  }

  createGroupChat(data) {
    return this.api.post('/groups', data);
  }

  getGroupInfo(chatId) {
    return this.api.get(`/groups/${chatId}`);
  }

  deleteGroup(chatId) {
    return this.api.delete(`/groups/${chatId}`);
  }

  deleteOneOnOneChat(chatId) {
    return this.api.delete(`/chats/${chatId}`);
  }

  addUserToGroup(chatId, userId) {
    return this.api.post(`/groups/${chatId}/${userId}`, {});
  }

  removeUserFromGroup(chatId, userId) {
    this.api.delete(`/groups/${chatId}/${userId}`);
  }

  leaveGroup(chatId) {
    return this.api.delete(`/groups/${chatId}/leave`);
  }

  getChatMessages(chatId) {
    return this.api.get(`/messages/${chatId}`);
  }

  sendMessage(chatId, data) {
    return this.api.post(`/messages/${chatId}`, data);
  }

  deleteMessage(chatId, messageId) {
    return this.api.delete(`/messages/${chatId}/${messageId}`);
  }

  getChatById(chatId) {
    return this.api.get(`/chats/${chatId}`);
  }

  searchUsers(search) {
    return this.api.get(`/search/users?search=${search}`);
  }

  searchGroups(search) {
    return this.api.get(`/search/groups?search=${search}`);
  }

  searchChats(search) {
    return this.api.get(`/search/chats?search=${search}`);
  }

  getAllGroups() {
    return this.api.get('/groups');
  }

  joinGroup(chatId) {
    return this.api.post(`/groups/${chatId}`, {});
  }
}

export default Axios;
