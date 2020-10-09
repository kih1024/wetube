// init 첫줄에 호출
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
// 이런식으로 configuration을 할 수 있다. 많은 사람들이 몽고디비에서 기본적으로 쓰는 설정이기 때문에 알 필요는 없다.
// dotenv를 설치한 이유는 가끔 내가 어떤 부분을 숨겨놓고 싶기 때문. 예를 들어, 이런 코드의 URL로 부터 유저 데이터를 볼 수 있기 때문.
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = error => console.log(`❌ Error on DB Connection:${error}`);

// on() 메소드는 이벤트를 계속 연결한 상태를 유지하는 반면 once() 메소드는 한 번만 연결한다.
db.once("open", handleOpen);
db.on("error", handleError);
