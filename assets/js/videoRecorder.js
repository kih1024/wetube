const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  // a 링크를 임시로 만들어서 URL을 현재 URL/videoFile(blob 파일) 인 링크를 만들고 download 파일 이름을 정해주고 링크를 추가해 fake click을 해주면 다운로드가 된다.
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  // eslint-disable-next-line no-use-before-define
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
  // MediaRecorder 스트림을 record 할수 있게 해준다. 단 레코딩 데이터는 레코딩이 단 끝나야 얻을수 있다. 왜냐하면 MediaRecorder는 디폴트로 한번에 모든걸 저장하기 때문이다. 그래서 dataavailable 이벤트는 레코딩이 멈췄을때 호출이 일어나 저장이 일어난다. 이때 데이터를 얻을 수 있다.
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "☹️ Cant record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
