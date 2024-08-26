const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5050;

app.use(bodyParser.json());

app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});