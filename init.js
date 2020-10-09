import "./db";
// 이렇게 import 해주는 것만으로 db 연결 단계를 거친다. 왜냐면 import하면서 db.js를 읽기 때문.
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 4000;

const handleListening = () =>   console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT,handleListening);