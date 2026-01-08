import React, { useState } from "react";
import { useComments } from "../features/comments/hooks";

const CommentForm = () => {
    const [text, setText] = useState("");
    const { createComment } = useComments();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        createComment(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <textarea
                className="border p-2 w-full"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Add Comment
            </button>
        </form>
    );
};

export default CommentForm;
