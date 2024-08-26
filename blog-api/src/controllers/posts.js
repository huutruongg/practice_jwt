const posts = require('../db.json').posts;

const getAllPosts = (req, res) => {
    res.json(posts);
};

const getPostById = (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }
    res.json(post);
};

const createPost = (req, res) => {
    const newPost = {
        id: posts.length + 1,
        ...req.body,
        authorId: req.user.id
    };
    posts.push(newPost);
    res.status(201).json(newPost);
};

const updatePost = (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }

    posts[postIndex] = { ...posts[postIndex], ...req.body };
    res.json({ message: 'Cập nhật bài viết thành công' });
};

const deletePost = (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }

    posts.splice(postIndex, 1);
    res.json({ message: 'Xóa bài viết thành công' });
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};