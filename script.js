let posicaoAtual = 0;
const carrossel = document.getElementById('carrossel');
const cards = document.querySelectorAll('.card');
let cardWidth = 0;
let visibleCards = 4; 


function ajustarCarrossel() {
    const larguraTela = window.innerWidth;
    const totalCards = cards.length;
    
    if (larguraTela < 576) {
        visibleCards = 1;
    } else if (larguraTela < 768) {
        visibleCards = 2;
    } else if (larguraTela < 992) {
        visibleCards = 3;
    } else {
        visibleCards = 4;
    }
    
    
    const containerWidth = document.querySelector('.carrossel-container').offsetWidth;
    const marginTotal = 20 * 2; 
    cardWidth = (containerWidth / visibleCards) - marginTotal;
    
   
    cards.forEach(card => {
        card.style.flexBasis = `${cardWidth}px`;
    });
    
    
    if (posicaoAtual > totalCards - visibleCards) {
        posicaoAtual = Math.max(0, totalCards - visibleCards);
    }
    
  
    const slideAmount = (cardWidth + marginTotal) * posicaoAtual;
    carrossel.style.transform = `translateX(-${slideAmount}px)`;
}

function moverCarrossel(direcao) {
    const totalCards = cards.length;
    const maxPosicao = totalCards - visibleCards;
    
    if (direcao > 0) { 
        posicaoAtual = posicaoAtual >= maxPosicao ? 0 : posicaoAtual + 1;
    } else { 
        posicaoAtual = posicaoAtual <= 0 ? maxPosicao : posicaoAtual - 1;
    }

    const marginTotal = 20 * 2; 
    const slideAmount = (cardWidth + marginTotal) * posicaoAtual;
    carrossel.style.transform = `translateX(-${slideAmount}px)`;
}


window.addEventListener('load', ajustarCarrossel);
window.addEventListener('resize', ajustarCarrossel);


let touchStartX = 0;
let touchEndX = 0;

carrossel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carrossel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
       
        moverCarrossel(1);
    } else if (touchEndX > touchStartX + 50) {
        
        moverCarrossel(-1);
    }
}


let autoplayInterval = setInterval(() => {
    moverCarrossel(1);
}, 5000);


carrossel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carrossel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        moverCarrossel(1);
    }, 5000);
});



