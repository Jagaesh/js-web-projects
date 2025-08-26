const button = document.getElementById('button');
const audio = document.getElementById('audio');

// Unsplash API (use your own API key in a config.js file)
const apiKey = ELEVENLABS_API_KEY;

// Get Joke API
async function getJoke() {
  try {
    const response = await fetch("https://blague-api.vercel.app/api?mode=dev");
    if (!response.ok) {
      throw new Error(`Joke API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const joke = `${data.blague} ... ${data.reponse}`;
    return joke;

  } catch (error) {
    console.error("Joke Error:", error);
    return null;
  }
}

// Text To Speech API
async function tellMe(joke) {
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/rbFGGoDXFHtVghjHuS3E", {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: joke })
    });
    if (!response.ok) {
      throw new Error(`TTS API Error: ${response.status} ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
    audio.src = URL.createObjectURL(audioBlob);
    await audio.play();

  } catch (error) {
    console.error("TTS Error:", error);
  }
}

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Event Listeners
button.addEventListener('click', async () => {
  toggleButton();
  const joke = await getJoke();
  console.log(joke);
  if (joke) {
    await tellMe(joke);
  }
});
audio.addEventListener('ended', toggleButton);