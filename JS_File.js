
//Modelul proiectului
//elemente folosite pentru canvasul de desenat
let canvas, context, W, H;
//forma pe care utilizatorul o deseneaza (dreptunghi/elipsa/linie)
let currentTool;
//coordonate mouse
let mx = 0, my = 0, mx1 = 0, my1 = 0;
//bool care determina daca utilizatorul deseneaza sau nu
let drawing = false;
//vector pentru elementele desenate
let shapes = [];
//coordonate
let xStart, yStart;
//culoarea curenta cu care sunt desenate formele - initial negru
let color = 'rgb(0,0,0)';
//elemente folosite pentru canvasul care stabileste line width-ul
let progressBar, pB, w, h;
//line width-ul curent folosit pentru desenare
let lwidth = 1;
//coordonate mouse
let mx2 = 0, my2 = 0;
//culoarea background-ului
let colorBG = 'ghostwhite';
//lista 
let lista;
//contor folosit pentru stabilirea id-ului fiecarei forme
let id = 0;
//functia de desenare
function desenare() {
    //initializam/stergem scena
    context.clearRect(0, 0, W, H);
    context.fillStyle = colorBG;
    context.fillRect(0, 0, W, H);

    //initializam canvasul pentru setarea line width-ului
    pB.clearRect(0, 0, w, h);
    pB.fillRect(0, 0, lwidth * w / 15, h);


    //desenam formele stocate in vector (formele care au fost desenate pana in momentul prezent)
    //verificam cu ajutorul atributului type ce forma dorim sa desenam si o desenam cu latimea si culoarea liniei corespunzatoare cu ajutorul atributelor lwidth respectiv color
    for (let forma of shapes) {
        if (forma.type == 'dreptunghi') {
            context.strokeStyle = forma.color;
            context.lineWidth = forma.lwidth;
            context.strokeRect(forma.x, forma.y, forma.width, forma.height);
        }
        else if (forma.type == 'elipsa') {
            context.strokeStyle = forma.color;
            context.lineWidth = forma.lwidth;
            context.beginPath();
            context.ellipse(forma.x, forma.y,
                forma.radiusX, forma.radiusY,
                Math.PI / 4, 0, Math.PI * 2);
            context.stroke();
        }
        else if (forma.type == 'linie') {
            context.strokeStyle = forma.color;
            context.lineWidth = forma.lwidth;
            context.beginPath();
            context.moveTo(forma.xStart, forma.yStart);
            context.lineTo(forma.xEnd, forma.yEnd);
            context.stroke();
        }
    }
    //verificam daca utilizatorul deseneaza (mousedown)
    if (drawing == true) {
        //deseneaza
        //setam latimea si culoarea liniei (alese de utilizator)
        context.lineWidth = lwidth;
        context.strokeStyle = color;
        //verificam ce forma deseneaza
        if (currentTool == 'rectangle') {
            //desenam un dreptunghi
            context.strokeRect(Math.min(xStart, mx), Math.min(yStart, my),
                Math.max(xStart, mx) - Math.min(xStart, mx), Math.max(yStart, my) - Math.min(yStart, my));
        }

        else if (currentTool == 'ellipse') {
            //desenam o elipsa
            context.beginPath();
            context.ellipse(Math.min(xStart, mx), Math.min(yStart, my),
                Math.max(xStart, mx) - Math.min(xStart, mx), Math.max(yStart, my) - Math.min(yStart, my),
                Math.PI / 4, 0, Math.PI * 2);
            context.stroke();

        } else if (currentTool == 'line') {
            //desenam o linie
            context.beginPath();
            context.moveTo(xStart, yStart);
            context.lineTo(mx, my);
            context.stroke();
        }
    }
    //scena va fi desenata incontinuu
    requestAnimationFrame(desenare);
}
//aflam pozitia mouse-ului in canvas/ tratam evenimentul de mousemove in canvas-ul pentru desenat
function mouseMove(e) {
    mx = e.x - canvas.getBoundingClientRect().x;
    my = e.y - canvas.getBoundingClientRect().y;
}
//la mousedown incepe desenarea / tratam evenimentul de mousedown in canvas-ul pentru desenat
function mouseDown(e) {
    //retinem coordonatele punctului unde utilizatorul a inceput desenarea
    xStart = mx;
    yStart = my;
    drawing = true;
}
function mouseUp(e) {
    //inceteaza desenarea
    drawing = false;
    //calculam id-ul formei ce este adaugata in vector si lista
    id++;
    //cream un element care va fi adaugat in lista de forme
    let listElement = document.createElement('li');
    //verificam ce forma am desenat,ii stabilim coordonatele, textul ce va fi adaugat in lista 
    let element;
    if (currentTool == 'rectangle') {
        element = document.createElement('rect');
        setareCoordonateDreptunghi(element, color, lwidth, xStart, yStart, mx, my);
        listElement.innerText = ('rectangle -> X: ' + `${element.x}` + ',  Y: ' + `${element.y}` + ', Width: ' + `${element.width}` + ', Height: ' + `${element.height}`);

    }
    else if (currentTool == 'ellipse') {
        element = document.createElement('ellipse');
        setareCoordonateElipsa(element, color, lwidth, xStart, yStart, mx, my);
        listElement.innerText = ('ellipse -> X:  ' + `${element.x}` + ', Y: ' + `${element.y}` + ', Raza X: ' + `${element.radiusX}` + ', Raza Y: ' + `${element.radiusY}`);
        listElement.addEventListener('dblclick', stergeElement);


    } else if (currentTool == 'line') {
        element = document.createElement('line');
        setareCoordonateLinie(element, color, lwidth, xStart, yStart, mx, my);
        listElement.innerText = ('line -> XStart: ' + `${element.xStart}` + ', YStart: ' + `${element.yStart}` + ', XEnd: ' + `${element.xEnd}` + ', YEnd: ' + `${element.yEnd}`);

    }
    //atribuim id elementelor adugate in vector si lista -> acesta coincide pentru stergere
    element.id = id;
    listElement.id = id;
    //adaugam event handler pentru dublu click pe un eveniment al listei
    listElement.addEventListener('dblclick', stergeElement);
    //adaugam elementele in vector respectiv lista
    lista.append(listElement);
    shapes.push(element);

}
//setam atributele unui dreptunghi
function setareCoordonateDreptunghi(element, color, lwidth, x1, y1, x2, y2) {
    element.color = color;
    element.lwidth = lwidth;
    element.type = 'dreptunghi';
    element.x = Math.min(x1, x2);
    element.y = Math.min(y1, y2);
    element.width = Math.max(x1, x2) - Math.min(x1, x2);
    element.height = Math.max(y1, y2) - Math.min(y1, y2);
}
//setam atribute elipsa
function setareCoordonateElipsa(element, color, lwidth, xStart, yStart, xEnd, yEnd) {
    element.color = color;
    element.lwidth = lwidth;
    element.type = 'elipsa';
    element.x = Math.min(xStart, xEnd);
    element.y = Math.min(yStart, yEnd);
    element.radiusX = Math.max(xStart, xEnd) - Math.min(xStart, xEnd);
    element.radiusY = Math.max(yStart, yEnd) - Math.min(yStart, yEnd);


}
//setam atribute linie
function setareCoordonateLinie(element, color, lwidth, xStart, yStart, x, y) {
    element.color = color;
    element.lwidth = lwidth;
    element.type = 'linie';
    element.xStart = xStart;
    element.yStart = yStart;
    element.xEnd = x;
    element.yEnd = y;
}

//stergem elementele din vectorul de forme, respectiv din lista
function stergeElement(e) {
    //stergem din vector elementul care are id-ul identic cu id-ul itemului pe care s-a facut dublu click in lista
    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].id === e.target.id) {
            shapes.splice(i, 1);
        }
    }
    //stergem item-ul din lista
    e.target.remove()
}

//alegem un tool cu care desenam
//cu ajutorul clasei selected desenam conturul butonului selectat
function toolEllipse() {
    buttonEllipse.classList.add("selected");
    currentTool = 'ellipse';
    buttonLine.classList.remove("selected");
    buttonRectangle.classList.remove("selected");
}
function toolRectangle() {
    buttonRectangle.classList.add("selected");
    currentTool = 'rectangle';
    buttonEllipse.classList.remove("selected");
    buttonLine.classList.remove("selected");
}
function toolLine() {
    buttonLine.classList.add("selected");
    currentTool = 'line';
    buttonEllipse.classList.remove("selected");
    buttonRectangle.classList.remove("selected");
}
//alegem culoare pentru stroke forme
function chooseColor(c) {
    color = c;
}
//alegem culoare background
function chooseColorBG(c) {
    colorBG = c;
}
//functie pentru a salva o imagine raster
function saveRaster() {
    let a = document.createElement('a');
    a.download = 'Painting.jpg';
    a.href = canvas.toDataURL('image/jpeg', 0.7);
    a.click();
}
function aplicatie() {
    //obtinem referinte la cele doua elemente canvas din html
    canvas = document.querySelector('#canvas');
    context = canvas.getContext('2d');
    context.lineWidth = 1;
    W = canvas.width; H = canvas.height;

    progressBar = document.querySelector('#progressBar');
    pB = progressBar.getContext('2d');
    w = progressBar.width; h = progressBar.height;

    //apelam functia de desenare
    desenare();
    //adaugam evenimente pentru canvas
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    //obtinem referinte la butoanele din html si adaugam evenimente pentru acestea
    buttonRectangle = document.querySelector('#rectangle');
    buttonEllipse = document.querySelector('#ellipse');
    buttonLine = document.querySelector('#line');
    //initial tool-ul va fi rectangle
    toolRectangle();
    //event listener pentru functii de alegere a formei cu care utilizatorul deseneaza
    buttonEllipse.addEventListener('click', toolEllipse);
    buttonRectangle.addEventListener('click', toolRectangle);
    buttonLine.addEventListener('click', toolLine);
    //functia care determina pozitia mouse-ului in canvasul folosit pentru setarea line width-ului
    progressBar.addEventListener('mousemove', e => {
        mx2 = e.x - progressBar.getBoundingClientRect().x;
        my2 = e.y - progressBar.getBoundingClientRect().y;
    })
    //setarea line width-ului
    progressBar.addEventListener('click', e => {
        //maximul line width-ului este de 15px
        let max = 15;
        //calculam line width-ul raportat la canvas
        lwidth = max * mx2 / w;
        context.lineWidth = lwidth;
    })
    //referinta si eventhandler pentru salvare imagine raster
    buttonSaveRaster = document.querySelector('#saveRaster');
    buttonSaveRaster.addEventListener('click', saveRaster);
    //referinta la lista din html
    lista = document.querySelector('ul');

}
//dupa ce toate elementele dom-ului sunt incarcate, se apeleaza functia aplicatie
document.addEventListener('DOMContentLoaded', aplicatie);