var mapDropArea,
    scale = 1,
    mapArea = document.getElementById('map-area'),
    mapImage = document.getElementById('map-img');

function initMap() {

  mapDropArea = document.getElementById('map-drop-area');
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    mapDropArea.addEventListener(eventName, preventMapDefaults, false)
    document.body.addEventListener(eventName, preventMapDefaults, false)
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    mapDropArea.addEventListener(eventName, highlightMap, false)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    mapDropArea.addEventListener(eventName, unhighlightMap, false)
  })

  mapDropArea.addEventListener('drop', handleMapDrop, false)

  document.getElementById('plus-button').onclick = function() { zoomIn()() };
  document.getElementById('minus-button').onclick = function() { zoomOut() };
}

function preventMapDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlightMap(e) {
  mapDropArea.style.borderColor = 'gray';
}

function unhighlightMap(e) {
  mapDropArea.style.borderColor = 'white';
}

function handleMapDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleMapFile(files)
}

function handleMapFile(files) {
  files = [...files]
  files.forEach(uploadMapFile)
  files.forEach(previewMapFile)
}

function previewMapFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    mapImage = document.createElement('img')
    mapImage.setAttribute('id', 'map-img')
    mapArea = document.getElementById('map-area')
    mapImage.src = reader.result
    mapImage.onload = function() {
      if(mapImage.width - mapArea.width > mapImage.height - mapArea.height){
        mapImage.setAttribute('width', '100%');
      } else {
        mapImage.setAttribute('height', '100%');
      }
      mapArea.appendChild(mapImage)
      document.getElementById('map-drop-area').style.display = 'none';
    };
  }
}

function addPinchtoMap(){

  interact(mapArea)
  .gesturable({
    onstart: function (event) { },
    onmove: function (event) {
      scale = scale * (1 + event.ds);

      mapImage.style.webkitTransform =
      mapImage.style.transform = 'scale(' + scale + ')';
      dragMoveListener(event);
    },
    onend: function (event) { }
  })
  .draggable({ onmove: dragMoveListener });
}

function uploadMapFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/joezim007/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}

function zoomIn() {
  scale = scale + 0.2;
  mapImage.style.webkitTransform =
    mapImage.style.transform = 'scale(' + scale + ')';
}

function zoomOut() {
  scale = scale - 0.2;
  if(scale < 1) scale = 1;
  mapImage.style.webkitTransform =
    mapImage.style.transform = 'scale(' + scale + ')';
}
