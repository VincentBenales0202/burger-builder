import React, { Component } from "react";
import axios from "../../axios-orders";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 0.3,
  bacon: 0.5,
  cheese: 0.2,
  meat: 1,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 1,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((error) => this.setState({ error: true }));
  }

  updatePurchaseState = (ingredients) => {
    let sum = Object.keys(ingredients)
      .map((igkey) => ingredients[igkey])
      .reduce((sum, el) => sum + el);
    this.setState({
      purchasable: sum > 0,
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients)
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      );
    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout/",
      search: `?${queryString}`,
    });

    console.log(this.props.match);
  };

  addIngredientHandler = (type) => {
    const count = this.state.ingredients[type] + 1;
    const ingredients = {
      ...this.state.ingredients,
    };
    ingredients[type] = count;
    const totalPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice,
    });
    this.updatePurchaseState(ingredients);
  };

  removeIngredientHandler = (type) => {
    const count =
      this.state.ingredients[type] === 0
        ? this.state.ingredients[type]
        : this.state.ingredients[type] - 1;
    const ingredients = {
      ...this.state.ingredients,
    };
    ingredients[type] = count;
    const totalPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice,
    });
    this.updatePurchaseState(ingredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <h1> Ingredients can't be loaded</h1>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disable={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      if (this.state.loading) orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          removed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
