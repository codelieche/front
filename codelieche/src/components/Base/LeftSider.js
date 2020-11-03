/**
 * 页面左侧的导航
 */
import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Resizable } from 'react-resizable';

import Icon from "./Icon";
import LeftNav from "./LeftNav";

function LeftSider(props){
    // 导航是否收缩
    const [ collapsed, setCollapsed ] = useState(null);

    // 初始化的宽度
    let widthInit = useMemo(() => {
        // 从localStorage中获取宽度
        let widthValue = localStorage.getItem("leftSiderWidth");

        let result = parseInt(widthValue);
        // console.log(widthValue, isNaN(widthValue), typeof widthValue, result);
        if(result){
            return (result >= 156 && result <= 460) ? result : 200;
        }else{
            return 200;
        }
    }, []);

    // 左侧导航的宽度
    const [width, setWidth] = useState(widthInit);

    useEffect(() => {
        // 组件要卸载的时候，存储一下宽度
        return () => {
            localStorage.setItem("leftSiderWidth", width);
        }
    }, [width])

    // 当左侧边栏大小变更的时候
    const onResize = useCallback((event, { element, size }) => {
        // console.log(size.width);
        if(!collapsed){
            // 左边栏最小156px；最大460px；
            if(size.width < 156){
                setWidth(156);
                return;
            }

            if(size.width <= 460){
                setWidth(size.width);
                // 组件要卸载的时候才保存，如果每次保存会影响性能
            }else{
                setWidth(460);
            }
        }else{
            // 折叠是不可修改宽度的
        }
        
      }, [setWidth, collapsed]);

    // 导航收缩开关
    const handleCollapsedToogle = useCallback(() => {
        setCollapsed(prevState => !prevState);
    }, [setCollapsed])

    // 保存收缩信息
    useEffect(() => {
        // 从localStorate中获取数据
        // console.log(collapsed);
        if(collapsed === null){
            let value = localStorage.getItem("leftSiderNavCollapsed");
            if(value === null){
                // 如果不存在，那么也设为显示侧边栏
                setCollapsed(false);
            }else{
                setCollapsed(value === "true" ? true : false);
            }
        }
        localStorage.setItem("leftSiderNavCollapsed", collapsed);

        return () => {
            // 写入localStorate中
            localStorage.setItem("leftSiderNavCollapsed", collapsed);
        }
    }, [collapsed])

    const resizeHandleEle = useMemo(() => {
        if (collapsed){
            return (
                <span className="react-resizable-handle disabled"></span>        
            );
        }else{
            return (
                <span className="react-resizable-handle"></span>        
            );
        }
    }, [collapsed])

    return (
        <Resizable className={collapsed ? "left-sider collapsed" : "left-sider"}
          axis="x" height={0}
          width={width} 
          onResize={onResize}
          handle={resizeHandleEle}
        >
            <Layout.Sider style={{}} width={collapsed ? 64 : width}>
                {/* 底部 */}
                <div className="header" >
                    {/* <div className="title">
                        用户中心
                    </div> */}
                    <div className="collapsed-toogle" onClick={handleCollapsedToogle}>
                        <Icon type={collapsed ? "indent" : "outdent"} />
                    </div>
                </div>
                <div className="content">
                    <LeftNav collapsed={collapsed} defaultOpenKey={props.defaultOpenKey} />
                </div>
                {/* <div className="footer">
                    <div className="title">
                        用户中心
                    </div>
                </div> */}
            </Layout.Sider>
        </Resizable>
    );

}

export default LeftSider;