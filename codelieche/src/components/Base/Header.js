/**
 * 顶部头部
 */
import React, {useState, useEffect, useCallback } from "react";
import {
    Link
} from "react-router-dom";
import {
    Menu,
    Dropdown
} from "antd";

import fetchApi from "../Utils/fetchApi";
import Icon from "./Icon";

function UserLoginOrInfo(props){
    // 用户是否登录
    const [ isLogined, setIsLogined ] = useState(false);
    const [ userInfo, setUserInfo ] = useState({username: "游客"});

    // 不同系统需要不同的check login函数
    const checkLoginFunc = useCallback(() => {
        const url = "/api/v1/account/login";
        fetchApi.Get(url)
        .then(data => {
          // console.log(data);
          if(data && data.logined){
              setIsLogined(true);
              setUserInfo({username: data.username});
              
          }else{
            setIsLogined(false);
            setUserInfo({username: ""});
          }
        })
          .catch(err => console.log(err))
    }, [setIsLogined, setUserInfo]);

    useEffect(() => {
        checkLoginFunc();
    }, [checkLoginFunc])

    // 判断是否登录
    if(isLogined){
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/user/center">
                        <Icon type="user-circle"> 用户中心</Icon>
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link to="/user/message">
                        <Icon type="envelope-o"> 消息中心</Icon>
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link to="/user/logout">
                        <Icon type="sign-out"> 退出登录</Icon>
                    </Link>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} className="userinfo">
                <span style={{display: "inline-block"}}>
                    <Icon type="user-o"></Icon> Hi ~ {userInfo.username}
                </span>
            </Dropdown>
        );
    }else{
        // 未登录
        return (
            <Link to="/user/login">
                {/* <Button type="default">登录</Button> */}
                <Icon type="sign-in"></Icon>登录
            </Link>
        );
    }
}

/**
 * 头部组件
 * @param {*} props 
 */
function Header(props) {
    return (
        <div>
            <Link to="/" className="logo">
                <img src="http://127.0.0.1:8000/static/images/logo.svg" alt="首页" />
            </Link>

            <ul className="nav">
                <li>
                    <div className="link">关于我们</div>
                </li>

                {/* 显示登录/退出登录信息 */}
                <li className="user">
                    <UserLoginOrInfo />
                </li>
            </ul>
            
        </div>
    );
}

export default Header;
