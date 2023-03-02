import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

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

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match" });

    // bcryptを使用しパスワードをハッシュ化するので、パスワードの安全性を高めることができる。
    // 2つ目の引数は、ソルトといい、パスワードのハッシュ値を生成するために使用されるランダムなデータのことで、
    // ハッシュの強度を増すために必要。2つ目の引数の値が大きいほど、ハッシュを計算するために必要な時間が長くなるが、ハッシュの強度も高くなる。
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      // このtestという文字列はsecret key
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
