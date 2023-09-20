// notification area //
const notificationButton = document.getElementById('notification-button');
const quitNotification = document.getElementById('svg-quit');
const notificationContainer = document.querySelector('.notification-box-info');
const body = document.body;
const movePanelLeft = document.querySelector('.svg-container-left');
const movePanelRight = document.querySelector('.svg-container-right')
const layerBackground = document.querySelector('.layer');
notificationButton.addEventListener('click', () => {
notificationContainer.style.display = 'block';
movePanelLeft.style.display = 'none';
movePanelRight.style.display = 'none';
layerBackground.style.display = 'block';

});
quitNotification.addEventListener('click', () => {
    notificationContainer.style.display = 'none';
    movePanelLeft.style.display = 'block';
    movePanelRight.style.display = 'block';
    layerBackground.style.display = 'none';
})
//-------------------------------//
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

function getTittleInputValue() {
  const titleHolder = titleInput.value;
  return titleHolder;
}

function getAuthorInputValue() {
  const authorHolder = authorInput.value;
  return authorHolder;
}

const submitValuesToLibrary = document.getElementById('submit');
const libraryArray = [];

function Book(author, title) {
  this.author = author;
  this.title = title;
  this.checkboxId = generateUniqueId();
  this.statusDisplayClass = generateUniqueClass();
}

function generateUniqueId() {
  return 'checkbox-' + Math.random().toString(36).substring(2);
}
function generateUniqueClass() {
  return 'status-' + Math.random().toString(36).substring(2);
}
Book.prototype.marker = function() {
  const statusDisplay = document.querySelector(`.${this.statusDisplayClass}`); 
  const checkbox = document.getElementById(this.checkboxId);

  if (checkbox && statusDisplay) {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        statusDisplay.style.backgroundColor = 'green';
      } else {
        statusDisplay.style.backgroundColor = 'red';
      }
    });
  } else {
    setTimeout(() => this.marker(), 100);
  }
};

function addToLibrary(newBook) {
  libraryArray.push(newBook);
  displayLibrary(libraryArray);
}

function displayLibrary(libraryArray) {
  const bookContainer = document.querySelector('.book-container');
  
  if (bookContainer) {
    bookContainer.innerHTML = '';
    
    for (const newBook of libraryArray) {
      const titleDisplay = document.createElement('div');
      titleDisplay.classList.add('title-display'); 
      titleDisplay.textContent = `Title: ${newBook.title}`;
      
      const authorDisplay = document.createElement('div');
      authorDisplay.classList.add('author-display');
      authorDisplay.textContent = `Author: ${newBook.author}`;
      
      const statusDisplay = document.createElement('div');
      statusDisplay.classList.add(newBook.statusDisplayClass);
      statusDisplay.textContent = 'Readed?';
      
      const newCheckBox = document.createElement('input');
      newCheckBox.type = 'checkbox';
      newCheckBox.id = newBook.checkboxId;
      statusDisplay.append(newCheckBox);
      
      bookContainer.appendChild(titleDisplay);
      bookContainer.appendChild(authorDisplay);
      bookContainer.appendChild(statusDisplay);
      
      if (newBook) {
        newBook.marker();
      }
    }
  }
}

submitValuesToLibrary.addEventListener('click', (e) => {
  e.preventDefault();
  const titleValue = getTittleInputValue();
  const authorValue = getAuthorInputValue();
  
  if (titleValue.trim() !== '' && authorValue.trim() !== '') {
    const newBook = new Book(authorValue, titleValue);
    addToLibrary(newBook);
  } else {
    alert('Please fill in both title and author fields.');
  }
  
  titleInput.value = '';
  authorInput.value = '';
});