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
  const svgContainerLeft = document.querySelector('.svg-container-left');
  const svgContainerRight = document.querySelector('.svg-container-right');
  const notificationContent = document.querySelector('.anime-content');
  if(notificationContent){
    notificationContent.innerHTML = '';
  }
  notificationContainer.style.display = 'none';
  svgContainerLeft.style.display = 'flex'
  svgContainerRight.style.display = 'flex';
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
const libraryArrayHolder = [];
const libraryItemElements = document.querySelectorAll('.library-item');
libraryItemElements.forEach((element) => {
  libraryArrayHolder.push(element);
});
let svgButtons = document.querySelectorAll('#information-about');
let infoContainer = document.querySelector('.container-box-info');

const notificationButtons = document.querySelectorAll('#information-about');
let libraryArray = [];
libraryItemElements.forEach((element) => {
  const libraryItem = {};
  libraryItem.index = element.getAttribute('data-index');
  libraryItem.title = element.querySelector('.title').textContent.replace('Title: ', '');
  libraryItem.author = element.querySelector('.author-page').textContent.replace('Author: ', '');
  libraryItem.imageSrc = element.querySelector('.image').getAttribute('src');
  const pagesReadText = element.querySelector('.pages-read').textContent;
  libraryItem.pagesRead = parseInt(pagesReadText.replace('Pages: Readed pages: ', ''));
  libraryItem.status = element.querySelector('.status-read button').textContent;
  libraryArray.push(libraryItem);
});
console.log(libraryArray);

notificationButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const infoContainer = document.querySelector('.container-box-info');
    const selectedBook = libraryArray[index]; // Use libraryArray, not libraryArrayHolder
    const div = document.createElement('div');
    div.setAttribute('class','anime-content');
    if (selectedBook) {
      div.textContent = `Title: ${selectedBook.title}, Author: ${selectedBook.author}, Pages: ${selectedBook.pagesRead}`;
    } else {
      div.textContent = "No content available";
    }
    infoContainer.appendChild(div);
  });
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
  function moveRight() {
    let libraryContainer = document.querySelector('.library');
    currentIndex = (currentIndex + 1) % libraryArrayHolder.length;
    console.log('Your current index is', currentIndex);
    const itemWidth = libraryArrayHolder[currentIndex].offsetWidth;
  
    let shiftAmount = 50;
    const desiredScrollPosition = currentIndex * itemWidth - libraryContainer.clientWidth / 2 + shiftAmount;
  
    libraryContainer.scrollLeft = desiredScrollPosition;
  
    libraryContainer.scrollTo({
      left: desiredScrollPosition,
      behavior: 'smooth',
    });
  
    updateLibraryItems();
  }
  
  function moveLeft() {
    let libraryContainer = document.querySelector('.library');
    currentIndex = (currentIndex - 1 + libraryArrayHolder.length) % libraryArrayHolder.length;
    console.log('Your current index is', currentIndex);
    const itemWidth = libraryArrayHolder[currentIndex].offsetWidth;
  
    let shiftAmount = 50;
    const desiredScrollPosition = currentIndex * itemWidth - libraryContainer.clientWidth / 2 + shiftAmount;
  
    libraryContainer.scrollLeft = desiredScrollPosition;

    libraryContainer.scrollTo({
      left: desiredScrollPosition,
      behavior: 'smooth',
    });
  
    updateLibraryItems();
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
  const template = document.querySelector('.library-item');
  const bookElement = template.cloneNode(true);

  const currentIndex = libraryArrayHolder.length;
  bookElement.setAttribute('data-index', currentIndex);
  bookElement.id = `library-item-${currentIndex}`;
  
  const titleElement = bookElement.querySelector('.title');
  if (titleElement) {
    titleElement.textContent = `Title: ${newBook.title}`;
  }

  const authorElement = bookElement.querySelector('.author-page');
  if (authorElement) {
    authorElement.textContent = `Author: ${newBook.author}`;
  }

  const pagesElement = bookElement.querySelector('.pages-read');
  if (pagesElement) {
    pagesElement.textContent = `Readed pages: ${newBook.pages}`;
  }

  const imageElement = bookElement.querySelector('.image');
  if (imageElement) {
    imageElement.src = newBook.image;
    imageElement.alt = `Image for ${newBook.title}`;
  }
  const informtionButton = bookElement.querySelector('#information-about');
  if(informtionButton){
    informtionButton.addEventListener('click',showNotification);
  }
  const removeButton = bookElement.querySelector('#remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      deleteItem(currentIndex);
    });
  }

  libraryContainer.appendChild(bookElement);

  libraryArrayHolder.push(bookElement);

  createLibrarySquare();
  updateLibraryItems();
  updateLibrarySquare();
}

function clearFormInputs() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('image-file').value = '';
}
const svgEdit = document.querySelectorAll('#edit');
function showEditItem() {
  const editBlockItem = document.querySelector('.edit-block-notification');
  if(editBlockItem.style.display === 'none' || 
     editBlockItem.style.display === ''){
      editBlockItem.style.display = 'block';
     }else{
      editBlockItem.style.display = 'none';
     }
}

svgEdit.forEach(item => {
  item.addEventListener('click', showEditItem);
});


const svgQuit = document.getElementById('svg-quit')
svgQuit.addEventListener('click', hideNotification);
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