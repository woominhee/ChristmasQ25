/* eslint-disable */
import axios from 'axios';

function withdraw(withdrawData){
  const url = 'https://christmas-q25.site/api/api/members/withdraw';
  return axios.patch(url, withdrawData);
}

export { withdraw };