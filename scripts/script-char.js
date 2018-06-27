var charDropArea;

function onStart() {
  charDropArea = document.getElementById('char-drop-area');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    charDropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    charDropArea.addEventListener(eventName, highlight, false)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    charDropArea.addEventListener(eventName, unhighlight, false)
  })

  charDropArea.addEventListener('drop', handleDrop, false)
}

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  charDropArea.style.borderColor = 'gray';
}

function unhighlight(e) {
  charDropArea.style.borderColor = 'white';
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

function handleFiles(files) {
  files = [...files]
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.setAttribute('width', '50px');
    img.setAttribute('height', '50px');
    img.style.marginTop = '15px';
    img.style.marginLeft = '5px';
    img.style.marginRight = '5px';
    img.src = reader.result
    document.getElementById('gallery').appendChild(img)
    document.getElementById('dropLabel').style.color = 'rgba(0,0,0,0)';
  }
}

function uploadFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/joezim007/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}
