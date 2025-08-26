const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isInitialLoad = true;
let imagesReady = false;
let loadedImages = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API (use your own key in a config.js)
const apiKey = UNSPLASH_API_KEY;
let initialCount = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateApiUrlCount(newCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${newCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  loadedImages++;
  if (loadedImages === totalImages) {
    imagesReady = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  loadedImages = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    const img = document.createElement('img');
    img.addEventListener('load', imageLoaded);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateApiUrlCount(20);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log("error getting image: ", error);
  }
}

// Load More Photos if scrolling near bottom of page
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && imagesReady) {
    imagesReady = false;
    getPhotos();
  }
});

// On Load
getPhotos();