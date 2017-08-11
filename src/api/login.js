import axios from 'axios';
import fetch from './fetch';
import Qs from 'qs';
import store from '../vuex/store';
import config from 'static/js/config';
//login
export function requestToken(params) {
  return new Promise((resolve, reject) => {
    //实例化的对象
    let options = {};
    options.url = "/Token";
    options.method = "post";
    options.data = Qs.stringify(params);
    const instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: {
        'Authorization': store.getters.getToken
      }
    });
    instance(options)
      .then(response => {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  })
};
export const requestGetMenuAppList = params => {
  return fetch({
    url: '/api/services/app/menu/GetMenuAppList',
    method: 'post',
    data: params
  })
};
export const requestGetUserMenu = params => {
  return fetch({
    url: '/api/services/app/usermenu/GetUserMenu?' + Qs.stringify(params),
    method: 'post'
  })
};
export const requestGetCurrentLoginInformations = params => {
  return fetch({
    url: '/api/services/app/session/GetCurrentLoginInformations',
    method: 'post',
    data: params
  })
};
export const requestUpdateCurrentUserInfo = params => {
  return fetch({
    url: '/api/services/app/session/UpdateCurrentUserInfo',
    method: 'post',
    data: params
  })
};

export function requestReturnSystemRoam(params) {
  return fetch({
    url: '/api/services/app/session/ReturnSystemRoam',
    method: 'post',
    data: params
  })
};

export function requestSystemRoam(params) {
  return fetch({
    url: '/api/services/app/session/SystemRoam',
    method: 'post',
    data: params
  })
};
