function searchRecipes() {
  var searchQuery = document.getElementById('searchInput').value.trim();
  if (searchQuery !== '') {
    var apiKey = '0fb0fe97bf14462b8d9b5bc0e8e3e554'; // Replace with your actual API key
    var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + apiKey + '&query=' + searchQuery;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.results) {
          displayRecipes(data.results);
        } else {
          console.error('No recipes found.');
        }
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  } else {
    alert('Please enter ingredients or keywords to search for recipes.');
  }
}

function displayRecipes(recipes) {
  var recipeResults = document.getElementById('recipeResults');
  recipeResults.innerHTML = ''; // Clear previous results

  if (recipes && recipes.length > 0) {
    recipes.forEach(recipe => {
      var recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');

      var title = document.createElement('h3');
      title.textContent = recipe.title;

      var image = document.createElement('img');
      image.src = recipe.image;
      image.alt = recipe.title;

      // Add click event listener to each image
      image.addEventListener('click', function () {
        displayRecipeDetails(recipe.id); // Call displayRecipeDetails when the image is clicked
      });

      var summary = document.createElement('p');
      summary.textContent = recipe.summary;

      recipeCard.appendChild(title);
      recipeCard.appendChild(image);
      recipeCard.appendChild(summary);

      recipeResults.appendChild(recipeCard);
    });
  } else {
    console.error('No recipes to display.');
  }
}

// Function to fetch and display recipe details in a new tab
function displayRecipeDetails(recipeId) {
  // Code for fetching recipe details and displaying them in a new tab
}

function displayRecipeDetails(recipeId) {
  var apiKey = '0fb0fe97bf14462b8d9b5bc0e8e3e554'; // Replace with your actual API key
  var apiUrl = 'https://api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=' + apiKey;

  fetch(apiUrl)
    .then(response => response.json())
    .then(recipe => {
      // Construct the content for the new HTML document
      var htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recipe Details</title>
        </head>
        <body>
          <h1>${recipe.title}</h1>
          <p><b>Cuisines:</b> ${recipe.cuisines.join(', ')}</p>
          <p><b>Summary:</b> ${recipe.summary}</p>
        </body>
        </html>
      `;

      // Create a new Blob object containing the HTML content
      var blob = new Blob([htmlContent], { type: 'text/html' });

      // Create a URL object from the Blob
      var url = URL.createObjectURL(blob);

      // Open the URL in a new tab
      window.open(url, '_blank');

      // Revoke the URL object to release resources
      URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error fetching recipe details:', error);
    });
}
