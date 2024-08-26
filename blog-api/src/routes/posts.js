const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/posts');
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');

const router = express.Router();

// User chỉ có thể xem bài viết
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Chỉ admin mới có thể thêm, chỉnh sửa và xóa bài viết
router.post('/', authenticateJWT, authorizeRoles('admin'), createPost);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updatePost);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deletePost);

module.exports = router;