function openHamburgerMenu() {
  var menu = document.getElementById("top-nav");
  if (menu.className === "index-nav") {
    menu.className += " index-nav-show";
  } else {
    menu.className = "index-nav";
  }
}
