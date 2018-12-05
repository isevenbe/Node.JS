let get1 = document.querySelector(".studentName");
let get2 = document.querySelector(".watchSubject");
let get3 = document.querySelector(".nextWatchDate");
get1.toString();
get2.toString();
get3.toString();



const createNewStudent = () => {
    fetch("http://localhost:2525/students/new",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // mode: "cors",
            method: "POST",
            body: JSON.stringify({ studentName: get1.value, nextWatch: get2.value, watchSubject: get3.value })
        })
        // .then((res) => res.json())
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
}
document.querySelector(".send").addEventListener("click", createNewStudent);