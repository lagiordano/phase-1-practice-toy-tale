let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", initialize);

function initialize () {

  let card = document.querySelector(".card");
  

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    for (toy in toys) {
    card = document.createElement("div");
    const toyCollection = document.querySelector("#toy-collection");
    card.className = "card";
    toyCollection.appendChild(card);
    populateCardInfo(card, toys[toy]);
    
    };
  });

  function populateCardInfo (card, toyData) {
    const h2 = document.createElement("h2");
    h2.textContent = toyData.name;
    card.appendChild(h2);

    const img = document.createElement("img");
    img.className = "toy-avatar";
    img.src = toyData.image;
    card.appendChild(img);

    const p = document.createElement("p");
    p.textContent = `${toyData.likes} likes`;
    card.appendChild(p);

    const button = document.createElement("button");
    button.className = "like-btn";
    button.id = toyData.id;
    button.textContent = "Like ❤️";
    card.appendChild(button);

    button.addEventListener("click", function (event) {
      p.textContent = incrementLikes(toyData);
    });
  };


  const form = document.querySelector(".add-toy-form");


  form.addEventListener("submit", e => {
    e.preventDefault();

    let data = {
      name: form["name"].value,
      image: form["image"].value,
      likes: 0
    }

    let toys = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost:3000/toys", toys)
    .then(data => populateCardInfo(card, data));

  });


  // function likeFunction (toyID) {
    

  //   let data = {
  //     likes: 
  //   };

  //   let likesPatch = {
  //     method: "PATCH",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content=Type": "application/json"
  //     },
  //     body:JSON.stringify(data)
  //   }
  //   fetch(`http://localhost:3000/toys/${toyLiked.id}`)
    
  // };


  function incrementLikes (toyData) {
    let likes = toyData.likes;
    let id = toyData.id;
    let newLikes = likes + 1;

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
    let likesText = `${newLikes} likes`;
    return likesText;

  }






};