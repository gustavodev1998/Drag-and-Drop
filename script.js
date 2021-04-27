const defaultBtn = document.querySelector('#default-btn');
const customBtn = document.querySelector('#custom-btn');
const cancelBtn = document.querySelector('#cancel-btn');

const fileName = document.querySelector('.file-name');
const wrapper = document.querySelector('.wrapper');
const txt = document.querySelector('.text');

const img = document.querySelector("img");

let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

/* When the button is clicked the hidden one with the File properties shows */
customBtn.addEventListener('click', () => {
    console.log("hello");
    defaultBtn.click();
})


function showFile(file) {

    let fileReader = new FileReader(); // Creating new reader object
    fileReader.onload = function() {
        let fileURL = fileReader.result; // Passing user file source in fileURL variable
        img.src = fileURL; // Inserting my fileUrl into my image src atribute
        wrapper.classList.add("active");
    };

    cancelBtn.addEventListener("click", () => {
        img.src = "";
        txt.innerHTML = "No file chosen, yet!";
        wrapper.classList.remove("active");
    })

    fileReader.readAsDataURL(file);   
}


defaultBtn.addEventListener("change", function() {
    
    /* Select only the first thing */
    const file = this.files[0];

    if(file != null) showFile(file);

    if(this.value) {
        /* regExp to remove the path from the image name */
        let valueStor = this.value.match(regExp);
        fileName.textContent = valueStor;
    }
    
})


// If user Drags the File Over the DragArea
wrapper.addEventListener("dragover", (event) => {
    event.preventDefault(); // Preventing from the uploading default behaviour 
    wrapper.classList.add('active');
    txt.innerHTML = "Release to Upload File";
});

// If user leave Dragged File from DragArea
wrapper.addEventListener("dragleave", () => {
    console.log("File is out Drag");
    wrapper.classList.remove('active');
    txt.innerHTML = "No file chosen, yet!";
});

// If user Drop File On DragArea
wrapper.addEventListener("drop", (event) => {
    event.preventDefault(); // Preventing from the uploading default behaviour 
    console.log("File is dropped in the DragArea");

    // Getting user select file and [0] this means if user select multiple files then we'll select only the first one
    const file = event.dataTransfer.files[0];
    
    showFile(file);
    fileName.textContent = file.name;

});

setTimeout( () => {
    alert("Insert an image");
}, 2000);
