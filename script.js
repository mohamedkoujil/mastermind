// Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";
const jsConfetti = new JSConfetti(); // Instancia de la biblioteca para efecto de confeti.

// Declaración de variables globales.
var master = [];
var userCombi = [];
var numsVistos = [];
var intento = 1;
var rowResultId = 0;
var pistaGenerada = false;
var pistasPorMostrar = 3;
var adivinados = [];

// Inicialización del juego.
function init() {
    generaCombinacion(); // Generar la combinación de colores del master.
}

// Procedimiento para modificar el DOM y crear elementos HTML.
function modificadorDOM(tag, id, clase, texto, padre) {
    let elemento = document.createElement(tag);
    elemento.id = id;
    elemento.className = clase;
    elemento.innerText = texto;
    padre.appendChild(elemento);
}

// Procedimiento para modificar el contenido de un elemento del DOM.
function modificarElementoDOM(id, texto, clase) {
    let elemento = document.querySelector(id);
    elemento.innerText = texto;
    if (typeof clase != 'undefined' && clase != '') elemento.classList.add(clase);
}

// Procedimiento para comprobar la combinación del usuario.
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
    if (!pistaGenerada) pista();

    userCombi = [];
    infoUserChoices.innerHTML = '';
}

// Procedimiento para continuar el juego después de la victoria.
function continueGame() {
    // Reiniciar el estado del juego.
    master = [];
    userCombi = [];
    numsVistos = [];
    intento = 1;
    rowResultId = 0;
    pistaGenerada = false;
    pistasPorMostrar = 3;

    // Borrar resultados.
    let resultContainer = document.querySelector('#Result');
    resultContainer.innerHTML = '';

    // Generar nueva combinación.
    generaCombinacion();

    // Quitar la clase center del div infoDiv.
    let infoDiv = document.querySelector('#infoDiv');
    infoDiv.classList.remove('center');

    // Borrar sección de información.
    let info = document.querySelector('#infoDiv');
    info.innerHTML = '<p class="w90" id="info">Primer intento, ¡suerte!</p>';

    // Borrar master.
    let masterCells = document.querySelectorAll('#master div div');
    for (let i of masterCells) {
        i.style.backgroundColor = '';
    }
    
    // Devolver el botón de comprobar.
    let checkButton = document.querySelector('#check');
    checkButton.setAttribute("onclick", "Comprobar()");
    checkButton.innerText = 'Comprobar';

}

// Procedimiento para mostrar información al usuario.
function infoUser(intento) {
    if (checkIfCorrect(master, userCombi)) {
        
        // Añadir efecto de confeti en caso de victoria.   
        jsConfetti.addConfetti(); 

        // Borrar el contenido del div infoDiv y centrar el contenido.
        modificarElementoDOM('#infoDiv', '', 'center');

        // Mostrar mensaje de felicitaciones y botón de continuar.
        if (intento == 1) modificadorDOM('p', 'info', 'w90', '¡Felicidades! Lo has conseguido en la primera', infoDiv);
        else modificadorDOM('p', 'info', 'w90', '¡Felicidades! Lo has conseguido en ' + intento + ' intentos', infoDiv);

        // Reemplazar el botón de comprobar por el botón de continuar.
        let checkButton = document.querySelector('#check');
        checkButton.setAttribute("onclick", "continueGame()");
        checkButton.innerText = 'Continuar';

    } else {
        modificarElementoDOM('#info', 'Intento ' + intento);
    }
}

// Procedimiento para mostrar la elección de colores del usuario.
function infoUserChoices(color) {
    let container = document.querySelector('#combiUsr');
    let colorUsrChoice = document.createElement('div');
    colorUsrChoice.className = "infoCombiUsr " + color;
    if (color == 'white') colorUsrChoice.style.border = '0.5px black solid';
    container.appendChild(colorUsrChoice);
}

// Función para comprobar si la combinación es correcta.
function checkIfCorrect(master, userCombi) {
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (master[i] != userCombi[i]) {
            return false;
        }
    }
    return true;
}

// Procedimiento que se ejecuta cuando el usuario selecciona un color.
function añadeColor(color) {
    if (userCombi.length < MAX_COMBI_COLORES) {
        userCombi.push(color);
        infoUserChoices(color);
    } else {
        alert("No puedes añadir más colores"); // TODO: Cambiar esto.
    }
}

// Generar un número aleatorio entre 0 y el número de colores disponibles.
function generaNum() {
    do {
        var random = Math.floor(Math.random() * COLORS.length);
    } while (master.includes(COLORS[random]));
    return COLORS[random];
}

// Generar la combinación de colores que el usuario debe adivinar.
function generaCombinacion() {
    let info = document.querySelector('#info');
    info.innerText = 'Primer intento, ¡suerte!';
    for (var i = 0; i < MAX_COMBI_COLORES; i++) {
        master.push(generaNum());
    }
    console.log(master);
}

// Crear una fila de resultados en el tablero.
function createRowResult() {
    rowResultId++;
    let rowResult = document.createElement('div');
    rowResult.className = 'rowResult w100 flex wrap';
    rowResult.id = 'intento' + rowResultId;

    // Div de la combinación del usuario.
    let rowUserCombi = document.createElement('div');
    rowUserCombi.className = 'rowUserCombi w75 flex wrap';

    // Creación de los colores de la combinación del usuario.
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        let celUserCombi = document.createElement('div');
        celUserCombi.className = 'w25';
        celUserCombi.innerHTML = '<div class="celUserCombi flex"></div>';
        rowUserCombi.appendChild(celUserCombi);
    }

    rowResult.appendChild(rowUserCombi);

    // Creación de los círculos de resultado.
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

// Pintar los colores de la combinación del usuario en la fila de resultados.
function paintRowCellResult(rowResult, userCombi) {
    let rowUserCombi = rowResult.querySelectorAll('#intento' + rowResultId + ' .celUserCombi');

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        rowUserCombi[i].classList.add(userCombi[i]);
    }
}

// Pintar los círculos de resultado en la fila de resultados.
function paintCirclesResult(rowResult, master, userCombi) {
    let rowCercleResult = rowResult.querySelectorAll('#intento' + rowResultId + ' .cercleResult');
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (master[i] == userCombi[i]) {
            rowCercleResult[i].style.backgroundColor = BLACK;
            adivinados.push(userCombi[i]);
        } else {
            if (master.includes(userCombi[i])) {
                if (!adivinados.includes(userCombi[i])) rowCercleResult[i].style.backgroundColor = WHITE;
                else rowCercleResult[i].style.backgroundColor = GREY;
            }
        }
    }
}

// Mostrar una pista al usuario.
function mostrarPista() {
    if (pistasPorMostrar > 0) {
        let masterDiv = document.querySelectorAll('#master div div div');
        let random = Math.floor(Math.random() * master.length);

        do {
            random = Math.floor(Math.random() * master.length);
        } while (numsVistos.includes(random) || userCombi[random] == master[random]);

        numsVistos.push(random);
        pintarMaster(masterDiv, random);
        actPistasRestantes();
        pistasPorMostrar--;
    } else {
        let infoPista = document.querySelector('#infoPista');
        infoPista.innerText = 'El máximo de pistas es 3';
        infoPista.classList = 'infoMaxPistas';
    }
}

// Pintar la pista en el tablero del master.
function pintarMaster(masterDiv, random) {
    masterDiv[random].style.backgroundColor = master[random];
    if (master[random] == 'white') masterDiv[random].style.border = 'grey solid 1px';
}

// Actualizar el contador de pistas restantes.
function actPistasRestantes() {
    let container = document.querySelector('div#infoDiv button');
    container.innerText = '💡x' + (pistasPorMostrar - 1);
}

// Crear el botón de pista.
function crearBotonPista() {
    let container = document.querySelector('div#infoDiv');
    let div = document.createElement('button');
    div.setAttribute("onclick", "mostrarPista()");
    div.id = 'infoPista';
    div.innerText = '💡x' + pistasPorMostrar;
    container.appendChild(div);
}

// Generar una pista después de ciertos intentos.
function pista() {
    if (intento > 3) {
        pistaGenerada = true;
        crearBotonPista();
    }
}
