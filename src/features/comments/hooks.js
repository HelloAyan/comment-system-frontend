import { useDispatch, useSelector } from "react-redux";
import {
    fetchComments,
    addComment,
    deleteComment,
    likeComment,
    dislikeComment
} from "./commentSlice";

export const useComments = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.comments);

    const loadComments = (params) => dispatch(fetchComments(params));
    const createComment = (text) => dispatch(addComment(text));
    const removeComment = (id) => dispatch(deleteComment(id));
    const like = (id) => dispatch(likeComment(id));
    const dislike = (id) => dispatch(dislikeComment(id));

    return { items, loading, error, loadComments, createComment, removeComment, like, dislike };
};
