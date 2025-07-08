let video = document.querySelector("video");

// device permission from api
// constraints to get video and audio,
let constraints = {
  //   video: {
  //     facingMode: "user", // use front camera
  //     width: { ideal: 1280 }, // HD resolution
  //     height: { ideal: 720 },
  //   },
  video: true, // use default camera
  audio: true,
};

// get user media using constraints
// navigator - a global object that provides access to browser features (like media devices)
// getUserMedia - a method to access media devices
// constraints - an object that specifies the media types and settings
// mediaDevices - an object that provides access to media input devices like cameras and microphones
// stream - a media stream object that contains the video and audio tracks
// navigator.mediaDevices.getUserMedia(constraints) returns a promise that resolves to a media stream
window.navigator.mediaDevices
  .getUserMedia(constraints) // returns a promise
  .then((stream) => {
    // set the video source to the stream
    video.srcObject = stream; // set the video source to the stream
  });
