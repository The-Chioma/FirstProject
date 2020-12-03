$(function(){
    const apikey = "0ca619dbe1c54687905affcae7c39231"
    // "813168050135472e9820b823b47943fa";
    var id = 633661;
    var queryurl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=` + apikey

    $.ajax({
        url: queryurl,
        method: "GET",
        success: function (response) {
    
   
        var flagImage = "https://www.countryflags.io/be/flat/64.png" // image
        console.log(response);
            
        }
    })

//display continents 1-7
//user must select 1 min - max 7
//user clicks 'submit' event listner
// build up country selection form continents
function countrySelection() {
    

}
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






})