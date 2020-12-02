$(function(){
    const apikey = "813168050135472e9820b823b47943fa";
    var queryurl = "https://api.spoonacular.com/recipes/complexSearch?query=kiwi&number=20&apiKey=" + apikey

    $.ajax({
        url: queryurl,
        method: "GET"
    }).then(function(res){
       // var id = res.results;
        // var newQueryurl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=` + apikey
        // $.ajax({
        //     url: newQueryurl,
        //     method: "GET"
        // }).then(function(res){
            console.log(res);
            
        })
    })

//