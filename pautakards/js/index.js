const howToPlay = document.querySelector('.how-to-play-btn');
const closeBtn= document.querySelector('.close-how-to-play-btn');
const instructions = document.querySelector('.instructions-wrapper')
const audio = document.querySelector("#bg-music");
audio.play();
howToPlay.addEventListener('click', function(){
   
    instructions.classList.remove('hidden');
})

closeBtn.addEventListener('click',function(){
    instructions.classList.add('hidden');
})


