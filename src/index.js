const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    fetchAllToys();
    showNewToyForm();
    addNewToyListener();
    
  });
}

// FETCH ALL TOYS AND CALL FUNCTION TO DISPLAY HTML, PASSING JSON RESPONSE
function fetchAllToys() {
  fetch(`http://localhost:3000/toys`)
  .then(resp => resp.json())
  .then(json => displayAllToys(json))
}

// CREATE AND APPEND THE HTML FOR ALL TOY OBJECTS IN DB
function displayAllToys(json) {
  const toyDiv = document.querySelector('#toy-collection');
  json.forEach(toy => {
    toyDiv.insertAdjacentHTML('beforeend', 
    `
    <div id="${toy.id}" class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id="${toy.id}" class="like-btn">Like <3</button>
    </div>
    `)
    const div = document.getElementById(`${toy.id}`);
    const btn = div.querySelector('button');
    btn.addEventListener('click', () => {
      toy.likes++
      updateLikes(toy.id, toy.likes);
    })
  });
}

// ADD EVENT LISTENER TO CREATE A NEW TOY AND CALL FUNCTION TO MAKE POST REQUEST
function showNewToyForm() {
  const newToyBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  newToyBtn.addEventListener('click', () => {
    toyForm.classList.toggle("container");
  });
}

// ADD LISTENER TO SUBMIT NEW TOY AND CALL FUNCTION TO POST 
function addNewToyListener() {
  const submitBtn = document.querySelector('.submit');
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createNewToy(event.target);
  });
}

// CREATE NEW TOY IN DB AND CALL FUNCTION TO RENDER THE TOY ON THE PAGE
function createNewToy(btn) {
  const form = btn.parentNode
  const configObj = {
    method: "POST",
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
          "name": form[0].value,
          "image": form[1].value,
          "likes": 0
        })
    }
  
    fetch(`http://localhost:3000/toys`, configObj)
    .then(resp => resp.json())
    .then(json => displayNewToy(json))
    .catch(error => console.log(error))

    document.getElementsByClassName('add-toy-form')[0].reset()
    alert('Toy succesfully added');

}

// CREATES AND INSERTS NEW HTML FROM NEW TOY INPUT
function displayNewToy(json) {
  const toyDiv = document.querySelector('#toy-collection');
  toyDiv.insertAdjacentHTML('beforeend', 
  `
  <div id="${json.id}" class="card">
    <h2>${json.name}</h2>
    <img src=${json.image} class="toy-avatar" />
    <p>${json.likes} Likes </p>
    <button data-id="${json.id}" class="like-btn">Like <3</button>
    </div>
  `);
}

  function updateLikes(toyId, numLikes) {
    const toy = {
      id: toyId,
      likes: numLikes
    }
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      body: JSON.stringify(toy),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        const item = document.getElementById(toyId);
        const likes = item.querySelector('.card p'); 
        const btn = item.querySelector('.card button'); 
        likes.textContent = `${json.likes} Likes`;
        btn.setAttribute('data-id', `${json.id}`);
      })
      .catch(error => console.log(error))
}

main();