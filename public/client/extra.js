const closeButton = document.querySelector('#close-button');
const profileCard = document.querySelector('.profile-card');
const menu=document.querySelector(".hmmen")
menu.addEventListener('click', () => {
    profileCard.style.display = 'flex';
    menu.style.display="none";
    profileCard.style.animation = "";  
});
  
closeButton.addEventListener('click', () => {
    menu.style.display="flex";
    profileCard.style.animation = 'slideOut .5s forwards';
//   profileCard.style.display = 'none';
   
});
