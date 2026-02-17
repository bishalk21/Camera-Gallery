# Camera + Gallery Application (Loom)

- Heavy Browser APIs Usage
  - Media Stream API
  - Media Recorder API
  - Media Devices API
  - navigator API
- Uses IndexedDB for storing recorded videos
- Canvas for video preview
- browser permissions for camera and microphone access

## Features

- Image capturing with filters (grayscale, sepia, invert)
- Video recording
- Gallery to view recorded videos (in browser)

## APIs Used

> https://developer.mozilla.org/en-US/docs/Web/API

### Navigator and MediaDevices APIs for accessing camera and microphone

> https://developer.mozilla.org/en-US/docs/Web/API/Navigator
> https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
> https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
> https://developer.mozilla.org/en-US/docs/Web/API/MediaStream

## MediaRecorder API for recording video streams

> https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

## Notes

### Video Element

- `<video>` element for displaying video stream
- `src` attribute for setting video source
- `autoplay` attribute for automatic playback
- `controls` attribute for showing video controls
- `muted` attribute for muting audio
- `loop` attribute for looping video playback
- `play()` method to start video playback
- `pause()` method to pause video playback
- `currentTime` property to get/set current playback time
- `duration` property to get total duration of the video
- `volume` property to get/set audio volume

```html
<video
  src="https://youtu.be/kwIWWLgb4tc?list=RDkwIWWLgb4tc"
  autoplay
  controls
  muted
  loop
></video>
```

### navigator.mediaDevices.getUserMedia() API (Media Stream API and Media Devices API to access camera and microphone)

1. navigator
   - is a global object (property of the window object) that provides information about the user's browser and device
   - can be accessed using window.navigator or simply navigator
   - navigator provides access to various APIs and properties related to the user's browser and device, such as userAgent, platform, language, and mediaDevices
2. mediaDevices
   - is a property of the navigator object that provides access to media input devices such as cameras and microphones
   - mediaDevices has methods for enumerating available media devices, requesting access to media input, and handling media streams
3. getUserMedia()
   - is a method of the mediaDevices object that prompts the user for permission to use media input devices (camera, microphone)
   - returns a Promise that resolves to a MediaStream object if the user grants permission, or rejects with an error if permission is denied or there is an issue accessing the media devices
   - takes a constraints object as an argument to specify the types of media input and settings desired

- Prompts user for permission to use media input (camera, microphone)
- Returns a Promise that resolves to a MediaStream object
- Takes a constraints object to specify media types and settings

**Stream (data from media input devices) comes in chunks, and the MediaRecorder API allows us to record these streams and save them as video files.**

1. get element video
2. navigator.mediaDevices.getUserMedia() with constraints for video and audio
3. If permission granted, set video.srcObject to the MediaStream object returned by getUserMedia()
4. record and capture buttons to start recording and capturing images
5. animations for buttons when clicked
6. record video using MediaRecorder API
7. chunks of recorded video data are stored in an array on dataavailable event
8. when recording is stopped, the chunks are combined into a Blob and
   a URL is created for the Blob to be used as the source for the video element in the gallery
9. function for timer to show recording duration and stop recording after a certain time limit (e.g., 5 minutes)
