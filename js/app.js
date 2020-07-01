/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const sections = document.querySelectorAll("section");
console.log(sections);

const navbarList = document.getElementById('navbar__list');
console.log(navbarList);
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function isInView(elem) {
  const boundingTop = elem.getBoundingClientRect().top;
  if (boundingTop >= 0 && boundingTop < 400) {
    return true;
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function navBuild() {
  for (let i = 0; i < sections.length; i++) {
    const newListItem = document.createElement('li');
    const sectionData = sections[i].dataset.nav;
    const sectionID = sections[i].id;

    newListItem.innerHTML = "<a href=\"#" + sectionID + "\">" + sectionData + "</a>";
    newListItem.firstElementChild.classList.add('menu__link');
    navbarList.appendChild(newListItem);
  }
}

// Add class 'active' to section when near top of viewport
function addActive() {
  for (let i = 0; i < sections.length; i++) {
    if (isInView(sections[i]) == true) {
      sections[i].classList.add('your-active-class');
    } else {
      sections[i].classList.remove('your-active-class');
    }
  }
}

// Scroll to anchor ID using scrollTO event
function anchorScroll(evt) {
  const destination = document.querySelector(evt.target.hash)
  const top = destination.getBoundingClientRect().top + window.pageYOffset;

  evt.preventDefault();
  window.scrollTo({
    top,
    behavior: "smooth"
  });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', navBuild);

// Scroll to section on link click
navbarList.addEventListener('click', anchorScroll);

// Set sections as active
document.addEventListener('scroll', addActive);
