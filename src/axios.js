import axios from "axios";
import {isEmptyObj, merge} from "@/utils";

const Axios = axios.create();

const baseConfigure = {
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 10000
}

Axios.interceptors.request.use(req => {
    return req;
}, err => {
    return Promise.reject(err);
})

Axios.interceptors.response.use(res => {
    return res;
}, err => {
    return Promise.reject(err)
})

/*
* Function : request
* Description : 封装后的axios，可以通过options配置项发送各种请求，也能通过bind来自动绑定变量赋值，
*               在获取到值后，你可以通过callback回调来取得请求数据。或者可以直接从组件自身获取（因为bind已绑定赋值）。
*               也就是说，获取数据有两种方式，一：回调函数，二：绑定值
* Params: options【必需】 --> 配置项添加。需要给请求添加配置项，例如method、url、params。
*         bind【可选】 --> 绑定变量值。给当前的组件示例this挂载变量并赋值，或存在变量仅赋值。如果不需要需要使用null占位。
*         callback【可选】 --> 回调函数。如果存在回调函数，则该回调函数的第一个参数就为请求数据。
* Return : 返回一个Promise对象，通过then可以获取数据。
* */
const request = async function (options, obj = {}, bind = null, callback = null) {
    options = requestMiddleWare(options, obj) || {}; // 统一请求参数设定
    merge(options, baseConfigure); // 合并配置项
    const res = await Axios(options); // 发出ajax请求
    !!bind && (this[bind] = res.data);  // 为this上的某个变量绑定值
    typeof callback === "function" && callback(res); // 如果有回调，就将值传入回调并使用回调函数
    return res;
};

function requestMiddleWare(options, obj) {
    if (!options["method"] || isEmptyObj(obj)) return options;
    let str = "data";
    ["get", "delete"].includes(options["method"]) && (str = "params");
    options[str] = obj;
    return options;
}

export default request

