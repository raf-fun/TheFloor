function GetFolderFiles() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        input.multiple = true;

        input.onchange = () => {
            const files = Array.from(input.files);
            const folderMap = {};

            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

            files.forEach(file => {
                const pathParts = file.webkitRelativePath.split('/');
                const fileName = pathParts.pop();
                const folderPath = pathParts.join('/');

                const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
                if (!imageExtensions.includes(fileExtension)) {
                    return;
                }

                if (!folderMap[folderPath]) {
                    folderMap[folderPath] = [];
                }

                folderMap[folderPath].push({
                    name: fileName,
                    path: file.webkitRelativePath,
                    size: file.size,
                    type: file.type,
                    url: URL.createObjectURL(file) // Create a URL for the image
                });
            });

            const folders = Object.keys(folderMap).map(folderPath => ({
                path: folderPath,
                files: folderMap[folderPath]
            }));

            resolve(folders);
        };

        input.onerror = (err) => {
            reject(err);
        };

        input.click();
    });
}

function saveCategories(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadCategories (key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
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