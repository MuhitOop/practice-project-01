//function for spinner
const makeHide = (id) => {
    document.getElementById(id).style.display = "none";
}


// loads

const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  showCategory(data.categories);
};

const loadPet = async (categoryName) => {
    document.getElementById("status").style.display = "none";
    document.getElementById("petsContainer").style.display = "flex";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  displayPets(data.data);
};

// shows
const showCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((cat) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick ="loadPet('${cat.category}')" class="btn">${cat.category}
        <img class="w-8" src="${cat.category_icon} ">
        </button>
        
        `;
    categoryContainer.append(div);
  });
};

const displayPets = (pets) => {
    const petsContainer = document.getElementById("petsContainer");
    petsContainer.innerHTML = "";

    if (pets.length < 1) {
        document.getElementById("petsContainer").style.display = "none";
        document.getElementById("status").style.display = "block";
    }


  pets.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = ` 
        <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${pet.image}"
      alt="Shoes" class="w-full object-cover"/>
  </figure>
  <div class="card-body">
    <h2 class="card-title">${pet.breed}</h2>
    <p>${pet.pet_details.slice(0,100)}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Select</button>
    </div>
  </div>
</div>
        `;
      
      petsContainer.append(div);
  });
};

loadCategory();
loadPet("cat")
