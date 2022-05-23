import dotenv from "dotenv";
import { instanceApp } from "./app";
import { connectDatabase } from "./db";

const main = async () => {
  dotenv.config();
  try {
    await connectDatabase();
    const app = instanceApp();
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

main();
