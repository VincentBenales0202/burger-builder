import React from 'react';
import classes from './BurgerIngredients.module.css'
import PropTypes from 'prop-types'

const burgerIngredients = props => {
    let ingredients = null;
        switch(props.type){
            case('bread-bottom'):
                ingredients = <div className={classes.BreadBottom}/>
                break;
            case('bread-top'):
                ingredients = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}/>
                        <div className={classes.Seeds2}/>
                    </div>
                )
                break;
            case('meat'):
                ingredients = <div className={classes.Meat}/>
                break;
            case('cheese'):
                ingredients = <div className={classes.Cheese} />    
                break;
            case('salad'):
                ingredients = <div className={classes.Salad}/>
                break;
            case('bacon'):
                ingredients = <div className={classes.Bacon}/>
                break;
            default:
                ingredients = null
        }

    return ingredients
}

burgerIngredients.propTypes = {
    type: PropTypes.string.isRequired
}

export default burgerIngredients