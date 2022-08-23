const searchBtn = document.getElementById('search-button');
    searchBtn.addEventListener('click', function(){
    const searchInput = document.getElementById('search-input').value;
    
    if (searchInput.length > 0){
        searchFood(searchInput)
       
    }
    else{
        document.getElementById('search-result-text').innerHTML = `<span class="text-danger">Please Put Valid Meal Name</span>`;
    }
})
// 


document.getElementById('search-input').addEventListener("keypress", function(event){
    if (event.key === 'Enter') {
        document.getElementById("search-button").click();
       }
})




function searchFood(inputValue){
    document.getElementById('search-result-text').innerHTML = `<span>Your Search Result:</span>`;
    
    //Show Spniner
    toggleSpinner()

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(res => res.json())
    .then(data => {
        const allMeals = data.meals;
        const searchList = document.getElementById('search-list');
        
        let searchItem = "";

       

        if(allMeals){
            allMeals.forEach(meal => {
                searchItem += `
                                <div class="col-md-3 my-3 ">
                                        <div onclick="getDetails(${meal.idMeal})" class="menu-item">
                                            <img src=${meal.strMealThumb} alt="">
                                            <h3>${meal.strMeal}</h3>
                                            </a>
                                        </div>
                                </div> `
            });
        }
        else {
            console.log('Meal not found')
            document.getElementById('not-found').style.display ="block"
        }
        //loop end
        toggleSpinner()
        

   
         //adding whole html in UI
        searchList.innerHTML = searchItem;  
       
    })
    
}



//Meal Details section

const getDetails = (mealId)=>{
    document.getElementById('food-details-section').style.display ='block';
    document.getElementById('search-food-meals').style.display="none";

    
    
    

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res =>res.json())
    .then(data =>{
        // console.log(data.meals[0]);
        const meal = data.meals[0];
        addMealToDom(meal);

    })
  
};


//Add Meal to DOM
const addMealToDom = (meal) =>{
    //Details Title
    document.getElementById('details-title').innerText = meal.strMeal;
    //Details Thumbnail
    document.getElementById('detail-img').src = meal.strMealThumb;
    
    
    const container = document.getElementById('ingredient-container');
    container.innerHTML = '';
    
    
    for(let i =0; i<= 20; i++){
        if(meal[`strIngredient${i}`]){
         
            const ingredient = document.createElement('p')
            ingredient.innerHTML = `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
            container.appendChild(ingredient);
                    
            // console.log( `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}` );
        }           
    }
}



//Close Button Handelar
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', function(){
    document.getElementById('food-details-section').style.display="none";
    document.getElementById('search-food-meals').style.display="block";
    
});



//Toggle Spinner
function toggleSpinner(){
    const spinner =  document.getElementById("spinner");
    spinner.classList.toggle("d-none");

}