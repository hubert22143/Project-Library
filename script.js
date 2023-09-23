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
const modalBoxExit = document.getElementById('modal-library-exit');
insertButton.addEventListener('click',() => {
  overlay.style.display = 'block';
  modalBox.style.display = 'block';
  modalBoxExit.addEventListener('click', () => {
    modalBox.style.display = 'none';
    overlay.style.display = 'none';
  });
});

// ------------------------------//
const imageInput = document.getElementById('image-file');
const imageName = document.getElementById('placeholder');
const imagePreview = document.getElementById('image-preview');
imagePreview.src = '';
imageInput.addEventListener('change', (e) => {
  const fileList = e.target.files;
  if (fileList.length > 0) {
    const selectedFile = fileList[0];
    if (selectedFile.type.startsWith('image/')) {
      imageName.textContent = 'Selected File: ' + selectedFile.name;
      readImage(selectedFile);
    } else {
      imageName.textContent = 'File is not an image: ' + selectedFile.type + ' ' + selectedFile.name;
      imagePreview.src = '';
    }
  } else {
    imageName.textContent = '';
    imagePreview.src = '';
  }
});

imageInput.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
});

imageInput.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const fileList = e.dataTransfer.files;
  if (fileList.length > 0) {
    const selectedFile = fileList[0];
    if (selectedFile.type.startsWith('image/')) {
      imageName.textContent = 'Selected File: ' + selectedFile.name;
      readImage(selectedFile);
    } else {
      imageName.textContent = 'File is not an image: ' + selectedFile.type + ' ' + selectedFile.name;
      imagePreview.src = '';
    }
  } else {
    imageName.textContent = '';
    imagePreview.src = '';
  }
});
function readImage(file) {
  if (file instanceof Blob) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e) => {
      imagePreview.src = e.target.result;
    });
    fileReader.readAsDataURL(file);
  } else {
    console.error('Invalid file format: ' + file.type);
    imagePreview.src = '';
  }
}
// ---------------------------- //
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
function getImageInputValue(){
  const imageHolder = imagePreview.src;
  return imageHolder;
}

const submitValuesToLibrary = document.getElementById('submit');
const libraryArray = [];

function Book(author, title, pages,image) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.image = image;
  this.imageId = generateUniqueImageSrc();
  this.checkboxId = generateUniqueId();
  this.statusDisplayClass = generateUniqueClass();
  this.divNewClass = generateUniqueClass();
}
function generateUniqueId() {
  return 'checkbox-' + Math.random().toString(36).substring(2);
}
function generateUniqueClass() {
  return 'status-' + Math.random().toString(36).substring(2);
}
function generateUniqueImageSrc(){
  return 'image-' + Math.random().toString(36).substring(2);
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

      const imageDisplay = document.createElement('div');
      imageDisplay.classList.add(newBook.divNewClass);
      const imgElement = document.createElement('img');
      imgElement.classList.add(newBook.imageId);
      imgElement.src = `${newBook.image}`;
      imageDisplay.appendChild(imgElement);
      
      const newCheckBox = document.createElement('input');
      newCheckBox.type = 'checkbox';
      newCheckBox.id = newBook.checkboxId;
      statusDisplay.append(newCheckBox);
      
      bookContainer.appendChild(titleDisplay);
      bookContainer.appendChild(authorDisplay);
      bookContainer.appendChild(pagesDisplay);
      bookContainer.appendChild(imageDisplay);
      bookContainer.appendChild(statusDisplay);
      
      if (newBook) {
        newBook.marker();
      }
    }
  }
}

const libraryContainer = document.getElementById('main-library');



submitValuesToLibrary.addEventListener('click', (e) => {
  e.preventDefault();
  const titleValue = getTittleInputValue();
  const authorValue = getAuthorInputValue();
  const pageValue = getPageInputValue();
  const imageValue = getImageInputValue();
  if (titleValue.trim() !== '' && authorValue.trim() !== '' && pageValue.trim() !== '' && imageValue.trim() !== '') {
    const newBook = new Book(authorValue, titleValue,pageValue,imageValue);
    addToLibrary(newBook);
    if(newBook){
      const newItem = document.createElement('div');
      newItem.classList.add('library-item');
      const itemContent = document.createElement('div');
      itemContent.classList.add('content')
      newItem.appendChild(itemContent);
      const itemHeader = document.createElement('div');
      itemHeader.classList.add('itemHeader')
      itemContent.appendChild(itemHeader);
      itemHeader.textContent = `${titleValue}`;
      const itemWrapper = document.createElement('div');
      itemWrapper.classList.add('wrapper');
      itemContent.appendChild(itemWrapper);

      const itemHolder = document.createElement('div');
      itemHolder.classList.add('image-holder');
      itemWrapper.appendChild(itemHolder);

      const itemImage = document.createElement('img');
      itemImage.classList.add('item-image');
      itemImage.src = `${imageValue}`;
      itemHolder.appendChild(itemImage);
      const itemInfo = document.createElement('div');
      itemInfo.classList.add('Item-Info')
      itemWrapper.appendChild(itemInfo);
      const itemInfoText = document.createElement('div');
      itemInfoText.classList.add('item-info-text');
      itemInfoText.textContent = `The author of this manga is : ${authorValue} And it has : ${pageValue} pages`
      itemInfo.appendChild(itemInfoText);
      

      libraryContainer.appendChild(newItem);
      currentIndex = Array.from(libraryItems).indexOf(newItem);
      updateCarousel();
    }
  } else {
    alert('Please fill required data in all fields.');
  }


  titleInput.value = '';
  authorInput.value = '';
  pageInput.value = '';
  imageValue.value = '';
});