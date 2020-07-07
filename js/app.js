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

const main = document.querySelector('main');

const buttonToTop = document.querySelector('.button__container button');

let timer = null;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function isInView(elem) {
  const bounding = elem.getBoundingClientRect();
  if (bounding.top < 300 && bounding.bottom > 500) {
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

// Hide navbar when not scrolling using scroll event
function hideNav() {
  const head = document.querySelector('header');
  if (timer !== null) {
    clearTimeout(timer);
    head.setAttribute('style', 'top: 0; transition: ease 0.5s all');
  }
  timer = setTimeout(function () {
    head.setAttribute('style', 'top: -104px; transition: ease 0.5s all');
  }, 2000);
}

// Functionality for 'Back to Top' button
function hideTopButton() {
  if (pageYOffset < 100) {
    buttonToTop.setAttribute('style', '');
  } else {
    buttonToTop.setAttribute('style', 'bottom: 0px;');
  }
}

function scrollToTop() {
  const top = (pageYOffset === 0)
  window.scrollTo({
    top,
    behavior: "smooth"
  });
}

// Make sections collapsable using click event
function collapseSection(evt) {
  const sectionParent = evt.target.parentElement;
  if (evt.target.className == 'collapse__button' && sectionParent.clientHeight !== 200) {
    sectionParent.classList.add('collapsed')
    evt.target.textContent = 'Expand Section'
  } else if (evt.target.className == 'collapse__button') {
    sectionParent.classList.remove('collapsed')
    evt.target.textContent = 'Collapse Section'
  }
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
setTimeout(document.addEventListener('scroll', addActive), 0);

// Hide navbar when not scrolling
document.addEventListener('scroll', hideNav);

// Hide 'Back to Top' button
document.addEventListener('scroll', hideTopButton);

// 'Back to Top' button functionality
buttonToTop.addEventListener('click', scrollToTop);

// Make sections collapsable
main.addEventListener('click', collapseSection);
