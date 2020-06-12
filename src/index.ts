let selectedElement;

function onDragStart (event) {
    event.dataTransfer.setData("dragElementId", event.target.id);
}

function onDrop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("dragElementId");
    const element = document.createElement(id);
    element.style.width = "8vw";
    element.style.height = "2.5vh";
    element.style.position = "absolute";
    element.style.border = "none";
    element.style.outline = "none";
    if (id === "div") {
        element.innerText = "text";
        element.style.width = "auto";
        element.style.height = "auto";
    }
    element.onclick = onElementClicked;
    if (event.target.tagName === "DIV") {
        event.target.appendChild(element);
    } else {
        alert(`add element to ${event.target.tagName} is not supported yet`);
    }
}

function onDragOver(event) {
    event.preventDefault();
}

function onElementClicked(event) {
    /* stop bubbling */
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    if (selectedElement === event.target) {
        selectedElement = null;
        event.target.style.outline = "";
    } else {
        if (selectedElement) {
            selectedElement.click();
        }
        selectedElement = event.target;
        selectedElement.style.outline = "red solid medium";
    }
}

function onPropertyChanged(event) {
    if (!selectedElement) {
        return
    }
    const property = event.target.id;
    if (event.key === "Enter") {
        if (property === "text") {
            selectedElement.innerText = event.target.value;
        } else if (property === "text-color") {
            selectedElement.style.cssText = `${selectedElement.style.cssText}color:${event.target.value};`;
        } else if (property === "text-size") {
            selectedElement.style.cssText = `${selectedElement.style.cssText}font-size:${event.target.value}rem;`;
        } else if (property === "src") {
            selectedElement.src = event.target.value;
        } else if (property === "width" || property === "left" || property === "right" ||
            property === "height" || property === "top" || property === "bottom") {
            if (event.target.value === "") {
                selectedElement.style[property] = "auto";
            } else {
                selectedElement.style[property] = `${event.target.value}%`;
            }
        } else if (property === "id") {
            selectedElement.id = event.target.value;
        } else {
            selectedElement.style[property] = event.target.value;
        }
    }
    /* option clicked */
    else {
        if (property === "horizontal-center") {
            if (event.target.checked) {
                selectedElement.parentNode.style.alignItems = "center";
            } else {
                selectedElement.parentNode.style.alignItems = "";
            }
        } else if (property === "vertical-center") {
            if (event.target.checked) {
                selectedElement.parentNode.style.justifyContent = "center";
            } else {
                selectedElement.parentNode.style.justifyContent = "";
            }
        }
    }
}

function generateCode() {
    const page = document.getElementById("page");
    console.log(`
            <html style="font-size:1vw">
                <body style="margin:0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;">
                    <div style="width: 100%; height: 100%; position: absolute; display: flex;"></div>
                    ${page.outerHTML
        .replace("width: 27vw;", "width: 100%;")
        .replace("height: 48vw;", "height: 100%;")
        .replace("border: 1px solid gray;", "")
        .replace("top: 2vw; left: 35vw;", "")
        }
                </body>
            </html>
        `);
}