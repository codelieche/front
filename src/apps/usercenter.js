/**
 * 前端代码App主入口
 */
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

// 引入各个组件
import Home from "../components/usercenter/Home";

function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    )
}

export default App;
