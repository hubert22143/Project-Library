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
const libraryArrayHolder = [];
const libraryItemElements = document.querySelectorAll('.library-item');
libraryItemElements.forEach((element) => {
  libraryArrayHolder.push(element);
});
function createLibrarySquare() {

  const parentContainer = document.querySelector('.counter-container');
  const childNodesCount = parentContainer.children.length;
  if (childNodesCount < libraryArrayHolder.length) {

    const elementsToAppend = libraryArrayHolder.length - childNodesCount;

    for (let i = 0; i < elementsToAppend; i++) {
      const li = document.createElement('li');
      li.classList.add('moving');
      parentContainer.appendChild(li);
    }
  }
}
let currentIndex = 0;
  let libraryItems = Array.from(document.querySelectorAll('.library-item'));
  console.log(libraryArrayHolder);
  const parentContainer = document.querySelector('.counter-container');
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
  function updateLibraryItems() {
    updateLibrarySquare();
    libraryArrayHolder.forEach((item, index) => {
      if(item && item.classList){
      if (index === currentIndex) {
          item.classList.add('active');
          item.classList.remove('inactive');
        }else{
          item.classList.add('inactive');
          item.classList.remove('active');
        }
      }else if(item.classList === undefined){
        console.log("Item doesn't exist yet");
      }
    });
  }
  updateLibraryItems()
  function moveRight(){
    currentIndex = (currentIndex + 1) % libraryArrayHolder.length;
    console.log('Your current index is',currentIndex)
    updateLibraryItems()
  }
  
  function moveLeft(){
    currentIndex = (currentIndex - 1 + libraryArrayHolder.length) % libraryArrayHolder.length;
    updateLibraryItems()
  }

  function deleteItem(indexToDelete) {
    if (currentIndex === indexToDelete) {
      let currentItem = document.querySelector(`.library-item[data-index="${currentIndex}"]`);
      let selectedLibraryCounter = document.querySelector('.moving.customed');
      console.log(selectedLibraryCounter);
      console.log(currentItem);
      console.log("Current index matches indexToDelete");
  
      if (currentItem) {
        currentItem.remove();
        selectedLibraryCounter.remove();
        currentIndex = (currentIndex - 1 + libraryArrayHolder.length) % libraryArrayHolder.length;
      }
      console.log("Your index to be deleted is:", indexToDelete);
      libraryArrayHolder.splice(indexToDelete, 1);
      console.log("Your current index is now:", currentIndex);
    } else {
      console.log("Current index doesn't match indexToDelete");
      console.log("indexToDelete:", indexToDelete);
      console.log("currentIndex:", currentIndex);
    }
  
    updateLibraryItems();
  }
const deleteButtons = document.querySelectorAll('#remove');
  
deleteButtons.forEach((deleteButton,index) => {
deleteButton.addEventListener('click', () => {
  console.log("Clicked");
  deleteItem(currentIndex);
  updateLibraryItems();
  updateLibrarySquare();
});
});
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
    status: 'Unread',
  };
  

  addToLibrary(newBook);

  clearFormInputs();
}
function addToLibrary(newBook) {
  const libraryContainer = document.getElementById('main-library');
  let currentIndex = libraryArrayHolder.length - 1;

  const bookElement = document.createElement('div');
  bookElement.classList.add('library-item');
  bookElement.setAttribute('data-index', currentIndex);
  let uniqueId;
  do {
    uniqueId = `library-item-${currentIndex}`;
    currentIndex++;
  } while (document.getElementById(uniqueId));

  bookElement.setAttribute('id', uniqueId);
  bookElement.innerHTML = `
    <h2>${newBook.title}</h2>
    <p>Author: ${newBook.author}</p>
    <p>ISBN: ${newBook.pages}</p>
    <img src="${newBook.image}" alt="Book Image">
    <button id="remove">Delete</button>
  `;

  libraryContainer.appendChild(bookElement);


  console.log(libraryArrayHolder.length);
  console.log(libraryArrayHolder);

  libraryArrayHolder.push(bookElement);
  createLibrarySquare()
  updateLibraryItems();
  updateLibrarySquare();
  console.log(libraryArrayHolder.length);
  console.log(libraryArrayHolder);
}

function clearFormInputs() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('image-file').value = '';
}

  
const svgQuit = document.getElementById('svg-quit')
svgQuit.addEventListener('click', hideInfoAnime);

const insertButton = document.getElementById('insert-book');
insertButton.addEventListener('click', showCreateLibrary);
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
})
const previousButton = document.getElementById('button-left');
const nextButton = document.getElementById('button-right');
previousButton.addEventListener('click', moveLeft);
nextButton.addEventListener('click', moveRight);