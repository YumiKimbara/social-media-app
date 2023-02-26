import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { GoogleOAuthProvider } from "@react-oauth/google";

import reducers from "./reducers";

import App from "./App";
import "./index.css";

// configureStoreを使用して、Reduxストアを構成する。
// 第一引数にreducerをとる。
// composeは複数のミドルウェアを適用することができる。
// applyMiddlewareはストアにミドルウェアを適用するための関数(ここではthunkミドルウェア)
const store = configureStore(
  { reducer: reducers },
  compose(applyMiddleware(thunk))
);

// ProviderはReduxストアをReactアプリケーション全体で利用可能にする。
ReactDOM.render(
  <GoogleOAuthProvider clientId="83618908195-n791vs5jgeqbalhvavmgqect4umnd6sq.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
