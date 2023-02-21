import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import reducers from "./reducers";

import App from "./App";

// configureStoreを使用して、Reduxストアを構成する。
// 第一引数にreducerをとる。
// composeは複数のミドルウェアを適用することができる。
// applyMiddlewareはストアにミドルウェアを適用するための関数(ここではthunkミドルウェア)
const store = configureStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  // ProviderはReduxストアをReactアプリケーション全体で利用可能にする。
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
