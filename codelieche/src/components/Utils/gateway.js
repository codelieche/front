
import axios from 'axios';
import qs from 'qs';

// import {message} from "antd";

import env from "../../config/env";

function getGatewayFetchApi(system){
    // console.log(system);
    let baseUrl = env.gatewayApiBaseUrl[system];
    if(!!baseUrl){
        const api = axios.create({
            // baseURL: "http://127.0.0.1:9000/",
            baseURL: baseUrl,
            // timeout: 20000,
            timeout: env.apiFetchTimeout
        });

        // axios实例默认配置
        api.defaults.headers.common["Content-Type"] = "application/json";
        // api.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
        // api.defaults.headers.common["Host"] = "www.codelieche.com";
        // 允许携带cookie
        api.defaults.withCredentials = true;

        // POST、PUT传递的数据处理 
        api.interceptors.request.use((config) => {
            // console.log(config);
            if(config.method === 'post' || config.method === "put" || config.method === "patch") {
                // console.log(
                //     qs.stringify(config.data),
                //      config.data instanceof Object,
                // )
                if (!config.data instanceof String){
                    config.data = qs.stringify(config.data);
                }else{
                    // config.data = JSON.stringify(config.data);
                }
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        }); 

        // 响应处理
        api.interceptors.response.use(
            response => {
                // console.log(response)

                if (response.config.method === "delete"){
                    return Promise.resolve(response);
                }
                const responseData = response.data;
                return Promise.resolve(responseData);
            },

            error => {
                // 请求出现错误的时候处理函数
                // console.log(error);

                // console.log(error.message, error.response);
                if (/timeout/.test(error.message)) {
                    // 超时
                    console.log('网络超时，请稍后重试！')
                }else{
                    // console.log(error.message);
                }

                if (error.response) {
                    // http状态码判断
                    switch (error.response.status) {
                        // http status handler
                        case 401:
                            // this.props.history.push(next);
                            var next = "/user/login?next=" + window.location.href;
                            var url = window.location.origin + next;
                            window.location.href = url;
                            break;
                        case 403:
                            // message.warn("您无权限访问相关数据", 3);
                            // alert("您没有权限访问当前数据");
                            break;
                        case 404:
                            // console.log('404 Not Found');
                            break
                        case 500:
                            console.log('服务器错误！');
                            break
                        case 503:
                            console.log('服务器响应不过来！');
                            break;
                        default:
                            console.log("默认错误提示");
                    }
                }

                // 把响应的错误返回
                return Promise.reject(error.response)
            }
        );

        // 发起get请求：
        const Get = (url, params, config = {}) => api.get(url, { ...config, params })

        // 发起post请求：地址、url传的参数，config中的data、headers等
        const Post = (url, params, config = {}) => {
            // console.log(url, params, config);
            return api.post(url, params, config);
        }

        // 处理put、patch请求
        const Put = (url, params, config = {}) => api.put(url, params, config)
        const Patch = (url, params, config = {}) => api.patch(url, params, config)


        // 处理delete请求:
        const Delete = (url, params, config = {}) => api.delete(url, { ...config, params })
        
        // 返回对象
        return {
            Get,
            Post,
            Put,
            Patch,
            Delete,
        }
    }else{
        return {}
    }
}




function testFetch(){
   var data = {
       username: "admin", 
       password: "abc123456"
   }

  const userFetchApi = getGatewayFetchApi("user");

  userFetchApi.Post(
      '/api/v1/account/login', 
      {},
        {
            data: data,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        }
    ).then(responseData => {
        // 处理响应相关代码
        console.log(responseData);
        
    }).catch(err => {
        // 处理失败相关代码
        console.log(err)
    })
}

export {
    getGatewayFetchApi,
    testFetch,
}

export default getGatewayFetchApi;
