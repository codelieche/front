/**
 * 主页
 */
import React, { useState, useEffect, useContext, useMemo } from "react";

import {
    Layout
} from "antd";

import {GlobalContext} from "./Base/Context";

import Header from "./Base/Header";
import LeftSider from "./Base/LeftSider";
import PageContainer from "./Base/Container";


function GlobalHome(props){
    // 是否显示Header
    const [showTopHeader, setShowTopHeader ] = useState(true);

    // 是否显示左侧导航
    const [showLeftSider, setShowLeftSider ] = useState(true);

    // 右侧的导航面包屑数据
    const [rightNavData, setRightNavData] = useState(null);


    // 根据pathname控制是否：显示/因此左侧的菜单导航
    // 缺点：全屏页，不能控制其为非全屏了
    // 另外可页面单独控制是否全屏：参考：/test/full页面
    // 改进：如果showLeftSider是null就初始化设置
    // useEffect(() => {
    //     let pathname = props.location.pathname;
    //     // 用这种方式来确定是否渲染全屏，性能可能不优，但是可以防止全屏页获取menu数据后依然设置状态
    //     // 用这种方式就控制简单，什么网址全屏，什么网址不全屏
    //     // 如果在各自的页面控制呢，就一定要配置很好，组件卸载的时候，要设置显示左侧导航菜单为true
    //     // 问题点是：当直接访问全屏的页面，LeftNav.js中可能报错，说在一个unmount的组件中setState
    //     let fullPagePathnameArray = ["/test/full22", "/test/full2"];
    //     if(fullPagePathnameArray.indexOf(pathname) >= 0){
    //         // 需要全屏的页面
    //         if(showLeftSider === null){
    //             setShowLeftSider(false);
    //         }
    //     }else{
    //         // 需要显示左侧导航菜单的页面
    //         if(showLeftSider === null){
    //             setShowLeftSider(true);
    //         }
    //     }
    // }, [props.location.pathname, showLeftSider, setShowLeftSider])


    return (
        <GlobalContext.Provider value={
            {
                showTopHeader: showTopHeader,         // 是否显示顶部头部
                setShowTopHeader: setShowTopHeader,   // 设置显示顶部头部
                showLeftSider: showLeftSider,         // 显示左侧导航菜单
                setShowLeftSider: setShowLeftSider,   // 设置显示左侧导航菜单
                rightNavData: rightNavData,           // 右侧导航面包屑数据
                setRightNavData: setRightNavData,     // 修改右侧的导航数据
            }
        }>
            <Home {...props} />
        </GlobalContext.Provider>
    )
}


function Home(props) {
    // 是否显示Header,是否显示左侧导航
    const { showTopHeader, showLeftSider } = useContext(GlobalContext);

    // 头部内容
    const topHeaderElement = useMemo(() => {
        if(showTopHeader){
            return (
                <Layout.Header className="header">
                    <Header />
                </Layout.Header>
            );
        }else{
            return null;
        }
    }, [showTopHeader]);

    // 左侧导航菜单
    const leftSiderElement = useMemo(() => {
        // console.log("left sider element");
        if(showLeftSider){
            return (
                <LeftSider defaultOpenKey={props.defaultOpenKey} />
            );
        }else{
            return null;
        }
       
    }, [showLeftSider, props.defaultOpenKey])

    // 页面主体内容
    const containerElement = useMemo(() => {
        return <PageContainer {...props} />
    }, [props])

    return (
        <Layout className="body">
            {/* 页面顶部内容 */}
            {topHeaderElement}
            <Layout>
                {/* 左侧导航 */}
                {leftSiderElement}
                <Layout.Content>
                    {/* 页面主体内容 */}
                    {containerElement}
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default GlobalHome;
