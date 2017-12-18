'use strict';

// an array of students
const students = document.getElementsByClassName('student-item');
const page = document.querySelector('.page');

function displayPage(pageNumber, studentsList) {
  console.log(">>>>> displayPage RUNNING <<<<<");
  // Hiding all students on the page
  for (let i = 0; i < studentsList.length; i++) {
    studentsList[i].style.display = "none";
  }
  // New Hiding all students on the page
  const allStudents = document.querySelectorAll('.student-item');
  for (let i = 0; i < allStudents.length; i++) {
    allStudents[i].style.display = "none";
  }
  // if student should be on this page number then show the student
  for (let i = 0; i < studentsList.length; i++) {
    // 1 => 0-9
    // 2 => 10-19
    let studentPage = Math.floor((i / 10) + 1);
    console.log("i: " + i);
    console.log("studentPage " + studentPage);
    // console.log(typeof studentPage);
    console.log("pageNumber " + pageNumber);
    // console.log(typeof pageNumber);
    console.log("studentPage === pageNumber");
    console.log(studentPage === pageNumber);
    if (studentPage === pageNumber) {
      console.log("chosen i: " + i);
      studentsList[i].style.display = "block";
    }
  }
}

// Creates and displays the pagination links
function displayLinks(list) {
  console.log(">>>>> displayLinks RUNNING <<<<<");
  console.log(list);
  console.log(list.length);
  // Calculate how many pages are needed
  let length = list.length;
  let pageNumbers = 0;
  while (length > 0) {
    pageNumbers++;
    length -= 10;
  }
  console.log("PAGES: " + pageNumbers);

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
    console.log(">>>>> PAGINATION EVENT CLICKED LINK <<<<<");
    let linksList = document.querySelectorAll(".pagination a");
    let link = e.target;
    let number = link.textContent;
    // Converting the string number to an integer
    number = parseInt(number);
    // console.log("CLICKED: ");
    // console.log("LINK TEXT CONTENT " + link.textContent);
    // console.log("NUMBER: " + number);

    // Removing the display from the previous link
    for (let i = 0; i < linksList.length; i++) {
      linksList[i].className = "";
    }
    // Giving the current page the active link class
    if (link.tagName === 'A') {
      link.className = "active";
      console.log();
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
  console.log(searchButton);
  // searchButton.addEventListener("click", searchStudents);
  searchButton.addEventListener("click", function() {
    console.log(">>>>> SEARCH BUTTON EVENT CLICKED <<<<<");
    const paginationDiv = document.querySelector('.pagination');
    if (paginationDiv) {
      page.removeChild(paginationDiv);
    }
    searchStudents();
  });
}

function createSearchComponent() {
  console.log(">>>>> createSearchComponent RUNNING <<<<<");
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

function searchStudents() {
  console.log(">>>>> searchStudents RUNNING <<<<<");
  let inputValue = document.querySelector(".student-search input").value;
  console.log(inputValue);
  let filter = inputValue.toUpperCase();
  // Loop over the student list, and for each student…
  const names = document.querySelectorAll('.student-details h3');
  const emails = document.querySelectorAll('.student-details .email');
  let matchedStudents = [];
  for (let i = 0; i < students.length; i++) {
    // ...obtain the student’s name…
    // ...and the student’s email…
    let studentName = names[i].textContent;
    let studentEmail = emails[i].textContent;
    // console.log(studentName);
    // console.log(studentEmail);

    // ...if the search value is found inside either email or name…
    let foundName = (studentName.toUpperCase().indexOf(filter) > -1);
    let foundEmail = (studentEmail.toUpperCase().indexOf(filter) > -1);
    if (foundName || foundEmail) {
      // ...add this student to list of “matched” student;
      matchedStudents.push(students[i]);
    }
  }
  console.log('MATCHED STUDENTS: ' + matchedStudents.length);
  console.log(matchedStudents);
  let matchedLength = matchedStudents.length;
  // If there’s no “matched” students…
  let exists_notFound = document.querySelector('h1');
  console.log("EXISTS notfound?");
  console.log(exists_notFound);
  if (!exists_notFound) {
    console.log(">>>>> CREATING notFound  <<<<<");
    console.log(">>>>> CREATING notFound  <<<<<");
    console.log(">>>>> CREATING notFound  <<<<<");
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

if (students.length > 10) {
  for (let i = 10; i < students.length; i++) {
    // console.log(students[i]);
    students[i].style.display = "none";
  }
}
displayLinks(students);






//
