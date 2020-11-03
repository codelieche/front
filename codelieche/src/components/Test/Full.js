/**
 * 测试页
 */
import React, { useContext, useEffect, useCallback, useState } from "react";

import { Button } from "antd";

import { GlobalContext } from "../Base/Context";


function TestFull(){

    const { setShowTopHeader, showLeftSider, setShowLeftSider, setRightNavData } = useContext(GlobalContext);

    const [toogleClick, setToogleClick] = useState(false);
    // 当前页面只设置一次全屏
    const [fullToogle, setFullToogle] = useState(true);

    const showLeftSiderToogle = useCallback((e) => {
        // console.log(e);
        e.preventDefault();
        e.stopPropagation();
        setShowLeftSider(prevState => !prevState);
        setToogleClick(prevState => !prevState);
    }, [setShowLeftSider]);

    useEffect(() => {
        setRightNavData(null);

        // 页面加载的时候，隐藏左侧导航
        if(showLeftSider === null || showLeftSider){
            console.log("开始：设置隐藏左侧导航");
            setShowLeftSider(false);
        }

        // if(fullToogle){
        //     setFullToogle(false);
        //     setShowLeftSider(false);
        // }

       
        
    }, [showLeftSider, setRightNavData, setShowLeftSider, fullToogle, setFullToogle])

    useEffect(() => {
         // 当页面离开的时候，要设置显示左侧导航
         return () => {
            if(!showLeftSider){
                console.log("结束Full， 设置显示左侧菜单");
                setShowLeftSider(true);
            }
        }
    }, [showLeftSider, setShowLeftSider])

    const setShowTopHeaderToogle = useCallback(() => {
        setShowTopHeader(preState => !preState);
    }, [setShowTopHeader]);

    return (
        <div className="content">
            <div className="header grey">
                <div className="title">
                    <h2>测试Full页</h2>
                </div>
            </div>

            <div className="main grey">
                This is test full page!{toogleClick.toString()}
                <Button type="primary" onClick={showLeftSiderToogle}>显示侧边栏</Button>

                <p style={{height: 200}}>
                    <Button type="primary" onClick={setShowTopHeaderToogle}>顶部开关</Button>
                </p>
            </div>
            <div className="footer">
                这个是底部的内容
            </div>
        </div>
    )
}
export default TestFull;
