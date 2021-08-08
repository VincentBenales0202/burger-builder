import React, { Component } from "react";
import axios from "../../axios-orders";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    let sum = Object.keys(ingredients)
      .map((igkey) => ingredients[igkey])
      .reduce((sum, el) => sum + el);
    return sum > 0;
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
    // const queryParams = [];
    // for (let i in this.props.ing)
    //   queryParams.push(
    //     `${encodeURIComponent(i)}=${encodeURIComponent(this.state.ing[i])}`
    //   );
    // queryParams.push(`price=${this.state.totalPrice}`);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout/",
    //   search: `?${queryString}`,
    // });
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  // addIngredientHandler = (type) => {
  //   const count = this.state.ingredients[type] + 1;
  //   const ingredients = {
  //     ...this.state.ingredients,
  //   };
  //   ingredients[type] = count;
  //   const totalPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
  //   this.setState({
  //     ingredients: ingredients,
  //     totalPrice: totalPrice,
  //   });
  //   this.updatePurchaseState(ingredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const count =
  //     this.state.ingredients[type] === 0
  //       ? this.state.ingredients[type]
  //       : this.state.ingredients[type] - 1;
  //   const ingredients = {
  //     ...this.state.ingredients,
  //   };
  //   ingredients[type] = count;
  //   const totalPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
  //   this.setState({
  //     ingredients: ingredients,
  //     totalPrice: totalPrice,
  //   });
  //   this.updatePurchaseState(ingredients);
  // };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <h1> Ingredients can't be loaded</h1>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disable={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      // if (this.state.loading) orderSummary = <Spinner />;
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

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName)),
  onIngredientRemoved: (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
