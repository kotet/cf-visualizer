let canv;
let ctx;
let clientX, clientY;
let fixX, fixY;
let fixXVal, fixYVal;
let functions = [];
let FID = 1;
const pix_unit = 120;
window.addEventListener("load", function() {
    canv = document.getElementById("canvas");
    ctx = canv.getContext("2d");
    fixXVal = document.getElementById("fix-x-val");
    fixYVal = document.getElementById("fix-y-val");
    functions["f0"] = {};
    generateFunctionList();
    canv.addEventListener("mousemove", function(e) {
        clientX = e.clientX;
        clientY = e.clientY;
        draw();
    });
    setInterval(resize, 500);
    setInterval(updateParams, 1000);
});

function generateFunctionList() {
    let ul = document.getElementById("function-list");
    for (name in primitive_functions) {
        let li = document.createElement("li");
        let code = document.createElement("pre");
        let math = document.createElement("span");
        code.innerText = (name + " z").padEnd(10) + ": ";
        let textof = astprint(parse(tokenize(name + " z")));
        console.log(textof);
        math.innerText = "$" + textof + "$";
        li.appendChild(code);
        li.appendChild(math);
        ul.appendChild(li);
    }
}

function resize() {
    if (canvas.width != window.innerWidth * devicePixelRatio || canvas.height != window.innerHeight * devicePixelRatio) {
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;
        draw();
    }
}

function createCard() {
    let template = document.getElementById("function-card");
    let elm = document.importNode(template.content, true);
    let function_id = "f" + FID++;
    elm.children[0].setAttribute("id", function_id);
    functions[function_id] = {};
    document.getElementById("function-cards").appendChild(elm);
}

function deleteCard(elm) {
    let parent = elm.parentElement.parentElement;
    let function_id = parent.getAttribute("id");
    delete functions[function_id];
    parent.remove();
}

function updateParams() {
    fixX = document.getElementById("fix-x").checked;
    fixY = document.getElementById("fix-y").checked;
}

function updateIndicator(z) {
    document.getElementById("z-indicator").innerText = "z = " + z.re.toFixed(3) + " + " + z.im.toFixed(3) + "i";
}

function updateFunction(elm) {
    let parent = elm.parentElement;
    console.log(parent);
    constructAST(parent);
}

function constructAST(card) {
    let function_id = card.getAttribute("id");
    let input = card.getElementsByClassName("code-input")[0].value;
    let tokens = tokenize(input);
    let ast = parse(tokens);
    functions[function_id].tree = ast;
    card.getElementsByClassName("mathjax-output")[0].innerText = "$" + astprint(ast) + "$";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, card]);
}

function draw() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    strokeAxis();

    let z = canvasToPlane(clientX, clientY);
    if (fixX)
        z.re = Number(fixXVal.value);
    if (fixY)
        z.im = Number(fixYVal.value);

    let pos = planeToCanvas(z);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#000";
    ctx.fill();

    updateIndicator(z);

    for (id in functions) {
        let card = document.getElementById(id);
        if (!("tree" in functions[id])) {
            constructAST(card);
        }
        let f = evaluate(functions[id].tree, z);
        if (Number.isNaN(f) || Number.isNaN(f.re) || Number.isNaN(f.im))
            card.getElementsByClassName("function-indicator")[0].innerText = "<ERROR>";
        else
            card.getElementsByClassName("function-indicator")[0].innerText = " = " + z.re.toFixed(3) + " + " + z.im.toFixed(3) + "i"

        let fpos = planeToCanvas(f);
        ctx.beginPath();
        ctx.arc(fpos.x, fpos.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = card.getElementsByClassName("color-picker")[0].value;
        ctx.fill();
    }
}

function canvasToPlane(x, y) {
    return Complex((x - (canvas.width / 2)) / pix_unit, (-y + (canvas.height / 2)) / pix_unit);
}

function planeToCanvas(z) {
    return { x: canvas.width / 2 + z.re * pix_unit, y: canvas.height / 2 - z.im * pix_unit };
}

function strokeAxis() {
    ctx.strokeStyle = ctx.fillStyle = "#ccc";
    ctx.font = "16px monospace";
    ctx.beginPath();
    // x axis
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    // y axis
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    // |z| == 1,2,3
    for (let i = 0;
        (i + 1) * pix_unit < Math.max(canvas.width, canvas.height) / 2; i++) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, pix_unit * (i + 1), 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(i + 1, canvas.width / 2 + pix_unit * (i + 1), canvas.height / 2);
    }
    ctx.strokeStyle = ctx.fillStyle = "#999";
    // |z| == e
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, pix_unit * Math.E, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText("e", canvas.width / 2 + pix_unit * Math.E, canvas.height / 2);
    // |z| == pi
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, pix_unit * Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText("π", canvas.width / 2 + pix_unit * Math.PI, canvas.height / 2);
}