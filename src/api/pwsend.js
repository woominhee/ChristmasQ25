import axios from 'axios';

function pwsend(emaildata){
    const url = 'https://christmas-q25.site/api/api/members/pw';
    return axios.post(url, emaildata); 
  }
  
  export { pwsend };