
const track = document.getElementById('tecnologias-track');
const tecnologias = document.querySelectorAll('.tecnologia:not(.clone)');
let emMovimento = true;
let posicao = 0;
let animationId;


function obterLarguraTecnologia() {
    const tecnologia = document.querySelector('.tecnologia');
    
    return tecnologia.offsetWidth + 100;
}


function verificarReset() {
    const larguraTecnologia = obterLarguraTecnologia();
  
    if (Math.abs(posicao) >= larguraTecnologia * tecnologias.length) {
        
        track.style.transition = 'none';
        posicao = 0;
        track.style.transform = `translateX(${posicao}px)`;
        
        void track.offsetWidth;
        track.style.transition = 'transform 0.5s ease';
    }
}


function animar() {
    if (emMovimento) {
        posicao -= 1; 
        track.style.transform = `translateX(${posicao}px)`;
        verificarReset();
    }
    animationId = requestAnimationFrame(animar);
}


animar();


track.addEventListener('mouseenter', () => {
    emMovimento = false;
});


track.addEventListener('mouseleave', () => {
    emMovimento = true;
});


track.addEventListener('touchstart', () => {
    emMovimento = false;
}, { passive: true });

track.addEventListener('touchend', () => {
    emMovimento = true;
});


window.addEventListener('resize', () => {
    
    if (track.offsetParent !== null) {
        verificarReset();
    }
});


document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        animar();
    }
});
