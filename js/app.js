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

const section1 = sections[0];
console.log(section1);

const navbarList = document.getElementById('navbar__list');
console.log(navbarList);
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
document.addEventListener('scroll', addActive);

function addActive() {
  for (let i = 0; i < sections.length; i++) {
    if (isInView(sections[i]) == true) {
      sections[i].classList.add('your-active-class');
    } else {
      sections[i].classList.remove('your-active-class');
    }
  }
}

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
for (let i = 0; i < sections.length; i++) {
  const newListItem = document.createElement('li');
  let sectionData = sections[i].dataset.nav;
  let sectionID = sections[i].id;

  newListItem.innerHTML = "<a href=\"#" + sectionID + "\">" + sectionData + "</a>";
  navbarList.appendChild(newListItem);
}

// Add class 'active' to section when near top of viewport
// for (section of sections) {
//   const boundingTop = section.getBoundingClientRect().top;
//   if (boundingTop >= 0 && boundingTop < 500) {
//     console.log(section + ' is in veiw!');
//     section.classList.toggle('your-active-class');
//   }
// }

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
