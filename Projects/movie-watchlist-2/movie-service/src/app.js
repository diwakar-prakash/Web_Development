import express from "express";

import router from "./routes/movie.routes.js";

const app = express();

app.use(express.json());
app.use('/uploads/posters', express.static('uploads/posters'))

app.use('/api/admin', router);


export default app;