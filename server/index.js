// 現在のNodeのversionではrequireではなくimport文で下記を使用できる
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

// このミドルウェア関数は、POST、PUT、PATCHなどのHTTPリクエストでJSONデータを解析するために使用されます。
// リクエストボディからJSONを解析して、JavaScriptオブジェクトに変換します。
// limitは受け入れ可能なリクエストボディの最大サイズを30MBに設定
// extendedをtrueにすると、JSON以外の形式のリクエストボディも解析する
// HTTPリクエストは、クライアントがサーバーに対して送信するデータです。HTTPリクエストは、リクエストライン、ヘッダー、ボディの3つの部分から構成されます。
// ボディ部分にはHTMLフォームから送信されたデータ、JSONデータ、画像データなどのクライアントから送られたデータが入っている。
// データを解析することを「パースする」と呼び、bodyParserはクライアントが送信したデータを解析して、サーバーで処理するために使用できる形式に変換してくれる。
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// このミドルウェア関数も、POST、PUT、PATCHなどのHTTPリクエストでデータを解析するために使用されます。
// しかし、この場合はJSONではなく、urlエンコードされたデータを解析するために使用されます。(フォームからのデータ送信の時などに使用される。)
// リクエストボディからurlエンコードされたデータを解析して、JavaScriptオブジェクトに変換します。
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// セキュリティ上の理由から、Webブラウザーは、アプリケーションのドメインと異なるドメインからのリクエストを制限しています。
// CORSは、Webブラウザーに、異なるドメインからのリクエストを許可するための仕組みを提供します。
// 引数がないため、すべてのドメインからのリクエストを受け入れるように設定されています。
app.use(cors());

// app.useでミドルウェア関数を登録
// postRoutesのroutesは全てlocalhose:3333/postsになるように設定する。
// postsへのリクエストがpostRoutesで定義されたルートにルーティングされるようになります。
// routesの設定はcors文の後に記載しないとエラーになるので注意
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// リアルなアップではこの情報はcredential
// const CONNECTION_URL =
//   "mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.bhhad.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3333;

// MongoDBへの接続する。
// 第一引数には、接続先のURLを渡し、第二引数にはオプションを渡します。
// MongooseのconnectメソッドはPromiseを返すので、その後の処理もthenの後に記載する。
mongoose
  .connect(process.env.CONNECTION_URL, {
    // MongooseがMongoDBのURLを解析するために使用するURLパーサーの設定
    useNewUrlParser: true,
    // MongooseはMongoDBの新しいトポロジー管理エンジンを使用して接続を試みます。これにより、複数のmongodプロセスを使用する場合でも、より安定した接続が確立されるようになります。
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// Mongoose v5以降で標準で無効になったメソッドたちを呼ばないように設定する。
mongoose.set("useFindAndModify", false);
