const searchBtn = document.getElementById('search-button');
    searchBtn.addEventListener('click', function(){
    const searchInput = document.getElementById('search-input').value;
    console.log(searchInput);
    
    searchFood(searchInput)

})

function searchFood(inputValue){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
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
                                            <h4>${meal.idMeal}</h4>
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
        //adding whole html in UI
        searchList.innerHTML = searchItem;   
    })
}



// const searchList = document.getElementById('search-list');
// searchList.addEventListener('click', function(e){
//     console.log(e.target)
    
// })


const getDetails = (mealId)=>{

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res =>res.json())
    .then(data =>{
        console.log(data)
    })
};
