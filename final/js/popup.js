function myFunction() {
  var x = document.getElementById("snackbar");
  var p = document.getElementById('wash');
  p.innerHTML += 'Remember to wash your hands!';
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

window.onload=setTimeout(myFunction, 1000);