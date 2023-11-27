let express = require("express");
let app = express();
let PORT = process.env.PORT || 3000;
let path = require("path");
const store = require("store");

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
let createPath = (page) => path.join(__dirname, "views", `${page}.ejs`);

app.get("/", (req, res) => {
  res.render(createPath("index"));
});

app.get("/add-post", (req, res) => {
  res.render(createPath("add-post"));
});

app.post("/add-post", (req, res) => {
  console.log(req.body);
  let { title, author } = req.body;
  const prevPosts = store.get("posts") || [];
  const posts = [...prevPosts, { title, author }];

  store.set("posts", posts);

  res.send(posts);
});

app.get("/posts", (req, res) => {
  const posts = store.get("posts") || [];
  res.render(createPath("posts"), { posts });
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}...`);
});
