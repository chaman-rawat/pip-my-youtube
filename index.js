if ('pictureInPictureEnabled' in document) {
  const videoElement = document.getElementsByClassName("video-stream")[0];
  const pipButtonElement = document.createElement("button");
  pipButtonElement.innerHTML = "Pip Mode";
  pipButtonElement.style.position = "fixed";
  pipButtonElement.style.right = "2rem";
  pipButtonElement.style.bottom = "2rem";
  pipButtonElement.style.visibility = "hidden";
  document.body.appendChild(pipButtonElement);

  const isVideoVisible = (element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top + rect.height > 0 && rect.top < window.innerHeight) {
      return true;
    }
    return false;
  };

  document.addEventListener("scroll", async () => {
    if (isVideoVisible(videoElement)) {
      pipButtonElement.style.visibility = "hidden";
      try {
        if (videoElement === document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      if (videoElement !== document.pictureInPictureElement) {
        pipButtonElement.style.visibility = "visible";
        pipButtonElement.addEventListener("click", async () => {
          pipButtonElement.disabled = true;

          try {
            await videoElement.requestPictureInPicture();
            pipButtonElement.style.visibility = "hidden";
          } catch (err) {
            console.log(err)
          } finally {
            pipButtonElement.disabled = false;
          }
        });
      }
    }
  });
} else {
  alert('No support of PIP in Browser');
}