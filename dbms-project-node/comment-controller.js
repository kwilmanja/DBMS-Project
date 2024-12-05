import pool from "./pool.js";

const CommentController = (app) => {

    const getStoryComments = async (req, res) => {
        const storyId = req.params.storyId;
        pool.query('select * from comment where story_id = ?;',
            [storyId], (err, results) => {
                if (err) {
                    console.error('Error finding story:', err);
                    res.status(500).json({ error: 'Failed to find story' });
                    return;
                } else {
                    res.json(results);
                }
            });
    };

    const createComment = async (req, res) => {
        let currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(500).json({ error: 'Not signed in' });
            return;
        }
        const username = currentUser.username;
        const text = req.body.text;
        const storyId = req.body.story_id;
        pool.query('insert into comment (username, story_id, text) values (?, ?, ?);',
            [username, storyId, text], (err, results) => {
                if (err) {
                    console.error('Error creating comment:', err);
                    res.status(500).json({ error: 'Failed to create comment' });
                    return;
                } else {
                    res.json(results);
                }
            });
    };

    const updateComment = async (req, res) => {
        let currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(500).json({ error: 'Not signed in' });
            return;
        }
        const username = currentUser.username;
        const text = req.body.text;
        const storyId = req.body.story_id;
        const commentId = req.body.id;
        pool.query('update comment set text = ? where username = ? and story_id = ? and id = ?;',
            [text, username, storyId, commentId], (err, results) => {
                if (err) {
                    console.error('Error updating comment:', err);
                    res.status(500).json({ error: 'Failed to update comment' });
                    return;
                } else {
                    res.json(results);
                }
            });
    };

    const deleteComment = async (req, res) => {
        let currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(500).json({ error: 'Not signed in' });
            return;
        }
        const username = currentUser.username;
        const commentId = req.params.commentId;
        pool.query('delete from comment where username = ? and id = ?;',
            [username, commentId], (err, results) => {
                if (err) {
                    console.error('Error deleting comment:', err);
                    res.status(500).json({ error: 'Failed to delete comment' });
                    return;
                } else {
                    res.json(results);
                }
            });
    };

    const getStoryLikes = async (req, res) => {
        const storyId = req.params.storyId;
        pool.query('select * from likes where story_id = ?;',
            [storyId], (err, results) => {
                if (err) {
                    console.error('Error finding story:', err);
                    res.status(500).json({ error: 'Failed to find story' });
                    return;
                } else {
                    res.json(results);
                }
            });
    };

    const createLike = async (req, res) => {
        let currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(500).json({ error: 'Not signed in' });
            return;
        }
        const username = currentUser.username;
        const storyId = req.params.storyId;
        pool.query('insert into likes values (?, ?);',
            [username, storyId], (err, results) => {
                if (err) {
                    console.error('Error creating like:', err);
                    res.status(500).json({ error: 'Failed to create like' });
                    return;
                } else {
                    res.json(results);
                }
            });
    };

    const deleteLike = async (req, res) => {
        let currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(500).json({ error: 'Not signed in' });
            return;
        }
        const username = currentUser.username;
        const storyId = req.params.storyId;
        pool.query('delete from likes where username = ? and story_id = ?;',
            [username, storyId], (err, results) => {
                if (err) {
                    console.error('Error deleting like:', err);
                    res.status(500).json({ error: 'Failed to delete like' });
                    return;
                } else {
                    res.json(results);
                }
            });
    };

    app.get("/api/comments/:storyId", getStoryComments);
    app.post("/api/comments/create", createComment);
    app.put("/api/comments/update", updateComment);
    app.delete("/api/comments/delete/:commentId", deleteComment);

    app.get("/api/likes/:storyId", getStoryLikes);
    app.post("/api/likes/create/:storyId", createLike);
    app.delete("/api/likes/delete/:storyId", deleteLike);

};
export default CommentController;

