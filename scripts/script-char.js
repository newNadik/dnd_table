var charDropArea;

function onStart() {
  initChar()
  initMap()
}

function initChar(){
  charDropArea = document.getElementById('char-drop-area');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    charDropArea.addEventListener(eventName, preventCharDefaults, false)
    document.body.addEventListener(eventName, preventCharDefaults, false)
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    charDropArea.addEventListener(eventName, highlightChar, false)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    charDropArea.addEventListener(eventName, unhighlightChar, false)
  })

  charDropArea.addEventListener('drop', handleCharDrop, false)
}

function preventCharDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlightChar(e) {
  charDropArea.style.borderColor = 'gray';
}

function unhighlightChar(e) {
  charDropArea.style.borderColor = 'white';
}

function handleCharDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleCharFiles(files)
}

function handleCharFiles(files) {
  files = [...files]
  files.forEach(uploadCharFile)
  files.forEach(previewCharFile)
}

function previewCharFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.setAttribute('width', '50px');
    img.style.marginTop = '15px';
    img.style.marginLeft = '5px';
    img.style.marginRight = '5px';
    img.src = reader.result
    document.getElementById('gallery').appendChild(img)
    document.getElementById('dropCharLabel').style.color = 'rgba(0,0,0,0)';
  }
}

function uploadCharFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/joezim007/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}
