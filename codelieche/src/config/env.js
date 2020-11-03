

// 发起fetch请求时候的url前缀
const apiBaseUrl = "http://127.0.0.1:8000";
//  发起api请求的超时时间
const apiFetchTimeout = 20000;

const gatewayApiBaseUrl = {
    "user": "http://127.0.0.1:8000",  // 用户模块的api
    "message": "http://127.0.0.1:8001",  // 消息模块的api
    "logs": "http://127.0.0.1:8002",  // 日志模块的api

    "workflow": "http://127.0.0.1:8006", // 工作流模块的api
    "cronjob": "http://127.0.0.1:8008", // 计划任务模块的api
}

export default {
    apiBaseUrl,
    apiFetchTimeout,
    gatewayApiBaseUrl,
}
