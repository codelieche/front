/**
 * 测试首页
 */
import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

// Test相关的组件
import Page from "./Page";
import Test from "./Test";
import Full from "./Full";

function TestIndex(props) {

    return (
        <Switch>
            <Route exat path="/test/test" component={Test} />
            <Route exat path="/test/page" component={Page} />
            <Route exat path="/test/full" component={Full} />
            <Route exat path="/test" render={() => <Redirect to="/test/test" push={false} />} />
        </Switch>
    )
}

export default TestIndex;
