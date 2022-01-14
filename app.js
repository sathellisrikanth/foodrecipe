const searchForm = document.querySelector('form');
const searchresultDiv = document.querySelector('.search-result')
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "178b52d3";
const APP_KEY = "470a969ad20236ad331d413e3b3905bb";
//this is basic url to accces the site 
//but to make any req u need to send api key and app id as well with each req
//q and r parametrs which tells ur search term
// const baseURL = `https://api.edamam.com/search`;
// const baseURL = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}`;



searchForm.addEventListener('submit', (e)=>{

    e.preventDefault();

    ///getting user searched value 
    searchQuery = e.target.querySelector('input').value
    console.log(searchQuery)
   

    //after hitting enter this fun called
    //--baseurl fetching taking response
    //--resp to json
    //--in data there r 20 arrys 
    //--call generateHTML with 20 array items
    fetchApi();

})

async function fetchApi(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=18`;
    const response =  await fetch(baseURL);
    console.log(response)
    const data = await response.json()
    console.log(data);
    generateHTML(data.hits);
    

}

function generateHTML(results){

        let generatedHtml = "";
        results.map(result =>{
            //each array itm ni looping and addig this html or appending
            
            generatedHtml +=
                ` <div class="item">
                <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="viewButton" href="${result.recipe.url}" target = "_blank">View Recipe</a>
                </div>
            
                <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            </div>`
        })

        searchresultDiv.innerHTML = generatedHtml;
}
//toFixed means after decimal only 2 values shows