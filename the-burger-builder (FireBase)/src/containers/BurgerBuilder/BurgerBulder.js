import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Aux from '../../hoc/Aux/Aux'

const INGREDIENT_PRICES = {
    salad: .4,
    chicken: 1.1,
    cheese: .5,
    meat: 1.3
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }
    state = {
        ingredient: {
            salad:0,
            chicken:0,
            cheese:0,
            meat:0
        },
        price: 4,
        purchasable: false,
        purchasing: false,
    }

    updatePurchasableHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => ingredients[igKey])
        .reduce((arr, el) => arr + el, 0)
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.price
        const newPrice = oldPrice + priceAddition
        this.setState({ingredient:updatedIngredients, price:newPrice})
        this.updatePurchasableHandler(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinuoHandler = () => {
        alert('you are continuous')
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type]
        if (oldCount > 0) {
            const updatedCount = oldCount - 1
            const updatedIngredients = {
                ...this.state.ingredient
            };
            updatedIngredients[type] = updatedCount;
            const priceSubstraction = INGREDIENT_PRICES[type]
            const oldPrice = this.state.price
            const newPrice = oldPrice - priceSubstraction
            this.setState({ingredient:updatedIngredients, price:newPrice})
            this.updatePurchasableHandler(updatedIngredients)
        } 
        // else {// NEVER HAPPENED
        //     
        //     alert(`your Burger did not have any ${type} to remove it!`)
        // }
    } 

    render() {
        const disabledInfo = {
            ...this.state.ingredient
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredient}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinuoHandler}
                        price={this.state.price}/>
                </Modal>
                <Burger ingredient={this.state.ingredient} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.price}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    }

}

export default BurgerBuilder