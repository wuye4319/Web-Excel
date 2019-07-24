/**
 * @desc service api
 */

// import { fetch } from '../util'
import { baseUrl } from '@/common/config/env'
import { resolve } from 'path';

/**
 * 获取用户数据
 */
export const getUserInfo = async (page: 0, size: number = 100) => {
  return new Promise(resolve => {
    fetch(`${baseUrl}/sheets/AAA7f25B-8435-E39f-285f-dEf2cc0fAC19?pageIndex=${page}&pageSize=${size}`).then((res) => {
      return res.json();
    }).then((myJson) => {
      resolve(myJson)
    });
  })
}

export const api = (p1: string) => {
  console.log(`param:${p1}`);
  return baseUrl
}
