function main() {
  document.addEventListener('DOMContentLoaded', function() {
    getToys()
  })

  function getToys() {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toysData => renderToys(toysData))
  }

  function renderToys(toysData) {
    const toysContainer = document.getElementById('toy-collection');
    toysContainer.innerHTML = '';
    toysData.forEach(toy => renderToy(toy))
  }

  function renderToy(toy) {
    const toysContainer = document.getElementById('toy-collection');
    
    const toyCard = document.createElement('div');
    toyCard.setAttribute('class', 'card');

    const h2 = document.createElement('h2');
    h2.innerText = toy.name;

    const img = document.createElement('img');
    img.setAttribute('class', 'toy-avatar')
    img.src = toy.image;
    
    const p = document.createElement('p');
    p.innerText = `${toy.likes} Likes`;

    const button = document.createElement('button');
    button.setAttribute('class', 'like-btn');
    button.setAttribute('id', toy.id);
    button.innerHTML = 'Like';
    button.addEventListener('click', (event) => likeToy(event, toy));

    toyCard.append(h2, img, p, button);

    toysContainer.append(toyCard)
  }

  function likeToy(event, toy) {
    
    const toyId = event.target.id;
    const more = parseInt(event.target.previousElementSibling.innerText) + 1;
    console.log(more)
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json",
                  "Accept": "application/json"},
      body: JSON.stringify({
        "likes" : more
        })
      })
      .then(resp => resp.json())
      .then(like_obj => {event.target.previousElementSibling.innerHTML = `${more} Likes`})
      
  }

  
}

main()