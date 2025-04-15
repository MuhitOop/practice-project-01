//function for spinner
const makeHide = (id) => {
  document.getElementById(id).style.display = "none";
};
const makeShow = (id) => {
  document.getElementById(id).style.display = "block";
};

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
  makeShow("spinner");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  if (data.data) {
    displayPets(data.data);
    makeHide("spinner");
  }
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
    <p>${pet.pet_details.slice(0, 100)}...</p>
    <div class="card-actions justify-end">
      <button class="selects btn btn-primary ">Select</button>
      <button onclick="handleDetails('${pet.petId}')" class="btn bg-red-500 details ">Details</button>
    </div>
  </div>
</div>
        `;

    petsContainer.append(div);
  });
    
    
    const allSelectsBtn = document.getElementsByClassName("selects");
    for (const btn of allSelectsBtn) {
        btn.addEventListener("click", (event) => {
            const title =
              event.target.parentNode.parentNode.childNodes[1].innerText;
            console.log(title)

            const listContainer =
                document.getElementById("selected-container");
            const div = document.createElement("div");
            div.classList.add("flex", "gap-4", "justify-center", "items-center")
            div.innerHTML = `
            <li>${title}</li>
            <button class="delete-btn btn">Delete</button>
            
            `
            listContainer.append(div);

            const prevCount = getValueById("count");
            const sum = prevCount + 1; 

            document.getElementById("count").innerText = sum; 
        } )
    }
};


const getValueById = (id) => {
    const element = document.getElementById(id).innerText;
    const convertedValue = parseInt(element);
    return convertedValue;
}



const handleDetails = async(petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();
    showDetails(data.petData);
    

}

const showDetails = (petDetails) => {
  const modalBody = document.getElementById("my_modal_2");
    modalBody.showModal();
    
    modalBody.innerHTML = `
    <div class="modal-box">
        <p class="inline">Pet Name:</p>
        <h3 class="text-lg font-bold inline">${petDetails.pet_name}</h3>
        <p class="py-4">${petDetails.pet_details}</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>


    `;
}

loadCategory();
loadPet("cat");
