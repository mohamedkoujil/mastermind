//Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";


//Declaración de variables globales.
var master = [];
var userCombi = [];
var numsVistos = [];
var intento = 1;
var rowResultId = 0;
var pistaGenerada = false;
var pistasPorMostrar = 3;


function init() {
    //1. Genera el código random del master
    generaCombinacion();
}



/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    let resultContainer = document.querySelector('#Result');
    let infoUserChoices = document.querySelector('#combiUsr');

    if (!checkIfCorrect(master, userCombi)) {
        intento++;
        infoUser(intento);
        resultContainer.appendChild(createRowResult(userCombi));
        paintRowCellResult(resultContainer, userCombi);
        paintCirclesResult(resultContainer, master, userCombi);
    } else {
        infoUser(intento);

    }

    if (!pistaGenerada) pista()

    userCombi = [];
    console.log("Intento num: " + intento);
    infoUserChoices.innerHTML = '';
}

function continueGame() {
    // Reset game state or perform any actions needed to continue the game
    master = [];
    userCombi = [];
    numsVistos = [];
    intento = 1;
    rowResultId = 0;
    pistaGenerada = false;
    pistasPorMostrar = 3;

    // Clear existing result rows
    let resultContainer = document.querySelector('#Result');
    resultContainer.innerHTML = '';

    // Generate a new random combination for the user to guess
    generaCombinacion();

    // Clear the info section
    let info = document.querySelector('#infoDiv');
    info.innerHTML = '<p class="w90" id="info">Primer intento, suerte!</p>';
}


function infoUser(intento) {
    let infoDiv = document.querySelector('#infoDiv');

    if (checkIfCorrect(master, userCombi)) {
        if (intento == 1)info.innerHTML = "¡Felicidades! Lo has conseguido a la primera";
        else info.innerHTML = "¡Felicidades! Lo has conseguido en " + intento + ' intentos';
        // Create a "Continue" button
        let continueButton = document.createElement('button');
        continueButton.id = "continueButton"
        continueButton.innerText = 'Continue';
        continueButton.addEventListener('click', continueGame);
        infoDiv.appendChild(continueButton);
    } else {
        info.innerText = "Intento numero " + intento;
    }

}

function infoUserChoices(color) {

    let container = document.querySelector('#combiUsr');
    let colorUsrChoice = document.createElement('div');
    colorUsrChoice.className = "infoCombiUsr " + color
    if (color == 'white') colorUsrChoice.style.border = '0.5px black solid'
    container.appendChild(colorUsrChoice);

}

function checkIfCorrect(master, userCombi) {
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (master[i] != userCombi[i]) {
            return false
        }
    }
    return true
}


/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    if (userCombi.length < MAX_COMBI_COLORES) {
        userCombi.push(color);
        console.log(userCombi);
        infoUserChoices(color);
    } else {
        //TODO cambiar esto
        alert("No puedes añadir más colores");
    }


}

//Genera un número aleatorio entre 0 y el número de colores disponibles.
function generaNum() {
    var random = Math.floor(Math.random() * COLORS.length);
    console.log("Random: " + random);
    return COLORS[random];
}

/** Genera la combinación de colores que el usuario debe adivinar. */
function generaCombinacion() {
    let info = document.querySelector('#info')
    info.innerText = 'Primer intento, suerte!'
    for (var i = 0; i < MAX_COMBI_COLORES; i++) {
        master.push(generaNum());
    }
    console.log(master);
}

function createRowResult(color) {
    rowResultId++
    let rowResult = document.createElement('div');
    rowResult.className = 'rowResult w100 flex wrap';
    rowResult.id = 'intento' + rowResultId;

    // Div de la combinación del usuario
    let rowUserCombi = document.createElement('div');
    rowUserCombi.className = 'rowUserCombi w75 flex wrap';

    // Creacion de los colores de la combinación del usuario
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        let celUserCombi = document.createElement('div');
        celUserCombi.className = 'w25';
        celUserCombi.innerHTML = '<div class="celUserCombi flex"></div>';
        rowUserCombi.appendChild(celUserCombi);
    }

    rowResult.appendChild(rowUserCombi);

    // Creacion de los círculos de resultado
    let rowCercleResult = document.createElement('div');
    rowCercleResult.className = 'rowCercleResult w25 flex wrap center';

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        let cercleResultContainer = document.createElement('div');
        cercleResultContainer.className = 'w40 h40';
        cercleResultContainer.innerHTML = '<div class="cercleResult flex"></div>';
        rowCercleResult.appendChild(cercleResultContainer);
    }

    rowResult.appendChild(rowCercleResult);

    return rowResult;
}

function paintRowCellResult(rowResult, userCombi) {
    let rowUserCombi = rowResult.querySelectorAll('#intento' + rowResultId + ' .celUserCombi');
    console.log('#intento' + rowResultId + ' .celUserCombi')

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        rowUserCombi[i].classList.add(userCombi[i]);
    }

}

function paintCirclesResult(rowResult, master, userCombi) {
    let rowCercleResult = rowResult.querySelectorAll('#intento' + rowResultId + ' .cercleResult');
    //console.log('#intento' + intento + ' .cercleResult')
    //console.log(rowCercleResult)
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (master[i] == userCombi[i]) {
            rowCercleResult[i].style.backgroundColor = BLACK;

        } else {
            if (master.includes(userCombi[i])) {
                rowCercleResult[i].style.backgroundColor = WHITE;
            }
        }
    }
}


function mostrarPista() {
    if (pistasPorMostrar > 0) {
        let masterDiv = document.querySelectorAll('#master div div div')
        let random = Math.floor(Math.random() * master.length)
        console.log(master)

        do {
            random = Math.floor(Math.random() * master.length)
            console.log(random)
            console.log(numsVistos)
        } while (numsVistos.includes(random) || userCombi[random] == master[random])

        numsVistos.push(random)
        masterDiv[random].style.backgroundColor = master[random]
        if (master[random] == 'white') masterDiv[random].style.border = 'grey solid 1px'
        console.log(master[random])
        actPistasRestantes()
        pistasPorMostrar--
    } else {
        let infoPista = document.querySelector('#infoPista')
        infoPista.innerText = 'El maxim de pistes és 3'
        infoPista.classList = 'infoMaxPistas'
    }

}

function actPistasRestantes() {
    let container = document.querySelector('div#infoDiv button');
    container.innerText = '💡x'+(pistasPorMostrar-1)
}

function crearBotonPista() {

    let container = document.querySelector('div#infoDiv')
    let div = document.createElement('button')
    div.setAttribute("onclick", "mostrarPista()")
    div.id = 'infoPista'
    div.innerText = '💡x'+pistasPorMostrar
    container.appendChild(div)

}

function pista() {

    if (intento > 3) {
        console.log(pistaGenerada)
        pistaGenerada = true
        crearBotonPista()
    }


}

/** Template con el código HTML que corresponde a cada fila de juego/intento. */
/*
const ROW_RESULT = 
<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    </div>
</div>
*/