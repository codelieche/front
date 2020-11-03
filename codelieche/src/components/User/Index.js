/**
 * 用户相关的首页
 */
import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";


import UserLogout from "./Logout";


function UserIndex(props){
    return (
        <Switch>
            <Route exat path="/user/logout" component={UserLogout} />
            <Route exat path="/user/exit" render={ () => <Redirect to="/user/logout" push={false} />} />
        </Switch>
    )
}

export default UserIndex;
