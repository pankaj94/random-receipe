import * as React from "react";
import { hot } from "react-hot-loader";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import Ingredient from '../components/Ingredients'


interface AppStates {
    showLoader : boolean;
    receipeData : any;

}
class App extends React.Component<{}, AppStates> {
    constructor(props){
        super(props);
        this.state = {
            showLoader : true,
            receipeData : []
        }
    }
    getRandomReceipe = () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
        fetch(url).then((res)=>res.json()).then((res) =>
            this.generateReceipe(res)
        )
        
    }
    generateReceipe = (res) => {
        const checkVal = res && res.meals && res.meals.length > 0;
        let ingredientList  = [];
        if(checkVal){
            let meal = res.meals[0];
            for(let i=0;i<20;i++){
                if(meal[`strIngredient${i}`]){
                    ingredientList.push({
                        ingName : meal[`strIngredient${i}`],
                        ingMeasure : meal[`strMeasure${i}`]
                    })
                }
            }
            let newL = meal.strYoutube.length > 0 ?  meal.strYoutube.split('v=')[1] : '';
            meal.strYoutube = 'https://www.youtube.com/embed/'+ newL;
            meal.ingredientList = ingredientList;
            this.setState({
               receipeData : meal,
               showLoader : false 
            })
        }
        
    }
    public render() {
        const {showLoader,receipeData} = this.state;
        console.log(receipeData);
        return (
            <div className="app">
                {showLoader &&  <div className="txt-center"> 
                    <h1 > Welcome to Receipe finder</h1>
                    <button onClick={this.getRandomReceipe}>Get new Receipe</button>
                </div>}

                {!showLoader && <div>
                    <h1 className="txt-center">{receipeData.strMeal}</h1>
                    <button className="txt-center" onClick={this.getRandomReceipe}>Watch New Receipe</button>
                    <div className="description">
                        <img src={receipeData.strMealThumb} />
                        <p>{receipeData.strInstructions}</p>
                    </div>
                    <div >
                        <h2 className="txt-center"> Ingredients</h2>
                        <div className="ing-lists">
                        {receipeData.ingredientList.map((item,index) => {
                            return <Ingredient key={`ing${index}`} listItems={item} />
                        })}
                        </div>
                    </div>
                    <div>
                        <div>Watch Receipe</div>
                        <iframe width="1000" height="700" src={`${receipeData.strYoutube}`}></iframe>
                    </div>

                </div>

                }
                
            </div>
        );
    }
}

declare let module: object;

export default hot(module)(App);
