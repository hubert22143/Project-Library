// notification area //
const notificationButton = document.querySelectorAll('#information-about');
const quitNotification = document.getElementById('svg-quit');
const notificationContainer = document.querySelector('.notification-box-info');
const layerBackground = document.querySelector('.layer');
const movePanelLeft = document.querySelector('.svg-container-left');
const movePanelRight = document.querySelector('.svg-container-right');
const library = document.querySelector('.library');
const libraryItems = Array.from(library.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
let animeContent;

const detailsContainer = [
  {
    Name: 'Dragon Ball',
    Author: 'Akira Toriyama',
    Pages: '523',
  },
  {
    Name: 'Jujutsu Kaisen',
    Author: 'Gege Akutami',
    Pages: '289',
  },
  {
    Name: 'Naruto',
    Author: 'Masashi Kishimoto',
    Pages: '429',
  },
];

notificationButton.forEach((item,index) =>{
  item.addEventListener('click', ()=> {
    console.log('aha');
    notificationContainer.style.display = 'block';
    movePanelLeft.style.display = 'none';
    movePanelRight.style.display = 'none';
    layerBackground.style.display = 'block';
    let parentContainer = notificationContainer;
    quitNotification.addEventListener('click', () => {
      animeContent.innerHTML = '';
      notificationContainer.style.display = 'none';
      movePanelLeft.style.display = 'block';
      movePanelRight.style.display = 'block';
      layerBackground.style.display = 'none';
  })
    animeContent = document.createElement('div');
    animeContent.setAttribute('class','anime-content');
    parentContainer.appendChild(animeContent);
    let AnimeContentHeader = document.createElement('div');
    AnimeContentHeader.setAttribute('class','Anime-Header');
    animeContent.appendChild(AnimeContentHeader);
    console.log('The clicked item is:', index);
    let details = detailsContainer[index];
    if (details) {
      AnimeContentHeader.textContent = "Name: " + details.Name + ", Author: " + details.Author + ", Pages: " + details.Pages;
    } else {
      console.log("hmm");
    }
  })

})

layerBackground.addEventListener('click', () => {
  layerBackground.style.display = 'none';
  movePanelLeft.style.display = 'block';
  movePanelRight.style.display = 'block';
})



let removeButton = document.querySelectorAll('#remove');
removeButton.forEach((item,index) => {
item.addEventListener('click', () => {
  let containers = document.querySelectorAll('.library-item');
  console.log(containers);
  if (index >= 0 && index < containers.length) {
    containers[index].remove();
    updateCarousel();
    console.log(containers[index]);
  }
})
})

let currentIndex = 0;
let removedIndices = Array.from({ length: libraryItems.length }, (_, index) => index);
movePanelLeft.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + libraryItems.length) % libraryItems.length;
  updateCarousel();
});



movePanelRight.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % libraryItems.length;
 updateCarousel();
});

function updateCarousel() {
  console.log(libraryItems.length);
  console.log(currentIndex);
  libraryItems.forEach((item, index) => {
    console.log('Your index:' + index);
    const offset = (index - currentIndex);
    const scaleFactor = Math.max(1 - Math.abs(offset) * 0.9, 0.8);
    item.style.transform = `translateX(${offset * 100}px) scale(${scaleFactor})`;
  });
}

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

function Book(author, title, pages,image,status) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.image = image;
  this.status = status;
  this.imageId = generateUniqueImageSrc();
  this.checkboxId = generateUniqueId();
  this.statusDisplayClass = generateUniqueClass();
  this.statusId = generateUniqueId();
  this.divNewClass = generateUniqueClass();
}
function generateUniqueId() {
  return 'status-' + Math.random().toString(36).substring(2);
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
Book.prototype.status = function(){
  const statusReaded = document.querySelector(`.${this.statusId}`);
  if(statusReaded.innerHTML = "Readed"){
    statusReaded.style.backgroundColor = 'green';
  }else{
    statusReaded.style.backgroundColor = 'red';
  }
}
Book.prototype.toggle = function (){
  this.status = !this.status;
};
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

      const buttonDisplay = document.createElement('button');
      buttonDisplay.classList.add(`${this.statusId}`);
      buttonDisplay.type = 'button';
      buttonDisplay.addEventListener('click', (e) => {
        buttonDisplay.forEach((item) => {
          item.toggle();
          item.status();
          if(this.status){
            item.innerHTML = "Readed";
          }else{
            item.innerHTML = "Unreaded";
          }
        });

      })

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
      bookContainer.appendChild(buttonDisplay);
      
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
      itemContent.classList.add('content-library')
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

      libraryItems.push(newItem);
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
let editButtons = document.querySelectorAll('#edit');
function editButton(){
  const defaultLibrary = [
    {
      title: "Dragon Ball",
      image: "dragon_ball_image.jpg",
      info: "Dragon ball is a story...",
      status: "Readed",
      author: "SomeGuy :/",
      pages: '600',

    },
    {
      title: "Jujutsu Kaisen",
      image: "jujutsu_image.jpg",
      info: "Jujutsu kaisen is a story...",
      status: "Unreaded",
      author: "SomeGuy :) ",
      pages: '600',
    },
    {
      title: "Naruto",
      image: "naruto_image.jpg",
      info: "Naruto is a story...",
      status: "Readed",
      author: "SomeGuy :D ",
      pages: '600',
    },
  ];
let editButtons = document.querySelectorAll('#edit');
let editContainer = document.querySelector('.edit-block-notification');
let editCancel = document.getElementById('edit-cancel');
let editTittle = document.getElementById('Edit-Tittle');
let editInfo = document.getElementById('Edit-Info');
let editAuthor = document.getElementById('Edit-Author');
let editPages = document.getElementById('Edit-Pages');
let editStatus = document.getElementById('Edit-Status');
let EditImageSrc = document.getElementById('Edit-Image');
let editImage = document.getElementById('edit-image-preview');

editCancel.addEventListener('click', () => {
  editContainer.style.display = 'none';
});

editButtons.forEach((item,index) => {
  item.addEventListener('click', () => {
    editContainer.style.display = 'block';
    let dataChange = defaultLibrary[index];
    editTittle.value = dataChange.title;
    editInfo.value = dataChange.info;
    editAuthor.value = dataChange.author;
    editPages.value = dataChange.pages;
    editStatus.value = dataChange.status;
    EditImageSrc.src = dataChange.image;
    editImage.src = EditImageSrc.src;
  });

});

}
editButton();