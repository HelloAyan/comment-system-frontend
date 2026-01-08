import React, { useEffect } from "react";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";
import { useComments } from "../features/comments/hooks";

const Dashboard = () => {
    const { items, loading, loadComments } = useComments();

    useEffect(() => {
        loadComments();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-2xl mb-4">Dashboard</h1>
            <CommentForm />
            {loading ? <p>Loading...</p> : items.map(c => <CommentCard key={c._id} comment={c} />)}
        </div>
    );
};

export default Dashboard;
