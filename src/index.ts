import dotenv from "dotenv";
import { instanceApp } from "./app";
import { connectDatabase } from "./db";
import { initFirebase } from "./notifications";

const main = async () => {
  dotenv.config();
  try {
    await connectDatabase();
    const app = instanceApp();
    
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
      initFirebase();
    });
  } catch (e) {
    console.log(e);
  }
};

main();
