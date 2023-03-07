import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
import * as api from "../api";

// actionを返す関数を作成する。（Action Creatorの作成）
// async(dispatch)の部分はredux-thunkから来ている。
// dispachはReduxストアにアクションを送信し状態を更新することができる関数。
// Reduxは、純粋な関数のみを許可して状態を変更するため、副作用をRedux内で使用してはいけない。
// 非同期処理は副作用を持つため、Redux-Thunkなどのミドルウェアを使用する必要がある。
// useStateなどのreact hooksももちろんredux内で使ってはいけない。
export const getPosts = () => async (dispatch) => {
  try {
    // HTTPリクエストをし、APIから投稿データを取得する。
    const { data } = await api.fetchPosts();

    // redux thunkの書き方。dispatch内がactionの内容
    // dispatch関数を使って取得したデータをReduxストアに送信する。
    // これによりFETCH_ALL アクションがディスパッチされ、ペイロードとして取得したデータが渡される。
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    console.log("data!", data);

    dispatch({ type: UPDATE, payloda: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    // const { data } = await api.likePost(id);
    const data = await api.likePost(id);
    console.log("data", data);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
