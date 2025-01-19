const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/:articleId', async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
