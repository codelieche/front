/**
 * 页面主体
 */
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import loadable from '@loadable/component';

import { Layout } from "antd";

import { GlobalContext } from "../Base/Context";
import Breadcrumb from "../Page/Breadcrumb";

// 动态加载
const UserIndex = loadable(() => import("../User/Index"));
const TestIndex = loadable(() => import("../Test/Index"));

function PageContainer(props){

    const { rightNavData } = useContext(GlobalContext);

    return (
        <Layout.Content className="container">
            <div className="header">
                <Breadcrumb data={rightNavData} />
            </div>
            <Switch>
                {/* container里面的css类主要是：content > [header|main|foooter] */}
                {/* 用户中心页面 */}
                <Route path="/user" component={UserIndex} location={props.location}/>

                {/* 测试页 */}
                <Route path="/test" component={TestIndex} location={props.location}/>
            </Switch>
        </Layout.Content>
    )
}

export default PageContainer;