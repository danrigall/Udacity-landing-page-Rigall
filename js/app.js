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

const navbarList = document.getElementById('navbar__list');
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
  const startingTime = performance.now();
  for (let section of sections) {
    navbarList.appendChild(listItemBuild(section));
  }
  const endingTime = performance.now();
  console.log('This code took ' + (endingTime - startingTime) + ' milliseconds.');
}

function listItemBuild(section) {
  const newListItem = document.createElement('li');
  const sectionDatNav = section.dataset.nav;
  const sectionID = section.id;

  newListItem.innerHTML = `<a href="#${sectionID}" class="menu__link">${sectionDatNav}</a>`;
  return newListItem;
}

// Add class 'active' to section when near top of viewport
function addActive() {
  for (let section of sections) {
    if (isInView(section)) {
      section.classList.add('your-active-class');
    } else {
      section.classList.remove('your-active-class');
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
