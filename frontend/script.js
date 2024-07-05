// JavaScript code to interact with backend endpoints
// Global variables to track pagination
let currentPage = 1;
const pageSize = 5;

// Function to change input fields based on selected action
function changeInputs() {
    const action = document.getElementById('action').value;
    const inputForms = document.getElementById('inputForms');
    const displayAll = document.getElementById('displayAll');

    // Hide previous input forms
    inputForms.innerHTML = '';

    // Hide display all section
    displayAll.style.display = 'none';

    // Display input form based on selected action
    if (action === 'add' || action === 'modify') {
        inputForms.innerHTML = `
            <form id="${action}Form" onsubmit="${action === 'add' ? 'addStudent()' : 'modifyStudent()'}">
                <label for="roll">Roll:</label>
                <input type="text" id="roll" name="roll" required><br>
                
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
                
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required><br>
                
                <label for="phone">Phone:</label>
                <input type="text" id="phone" name="phone" required><br>
                
                <label for="dept">Department:</label>
                <input type="text" id="dept" name="dept" required><br>
                
                <button type="submit">${action === 'add' ? 'Add' : 'Modify'}</button>
                <button type="button" onclick="cancelAction()">Cancel</button>
            </form>
        `;
    } else if (action === 'delete' || action === 'search' || action === 'display') {
        inputForms.innerHTML = `
            <form id="${action}Form" onsubmit="${action === 'delete' ? 'deleteStudent()' : action === 'search' ? 'searchStudent()' : 'return false;'}">
                <label for="${action === 'delete' ? 'deleteRoll' : 'searchRoll'}">Roll:</label>
                <input type="text" id="${action === 'delete' ? 'deleteRoll' : 'searchRoll'}" name="${action === 'delete' ? 'deleteRoll' : 'searchRoll'}" required>
                <button type="submit">${action === 'delete' ? 'Delete' : action === 'search' ? 'Search' : 'Display All'}</button>
                ${action === 'display' ? `
                    <div class="prevNextButtons">
                        <button id="prevBtn" class="disabled" onclick="prevPage()">Prev</button>
                        <button id="nextBtn" class="disabled" onclick="nextPage()">Next</button>
                    </div>
                ` : ''}
            </form>
        `;
    }
}

// Function to cancel action and reset form
function cancelAction() {
    document.getElementById('action').selectedIndex = 0;
    changeInputs();
}

// Function to display all students
function displayAll() {
    currentPage = 1;
    updateStudentList();
}

// Function to update student list based on pagination
async function updateStudentList() {
    const response = await fetch(`/students?page=${currentPage}&pageSize=${pageSize}`);
    const data = await response.json();

    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    if (data.length === 0) {
        studentList.innerHTML = 'No records found.';
        return;
    }

    data.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.innerHTML = `
            <p><strong>Roll:</strong> ${student.roll}</p>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Address:</strong> ${student.address}</p>
            <p><strong>Phone:</strong> ${student.phone}</p>
            <p><strong>Department:</strong> ${student.dept}</p>
            <hr>
        `;
        studentList.appendChild(studentDiv);
    });

    // Enable/disable pagination buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (currentPage === 1) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    if (data.length < pageSize) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }
}

// Function to move to previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateStudentList();
    }
}

// Function to move to next page
function nextPage() {
    currentPage++;
    updateStudentList();
}

// Initial function call to set up the page
changeInputs();
