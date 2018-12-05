
const createNewStudent = () => {
    let get1 = document.querySelector(".studentName");
    // let get2 = document.querySelector(".watchSubject").value;
    // let get3 = document.querySelector(".nextWatchDate").value;
    get1.toString();
    // get2.toString();
    // get3.toString();
    fetch("http://localhost:2525/students/new",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // mode: "cors",
            method: "POST",
            body: JSON.stringify({ studentName: get1.value })
        })
        // .then((res) => res.json())
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
}

const selectStudent = () => {
    const listOfStudents = document.querySelector(".listOfStudents")
    fetch("http://localhost:2525/students")
        .then((resp) => resp.json())
        .then(function (data) {
            for (let index = 0; index < data.length; index++) {
                console.log('data[index] :', data[index].studentName);
                let createOption = document.createElement("option");
                createOption.innerHTML = data[index].studentName
                createOption.value = data[index].studentName;
                listOfStudents.append(createOption);
            }
        })
}
document.querySelector(".send").addEventListener("click", createNewStudent);

selectStudent()