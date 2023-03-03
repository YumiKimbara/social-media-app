// mongooseはmongoDBを簡単に使えるようにするライブラリ
// MongoDBに対してより高度なクエリを発行したり、スキーマを定義したり、ビジネスロジックを実行したりすることができます。
import mongoose from "mongoose";

// データモデルのスキーマを定義
// 好きなプロパティを入れることができる。
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// postSchemaをもとにPostMessageモデルを作成
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
