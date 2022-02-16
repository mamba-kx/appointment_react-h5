import axios from "axios";
// import { Toast } from 'antd-mobile'

const $axios = axios.create({
  baseURL: "http://127.0.0.1:7001",
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "applicatin/json",
  },
});

const api = {
  /**
   * @description 用户登陆
   * @param {*} data 用户名、手机号、身份证号
   */
  userLogin: (data) => {
    return $axios.post("/user/login", data);
  },
  /**
   * @description 用户注册
   * @param {*} data 用户名、手机号、身份证号
   */
  userRegister: (data) => {
    return $axios.post("/user/register", data);
  },
  /**
   * @description 获取场次时间
   */
  getSessionDay: () => {
    return $axios.get("/session/date");
  },
  /**
   * @description 预约场次
   * @param id:场次id
   */
  appointment: (data) => {
    return $axios.post("/session/appointment", data);
  },
  /**
   * @description 取消预约场次
   * @param id:场次id
   */
   cancelAppointment: (data) => {
    return $axios.post("/session/cancelAppointment", data);
  },
};

// $axios.interceptors.response.use((response) => {
//   const { data } = response;
//   return data
// });

export default api;
