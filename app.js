const express = require("express");
const app = express();
const router = express.Router();

const db = require("./db");
const Task = require("./tablo");

db.then(() => {
  console.log("MongoDB bağlantısı başarılı.");
}).catch((err) => {
  console.log("MongoDB bağlantısı başarısız. Hata: ", err);
});

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.send(task);
  } catch (err) {
    console.log(err);
  }
});
router.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find().sort({ precedence: 1 });
    res.send(task);
    console.log(task);
  } catch (err) {
    console.log(err);
  }
});
router.get("/tasks/name/:name", async (req, res) => {
  try {
    const task = await Task.findOne({ name: req.params.name });
    res.send(task);
    console.log(task);
  } catch (err) {
    console.log(err);
  }
});
router.get("/tasks/category/:category", async (req, res) => {
  try {
    const task = await Task.find({ category: req.params.category });
    res.send(task);
    console.log(task);
  } catch (err) {
    console.log(err);
  }
});
router.post("/tasks/delete/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send("Silme işlemi başarılı.");
    console.log(task);
  } catch (err) {
    console.log(err);
  }
});

router.get("/tasks/lastupdate", async (req, res) => {
  try {
    const task = await Task.find().sort({ updatedAt: -1 });
    res.send(task);
    console.log("tarih sıralamasına göre son güncellenme sırası");
  } catch (err) {
    console.log(err);
  }
});
router.post("/tasks/updateStatus/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.send("Güncelleme işlemi başarılı.");
    console.log(task);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => {
  res.send("Ana sayfaya hoş geldiniz.");
});

app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server çalışıyor...");
});
