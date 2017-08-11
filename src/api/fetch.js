import axios from 'axios';
import config from 'static/js/config';
import {
  Message
} from 'element-ui';
import router from '../router';
import store from '../vuex/store'
//全局格式化axios
axios.defaults.baseURL = config.baseURL;
axios.defaults.timeout = config.timeout;

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    //实例化的对象
    const instance = axios.create({
      //   baseURL:config.baseURL,
      //  timeout:config.timeout,
      headers: {
        'Authorization': store.getters.getToken
      }
    });

    // 添加请求拦截器     
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      // console.log('request_start...');
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
    //添加响应拦截器 
    instance.interceptors.response.use((response) => {
      // console.log('response_start...');
      // 对响应数据做点什么
      let data = response.data;
      if (data.success == false) {
        if (data.error.message === "No user logged in!") {
          router.replace('/login')
        }
      }
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });

    //初始化配置
    instance(options)
      .then(response => {
        const res = response.data;
        if (response.status !== 200) {
          //错误处理
          console.log(options); // for debug
          Message({
            message: '请求错误：' + res.error,
            type: 'error',
            duration: 5 * 1000
          });
          //错误统一处理
          // if (res.code === 50008 || res.code === 50014 || res.code === 50012) {
          //   Message({
          //     message: res.message,
          //     type: 'error',
          //     duration: 5 * 1000
          //   });

          reject(res);
        }
        resolve(res);
      })
      .catch(error => {
        Message({
          message: '请求异常：' + error,
          type: 'error',
          duration: 5 * 1000
        });
        console.log(error); // for debug
        reject(error);
      });
  });
}
