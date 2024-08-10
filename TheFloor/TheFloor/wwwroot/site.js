window.keyHandler = {
    initialize: function (dotNetObject) {
        document.addEventListener('keydown', function (event) {
            if (event.key === 'x' || event.key === 'X') {
                dotNetObject.invokeMethodAsync('HandleXKey');
            } else if (event.key === 'c' || event.key === 'C') {
                dotNetObject.invokeMethodAsync('HandleCheckKey');
            } else if (event.key === 'r' || event.key === 'R') {
                dotNetObject.invokeMethodAsync('HandleRandom');
            }
        });
    }
};

function GetFolderFiles(dotNetObject, chunkSize) {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.multiple = true;
    input.onchange = async (event) => {
        const files = Array.from(event.target.files);
        const totalFiles = files.length;
        let index = 0;

        while (index < totalFiles) {
            const chunk = files.slice(index, index + chunkSize);
            const entries = {};

            for (const file of chunk) {
                const pathParts = file.webkitRelativePath.split('/');
                if (pathParts.length > 1) {
                    const folderName = pathParts[1];
                    if (!entries[folderName]) {
                        entries[folderName] = {
                            name: folderName,
                            path: file.webkitRelativePath,
                            files: []
                        };
                    }
                    entries[folderName].files.push({ name: file.name, url: URL.createObjectURL(file) });
                }
            }

            await dotNetObject.invokeMethodAsync('ProcessFoldersChunk', Object.values(entries));
            index += chunkSize;
        }
    };
    input.click();
}


var Imagewindow = null;
function openImageWindow() {
    if (this.Imagewindow == null || this.Imagewindow.closed) {
        this.Imagewindow = window.open("", "ImageNameWindow", "width=300,height=100");
        this.Imagewindow.document.write("<html><head><title>Image Name</title></head><body><h1 id='imageName'>No Image</h1></body></html>");
    }
}

function updateImageName (name) {
    if (this.Imagewindow != null && !this.Imagewindow.closed) {
        this.Imagewindow.document.getElementById('imageName').innerText = name;
    }
}

var correctSound = new Audio('/Sounds/Correct.wav');
var wrongSound = new Audio('/Sounds/Wrong.mp3');


correctSound.preload = 'auto';
wrongSound.preload = 'auto';

correctSound.addEventListener('ended', function () {
    correctSound.currentTime = 0;
});

wrongSound.addEventListener('ended', function () {
    wrongSound.currentTime = 0;
});

function playCorrectSound() {
    if (!correctSound.paused) {
        correctSound.currentTime = 0;
    }
    correctSound.play();
}

function playWrongSound() {
    if (!wrongSound.paused) {
        wrongSound.currentTime = 0;
    }
    wrongSound.play();
}