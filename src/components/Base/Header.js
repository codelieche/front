/**
 * 网站头部
 */
import React, { useState, useEffect, useMemo } from "react";
import { UserLoginOrInfo } from "./User";


const Header = ({activeProject}) => {
    // 项目列表
    const [ projects, setProjects ] = useState([]);
    // 当前的项目
    // const [ activeProject, setActiveProject ] = useState("user");

    useEffect(() => {
        setProjects([
            {
                name: "项目",
                key: "project",
            },
            {
                name: "计划任务",
                key: "cronjob",
            },
            {
                name: "工作流",
                key: "workflow",
            },
            {
                name: "用户中心",
                key: "user"
            }
        ])
    }, [])

    let projectsNav = useMemo(() => {
        return projects.map((item, index) => {
            return (
                <li className={item.key === activeProject ? "active" : ""} key={index}>
                    <a href={`/${item.key}`}>
                        {item.name}
                    </a>
                </li>
            )
        })
    }, [projects, activeProject])


    return (
        <div className="header">
            <div className="logo">
                <img src="http://127.0.0.1:9000/static/image/logo-blue.svg" alt="Logo"/>
            </div>
            <ul className="projects">
                {projectsNav}
            </ul>
            <div className="right">
                {/* 用户信息 */}
                <div className="user">
                    {/* 用户登录信息 */}
                    <UserLoginOrInfo />
                </div>
            </div>

        </div>
    )
}

export default Header;