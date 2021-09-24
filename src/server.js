import express from "express";
import loaders from "./utils/loader";

const startServer = async() => {
    const app = express();
    const { PORT } = process.env;
    let server = app.listen(PORT || 3221, (err) => {
        if (err) throw new Error(err);
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    await loaders(app);
};

startServer().then(r => console.log('server is live'));