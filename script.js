function showNotification() {
  const notificationContainer = document.querySelector('.notification-box-info');
  const layerBackground = document.querySelector('.layer');
  const movePanelLeft = document.querySelector('.svg-container-left');
  const movePanelRight = document.querySelector('.svg-container-right');

  notificationContainer.style.display = 'block';
  movePanelLeft.style.display = 'none';
  movePanelRight.style.display = 'none';
  layerBackground.style.display = 'block';
}

function hideNotification() {
  const notificationContainer = document.querySelector('.notification-box-info');
  const layerBackground = document.querySelector('.layer');
  const movePanelLeft = document.querySelector('.svg-container-left');
  const movePanelRight = document.querySelector('.svg-container-right');

  const notificationContent = document.querySelector('.anime-content');
  notificationContent.innerHTML = '';

  notificationContainer.style.display = 'none';
  movePanelLeft.style.display = 'block';
  movePanelRight.style.display = 'block';
  layerBackground.style.display = 'none';
}

function showCreateLibrary() {
  const showInsertBlock = document.querySelector('.modal-block');
  if (showInsertBlock.style.display === 'block') {
    showInsertBlock.style.display = 'none';
  } else {
    showInsertBlock.style.display = 'block';
  }
}
function exitFromLibrary(){
  const exitLibrary = document.getElementById('modal-library-exit');
  const showInsertBlock = document.querySelector('.modal-block');
  exitLibrary.addEventListener('click', () => {
    if(showInsertBlock.style.display = 'block'){
      showInsertBlock.style.display = 'none';
    }
  })
}
exitFromLibrary();

function hideInfoAnime(){
  const container = document.querySelector('.notification-box-info');
  const layer = document.querySelector('.layer');
  if(container.style.display = 'block'){
    container.style.display = 'none';
    layer.style.display = 'none';
  }
}

function removeLibraryItem(index) {
  const libraryItems = document.querySelectorAll('.library-item');

  if (index >= 0 && index < libraryItems.length) {
    const removedItem = libraryItems[index];
    removedItem.remove();
    updateCarousel();
  }
}

function updateCarousel() {
  const libraryItems = document.querySelectorAll('.library-item');
   const librarySquareActive = document.querySelectorAll('.moving');
  let currentIndex = 0;


  function updateLibrarySquare(){
    librarySquareActive.forEach((item,index) => {
      if(index === currentIndex){
        item.classList.add('customed');
      }else{
        item.classList.remove('customed');
      }
    })
  }
  function updateLibraryItems(){
    updateLibrarySquare();
    libraryItems.forEach((item,index) => {
      if(index === currentIndex){
        item.classList.add('active');
        item.classList.remove('inactive');
      }else{
        item.classList.add('inactive');
        item.classList.remove('active');
      }
    })
  }
  updateLibraryItems();
  function showItem(index){
    libraryItems.forEach(item => item.classList.remove('active'));
    libraryItems[index].classList.add('active');
  }

  function moveRight(){
    currentIndex = (currentIndex + 1) % libraryItems.length;
    console.log('Your current index is',currentIndex)
    showItem(currentIndex);
    updateLibraryItems()
  }
  
  function moveLeft(){
    currentIndex = (currentIndex - 1 + libraryItems.length) % libraryItems.length;
    showItem(currentIndex);
    updateLibraryItems()
  }


  const previousButton = document.getElementById('button-left');
  previousButton.addEventListener('click', moveLeft);

  const nextButton = document.getElementById('button-right');
  nextButton.addEventListener('click', moveRight);
}
updateCarousel();

function validateFormInputs() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pageInput = document.getElementById('pages');
  const readSelector = document.getElementById('readed');
  const imageInput = document.getElementById('image-file');

  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pageValue = pageInput.value.trim();
  const fileList = imageInput.files;

  if (!titleValue || !authorValue || !pageValue || fileList.length === 0) {
    alert('Please fill in all required fields.');
    return false;
  }

  return true;
}


function createBook() {
  const titleInput = document.getElementById('title').value.trim();
  const authorInput = document.getElementById('author').value.trim();
  const pageInput = document.getElementById('pages').value.trim();
  const imageInput = document.getElementById('image-file').files[0];
  const newBook = {
    title: titleInput,
    author: authorInput,
    pages: pageInput,
    image: URL.createObjectURL(imageInput),
    status: 'Unreaded',
  };

  addToLibrary(newBook);
  clearFormInputs();
}

function addToLibrary(newBook) {
  const libraryArray = [];
  console.log(libraryArray);
  libraryArray.push(newBook);
  createLibraryDom(libraryArray);
}
function createLibraryDom(libraryArray) {
  const libraryContainer = document.getElementById('main-library');
  let currentIndex = 3;

  libraryArray.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add(`library-item`);
    
    // Find a unique ID by checking if it already exists in the DOM
    let uniqueId;
    do {
      uniqueId = `library-item-${currentIndex}`;
      currentIndex++;
    } while (document.getElementById(uniqueId));

    bookElement.setAttribute('id', uniqueId);
    bookElement.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>ISBN: ${book.pages}</p>
      <button onclick="removeBook(${currentIndex - 4})">Remove</button>
    `;
    libraryContainer.appendChild(bookElement);
  });
}


function clearFormInputs() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pageInput = document.getElementById('pages');
  const imageInput = document.getElementById('image-file');
  const imageName = document.getElementById('placeholder');
  const imagePreview = document.getElementById('image-preview');

  titleInput.value = '';
  authorInput.value = '';
  pageInput.value = '';
  imageInput.value = '';
  imageName.textContent = '';
  imagePreview.src = '';
}


const notificationButton = document.querySelectorAll('#information-about');
notificationButton.forEach((item) => {
  item.addEventListener('click', showNotification);
});

const quitNotification = document.getElementById('svg-quit');
quitNotification.addEventListener('click', hideNotification);

const removeButton = document.querySelectorAll('#remove');
removeButton.forEach((item, index) => {
  item.addEventListener('click', () => {
    removeLibraryItem(index);
    updateCarousel();
  });
});

const submitValuesToLibrary = document.getElementById('submit');
submitValuesToLibrary.addEventListener('click', () => {
  if (validateFormInputs()) {
    createBook();
  }
});

const insertButton = document.getElementById('insert-book');
insertButton.addEventListener('click', showCreateLibrary);

const svgQuit = document.getElementById('svg-quit')
svgQuit.addEventListener('click', hideInfoAnime)