import axios from 'axios'
const baseURL="http://coinloot8090.cointobe.vip";
// const baseUrl = "http://10.1.0.11:8090/"
// const baseUrl = "http://192.168.23.33:9090/";
// const baseUrl = "http://10.1.0.38:8090/";
const timeout=5000;
const responseType="json";
const config={
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: baseURL,
  timeout: timeout,
  responseType: responseType, // 默认的
  maxContentLength: 2000,
};
const instance =axios.create(config)



export default instance;
