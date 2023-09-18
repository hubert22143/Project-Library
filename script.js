// notification area //
const notificationButton = document.getElementById('notification-button');
const quitNotification = document.getElementById('svg-quit');
const notificationContainer = document.querySelector('.notification-box-info');
const body = document.body;
const movePanelLeft = document.querySelector('.svg-container-left');
const movePanelRight = document.querySelector('.svg-container-right')
notificationButton.addEventListener('click', () => {
notificationContainer.style.display = 'block';
movePanelLeft.style.display = 'none';
movePanelRight.style.display = 'none';
});
quitNotification.addEventListener('click', () => {
    notificationContainer.style.display = 'none';
    movePanelLeft.style.display = 'block';
    movePanelRight.style.display = 'block';
})
//-------------------------------//

