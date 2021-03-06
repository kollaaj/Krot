import ColorWheel from './colorwheel.class.js';
import Paint from './paint.class.js';


import {TOOL_BUCKET, TOOL_COLORWHEEL, TOOL_DOTS, TOOL_ERASER, TOOL_EYEDROP, TOOL_PEN, TOOL_SHAPES, TOOL_SHAPES_CIRCLE, TOOL_SHAPES_RECTANGLE, TOOL_SHAPES_TRIANGLE,} from './tool.js';

// light <-> dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const htmlClasses = localStorage.getItem('htmlClasses');
    if (htmlClasses) {
        const htmlElement = document.querySelector('html');
        htmlElement.className = htmlClasses;
    }
});

document.querySelector('#darklight-toggle').addEventListener('click', () => {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.toggle('light');
    htmlElement.classList.toggle('dark');

    const htmlClasses = htmlElement.classList.toString();
    localStorage.setItem('htmlClasses', htmlClasses);
});
// light <-> dark mode toggle end

let paint = new Paint('my-canvas');
paint.activeTool = TOOL_PEN;
paint.selectedColor = "#A9A9A9";
paint.init();

const preview  = document.querySelector(".preview");

function colorWheelCallback(pixel) {
    if(pixel[3] === 0) { // dont get color if its invisible
        return; 
    }
    console.log(pixel);
    var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
    var hexValue = '#' + ('0000' + dColor.toString(16)).substr(-6);
    paint.selectedColor = hexValue;
    preview.style.backgroundColor = hexValue;
} 
var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");
const colorWheel = new ColorWheel(colorWheelCallback);
console.log(colorWheel);


// Let's you download the image you just created

document.querySelectorAll("[data-command]").forEach(
    (el) => {
        el.addEventListener("click", (e) => {
            
            
            let command = el.getAttribute('data-command');
            
            
            if(command == 'download'){
                var canvas = document.getElementById("my-canvas");
                var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
                var link = document.createElement('a');
                link.download = "krot.png"; // the name of downloaded file
                link.href = image;
                link.click();
            }
        });
    }
);


/* Here we select all the tools by finding them in the html with "[data-tool]".
Then we add an event listener "click" to select each tool */
document.querySelectorAll("[data-tool]").forEach(
    item => {
        item.addEventListener("click", e =>{

            document.querySelector("[data-tool].clicked").classList.toggle("clicked"); // remove the class "clicked" from last used tool
            item.classList.toggle("clicked"); // Adds the class "clicked"

            let selectedTool = item.getAttribute("data-tool");
            paint.activeTool = selectedTool;

            switch (selectedTool) { // if the tool shapes is selected then the triangle, circle and rectangle tools will pop up.
                case TOOL_SHAPES:
                    document.querySelector(".shapes-wrapper").style.display = "block";
                    break;
                case TOOL_COLORWHEEL:
                    colorWheel.init();
                    document.querySelector(".color-wheel").style.display = "block";
                    document.querySelector(".preview").style.display = "block";
                    break;
                default:
                    document.querySelector(".shapes-wrapper").style.display = "none";
                    document.querySelector(".color-wheel").style.display = "none";
                    break;
            }

        });
        
    }
    
);



