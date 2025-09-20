const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.add-btn.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const columns = document.querySelectorAll('.drag-item-list');
const backlogCol = document.getElementById('backlog-list');
const progressCol = document.getElementById('progress-list');
const completeCol = document.getElementById('complete-list');
const onHoldCol = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let arrays = [];
let backlogArray = [];
let progressArray = [];
let completeArray = [];
let onHoldArray = [];

// Drag Functionality
let dragging = false;
let draggedItem;
let prevCol;
let currCol;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogArray = JSON.parse(localStorage.backlogItems);
    progressArray = JSON.parse(localStorage.progressItems);
    completeArray = JSON.parse(localStorage.completeItems);
    onHoldArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogArray = ['Release the course', 'Sit back and relax'];
    progressArray = ['Work on projects', 'Listen to music'];
    completeArray = ['Being cool', 'Getting stuff done'];
    onHoldArray = ['Being uncool'];
  }
  arrays =
    [backlogArray,
      progressArray,
      completeArray,
      onHoldArray];
}

// Set localStorage Arrays
function updateSavedColumns() {
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(arrays[index]));
  });
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    updatedOnLoad = true;
    getSavedColumns();
  }
  // Boucle sur chaque colonne
  arrays.forEach((array, colId) => {
    const col = columns[colId];
    col.textContent = '';
    array.forEach((text, itemId) => {
      createItem(col, colId, text, itemId);
    });
  });
  // Update Local Storage
  updateSavedColumns();
}

function updateItem(itemId, colId) {
  const array = arrays[colId];
  const col = columns[colId].children;
  const text = col[itemId].textContent;
  if (!dragging) {
    if (!text) array.splice(itemId, 1);
    else array[itemId] = text;
  }
  updateDOM();
}

// Show Item Input Box
function addItem(colId) {
  const text = addItems[colId].textContent;
  if (text !== '') {
    addItems[colId].textContent = '';
    arrays[colId].push(text);
    updateDOM();
  }
}

// Create DOM Elements for each list item
function createItem(col, colId, text, itemId) {
  // Item
  const item = document.createElement('li');
  item.classList.add('drag-item');
  item.id = itemId;
  item.draggable = true;
  item.addEventListener('dragstart', (e) => drag(e));
  item.textContent = text;
  item.addEventListener('dblclick', () => {
    item.contentEditable = true;
    item.focus();
  });
  item.addEventListener('blur', () => {
    item.contentEditable = false;
    updateItem(itemId, colId);
  });
  // Append Item
  col.appendChild(item);
}

// Show Item Input Box
function showInputBox(colId) {
  addBtns[colId].style.visibility = 'hidden';
  saveItemBtns[colId].style.display = 'flex';
  addItemContainers[colId].style.display = 'flex';
}

// Hide Item Input Box
function hideInputBox(colId) {
  addBtns[colId].style.visibility = 'visible';
  saveItemBtns[colId].style.display = 'none';
  addItemContainers[colId].style.display = 'none';
  addItem(colId);
}

// When Item Starts Dragging
function drag(e) {
  dragging = true;
  draggedItem = e.target;
  const parentCol = draggedItem.closest('.drag-item-list');
  for (let i = 0; i < columns.length; i++) {
    if (columns[i] === parentCol) {
      prevCol = i;
      break;
    }
  }
}

// Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// When Item Enters Column Area
function dragEnter(colId) {
  columns[colId].classList.add('over');
  currCol = colId;
}

// Dropping Item in Column
function drop(e) {
  e.preventDefault();
  // Remove Background Color/Padding
  columns.forEach((column) => {
    column.classList.remove('over');
  });
  // Add Item to New Array
  const text = draggedItem.textContent;
  arrays[currCol].push(text);
  // Remove Item from Previous Array
  const index = arrays[prevCol].indexOf(text);
  if (index > -1) arrays[prevCol].splice(index, 1);
  // Dragging Complete
  dragging = false;
  // Display Arrays to DOM
  updateDOM();
}

// On Load
updateDOM();

