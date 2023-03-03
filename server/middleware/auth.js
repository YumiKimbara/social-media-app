import jwt from "jsonwebtoken";

// middlewareはcontrollerに似ているが、引数にnextをとる。
// このmiddlewareはたとえばuserが何か投稿したいなどの場合に、まずこのmiddlewareを通し投稿する権利のあるユーザーかを判断する。
// 問題がなければ、next()へ行き投稿するcontrollerへと移行する。

const auth = async (req, res, next) => {
  try {
    // user controllerのtokenを取得する。
    const token = req.headers.authorization.split(" ")[1];

    //500を超えるならgoogle authである。
    const isCustomAuth = token.length < 500;

    let decodedData;

    // user IDを取得する
    if (token && isCustomAuth) {
      // "test"はuser controllerの第二引数と同じ文字列を入れる。
      decodedData = jwt.veryfy(token, "test");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
