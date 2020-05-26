/**
 * UserCenter项目的Home.js
 * 左右布局：左侧为导航，右侧为主体内容
 */
import React, { useState, useEffect, useMemo } from "react";

import {
    Layout
} from "antd";

import PageHeader from "../Base/Header";
import LeftSider from "../Base/LeftSider";
import { GlobalContext } from "../Base/Context";

const Home = (props) => {
    // 状态
    // 主题: 其它地方可设置全局的主题
    const [globalTheme, setGlobalTheme] = useState("default");
    
    // 是否显示左右布局
    const [showLeftSider, setShowLeftSider] = useState(false);
    // 控制刷新导航菜单的操作，如果需要刷新左侧导航
    // const [refreshNavTimes, setRefreshNavTimes] = useState(0);

    useEffect(() => {
        // 从localStorage中获取数据
        let value = localStorage.getItem("showLeftSider");
        if(value === null){
            // 如果不存在，那么也设置显示左侧导航
            setShowLeftSider(true);
            return;
        }else if(value !== showLeftSider.toString()){
            setShowLeftSider(value === "true" ? true : false);
        }

        // 判断是不是首页：
    }, [showLeftSider])

    let leftSiderElement = useMemo(() => {
        if(showLeftSider){
            return (
                <LeftSider 
                    showLeftSider={showLeftSider} 
                    setShowLeftSider={setShowLeftSider}
                    defaultOpenKey={props.defaultOpenKey}
                />
            );
        }else{
            return null;
        }
    }, [props.defaultOpenKey, showLeftSider]);
   

    return (
        <GlobalContext.Provider value={
            {
                user: {},
                history: props.history,
                setGlobalTheme
            }
        }>
            <Layout className={`codelieche ${globalTheme}`}>
                <Layout.Header>
                    <PageHeader activeProject="user"/>
                </Layout.Header>
                <Layout className="left-right-layout">
                    {/* <Layout.Sider>
                        左侧内容
                    </Layout.Sider> */}
                    {leftSiderElement}
                    
                    <Layout.Content>
                        右侧内容
                        <div>
                            User Center Home Page!
                        </div>
                    </Layout.Content>
                </Layout>
            </Layout>
        </GlobalContext.Provider>
    )
}

export default Home;
