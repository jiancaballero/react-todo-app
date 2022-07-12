const howToPlay = document.querySelector('.how-to-play-btn');
const closeBtn= document.querySelector('.close-how-to-play-btn');
const instructions = document.querySelector('.instructions-wrapper')

howToPlay.addEventListener('click', function(){
   
    instructions.classList.remove('hidden');
})

closeBtn.addEventListener('click',function(){
    instructions.classList.add('hidden');
})


