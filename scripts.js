// an array of students
const students = document.getElementsByClassName('student-item');
const page = document.querySelector('.page');

function displayPage(pageNumber, studentsList) {
  // Hiding all students on the page
  for (let i = 0; i < studentsList.length; i++) {
    studentsList[i].style.display = "none";
  }
  // if student should be on this page number then show the student
  for (let i = 0; i < studentsList.length; i++) {
    // 1 => 0-9
    // 2 => 10-19
    let studentPage = Math.floor((i / 10) + 1);
    // console.log("i: " + i);
    // console.log("studentPage " + studentPage);
    // console.log(typeof studentPage);
    // console.log("pageNumber " + pageNumber);
    // console.log(typeof pageNumber);
    // console.log("studentPage === pageNumber");
    // console.log(studentPage === pageNumber);
    if (studentPage === pageNumber) {
      console.log("chosen i: " + i);
      studentsList[i].style.display = "block";
    }
  }
}

// Creates and displays the pagination links
function displayLinks(list) {
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
  if (page.lastElementChild.className === 'test') {
    page.removeChild(page.lastElementChild);
  }
  // Appending the new link section
  const paginationDiv = document.createElement("div");
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
      displayPage(number, students);
    }
  });
}

if (students.length > 10) {
  for (let i = 10; i < students.length; i++) {
    // console.log(students[i]);
    students[i].style.display = "none";
  }
}
displayLinks(students);






//
