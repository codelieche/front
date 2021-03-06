import React from 'react';
import ReactDOM from 'react-dom';
import App from './apps/codelieche';
import * as serviceWorker from './serviceWorker';

// 引入样式文件
import './styles/main.less';
import "./styles/font-awesome.min.css";

ReactDOM.render(
  <App />,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
