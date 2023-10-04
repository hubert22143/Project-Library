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
function createLibrarySquare() {

  const parentContainer = document.querySelector('.counter-container');

  const libraryItems = document.querySelectorAll('.library-item');

  const childNodesCount = parentContainer.children.length;
  if (childNodesCount < libraryItems.length) {

    const elementsToAppend = libraryItems.length - childNodesCount;

    for (let i = 0; i < elementsToAppend; i++) {
      const li = document.createElement('li');
      li.classList.add('moving');
      parentContainer.appendChild(li);
    }
  }
}

let currentIndex = 0;
function updateCarousel() {
  const libraryItems = document.querySelectorAll('.library-item');
  const parentContainer = document.querySelector('.counter-container');
 currentIndex = 0;
  function updateLibrarySquare(){
    const liElements = parentContainer.querySelectorAll('li'); 
    liElements.forEach((item,index) => {
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
  updateLibraryItems()
  function showItem(index){
    libraryItems.forEach(item => item.classList.remove('active'));
    libraryItems[index].classList.add('active');
  }

  function moveRight(){
    currentIndex = (currentIndex + 1) % libraryItems.length;
    console.log('Your current index is',currentIndex)
    showItem(currentIndex);
    updateLibraryItems()
    createLibrarySquare()
  }
  
  function moveLeft(){
    currentIndex = (currentIndex - 1 + libraryItems.length) % libraryItems.length;
    showItem(currentIndex);
    updateLibraryItems()
    createLibrarySquare()
  }

  const previousButton = document.getElementById('button-left');
  const nextButton = document.getElementById('button-right');

  previousButton.removeEventListener('click', moveLeft);
  nextButton.removeEventListener('click', moveRight);
  
  previousButton.addEventListener('click', moveLeft);
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
  libraryArray.push(newBook);
  createLibraryDom(libraryArray);
}
function createLibraryDom(libraryArray) {
  const libraryContainer = document.getElementById('main-library');
  const currentItemCount = libraryContainer.querySelectorAll('.library-item').length;

  currentIndex = currentItemCount;

  libraryArray.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add(`library-item`, 'inactive');
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
      <img src="${book.image}" alt="Book Image">
      <button class="delete-button">Delete</button>
    `;
    libraryContainer.appendChild(bookElement);
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        const bookToRemove = deleteButton.closest('.library-item');
        if (bookToRemove) {
          bookToRemove.remove();
        }
      });
    });
    createLibrarySquare()
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