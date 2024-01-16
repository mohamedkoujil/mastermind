//Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";


//Declaración de variables globales.
const master = [];
var userCombi = [];
var intento = 0;
var aciertos = 0;

function init() {
    //1. Genera el código random del master
    generaCombinacion();
    //2. Crea todas las filas según el número de intentos.
}



/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    for (var i = 0; i < master.length; i++) {
        if (master[i] == userCombi[i]) {
            aciertos++;
            break;
        } else {
            intento++;
            break;
        }
    }
    let resultContainer = document.querySelector('#Result');
    resultContainer.appendChild(createRowResult());
    paintRowCellResult(resultContainer, userCombi);
    paintCirclesResult(resultContainer, master, userCombi);
    userCombi = [];
    console.log("Aciertos: " + aciertos);
    console.log("Intentos: " + intento);
}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    if (userCombi.length < MAX_COMBI_COLORES) {
        userCombi.push(color);
        console.log(userCombi);
    } else {
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
    for (var i = 0; i < MAX_COMBI_COLORES; i++) {
        master.push(generaNum());
    }
    console.log(master);
}

function createRowResult() {
    const rowResult = document.createElement('div');
    rowResult.className = 'rowResult w100 flex wrap';

    // Creating the user combination part
    const rowUserCombi = document.createElement('div');
    rowUserCombi.className = 'rowUserCombi w75 flex wrap';

    // Creating cells for the user combination
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        const celUserCombi = document.createElement('div');
        celUserCombi.className = 'w25';
        celUserCombi.innerHTML = '<div class="celUserCombi flex"></div>';
        rowUserCombi.appendChild(celUserCombi);
    }

    rowResult.appendChild(rowUserCombi);

    // Creating the result circles part
    const rowCercleResult = document.createElement('div');
    rowCercleResult.className = 'rowCercleResult w25 flex wrap center';

    // Creating cells for the result circles
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        const cercleResultContainer = document.createElement('div');
        cercleResultContainer.className = 'w40 h40';
        cercleResultContainer.innerHTML = '<div class="cercleResult flex"></div>';
        rowCercleResult.appendChild(cercleResultContainer);
    }

    rowResult.appendChild(rowCercleResult);

    return rowResult;
}

function paintRowCellResult(rowResult, userCombi) {
    let rowUserCombi = rowResult.querySelectorAll('.rowUserCombi .flex');

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        rowUserCombi[i].style.backgroundColor = userCombi[i];
    }
}

function paintCirclesResult(rowResult, master, userCombi) {
    let rowCercleResult = rowResult.querySelectorAll('.rowCercleResult .flex');

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