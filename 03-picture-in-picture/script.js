const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Select media stream
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
  } catch (error) {
    console.log('whoops, error here:', error);
  }
}

// Select media stream and Request Picture in Picture on Button Click
button.addEventListener('click', async () => {
  button.disabled = true;
  try {
    await selectMediaStream();
    await videoElement.play();
    await videoElement.requestPictureInPicture();
  } catch (error) {
    console.log('whoops, error here:', error);
  }
  button.disabled = false;
});
