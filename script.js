// Check if recipes are already stored in localStorage

// Render recipes from localStorage
function renderRecipes() {
  const container = document.getElementById("recipeList");
  container.innerHTML = "";
  savedRecipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <h2>${recipe.name}</h2>
      <p>Ingredients: ${recipe.ingredients.join(", ")}</p>
      <p>${recipe.steps}</p>
    `;
    container.appendChild(card);
  });
}

// Search functionality
document.getElementById("search").addEventListener("input", function(e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = savedRecipes.filter(recipe => 
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(keyword))
  );
  renderFilteredRecipes(filtered);
});

// Render filtered recipes based on search
function renderFilteredRecipes(list) {
  const container = document.getElementById("recipeList");
  container.innerHTML = "";
  list.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <h2>${recipe.name}</h2>
      <p>Ingredients: ${recipe.ingredients.join(", ")}</p>
      <p>${recipe.steps}</p>
    `;
    container.appendChild(card);
  });
}

// Handle form submission for adding a new recipe
document.getElementById("addRecipeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("dishName").value;
  const ingredients = document.getElementById("ingredients").value.split(",");
  const steps = document.getElementById("steps").value;
  const image = document.getElementById("recipeImage").files[0];

  if (image) {
    const reader = new FileReader();
    reader.onload = function() {
      const newRecipe = {
        name,
        ingredients,
        image: reader.result,
        steps
      };
      savedRecipes.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(savedRecipes)); // Save to localStorage
      renderRecipes(); // Update the recipe display
      clearForm();
    };
    reader.readAsDataURL(image);
  }
});

// Clear the form after submission
function clearForm() {
  document.getElementById("dishName").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("steps").value = "";
  document.getElementById("recipeImage").value = "";
}

// Initial render of recipes from localStorage
renderRecipes();
