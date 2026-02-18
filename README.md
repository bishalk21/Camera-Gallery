# Camera + Gallery Application [Camera + Gallery App]

- Heavy Browser APIs Usage
  - Media Stream API
  - Media Recorder API
  - Media Devices API
  - navigator API
- Uses IndexedDB for storing recorded videos
- Canvas for video preview
- browser permissions for camera and microphone access

## Features

- Image capturing with filters (grayscale, sepia, invert) and download option
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
> https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/ondataavailable

## Canvas API for video preview and image manipulation

> https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

## IndexedDB for storing recorded videos

> https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

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

## Images

- video is collection of images (frames)
- to capture an image from the video stream, we can use a canvas element to draw the current video frame and then convert it to an image format (e.g., PNG, JPEG) for download or display
- get the video stream from the camera using navigator.mediaDevices.getUserMedia()
- create a canvas element and draw the current video frame onto the canvas
- apply filters to the canvas (grayscale, sepia, invert) using canvas context's filter property

## Canvas API for video preview and image manipulation

- Canvas API allows us to draw graphics and manipulate images on a web page using JavaScript

## IndexedDB for storing recorded videos

- IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs
- It allows us to store and retrieve video files in the browser, enabling a gallery feature for recorded videos
- it is event-driven and asynchronous, meaning that operations like adding, retrieving, or deleting data are performed using events and callbacks rather than blocking the main thread
- it is stored in key-value pairs, where the key is a unique identifier for the data and the value can be any JavaScript object, including blobs (binary large objects) which are used to store video files
- how to use IndexedDB:
  1. Open a database using indexedDB.open() method, which returns an IDBOpenDBRequest object
  2. Handle the onupgradeneeded event to create object stores and indexes if the database is being created or upgraded
  3. Handle the onsuccess event to get a reference to the opened database (IDBDatabase object)
  4. Use transactions to perform read/write operations on the database, such as adding video blobs, retrieving stored videos, or deleting videos from the gallery

### LocalStorage vs IndexedDB

- LocalStorage is a simple key-value storage mechanism that is synchronous and has a storage limit of around 5MB per origin. It is suitable for storing small amounts of data, such as user preferences or session information. It can only store string data, so if you want to store objects or arrays, you need to serialize them using JSON.stringify() and deserialize them using JSON.parse() when retrieving the data.
- IndexedDB is a more powerful and complex storage mechanism that is asynchronous and can store large amounts of structured data, including files and blobs. It is suitable for applications that require offline capabilities or need to store large amounts of data, such as a video gallery. It provides a more flexible data model, allowing you to store objects with multiple properties and query them using indexes. IndexedDB is also more efficient for storing and retrieving large binary data, such as video files, compared to LocalStorage.

Since captured images and recorded videos can be large in size, IndexedDB is a better choice for storing them compared to LocalStorage.

1. get element video
2. navigator.mediaDevices.getUserMedia() with constraints for video and audio
3. If permission granted, set video.srcObject to the MediaStream object returned by getUserMedia()
4. record and capture buttons to start recording and capturing images
5. animations for buttons when clicked
6. record video using MediaRecorder API
7. chunks of recorded video data are stored in an array on dataavailable event
8. when recording is stopped, the chunks are combined into a Blob and
   a URL is created for the Blob to be used as the source for the video element in the gallery
9. function for timer to show recording duration and stop recording
10. filter layer to apply visual effects to the video stream using CSS filters (grayscale, sepia, invert)
11. using canvas fillStyle and fillRect to create a semi-transparent overlay for the filter effects
12. applying filters to the filter layer by getting color values using getComputedStyle and setting the filter property of the filter layer accordingly
