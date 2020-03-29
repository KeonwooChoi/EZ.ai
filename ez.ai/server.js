var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.PORT || 5000; //5000포트 사용 react는 3000포트 proxy로 연결중
var cookieParser = require("cookie-parser");
var sequelize = require("./models").sequelize;

var app = express();
sequelize.sync();

//라우터 연결
var chatbotRouter = require("./routes/chatbot"); // 키워드 + 콘텐트 라우터
var imageRouter = require("./routes/image"); //이미지 라우터
var videoRouter = require("./routes/video"); //비디오 라우터
var audioRouter = require("./routes/audio"); //오디오 라우터
var fileRouter = require("./routes/file"); //파일 라우터

//수정,삭제 라우터 추가 

//var fileRouterPut = require("./routes/filePut"); //파일 수정 라우터
// var imageRouterPut = require("./routes/imagePut"); //이미지 라우터
// var videoRouterPut = require("./routes/videoPut"); //비디오 라우터
// var audioRouterPut = require("./routes/audioPut"); //오디오 라우터
// var fileRouterPut = require("./routes/filePut"); //파일 라우터

//삭제 라우터 추가 

//var fileRouterDel = require("./routes/fileDel"); //파일 수정 라우터
// var imageRouterDel = require("./routes/imageDel"); //이미지 라우터
// var videoRouterDel = require("./routes/videoDel"); //비디오 라우터
// var audioRouterDel = require("./routes/audioDel"); //오디오 라우터
// var fileRouterDel = require("./routes/fileDel"); //파일 라우터


//미들웨어 사용
app.use("/", express.static("objects"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//라우터 사용
app.use("/api/chatbotbuild", chatbotRouter); // 키워드 + 콘텐트
app.use("/api/image", imageRouter); //이미지
app.use("/api/video", videoRouter); //비디오
app.use("/api/audio", audioRouter); //오디오
app.use("/api/file", fileRouter); //파일

// 아직 에러 처리부분 없음
app.listen(port, () => console.log(`Listening on port ${port}`));
