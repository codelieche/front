/**
 * 测试页
 */
import React, { useContext, useEffect } from "react";

import { Button } from "antd";

import { GlobalContext } from "../Base/Context";

import getGatewayFetchApi from "../Utils/gateway";


function Test(props){

    const { setRightNavData } = useContext(GlobalContext);

    useEffect(() => {
        setRightNavData([
            {title: "首页", icon: "home", link: "/"},
            {title: "测试", icon: null, link: "/test/"},
            {title: "Test"},
        ])
    }, [setRightNavData])

    useEffect(() => {
        // 获取2个模块的fetchApi,然后发起请求
        const userFetchApi = getGatewayFetchApi("user");
        const messageFetchApi = getGatewayFetchApi("message");
        // console.log(userFetchApi, messageFetchApi);

        userFetchApi.Get("/api/v1/account/info")
          .then(data => {
              console.log(data);
          })
            .catch(err => console.log(err));

        messageFetchApi.Get("/api/v1/account/info")
          .then(data => {
              console.log(data);
           })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="content">
            <div className="header">
                <div className="title">
                    <h2>测试页</h2>
                </div>
            </div>
            <div className="main grey">
                This is test page!
                <Button type="primary" size="small">Test Page</Button>

                <p style={{height: 500}}></p>
            </div>
            <div className="footer">
                这个是底部的内容
            </div>
        </div>
    )
}
export default Test;
