/**
 * 测试页
 */
import React, {useEffect, useContext } from "react";

import { Button } from "antd";

import { GlobalContext } from "../Base/Context";

function Page(props){

    // 设置右侧内容顶部的导航面包屑
    const { setRightNavData } = useContext(GlobalContext);

    useEffect(() => {
        setRightNavData([
            {title: "首页", icon: "home", link: "/"},
            {title: "测试", icon: null, link: "/test/test"},
            {title: "Page"},
        ])
    }, [setRightNavData])

    return (
        <div className="content">
            <div className="header">
                <div className="title">
                    <h2>测试Page页</h2>
                </div>
                {/* <div className="title">
                    <h4>测试Page页</h4>
                </div> */}
            </div>
            <div className="main">
                This is test page!
                <Button type="primary">Page</Button>

                <p style={{height: 1000}}></p>
                <p style={{height: 1000}}></p>
                <p style={{height: 1000}}></p>
            </div>
            <div className="footer">
                这个是底部的内容
            </div>
        </div>
    );
}
export default Page;
