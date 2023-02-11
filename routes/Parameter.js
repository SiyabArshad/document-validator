const express = require('express');
const jwt = require('jsonwebtoken');
const Parameter=require("../models/Parameter")

const router = express.Router();

router.post('/parameters', authenticateToken, async (req, res) => {
  try {
    const parameterCollection = await Parameter.findOne({user:req.user.userId});
    if (!parameterCollection) return res.status(404).send('Parameter Collection not found');
    if (req.user.userId !== parameterCollection.user.toString()) return res.status(401).json('Unauthorized');
    if (req.body.fontSize) parameterCollection.fontSize = req.body.fontSize;
    if (req.body.lineSpacing) parameterCollection.lineSpacing = req.body.lineSpacing;
    if (req.body.fontName) parameterCollection.fontName = req.body.fontName;
    if (req.body.fontType) parameterCollection.fontType = req.body.fontType;
    await parameterCollection.save();
    return res.status(200).json(parameterCollection);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
router.post('/getparameters', authenticateToken, async (req, res) => {
  try {
    const parameterCollection = await Parameter.findOne({user:req.user.userId});
    if (!parameterCollection) return res.status(404).send('Parameter Collection not found');
    return res.status(200).json(parameterCollection);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.body.token;
  const token = authHeader;
  if (!token) return res.status(401).json('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json('Invalid Token');

    req.user = user;
    next();
  });
}

module.exports = router;
