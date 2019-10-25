import * as React from "react";
import './style.scss';
interface IngredientProps {
    listItems ?: any;
}

class Ingredient extends React.Component<IngredientProps, {}> {
    constructor(props){
        super(props);
    }
    render() {
        const {listItems} = this.props;
        console.log(listItems);
        return (
           <>
            {listItems && <div className="ing-list-item"> 
                <p>{listItems.ingName}</p>
                <span>{listItems.ingMeasure}</span>
            </div>}
            </>
        );
    }
}


export default Ingredient;
