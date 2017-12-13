// an array of students
const students = document.getElementsByClassName('student-item');
const page = document.querySelector('.page');

// Returns the number of pages to display
function getPageNumbers(length) {
  let pageNumbers = 0;
  while (length >= 10) {
    pageNumbers += 1;
    length -= 10;
  }
  return pageNumbers;
}

function displayPage(number) {
  console.log(students);
  console.log(students.length);
  if (students.length > 10) {
    for (let i = 10; i < students.length; i++) {
      // console.log(students[i]);
      students[i].style.display = "none";
    }
  }
  // // Calculating the number of pages to display
  // let pageNumbers = getPageNumbers(students.length);
  // console.log(pageNumbers);

  let pages = '';
  for (let i = 0; i < number; i++) {
    pages += `
      <li>
        <a class="active" href="#">${i+1}</a>
      </li>
    `;
  }
  // console.log(pages);
  let pagination = `
      <ul>
        ${pages}
      </ul>
  `;
  console.log(pagination);
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination";
  paginationDiv.innerHTML = pagination;

  page.appendChild(paginationDiv);
  console.log(paginationDiv);
  // console.log(paginationDiv.innerHTML);
}

// Maybe instead of the getPageNumbers function
let length = students.length;
let pageNumbers = 0;

while (length >= 10) {
  pageNumbers += 1;
  length -= 10;
}

displayPage(pageNumbers);







//
