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
  if (boundingTop >= -50 && boundingTop < 600) {
    return true;
  }
}

function listItemBuild(section) {
  const newListItem = document.createElement('li');
  const sectionDatNav = section.dataset.nav;
  const sectionID = section.id;

  newListItem.innerHTML = `<a href="#${sectionID}" class="menu__link">${sectionDatNav}</a>`;
  return newListItem;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function navBuild() {
  console.time("navBuild")
  for (let section of sections) {
    navbarList.appendChild(listItemBuild(section));
  }
  console.timeEnd("navBuild")
}

// Add class 'active' to section when near top of viewport
function addActive() {
  for (let section of sections) {
    const relAnchor = document.querySelector(`a[href="#${section.id}"]`);
    if (isInView(section)) {
      section.classList.add('your-active-class');
      relAnchor.classList.add('active__anchor')
    } else {
      section.classList.remove('your-active-class');
      relAnchor.classList.remove('active__anchor')
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

// function toggleNav() {
//   const header = document.querySelector('header');
//   setTimeout(function something() {
//     if (pageYOffset < 200) {
//       header.setAttribute('style', 'top: 0; transition: ease 0.7s all');
//     } else {
//       header.setAttribute('style', 'top: -52px; transition: ease 0.7s all');
//     }
//   }, 2000)
//   header.setAttribute('style', 'top: 0; transition: ease 0.7s all');
//   console.log('the page was scrolled!')
// }

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
setTimeout(document.addEventListener('scroll', addActive), 0);

let timer = null;
document.addEventListener('scroll', function() {
  const head = document.querySelector('header');
  //TODO: Make a switch statement including pageYOffset
  if (timer !== null) {
    clearTimeout(timer);
    head.setAttribute('style', 'top: 0; transition: ease 0.7s all');
  }
  timer = setTimeout(function() {
    head.setAttribute('style', 'top: -52px; transition: ease 0.7s all');
  }, 2000);
});
