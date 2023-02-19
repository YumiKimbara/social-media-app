// 現在のNodeのversionではrequireではなくimport文で下記を使用できる
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

// postRoutesのroutesは全てlocalhose:3333/postsになるように設定する。
app.use("/posts", postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// リアルなアップではこの情報はcredential
const CONNECTION_URL =
  "mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.bhhad.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3333;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
