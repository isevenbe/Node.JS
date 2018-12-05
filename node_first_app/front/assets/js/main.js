

// Function for posting into DB by the name of the student 
const createNewStudent = () => {
    let postStudent = document.querySelector(".studentName");
    postStudent.toString();
    fetch("http://localhost:2525/students/new",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ studentName: postStudent.value })
        })
}

// Get all student from the DB
const selectStudent = () => {
    fetch("http://localhost:2525/students")
        .then((resp) => resp.json())
        .then(data => createListOfStudents(data))
    // .then(manageWatch())

}

// Create an option for eatch student get in "selectStudent()"
const createListOfStudents = (data) => {
    const listOfStudents = document.querySelector(".listOfStudents")
    for (let index = 0; index < data.length; index++) {
        let createOption = document.createElement("option");
        createOption.classList.add("student");
        createOption.innerHTML = data[index].studentName
        createOption.id = data[index].id;
        listOfStudents.append(createOption);
    }
}

// Add watch to a specific student
const manageWatch = () => {
    const studentSelected = document.querySelector(".listOfStudents").selectedIndex;
    const studentList = document.querySelector(".listOfStudents").options;

    fetch(`http://localhost:2525/studentManage?id=${studentList[studentSelected].id}`)
        .then((resp) => resp.json())
        .then((data) => {
            document.querySelector(".insertWatch").innerHTML = `
            <br>
            Student Selected : ${data.studentName}
            <br>
            <br>
            <label for="watchDate">Date of the watch</label>
            <br>
            <input type="date" name="watchDate" class="watchDate" id="">
            <br>
                    <label for="watchSubject">
                        Subject of the Watch
                    </label>
                    <br>
            <input type="text" name="watchSubject" class="watchSubject" id="">
            <br>
            <button class= "addWatch">Add the watch</button>`;

            document.querySelector(".addWatch").addEventListener("click", addWatch);
        })
}

// Add a new watch to the API
const addWatch = () => {
    const studentSelected = document.querySelector(".listOfStudents").selectedIndex;
    const studentList = document.querySelector(".listOfStudents").options;
    const selectDate = document.querySelector(".watchDate"); 
    const selectSubject = document.querySelector(".watchSubject"); 
    fetch(`http://localhost:2525/student?id=${studentList[studentSelected].id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({ nextWatch: selectDate.value, watchSubject: selectSubject.value })
    })
}


document.querySelector(".send").addEventListener("click", createNewStudent);
document.querySelector(".manage").addEventListener("click", manageWatch);
selectStudent();
