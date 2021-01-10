import axios from 'axios'
import URL from '../api'
export default function loginPhone (phone, md5PWD) {
  return axios.get(URL + 'login/cellphone?phone=' + phone + '&password=' + md5PWD)
}
