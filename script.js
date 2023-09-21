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

layerBackground.addEventListener('click', () => {
  layerBackground.style.display = 'none';
  movePanelLeft.style.display = 'block';
  movePanelRight.style.display = 'block';
})

const libraryItems = document.querySelectorAll('.library-item');
let currentIndex = 0;
movePanelLeft.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + libraryItems.length ) % libraryItems.length;
  updateCarousel();
});
movePanelRight.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % libraryItems.length;
  updateCarousel();
});
function updateCarousel(){
  const containerWidth = document.querySelector('.library').offsetWidth;
  const itemWidth = libraryItems[0].offsetWidth;
  const spacing = containerWidth * 0.5;
  libraryItems.forEach((item,index) => {
    const offset = index - currentIndex;
    const translateX = offset * (itemWidth + spacing);
    item.style.transform = `translateX(${translateX}px)`;
  })
}
updateCarousel();


//-------------------------------//
const insertButton = document.getElementById('insert-book');
const modalBox = document.querySelector('.modal-block');
const overlay = document.querySelector('.overlay')
insertButton.addEventListener('click',() => {
  overlay.style.display = 'block';
  modalBox.style.display = 'block';
});
// -------------------------------//
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageInput = document.getElementById('pages');

function getTittleInputValue() {
  const titleHolder = titleInput.value;
  return titleHolder;
}

function getAuthorInputValue() {
  const authorHolder = authorInput.value;
  return authorHolder;
}

function getPageInputValue(){
  const pageHolder = pageInput.value;
  return pageHolder;
}


const submitValuesToLibrary = document.getElementById('submit');
const libraryArray = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
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

      const pagesDisplay = document.createElement('div');
      pagesDisplay.classList.add('pages-display');
      pagesDisplay.textContent = `Pages : ${newBook.pages}`;
      
      const statusDisplay = document.createElement('div');
      statusDisplay.classList.add(newBook.statusDisplayClass);
      statusDisplay.textContent = 'Readed?';
      
      const newCheckBox = document.createElement('input');
      newCheckBox.type = 'checkbox';
      newCheckBox.id = newBook.checkboxId;
      statusDisplay.append(newCheckBox);
      
      bookContainer.appendChild(titleDisplay);
      bookContainer.appendChild(authorDisplay);
      bookContainer.appendChild(pagesDisplay);
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
  const pageValue = getPageInputValue();
  
  if (titleValue.trim() !== '' && authorValue.trim() !== '' && pageValue.trim() !== '') {
    const newBook = new Book(authorValue, titleValue,pageValue);
    addToLibrary(newBook);
  } else {
    alert('Please fill required data in all fields.');
  }
  
  titleInput.value = '';
  authorInput.value = '';
  pageInput.value = '';
});