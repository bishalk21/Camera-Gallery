setTimeout(() => {
  if (db) {
    console.log(`DB is already opened and ready to use`);
    // TODO 1 - make transactions to retrieve video blobs and metadata from the IndexedDB and display them in the gallery
    let videoTransaction = db.transaction("video", "readonly");
    let videoStore = videoTransaction.objectStore("video");
    let getAllRequest = videoStore.getAll();
    getAllRequest.onsuccess = (event) => {
      // let videoRecords = event.target.result;
      let videoRecords = getAllRequest.result;
      //   console.log(`Retrieved video records from IndexedDB:`, videoRecords);
      // TODO 2 - create video elements for each retrieved video blob and display them in the gallery
      videoRecords.forEach((videoObj) => {
        let videoElement = document.createElement("div");
        videoElement.setAttribute("class", "media-container");
        videoElement.setAttribute("id", videoObj.id);

        let url = URL.createObjectURL(videoObj.blobData);
        // videoElement.querySelector("video").src = url;

        videoElement.innerHTML = `
        <div class="media">
            <video controls src="${url}" autoplay loop></video>
          </div>
          <div class="action-btns">
            <div class="delete">Delete</div>
            <div class="download">Download</div>
          </div>
        `;

        let deleteBtn = videoElement.querySelector(".delete");
        let downloadBtn = videoElement.querySelector(".download");
        deleteBtn.addEventListener("click", deleteListener);
        downloadBtn.addEventListener("click", downloadListener);

        document.querySelector(".gallery-videos").appendChild(videoElement);
      });
    };

    // images
    let imageTransaction = db.transaction("image", "readonly");
    let imageStore = imageTransaction.objectStore("image");
    let getAllImagesRequest = imageStore.getAll();
    getAllImagesRequest.onsuccess = (event) => {
      let imageRecords = getAllImagesRequest.result;
      imageRecords.forEach((imageObj) => {
        let imageElement = document.createElement("div");
        imageElement.setAttribute("class", "media-container");
        imageElement.setAttribute("id", imageObj.id);

        let url = imageObj.url;
        imageElement.innerHTML = `
        <div class="media image-media">
            <img src="${url}" alt="Captured Image" />
          </div>
          <div class="action-btns">
            <div class="delete">Delete</div>
            <div class="download">Download</div>
          </div>
        `;

        let deleteBtn = imageElement.querySelector(".delete");
        let downloadBtn = imageElement.querySelector(".download");
        deleteBtn.addEventListener("click", deleteListener);
        downloadBtn.addEventListener("click", downloadListener);
        document.querySelector(".gallery-images").appendChild(imageElement);
      });
    };
  }
}, 100);

// ui remove and also remove from indexedDB
function deleteListener(e) {
  let id = e.target.parentElement.parentElement.getAttribute("id");
  if (id.slice(0, 5) === "video") {
    let videoTransaction = db.transaction("video", "readwrite");
    let videoStore = videoTransaction.objectStore("video");
    let deleteRequest = videoStore.delete(id);
    deleteRequest.onsuccess = (event) => {
      e.target.parentElement.parentElement.remove();
    };
  } else if (id.slice(0, 5) === "image") {
    let imageTransaction = db.transaction("image", "readwrite");
    let imageStore = imageTransaction.objectStore("image");
    let deleteRequest = imageStore.delete(id);
    deleteRequest.onsuccess = (event) => {
      e.target.parentElement.parentElement.remove();
    };
  }
}

// download video file
function downloadListener(e) {
  let id = e.target.parentElement.parentElement.getAttribute("id");

  if (id.slice(0, 5) === "video") {
    let videoTransaction = db.transaction("video", "readonly");
    let videoStore = videoTransaction.objectStore("video");
    let getRequest = videoStore.get(id);
    getRequest.onsuccess = () => {
      let videoRecord = getRequest.result;
      if (videoRecord && videoRecord.blobData) {
        let blob = videoRecord.blobData;
        // create a URL for the Blob and
        // set it as the href of a link element to download the video file
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = `recorded-video-${videoRecord.createdAt.toISOString()}.mp4`;
        a.click();
      }
    };
  } else if (id.slice(0, 5) === "image") {
    let imageTransaction = db.transaction("image", "readonly");
    let imageStore = imageTransaction.objectStore("image");
    let getImageRequest = imageStore.get(id);
    getImageRequest.onsuccess = () => {
      let imageRecord = getImageRequest.result;
      if (imageRecord && imageRecord.url) {
        let url = imageRecord.url;
        let a = document.createElement("a");
        a.href = url;
        a.download = `captured-image-${imageRecord.createdAt.toISOString()}.png`;
        a.click();
      }
    };
  }
}
