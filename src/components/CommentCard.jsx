import React from "react";
import { useComments } from "../features/comments/hooks";

const CommentCard = ({ comment }) => {
    const { removeComment, like, dislike } = useComments();
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="border p-4 mb-2 rounded">
            <p><strong>{comment.user.name}</strong>:</p>
            <p>{comment.text}</p>
            <div className="flex space-x-4 mt-2">
                <button onClick={() => like(comment._id)}>👍 {comment.likes.length}</button>
                <button onClick={() => dislike(comment._id)}>👎 {comment.dislikes.length}</button>
                {user && user._id === comment.user._id && (
                    <button onClick={() => removeComment(comment._id)} className="text-red-500">
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default CommentCard;
