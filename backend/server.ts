import app from "./src/app";
import { config } from "dotenv";
import { connectDB } from "./src/config/connection";
config();

connectDB();

const PORT = process.env.PORT || 3000;
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
