import * as api from "../api";

// actionを返す関数を作成する。
// async(dispatch)の部分はredux-thunkから来ている。
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    // redux thunkの書き方。dispatch内がactionの内容
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }

  // 普通のreduxの場合の書き方
  // const action = { type: "FETCH_ALL", payload: [] };
  // return action;
};
