$(function () {
  const apikey = "0ca619dbe1c54687905affcae7c39231";
  // "813168050135472e9820b823b47943fa";

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

        console.log(response);

        var dishTitle = response.title;
        console.log(dishTitle)

        var dishImgSrc = response.image;
        console.log(dishImgSrc)

        var recipeArr = response.analyzedInstructions[0].steps;
        console.log(recipeArr);




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

  //random country picked
  //make API calls
  //build object dynamically on page
  // Name of dish
  // res.title
  // image
  // res.image
  // recipe
  // res.analyzedInstructions[0].steps (is an array of objects)

  //add buttons - 'save' to or 'remove' from local storage
});
