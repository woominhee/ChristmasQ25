/* eslint-disable */
import axios from 'axios';

function changePw(pwData){
  const url = 'https://christmas-q25.site/api/api/members/newpw';
  return axios.patch(url, pwData);
}

export { changePw };