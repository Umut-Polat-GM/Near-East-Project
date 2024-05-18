require("dotenv").config();
require("express-async-errors");

const cors = require("cors");

const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

const mainRouter = require("./routes/routes");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());

// app.use("/", (req, res) => {
//     res.send("<h1>Near East API</h1>");
// });

app.use("/api/v1", mainRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};



start();
