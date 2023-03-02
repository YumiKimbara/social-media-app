import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    // bcryptを使用しパスワードをハッシュ化するので、パスワードの安全性を高めることができる。
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credential." });

    // emailとid情報を含んだtokenをjwtを使い生成する。
    // サーバーがJWTを生成し、トークンをクライアントに送信することで、サーバーはユーザーが認証されていることを確認し、クライアントはそのトークンを使用して、アプリケーションの機能にアクセスできる。
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      // このtestという文字列はsecret key
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
