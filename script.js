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
  let currentIndex = 0;

  function updateLibraryItems(){
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
  const imageInput = document.getElementById('image-file');
  const imageName = document.getElementById('placeholder');
  const imagePreview = document.getElementById('image-preview');

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
