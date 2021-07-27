// Récupération de toutes les cases
const allCases = document.querySelectorAll('.case');

// Récupération de l'écran de fin
const endScreen = document.querySelector('.end-screen');

// Joueur 0 => Round
// Joueur 1 => Cross
let player = 0;
let playing = true;
let mode  = 'multi';

allCases.forEach( el => {

    // Ajout du listener sur les case
    el.addEventListener('click', (e) => {
        
        // On vérifie que la partie est lancé
        if( !playing ) return;

        // On regarde si la case est vide
        if (el.classList.contains('cross') || el.classList.contains('round')) {
            // Si elle est déjà prise on fait rien
            return
        }
        else{

            if( mode == "multi" ){
                if( player === 0 ){
                    el.classList.add('round')
                    player = 1;
                    document.querySelector('.tour').innerHTML = `<p>C'est au tour du joueur X</p>`;
                }
                else{
                    el.classList.add('cross')
                    player = 0;
                    document.querySelector('.tour').innerHTML = `<p>C'est au tour du joueur O</p>`;
                }                
            }
            else if ( mode == "solo" ) {
                if ( player === 0 ) {
                    el.classList.add('round')
                    player = 1;
                }
            }

            check();

            if( mode === "solo" && playing == true){
                setTimeout(() => {
                    generateRandomCase();
                }, 200);
                check();
                player = 0;
            }
        }

    });

});


function checkWin() {
    if( allCases[0].classList.value == allCases[1].classList.value && allCases[1].classList.value == allCases[2].classList.value && allCases[0].classList.length > 1){
       return true;
   }
   else if( allCases[3].classList.value == allCases[4].classList.value && allCases[4].classList.value == allCases[5].classList.value && allCases[3].classList.length > 1){
       return true;
   }
   else if( allCases[6].classList.value == allCases[7].classList.value && allCases[7].classList.value == allCases[8].classList.value && allCases[6].classList.length > 1){
       return true;
   }
   else if( allCases[0].classList.value == allCases[3].classList.value && allCases[3].classList.value == allCases[6].classList.value && allCases[3].classList.length > 1){
       return true;
   }
   else if( allCases[1].classList.value == allCases[4].classList.value && allCases[4].classList.value == allCases[7].classList.value && allCases[4].classList.length > 1){
       return true;
   }
   else if( allCases[2].classList.value == allCases[5].classList.value && allCases[5].classList.value == allCases[8].classList.value && allCases[5].classList.length > 1){
       return true;
   }
   else if( allCases[0].classList.value == allCases[4].classList.value && allCases[4].classList.value == allCases[8].classList.value && allCases[4].classList.length > 1){
       return true;
   }
   else if( allCases[2].classList.value == allCases[4].classList.value && allCases[4].classList.value == allCases[6].classList.value && allCases[2].classList.length > 1){
       return true;
   }
   
   return false;
}

function checkNul(){
    for( let i = 0; i < allCases.length; i++ ){
        if( allCases[i].classList.contains('round') || allCases[i].classList.contains('cross') ){
         continue;
        }
        else{
            return false;
        }
     }
     return true;
}

// Relancer une partie
const btnLaunch = document.querySelector('#btn-launch');
btnLaunch.addEventListener('click', () => {
    // On remet toutes les cases à leur valeur initiale
    allCases.forEach( el => {
        el.classList.remove('round');
        el.classList.remove('cross');
    });

    // On remet le joueur à 0
    player = 0;
    //On remet l'état de la partie à true
    playing = true;
    // On retire l'écran de fin si il est affiché
    endScreen.classList.add('hidden');
});


function showEndScreen() {
    endScreen.classList.remove('hidden');
    endScreen.innerHTML = `
    <h2>Le joueur ${player === 0 ? 'X' : 'O'} a gagné !</h2>
    `;

    setTimeout(() => {
        endScreen.classList.add('hidden');
    }, 5000);
}

function showNulScreen() {
    endScreen.classList.remove('hidden');
    endScreen.innerHTML = `
    <h2>Match nul !</h2>
    `;

    setTimeout(() => {
        endScreen.classList.add('hidden');
    }, 5000);
}

function generateRandomCase() {
    randomIndex = Math.floor(Math.random() * 9);
    if( allCases[randomIndex].classList.contains("round") || allCases[randomIndex].classList.contains("cross") ){
        generateRandomCase();
    }
    else{
        allCases[randomIndex].classList.add('cross');
    }
}

function check() {
    // On regarde si un joueur a gagné
    if (checkWin() == true) {
        playing = false;
        showEndScreen();
        return;
    }
    else if (checkNul() == true) {
        playing = false;
        showNulScreen();
        return;
    }
}


// Passage solo / à multi
const btnMode = document.querySelector('#btn-mode');
btnMode.addEventListener('click', () => {
    if( mode === 'multi' ){
        mode = 'solo';
        btnMode.innerHTML = "Passer en multi";
    }
    else{
        mode = 'multi';
        btnMode.innerHTML = "Passer en solo"
    }

});