const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')

let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function main() {
  document.addEventListener('DOMContentLoaded', function(){
    // console.log('DOMContentLoaded')
    toyList()
    addToyListener()
    addLikeListener()
  });
}

// Toy List Cards

function toyList() {
  getToys()
}

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => renderToys(toyData))
}

function renderToys(toyData) {
  // console.log(toyData)
  toyData.forEach(toy => {
    renderToy(toy)
  })
}

function renderToy(toy) {
  const toyDiv = document.createElement('div')
  toyDiv.className = 'card'

  toyDiv.dataset.id = toy.id
  // add id to div class

  // console.log(toy.id)

  const h2 = document.createElement('h2')
  h2.textContent = `${toy.name}`
  toyDiv.appendChild(h2)

  const img = document.createElement('img')
  img.src = toy.image
  img.height = 120
  img.width = 120
  toyDiv.appendChild(img)

  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`
  toyDiv.appendChild(p)

  const likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.textContent = 'Like <3'
  toyDiv.appendChild(likeBtn)
  // console.log('likeBtn')

  toyCollection.append(toyDiv)
}

// Add New Toy

function addToyListener () {
  const toyForm = document.querySelector('.add-toy-form')
  // console.log(toyForm)

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
        const reqObj = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: event.target[0].value,
            image: event.target[1].value,
            likes: '0'
          })
        }
        fetch('http://localhost:3000/toys', reqObj)
          .then(res => res.json())
          .then(toyData => renderToy(toyData))
          clearForm(event)
    })
}

function clearForm(event) {
  if (event.target[0].value || event.target[1].value) {
    event.target[0].value = "",
    event.target[1].value = ""
  }
}

// Like a toy

function addLikeListener() {
  document.addEventListener('click', (event)=> {
    console.log(event.target.parentNode.children[2].innerHTML)
    let toylikes = event.target.parentNode.children[2].innerHTML
    const toyId = event.target.parentNode.dataset.id
    const numLikes = parseInt(event.target.parentNode.children[2].innerHTML)
    // console.log(numLikes)
    if (event.target.className === 'like-btn') {
      const reqObj = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          // change this to update
          likes: numLikes + 1
        })
      }
      // interpolate into url
      fetch(`http://localhost:3000/toys/${toyId}`, reqObj)
        .then(res => res.json())
        .then(toyData => event.target.parentNode.children[2].innerHTML = `${toyData.likes} Likes`)

    }
  })
}

main()
