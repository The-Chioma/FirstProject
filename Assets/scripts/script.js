$(function () {
  const apikey = "5d40d9682d6a4dbd937695decef827d3";//3
  // "0ca619dbe1c54687905affcae7c39231" //1
  // "813168050135472e9820b823b47943fa";//2
  //display continents 1-7
  //user must select 1 min - max 7
  //user clicks 'submit' event listner
  // build up country selection form continents
  function countrySelection() {
    //empty array to dynamically pick a country from the users selection
    var selectedCountriesArr = [];

    if ($("#africa").is(":checked")) {
      selectedCountriesArr.push(...africa);
    }
    if ($("#asia").is(":checked")) {
      selectedCountriesArr.push(...asia);
    }
    if ($("#oceania").is(":checked")) {
      selectedCountriesArr.push(...oceania);
    }
    if ($("#europe").is(":checked")) {
      selectedCountriesArr.push(...europe);
    }
    if ($("#north-america").is(":checked")) {
      selectedCountriesArr.push(...northAmerica);
    }
    if ($("#south-america").is(":checked")) {
      selectedCountriesArr.push(...southAmerica);
    }
    //   if ($("#antarctica").is(":checked")) {
    //     selectedCountriesArr.push(...antarctica);
    //   }
    //generates a random number from 0 to the length of the dynamic array
    var randomNumber = Math.floor(Math.random() * selectedCountriesArr.length);
    //selects the country object;
    var randomCountry = selectedCountriesArr[randomNumber];
    var countryName = randomCountry.country;
    //get the id from the country
    var id = randomCountry.id;
    //get the flagcode from the country object
    var flagCode = randomCountry.flagCode;

    var queryurl =
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=` + apikey;
    

    $.ajax({
      url: queryurl,
      method: "GET",
      success: function (response) {
        $("#dish-container").empty();

        var displayCountryName = $("<h2>").text("This dish is inspired by the country of " + countryName)

        var dishTitle = response.title;
        var titleEl = $("<h3 id='dish-header'>");
        titleEl.text(dishTitle);

        var dishImgSrc = response.image;
        var dishImgEl = $("<img id='dish-img'>");
        dishImgEl.attr('src', dishImgSrc);

        var ingredientsHeading = $("<h2>");
        ingredientsHeading.text("Ingredients:");

        //created and looped through the ingredients array
        var ingredientsArr = response.extendedIngredients;
        console.log(ingredientsArr);
        var ingredientsList = $("<ul id='ingredients-list'>")
        ingredientsArr.forEach(ingredient => {
          var ingredientsEl = $("<li class='ingredient'>")
          ingredientsEl.text(ingredient.original);
          ingredientsList.append(ingredientsEl);
        })

        var recipeHeading = $("<h2>");
        recipeHeading.text("Recipe: ")

        //get the recipeArr
        var recipeArr = response.analyzedInstructions[0].steps;
        //create an ordered list
        var recipeList = $("<ol id='recipe-list'>");
        //loop through the recipeArr and create the list elements and append
        recipeArr.forEach(step => {
          var recipeStepEl = $("<li class='recipe-step'>");
          recipeStepEl.text(step.step);
          recipeList.append(recipeStepEl);
        })

        //logic for ingredients is at the bottom and needs to be added
        $("#dish-container").append(displayCountryName, titleEl, dishImgEl, ingredientsHeading, ingredientsList, recipeHeading, recipeList);


        //creates the img source
        var flagImageSrc = `https://www.countryflags.io/${flagCode}/flat/64.png`; // image
        //creates an img element with the flag source
        var flagImgElement = $("<img>")
        flagImgElement.attr("src", flagImageSrc);
        $("body").append(flagImgElement)
      },
    });
  }
  $("#submitBtn").on("click", countrySelection);
  
});
