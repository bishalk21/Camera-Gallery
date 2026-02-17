// let video = document.querySelector("video");
let videoPlayer = document.getElementById("video-player");
// console.log(videoPlayer);

let recorder; // variable to hold the MediaRecorder instance
let recordBtnContainer = document.querySelector(".record-btn-container");
let captureBtnContainer = document.querySelector(".capture-btn-container");
let recordBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false; // flag to track recording state
let timerId; // variable to hold the timer ID for recording duration

let chunks = []; // array to store recorded video data chunks

// 2. getUserMedia takes a constraints object as an argument, which specifies the types of media we want to access (e.g., video, audio).
let constraints = { video: true, audio: true };

// 1. Access the user's camera and microphone using the getUserMedia API
// navigator - global object that provides access to browser features and APIs
// mediaDevices - provides access to media input devices like cameras and microphones
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  // 3. If the user grants permission,
  // we receive a MediaStream object containing the video and audio tracks.
  // console.log(stream);
  // 4. We can then set the srcObject of a video element to the MediaStream to display the live video feed.
  videoPlayer.srcObject = stream;
  // 5. To record the video, we can use the MediaRecorder API,
  // which allows us to capture the media stream and save it as a file.
  recorder = new MediaRecorder(stream);
  // 7. The MediaRecorder API emits dataavailable events containing chunks of recorded video data,
  // which we can store in an array and later combine into a single video file.
  // make the chunks array empty before starting a new recording
  // and on stop, we can create a Blob from the chunks and save it as a video file
  recorder.addEventListener("start", () => {
    chunks = [];
  });
  recorder.ondataavailable = (e) => {
    console.log(e.data);
    chunks.push(e.data);
  };
  recorder.addEventListener("stop", () => {
    // 8. create a Blob from the recorded video data chunks and save it as a video file
    // the type of the Blob should be the same as the type of the recorded video data chunks
    // which is determined by the MIME type of the MediaRecorder (e.g., "video/webm" or "video/mp4")
    // let blob = new Blob(chunks, { type: "video/webm" });
    let blob = new Blob(chunks, { type: "video/mp4" });
    // create a URL for the Blob and
    // set it as the href of a link element to download the video file
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "recorded-video.mp4";
    a.click();
  });
});

/********** 6. Animation for scaling buttons when clicked **********/
recordBtnContainer.addEventListener("click", (e) => {
  if (!recorder) return;
  recordFlag = !recordFlag; // toggle the record flag
  if (recordFlag) {
    // start recording
    recorder.start();
    startTimer();
    recordBtn.classList.add("scale-record");
  } else {
    // stop recording
    recorder.stop();
    stopTimer();
    recordBtn.classList.remove("scale-record");
  }
});

// 9. function for timer to show recording duration and stop recording after a certain time limit (e.g., 5 minutes)
let timer = document.getElementById("timer");
let counter = 0; // counter to track recording duration in seconds
function startTimer() {
  function displayTimer() {
    timer.style.display = "block";
    counter++;
    // let hours = Math.floor(counter / 3600);
    // let minutes = Math.floor((counter % 3600) / 60);
    // let seconds = counter % 60;
    // timer.innerText = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    let totalSeconds = counter;
    let hours = Number.parseInt(counter / 3600);
    totalSeconds = totalSeconds % 3600;
    let minutes = Number.parseInt(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    let seconds = totalSeconds;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timer.innerText = `${hours}:${minutes}:${seconds}`;
  }
  timerId = setInterval(displayTimer, 1000);
}

function stopTimer() {
  counter = 0; // reset counter
  timer.style.display = "none";
  clearInterval(timerId);
  // timer.textContent = "00:00:00";
  timer.innerText = "00:00:00";
}
