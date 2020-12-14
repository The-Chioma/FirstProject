$(function () {
  const GIPHYapikey = "p5Mlbpqfhr1G6JgLJjllx3vHl0MdWEoY";
  const apikey = "5d40d9682d6a4dbd937695decef827d3"; //3
  // "0ca619dbe1c54687905affcae7c39231" //1
  // "813168050135472e9820b823b47943fa";//2
  //display continents 1-7
  //user must select 1 min - max 7
  //user clicks 'submit' event listner
  // build up country selection form continents


  var prevRecipes = [];

  var sideBarMenu = false;

  function createSidebar(){
    var sideBarBTN = $("<button id='historysideBarBTN'>");
    sideBarBTN.text("Saved Recipes ");
    var sideBarIcon = $("<i class='fas fa-utensils'>");
    sideBarBTN.append(sideBarIcon);
    $("#mobile-menu-btn").append(sideBarBTN);
  }

  if (JSON.parse(localStorage.getItem("prevCountriesRecipe")) !== null) {
    //we check to see if localstorage does not equal null. If so, then we store it in the variable
    prevRecipes = JSON.parse(localStorage.getItem("prevCountriesRecipe"));
  
    createSidebar()
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
    if
     ($("#antarctica").is(":checked")){
       selectedCountriesArr.push("antarctica")
     }
    
    //generates a random number from 0 to the length of the dynamic array
    var randomNumber = Math.floor(Math.random() * selectedCountriesArr.length);
    //selects the country object;
    var randomCountry = selectedCountriesArr[randomNumber];
    if (randomCountry === 'antarctica'){

    //this is a 3rd API call for the Antarctica continent
    //the call will return a random GIF everytime with a pg13 rating and key word of 'cold'
      var GIPHYurl = "https://api.giphy.com/v1/gifs/random?api_key=" + GIPHYapikey + "&tag=cold&rating=pg-13"
      
      $.ajax({
       url: GIPHYurl,
       method: "GET"
      })     
     .then((response) => {
        console.log(response);
         var results = response.data;
         var gifDiv = $("<div id= 'antarcticaGIPH'>");
         console.log(results.images.fixed_height.url);
         var iceIMG = $("<img>")
         iceIMG.attr("src", results.images.downsized_large.url);
         gifDiv.append(iceIMG);   
         $("#dish-container").text("There is no food in Antartica").append(gifDiv);
     
       });
       return 
    }
    var countryName = randomCountry.country;
    //get the id from the country
    var id = randomCountry.id;
    //get the flagcode from the country object
    var flagCode = randomCountry.flagCode;
    getRecipe(countryName, id, flagCode);
  }

  function getRecipe(countryName, id, flagCode) {
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
        var titleEl = $("<h3 id='dish-header' class='page-heading'>");
        titleEl.attr("data-dishId", id);
        // save the id for the recipe so we can access it later for local storage
        titleEl.text(dishTitle);

        var dishImgSrc = response.image;
        var dishImgEl = $("<img id='dish-img'>");
        dishImgEl.attr("src", dishImgSrc);

        var ingredientsHeading = $("<h2 class='page-heading'>");
        ingredientsHeading.text("Ingredients:");

        //created and looped through the ingredients array
        var ingredientsArr = response.extendedIngredients;
        console.log(ingredientsArr);
        var ingredientsList = $("<ul id='ingredients-list '>");
        ingredientsArr.forEach((ingredient) => {
          var ingredientsEl = $("<li class='ingredient my-2'>");
          ingredientsEl.text(ingredient.original);
          ingredientsList.append(ingredientsEl);
        });

        var recipeHeading = $("<h2 class='page-heading'>");
        recipeHeading.text("Recipe: ");

        //get the recipeArr
        var recipeArr = response.analyzedInstructions[0].steps;
        //create an ordered list
        var recipeList = $("<ol id='recipe-list' class='list-decimal'>");
        //loop through the recipeArr and create the list elements and append
        recipeArr.forEach((step) => {
          var recipeStepEl = $("<li class='recipe-step my-2'>");
          recipeStepEl.text(step.step);
          recipeList.append(recipeStepEl);
        });

        var saveBtn = $("<button id='saveBtn' class='my-4'>");
        var saveIcon = $("<i class='fas fa-hamburger'>");
        saveBtn.text("Save Recipe ");
        saveBtn.append(saveIcon);


                //creates an img element with the flag source
                var flagImgElement = $("<img id='flagImg'>");
                //creates the img source
                var flagImageSrc = `https://www.countryflags.io/${flagCode}/flat/64.png`; // image
                flagImgElement.attr("src", flagImageSrc);
                flagImgElement.attr("data-flagCode", flagCode);

                // Sometimes the flag API breaks so this is an alternative image
                flagImgElement.on("error", () => flagImgElement.attr("src","Assets/FryFlag.png").css({"height": "200px", "width": "280px"}));
                
               // flagImgElement.on("error").text("This should be a flag but the API server host is a bit sketchy!")
                displayHeader.append(flagImgElement);
               // flagImgElement.before("<p> This should be a flag but the API server host is a bit sketchy!</p>")



        //logic for ingredients is at the bottom and needs to be added
        $("#dish-container").append(
          flagImgElement,
          displayHeader,
          titleEl,
          dishImgEl,
          ingredientsHeading,
          ingredientsList,
          recipeHeading,
          recipeList,
          saveBtn
        );
      },
    });
  }
  function displayDropdown() {
    if (!sideBarMenu) {
      var sideBarList = $("<ul id='dropdownList'>");
      for (var i = 0; i<prevRecipes.length && i<10; i++){
        // looping through prev recipe array to create clickable list items for each country
        var country = prevRecipes[i]
        var countryListElement = $("<li class='dropdownItem'>"); //temporary classname to be changed with tailwind;
        countryListElement
          .text(country.countryName)
          .attr("data-recipeId", country.id)
          .attr("data-flagID", country.flagId);
        sideBarList.append(countryListElement);
      }
      $("body").append(sideBarList);
      // this is the logic for moving the dropdown from off the page to fixed on to the left hand side
      $("#dropdownList").animate(
        {
          "left": "0",
        },1000);

      sideBarIsOut = true;
    } else {
      closeSideBar();
    }
  }

  function closeSideBar(){
    //if the dropdown is visible, close it by moving it off the page and then removing it
    if (sideBarIsOut){
      $("#dropdownList").animate(
        {
          "left": "-30vw",
        },
        1000, function () {
          $("#dropdownList").remove();
        }
      );
      sideBarIsOut = false;
    }
  }

  function modalDisplay() {
    //we create a modal box which will display in front of content for user to save recipes to local storage
    var modalContainer = $("<div class='text-center' id='modal-box'>");
    var modalHeader = $("<h2 class='font-semibold' id='modal-header'>");
    // we grab the current country name from the html data attribute;
    var countryName = $("#countryHeader").attr("data-countryName");
    modalHeader.text(`Would you like to save this recipe from ${countryName}?`);

    // we add yes and no buttons for user to confirm

    //we give each the same class so we can add one click listener. We will add style with tailwind
    var yesBtn = $("<button class='confirmBtn font-semibold' id='yesBtn'>");
    var yesIcon = $('<i class="fas fa-check">');
    yesBtn.text("Yes ");
    yesBtn.append(yesIcon);

    var noBtn = $("<button class='confirmBtn font-semibold' id='noBtn'>");
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
        flagId: flagId,
      };



      //we create an object with the data we need

      // logic to check local storage for existing Country, using every method to check the countryname of each object
      if (
        prevRecipes.every((dishElement) => {
          //.every checks every element in an array. if it finds an element which returns false, the every method returns false and stops
          return dishElement.countryName !== countryName;
        })
      ) {
        prevRecipes.unshift(countryToBeSaved);
        localStorage.setItem(
          "prevCountriesRecipe",
          JSON.stringify(prevRecipes)
        );
        var successMsg = $("<p id='modalSuccessMsg'>");
        successMsg.text("You have successfully saved this recipe"); // will style later
        $("#modal-box").append(successMsg);
        if (prevRecipes.length === 1){
          createSidebar()
        }
      } else {
        // logic if user has already saved this recipe to storage
        var existingCountry = $("<p id='modalMsg'>");
        existingCountry.text("You have already saved this recipe"); // will style later
        $("#modal-box").prepend(existingCountry);
      }
      //adding a 2000ms delay to the modal fadeout for when you click the yes button so user can see status.
      //adding a call back function to remove the modal when it's been clicked
      setTimeout(function () {
        $("#modal-box").fadeOut(750, function () {
          $("#modal-box").remove();
        });
      }, 500);
    }
    // logic if 'NO' is clicked for modal button
    else {
      $("#modal-box").fadeOut(750, function () {
        $("#modal-box").remove();
      });
    }
  }

  //click listeners
  $("#submitBtn").on("click", countrySelection); //runs the function for picking a country at random based on user input and calls the API

  $("body").on("click", "button#saveBtn", modalDisplay); //displays the modal box and generates all the elements

  $("body").on("click", "button.confirmBtn", saveToLocalStorage); // save button on click function, save to local storage

  $("body").on("click", "button#historysideBarBTN", displayDropdown);
  // added click listener for saved recipes from storage to make a second call to the API
  $("body").on("click", "li.dropdownItem", function () {
    closeSideBar();
    var countryName = $(this).text();
    var dishID = $(this).attr("data-recipeId");
    var flagID = $(this).attr("data-flagID");

    getRecipe(countryName, dishID, flagID);
  });
  //click listener to close the sidebar if the user clicks anywhere on the screen that isn't part of the sidebar
  $("body").on("click", ".container", closeSideBar)
  $("body").on("click", "#dish-container", closeSideBar)

  $("#globe-image").on("click", function(){
    
    window.scrollTo(0,0)
  })

});


