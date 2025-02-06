const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/categories", require("./routes/categories"))
app.use("/products", require("./routes/products"))
app.use("/users", require("./routes/users"))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

