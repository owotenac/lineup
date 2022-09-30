//dragElement(document.getElementById("dyn_div"));

var pElement = document.getElementsByClassName("player");
for (let i=0; i < pElement.length ; i++) {
  dragElement(pElement[i]);
}

function addElement () {
  var newDiv = document.createElement("div");
  newDiv.id = "dyn_div"
  
  var img = document.createElement('img');
  img.src = 'img/m.png';
  newDiv.appendChild(img);

  var newDivheader = document.createElement("div");
  newDivheader.id = "dyn_divheader"
  var textDiv = document.createTextNode("Click Here");
  newDivheader.appendChild(textDiv);

  newDiv.appendChild(newDivheader);

  var currentDiv = document.getElementById('dyn_div');
  document.body.insertBefore(newDiv, currentDiv);

  dragElement(document.getElementById("dyn_div"));
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {

    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    if (elmnt) {
      let xhr = new XMLHttpRequest();
      //drop the px in the request
      var request = "playerID=" + elmnt.id + "&x=" + elmnt.style.left.replace('px','') + "&y=" + elmnt.style.top.replace('px','')
      xhr.open("GET", "/moveplayer?" + request);
      xhr.send();
    }

  }
}

function saveTeam()
{
  var dialog = document.getElementById("saveDialog");
  dialog.style.display = "block";
}

function saveWithName()
{
  var fileName = document.getElementById("teamName").value;
  if (!fileName) {
    return
  }

  var dialog = document.getElementById("saveDialog");
  dialog.style.display = "none";

  let xhr = new XMLHttpRequest();
  var request = "fileName=" + fileName
  xhr.open("GET", "/SAVE?" + request);
  xhr.send();
}


function loadTeam()
{
  var dialog = document.getElementById("loadDialog");
  dialog.style.display = "block";
}

function loadComposition()
{
  var fileName = document.getElementById("compoListInput").value;
  if (!fileName) {
    return
  }
  var dialog = document.getElementById("loadDialog");
  dialog.style.display = "none";

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      document.close()
      document.write( xhr.responseText) ;
   }
  }
  var request = "fileName=" + fileName
  xhr.open("GET", "/LOAD?" + request);
  xhr.send();
}
