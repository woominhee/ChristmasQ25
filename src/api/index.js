/* eslint-disable */
import axios from 'axios';

function registerUser(userData){
  const url = 'https://christmas-q25.site/api/api/members/signup';
  return axios.post(url, userData);
}

export { registerUser };

function logout(Idx){
  const url = 'https://christmas-q25.site/api/api/members/logout';
  let i = {userIdx :  1}
  return axios.delete(url, i);
}

export { logout };