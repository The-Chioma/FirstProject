$(function () {
  const GIPHYapikey = "p5Mlbpqfhr1G6JgLJjllx3vHl0MdWEoY"
  const apikey = "5d40d9682d6a4dbd937695decef827d3"; //3
  // "0ca619dbe1c54687905affcae7c39231" //1
  // "813168050135472e9820b823b47943fa";//2
  //display continents 1-7
  //user must select 1 min - max 7
  //user clicks 'submit' event listner
  // build up country selection form continents
  
// added GIPHY api call for Antactica and flag 521 error code
 var GIPHYurl = "https://api.giphy.com/v1/gifs/search?q=ice&api_key=" + GIPHYapikey + "&limit=10"

 $.ajax({
  url: GIPHYurl,
  method: "GET",
  success: function (response) {
console.log(response);
  }
} 
  )


  var prevRecipes = [];

  var dropdownMenuIsDown = false;
  
  if (JSON.parse(localStorage.getItem("prevCountriesRecipe")) !== null) {
    //we check to see if localstorage does not equal null. If so, then we store it in the variable
    prevRecipes = JSON.parse(localStorage.getItem("prevCountriesRecipe"));
    var dropdownBtn = $("<button id='historyDropdownBtn'>");
    dropdownBtn.text("Saved Recipes ");
    var dropdownIcon = $("<i class='fas fa-utensils'>");
    dropdownBtn.append(dropdownIcon);
    $("#mainDiv").append(dropdownBtn);
  }

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
    getRecipe(countryName, id, flagCode);
  };

  function getRecipe(countryName, id, flagCode){
    var queryurl =
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=` + apikey;

    $.ajax({
      url: queryurl,
      method: "GET",
      success: function (response) {
        $("#dish-container").empty();
        //we store the country name in a html data attribute so that we can access it later for the modal
        var displayHeader = $("<h2 id='countryHeader'>");
        //countryName is a variable in local scope
        displayHeader.attr("data-countryName", countryName);
        displayHeader.text(
          "This dish is inspired by the country of " + countryName
        );

        var dishTitle = response.title;
        var titleEl = $("<h3 id='dish-header'>");
        titleEl.attr("data-dishId", id); 
        // save the id for the recipe so we can access it later for local storage
        titleEl.text(dishTitle);

        var dishImgSrc = response.image;
        var dishImgEl = $("<img id='dish-img'>");
        dishImgEl.attr("src", dishImgSrc);

        var ingredientsHeading = $("<h2>");
        ingredientsHeading.text("Ingredients:");

        //created and looped through the ingredients array
        var ingredientsArr = response.extendedIngredients;
        console.log(ingredientsArr);
        var ingredientsList = $("<ul id='ingredients-list'>");
        ingredientsArr.forEach((ingredient) => {
          var ingredientsEl = $("<li class='ingredient'>");
          ingredientsEl.text(ingredient.original);
          ingredientsList.append(ingredientsEl);
        });

        var recipeHeading = $("<h2>");
        recipeHeading.text("Recipe: ");

        //get the recipeArr
        var recipeArr = response.analyzedInstructions[0].steps;
        //create an ordered list
        var recipeList = $("<ol id='recipe-list'>");
        //loop through the recipeArr and create the list elements and append
        recipeArr.forEach((step) => {
          var recipeStepEl = $("<li class='recipe-step'>");
          recipeStepEl.text(step.step);
          recipeList.append(recipeStepEl);
        });

        var saveBtn = $("<button id='saveBtn'>");
        var saveIcon = $("<i class='fas fa-hamburger'>");
        saveBtn.text("Save Recipe");
        saveBtn.append(saveIcon);
                //creates an img element with the flag source
                var flagImgElement = $("<img id= 'flagImg'>");
                //creates the img source
                var flagImageSrc = `https://www.countryflags.io/${flagCode}/flat/64.png`; // image
                flagImgElement.attr("src", flagImageSrc);
                flagImgElement.attr("data-flagCode", flagCode);
              // need to an an error 521 hadle - GIPHY ?
              
              // statusCode: {
              //   521: function () {
              //    
              //     alert("Sorrythe flag for 'countryName' is currenlty not working );
                    //link giphy
              //   },
              // },

        //logic for ingredients is at the bottom and needs to be added
        $("#dish-container").append(
          displayHeader,flagImgElement,
          titleEl,
          dishImgEl,
          ingredientsHeading,
          ingredientsList,
          recipeHeading,
          recipeList,
          saveBtn,
          
        );

      },
    });
  }
  function displayDropdown(){
    if (!dropdownMenuIsDown){
      var dropmenuList = $("<ul id='dropdownList'>");
      dropmenuList.css("display", "none");
      prevRecipes.forEach(country => {
        // looping through prev recipe array to create clickable list items for each country
        var countryListElement = $("<li class='dropdownItem'>");//temporary classname to be changed with tailwind;
        countryListElement.text(country.countryName).attr('data-recipeId', country.id).attr('data-flagID',country.flagId );
        dropmenuList.append(countryListElement);
      })
      $("body").append(dropmenuList);
      $("#dropdownList").slideDown(400);
      dropdownMenuIsDown = true;
    } else {
      $("#dropdownList").slideUp(400, function(){
        $("#dropdownList").remove();
      });
      dropdownMenuIsDown = false;
      
    }

  }

  function modalDisplay() {
    //we create a modal box which will display in front of content for user to save recipes to local storage
    var modalContainer = $("<div id='modal-box'>");
    var modalHeader = $("<h2 id='modal-header'>");
    // we grab the current country name from the html data attribute;
    var countryName = $("#countryHeader").attr("data-countryName");
    modalHeader.text(`Would you like to save this recipe from ${countryName}?`);

    // we add yes and no buttons for user to confirm

    //we give each the same class so we can add one click listener. We will add style with tailwind
    var yesBtn = $("<button class='confirmBtn' id='yesBtn'>");
    var yesIcon = $('<i class="fas fa-check">');
    yesBtn.text("Yes ");
    yesBtn.append(yesIcon);

    var noBtn = $("<button class='confirmBtn' id='noBtn'>");
    var noIcon = $("<i class='fas fa-times'>");
    noBtn.text("No ");
    noBtn.append(noIcon);

    modalContainer.append(modalHeader, yesBtn, noBtn);
    $("body").append(modalContainer);
  }
  // logic for save button - to local storage
  function saveToLocalStorage() {
    var id = $(this).attr("id");
    if (id === "yesBtn") {
      var countryName = $("#countryHeader").attr("data-countryName");
      var dishId = $("#dish-header").attr("data-dishId");
      var flagId = $("#flagImg").attr("data-flagCode");
      var countryToBeSaved = {
        countryName: countryName,
        id: dishId,
        flagId: flagId
      };
      console.log('the country name is', countryToBeSaved.countryName);
      console.log('the ID is', countryToBeSaved.id);
      //we create an object with the data we need
     
      // logic to check local storage for existing Country, using every method to check the countryname of each object
      if (
        prevRecipes.every((dishElement) => {
          //.every checks every element in an array. if it finds an element which returns false, the every method returns false and stops
          return dishElement.countryName !== countryName;
        })
      ) {
        prevRecipes.push(countryToBeSaved);
        localStorage.setItem(
          "prevCountriesRecipe",
          JSON.stringify(prevRecipes)
        );
        var successMsg = $("<p id='modalSuccessMsg'>");
        successMsg.text("You have successfully saved this recipe"); // will style later
        $("#modal-box").append(successMsg);
      } else {
        // logic if user has already saved this recipe to storage
        var existingCountry = $("<p id='modalMsg'>");
        existingCountry.text("You have already saved this recipe"); // will style later
        $("#modal-box").append(existingCountry);
      }
      //adding a 2000ms delay to the modal fadeout for when you click the yes button so user can see status.
      //adding a call back function to remove the modal when it's been clicked
      setTimeout(function () {
        $("#modal-box").fadeOut(500, function () {
          $("#modal-box").remove();
        });
      }, 2000);
    }
    // logic if 'NO' is clicked for modal button
    else {
      $("#modal-box").fadeOut(500, function () {
        $("#modal-box").remove();
      });
    }
  }

  //click listeners
  $("#submitBtn").on("click", countrySelection); //runs the function for picking a country at random based on user input and calls the API

  $("body").on("click", "button#saveBtn", modalDisplay); //displays the modal box and generates all the elements

  $("body").on("click", "button.confirmBtn", saveToLocalStorage); // save button on click function, save to local storage

  $("body").on("click", "button#historyDropdownBtn", displayDropdown);
// added click listener for saved recipes from storage to make a second call to the API 
  $("body").on("click", "li.dropdownItem", function(){
    var countryName = $(this).text();
    var dishID = $(this).attr('data-recipeId')
    var flagID = $(this).attr('data-flagID')
   
    getRecipe(countryName, dishID, flagID)
  });
});

//check if local storage exists X
//store in variable X
//give user access to prev storage
//giver user option to save new LS x

// citiesSearched.on("click", "li", function() {
//return getCurrentWeather($(this).text());
//});


// Plan for Tuesday - ideally finish all working components 
// LOGIC
// . finish 'saved recipes' for user to see recll saved recipes XX
// . API call for 'saved recipes' XXX
// .STYLE
//         - consider changing html text
//         - colour theme
            // - layout
            // -dropdown/nav bar 

// .Add Antarctica - basic return or  Use GIPHY as Api call ?  
// .alt for flag API  when it is broken

// STRETCH
// -Continents as image  
//           checkbox - highlight Continent
//           click contitnent 
// extra STRETCH           
// Minify code - use 
// https://developers.google.com/speed/pagespeed/module?

