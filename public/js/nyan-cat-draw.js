document.addEventListener('DOMContentLoaded', () => {

    let drawToggle = document.getElementById('draw-toggle');
    let drawContainer = document.getElementById('draw-container');
    let drawBoard = document.getElementById('draw-board');
    const color = document.querySelector('#color');
    const resetBtn = document.querySelector('#btnReset');
    const submitBtn = document.querySelector('#btnSubmit')
    let draw = false
    const defaultColor = '#3D3D3DFF'
    let nyanCatHead = document.querySelector('.nyancat .head');

    let defaultBoxShadow = getComputedStyle(nyanCatHead).boxShadow;

    /** Setting the board with X Y and the option for relocation **/
    const sizeElWidth = 16;
    const sizeElHeight = 18;
    const relocationAxisY = -3;

    resetBtn.addEventListener('click', reset)
    submitBtn.addEventListener('click', submit)

    drawToggle.addEventListener('click', () => {

        if(drawToggle.innerText.includes('Hide')){
            drawToggle.innerText = 'Draw nyan head'
            drawContainer.style.display = 'none';
            return;
        }

        drawToggle.innerText = 'Hide drawing board'
        drawContainer.style.display = 'block';

    })

    window.addEventListener("mousedown", function(){
        draw = true
    })
    window.addEventListener("mouseup", function(){
        draw = false
    })

    function populate(sizeWidth, sizeHeight) {
        drawBoard.style.setProperty('--sizeWidth', sizeWidth)
        drawBoard.style.setProperty('--sizeHeight', sizeHeight)
        for (let i = relocationAxisY; i < sizeHeight; i++) {
            for (let k = 0; k < sizeWidth; k++) {
                const div = document.createElement('div')
                div.classList.add('draw-pixel')
                div.dataset.axisX = '' + k;
                div.dataset.axisY = '' + i;
                div.addEventListener('mouseover', function(e){
                    if(!draw) return
                    drawPixel(div, e.ctrlKey);
                })
                div.addEventListener('mousedown', function(e){
                    drawPixel(div, e.ctrlKey);
                })
                drawBoard.appendChild(div)
            }
        }

        drawFromBoxShadow(defaultBoxShadow);
        nyanCatHead.style.setProperty('--boxShadow', defaultBoxShadow);
    }

    function drawPixel(element, isCtrlKey) {
        element.style.backgroundColor = color.value
        if(isCtrlKey) {
            element.style.backgroundColor = defaultColor
        }
    }

    function reset(){
        drawBoard.innerHTML = ''
        populate(sizeElWidth, sizeElHeight)
    }

    function submit() {
        let boxShadow = getBoxShadowFromBoard();
        nyanCatHead.style.setProperty('--boxShadow', boxShadow)
    }

    function getBoxShadowFromBoard() {
        let shadow = [];

        for (let i = relocationAxisY; i < sizeElWidth; i++) {
            for (let k = 0; k < sizeElHeight; k++) {
                const div = document.querySelector(`[data-axis-x="${k}"][data-axis-y="${i}"]`);

                if (div === null) {
                    continue;
                }

                let color = div.style.backgroundColor;

                if (color === defaultColor || color === '') {
                    continue;
                }

                shadow.push(convertRgbToHex(color) + ' ' + (k*4) + 'px ' + (i*4) + 'px 0px');
            }
        }
        return shadow.join(', ');
    }

    function drawFromBoxShadow(boxShadow) {
        let shadowArray = boxShadow.split('px, ');

        for (let i = 0; i < shadowArray.length; i++) {
            let shadow = shadowArray[i];

            let shadowElArray = shadow.split(') ');

            shadowElArray[0] = shadowElArray[0] + ')';

            let color = convertRgbToHex(shadowElArray[0]);
            let pixelArray = shadowElArray[1].split(' ');

            if (pixelArray.length < 3) {
                continue;
            }


            let axisX = parseInt(pixelArray[0])/4;
            let axisY = parseInt(pixelArray[1])/4;

            const div = document.querySelector(`[data-axis-x="${axisX}"][data-axis-y="${axisY}"]`);

            if (div === null) {
                continue;
            }
            div.style.backgroundColor = color;
        }
    }

    function convertRgbToHex(colorRgb) {

        if (colorRgb.includes("rgb(") === false) {
            return colorRgb;
        }

        let color = colorRgb.split("(")[1].split(")")[0];
        color = color.split(",");
        let hex = color.map(function(x){
            x = parseInt(x).toString(16);
            return (x.length===1) ? "0"+x : x;
        })
        return "#" + hex.join("");
    }

    populate(sizeElWidth, sizeElHeight);
})
