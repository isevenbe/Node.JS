# Node.JS API Training

#### Watch manager app

In order to train on the basis of Coach Anthony's course I created an API to manage the students' watch in the class.

#### This API can do :

* POST (Only by student name)
1. l'API va generer un ID a l'aide du module UUID

* GET (Empty to GET all Students or by ID to GET 1)
* PUT (Only by ID)
1. Update can change the date and the subject of the watch.
2. When add a watc hthe API gonna automaticly push the last watch date and subject into an Array

* DELETE (Only By ID)

#### Link of the API :

1. POST : serverhost/watch?studentName={{YourStudentName}}
2. GET : serverhost/watch
2. GET PARAM : ?id={{YourID}}
3. PUT : serverhost/watch?id={{YourID}}
3. PUT PARAM : 
{
studentName : Your Param
nextWatch : Your Param
watchSubject : Your Param
}
4. DELETE : serverhost/watch?id={{YourID}}

###### Next step is to push it to Heroku to bring in on a live server (In Progress)
