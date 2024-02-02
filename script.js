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
var adivinados = []

function init() {
    //1. Genera el código random del master
    generaCombinacion();
}

function modificadorDOM(tag, id, clase, texto, padre) {
    let elemento = document.createElement(tag);
    elemento.id = id;
    elemento.className = clase;
    elemento.innerText = texto;
    padre.appendChild(elemento);
}

function modificarElementoDOM(id, texto) {
    let elemento = document.querySelector(id);
    elemento.innerText = texto;
}



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

    // Borrar resultats
    let resultContainer = document.querySelector('#Result');
    resultContainer.innerHTML = '';

    // Nova combinació
    generaCombinacion();

    // Borrar secció info
    let info = document.querySelector('#infoDiv');
    info.innerHTML = '<p class="w90" id="info">Primer intento, suerte!</p>';

    // Borrar master
    let masterCells = document.querySelectorAll('#master div div')
    for (let i of masterCells) {
        i.style.backgroundColor = ''
    }
}


function infoUser(intento) {

    if (checkIfCorrect(master, userCombi)) {
        //Borramos el contenido del div infoDiv
        modificarElementoDOM('#infoDiv', '');
        if (intento == 1) modificadorDOM('p', 'info', 'w90', '¡Felicidades! Lo has conseguido en a la primera', infoDiv);
        else modificadorDOM('p', 'info', 'w90', '¡Felicidades! Lo has conseguido en ' + intento + ' intentos', infoDiv);
        // Create a "Continue" button
        modificadorDOM('button', 'continue', 'w90', 'Continuar', infoDiv);
        let continueButton = document.querySelector('#continue');
        continueButton.addEventListener('click', continueGame);
    } else {
        modificarElementoDOM('#info', 'Intento ' + intento );
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

function createRowResult() {
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
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (master[i] == userCombi[i]) {
            rowCercleResult[i].style.backgroundColor = BLACK;
            adivinados.push(userCombi[i])

        } else {
            if (master.includes(userCombi[i])) {
                console.log("asd" + adivinados)
                if (!adivinados.includes(userCombi[i])) rowCercleResult[i].style.backgroundColor = WHITE;
                else rowCercleResult[i].style.backgroundColor = GREY;
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
        pintarMaster(masterDiv, random)
        console.log(master[random])
        actPistasRestantes()
        pistasPorMostrar--
        
    } else {
        let infoPista = document.querySelector('#infoPista')
        infoPista.innerText = 'El maxim de pistes és 3'
        infoPista.classList = 'infoMaxPistas'
    }

}

function pintarMaster (masterDiv, random) {
    masterDiv[random].style.backgroundColor = master[random]
    if (master[random] == 'white') masterDiv[random].style.border = 'grey solid 1px'
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
