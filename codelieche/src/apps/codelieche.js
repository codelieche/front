/**
 * 前端代码App主入口
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// 各个组件
import GlobelHome from "../components/Home";
import Login from "../components/User/Login";
import UserSignUp from "../components/User/SignUp";
import UserChangePassword from "../components/User/ChangePassword";
import NoMatch from "../components/Base/NoMatch";

function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact={true} path="/user/login" component={Login} />
                <Route exact={true} path="/user/signup" component={UserSignUp} />
                <Route exact={true} path="/user/change/password" component={UserChangePassword} />

                <Route exact={true} path="/" component={GlobelHome} />

                <Route
                    path="/user"
                    render={props => <GlobelHome defaultOpenKey="/user" {...props} />}
                />

                <Route
                    path="/test"
                    render={props => <GlobelHome defaultOpenKey="/test" {...props} />}
                />

                {/* 这个一定要放最后面 */}
                <Route component={NoMatch} />
            </Switch>
        </Router>
    )
}

export default App;