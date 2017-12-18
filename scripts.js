"use strict";

// An array of students
const students = document.getElementsByClassName('student-item');
const page = document.querySelector('.page');

// Displays the appropriate 10 students for the current page
function displayPage(pageNumber, studentsList) {
  // Hiding all students on the page
  const allStudents = document.querySelectorAll('.student-item');
  for (let i = 0; i < allStudents.length; i++) {
    allStudents[i].style.display = "none";
  }
  // Shows the student if he should be on the current page number
  for (let i = 0; i < studentsList.length; i++) {
    let studentPage = Math.floor((i / 10) + 1);
    if (studentPage === pageNumber) {
      studentsList[i].style.display = "block";
    }
  }
}

// Creates and displays the pagination links
function displayLinks(list) {
  // Calculates how many pages are needed
  let length = list.length;
  let pageNumbers = 0;
  while (length > 0) {
    pageNumbers += 1;
    length -= 10;
  }
  // Creating the link section
  let pages = '';
  for (let i = 0; i < pageNumbers; i++) {
    pages += `
      <li>
        <a class="" href="#">${i+1}</a>
      </li>`;
  }
  let pagination = `<ul> ${pages} </ul>`;
  // Removing the old page link section
  if (page.lastElementChild.className === 'pagination') {
    page.removeChild(page.lastElementChild);
  }
  // Appending the new link section
  const paginationDiv = document.createElement('div');
  paginationDiv.className = "pagination";
  paginationDiv.innerHTML = pagination;
  page.appendChild(paginationDiv);
  // Setting the page 1 link to active by default
  const defaultPage = document.querySelector(".pagination a");
  defaultPage.className = "active";
  // When you click a link, the appropriate students display
  paginationDiv.addEventListener("click", function(e) {
    let linksList = document.querySelectorAll(".pagination a");
    let link = e.target;
    let number = link.textContent;
    // Converting the string number to an integer
    number = parseInt(number);
    // Removing the display from the previous link
    for (let i = 0; i < linksList.length; i++) {
      linksList[i].className = "";
    }
    // Giving the current page the active link class
    if (link.tagName === 'A') {
      link.className = "active";
      displayPage(number, list);
    }
  });
  // Appending the search component
  const search = document.querySelector('.student-search');
  if (!search) {
    createSearchComponent();
  }
  // Adding search functionality
  const searchButton = document.querySelector(".student-search button");
  searchButton.addEventListener("click", function() {
    const paginationDiv = document.querySelector('.pagination');
    if (paginationDiv) {
      page.removeChild(paginationDiv);
    }
    searchStudents();
  });
}

// Creates the search field
function createSearchComponent() {
  const pageHeader = document.querySelector('.page-header');
  const searchDiv = document.createElement('div');
  const searchComponent = `
      <input placeholder="Search for students...">
      <button>Search</button>
  `;
  searchDiv.className = "student-search";
  searchDiv.innerHTML = searchComponent;
  pageHeader.appendChild(searchDiv);
}

// Let's the user search for students, displaying the ones that match
function searchStudents() {
  let inputValue = document.querySelector(".student-search input").value;
  let filter = inputValue.toUpperCase();
  // Loop over the student list, and for each student…
  const names = document.querySelectorAll('.student-details h3');
  const emails = document.querySelectorAll('.student-details .email');
  let matchedStudents = [];
  for (let i = 0; i < students.length; i++) {
    // Search is based on the student's name and email
    let studentName = names[i].textContent;
    let studentEmail = emails[i].textContent;

    // If the search value is found inside either email or name
    // We add this student to list of “matched” students;
    let foundName = (studentName.toUpperCase().indexOf(filter) > -1);
    let foundEmail = (studentEmail.toUpperCase().indexOf(filter) > -1);
    if (foundName || foundEmail) {
      matchedStudents.push(students[i]);
    }
  }
  let matchedLength = matchedStudents.length;
  // If there’s no “matched” students, a message is displayed
  let exists_notFound = document.querySelector('h1');
  if (!exists_notFound) {
    let notFound = document.createElement('h1');
    notFound.innerHTML = 'No students found!';
    notFound.className = 'not-found';
    page.appendChild(notFound);
  }
  let notFound = document.querySelector('h1');
  // If no students match the search, create a message to tell the user
  if (matchedLength === 0) {
    // Display the message
    notFound.className = "show";
    // Hide all students
    let allStudents = document.querySelectorAll('.student-item');
    for (let i = 0; i < allStudents.length; i++) {
      allStudents[i].style.display = "none";
    }
  }
  // If over ten students were found, call the displayLinks function
  else if (matchedLength > 10) {
    notFound.className = "hide";
    displayLinks(matchedStudents);
  }
  else {
      notFound.className = "hide";
  }
  // Display first 10 (max) students
  displayPage(1, matchedStudents);
}

// Running code //
//////////////////

// Showing maximum of 10 students at the beginning, hiding others
if (students.length > 10) {
  for (let i = 10; i < students.length; i++) {
    students[i].style.display = "none";
  }
  // Adding the pagination of there are more than 10 students
  displayLinks(students);
}





//
