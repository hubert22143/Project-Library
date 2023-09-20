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
const tittleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

function getTittleInputValue(){
    let tittleHolder = tittleInput.value;
    return tittleHolder;
}
function getAuthorInputValue(){
    let authorHolder = authorInput.value;
    return authorHolder;
}
//----------------------------------//
const submitValuesToLibrary = document.getElementById('submit');
let libraryArray = [];


function Book(author,title){
    this.author = author;
    this.title = title;
}

function addToLibrary(newBook){
    libraryArray.push(newBook);
    displayLibrary(libraryArray);
}

function displayLibrary(libraryArray){
    const bookContainer = document.querySelector('.book-container');
    console.log(libraryArray);
    if(bookContainer){
        bookContainer.innerHTML ='';
    for(newBook of libraryArray){
        const titleDisplay = document.createElement('div');
        titleDisplay.classList.add('tittle-display');
        titleDisplay.textContent = `Title: ${newBook.title}`;
        const authorDisplay = document.createElement('div');
        authorDisplay.classList.add('author-display');
        authorDisplay.textContent = `Author: ${newBook.author}`;
        const statusDisplay = document.createElement('div');
        statusDisplay.classList.add('status');
        statusDisplay.innerHTML = `Readed? <input type="checkbox" id="readed">`;
        bookContainer.appendChild(titleDisplay);
        bookContainer.appendChild(authorDisplay);
        bookContainer.appendChild(statusDisplay);
    }
}
}



submitValuesToLibrary.addEventListener('click', (e) => {
    libraryArray.forEach(book => {
        console.log(`Title: ${book.title}, Author: ${book.name}`);
        console.log(book);
    });
    e.preventDefault()
    let titleValue = getTittleInputValue();
    let authorValue = getAuthorInputValue();
    if (titleValue.trim() !== '' && authorValue.trim() !== '') {
        const newBook = new Book(titleValue, authorValue);
        addToLibrary(newBook);
    } else {
        alert('Please fill in both title and author fields.');
    }
    tittleInput.value = '';
    authorInput.value = '';
})
