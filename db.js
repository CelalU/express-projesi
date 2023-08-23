const mongoose = require("mongoose");

// Connect to MongoDB
const Connect = mongoose.connect("mongodb://localhost:27018/proje", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = Connect;
