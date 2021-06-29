import React, { Component } from 'react';
import { Template } from '../../components';
import { connect } from 'react-redux';
import { SERVER_IP } from '../../private';
import './orderForm.css';

const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`;
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;

const mapStateToProps = (state) => ({
    auth: state.auth,
    order_id: state.id
})

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_item: "",
            quantity: "1"
        }
    }

    menuItemChosen(event) {
        this.setState({ order_item: event.target.value });
    }

    menuQuantityChosen(event) {
        this.setState({ quantity: event.target.value });
    }

    async submitOrder(event) {
        event.preventDefault();
        if (this.state.order_item === "") return;
        console.log(this.state.order_id);
        if (this.state.order_id) {
            await fetch(EDIT_ORDER_URL, {
                method: 'POST',
                body: JSON.stringify({
                    id: this.state.order_id,
                    order_item: this.state.order_item,
                    quantity: this.state.quantity,
                    ordered_by: this.props.auth.email || 'Unknown!',
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(response => console.log("Edit Success", JSON.stringify(response)))
            .catch(error => console.error(error)); 
        } else {
            await fetch(ADD_ORDER_URL, {
                method: 'POST',
                body: JSON.stringify({
                    order_item: this.state.order_item,
                    quantity: this.state.quantity,
                    ordered_by: this.props.auth.email || 'Unknown!',
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(response => console.log("Success", JSON.stringify(response)))
            .catch(error => console.error(error));
            }   
        this.props.history.push('/view-orders');
    }

    componentDidMount() {
        if (this.props.location.state) {
          this.setState({
            order_id: this.props.location.state.id,
            order_item: this.props.location.state.order_item,
            quantity: this.props.location.state.quantity,
          });
        }
    }

    render() {
        return (
            <Template>
                <div className="form-wrapper">
                    <form>
                        <label className="form-label">I'd like to order...</label><br />
                        <select 
                            value={this.state.order_item} 
                            onChange={(event) => this.menuItemChosen(event)}
                            className="menu-select"
                        >
                            <option value="" defaultValue disabled hidden>Lunch menu</option>
                            <option value="Soup of the Day">Soup of the Day</option>
                            <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                            <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                            <option value="Chili Con Carne">Chili Con Carne</option>
                        </select><br />
                        <label className="qty-label">Qty:</label>
                        <select value={this.state.quantity} onChange={(event) => this.menuQuantityChosen(event)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <button type="button" className="order-btn" onClick={(event) => this.submitOrder(event)}>Order It!</button>
                    </form>
                </div>
            </Template>
        );
    }
}

export default connect(mapStateToProps, null)(OrderForm);


// PseudoCodeed steps for issue #15

// This pull request will include changes from ORDER ITEM and USER EMAIL in order to test the app
// Use PostMan to test API calls if needed

// Edit:
// -Add onClick function to edit button. - directs to edit form and passes order_id
// -Update the orderForm component to render as 'edit order' if user passes an id
// -Just set state when the component renders, then use conditional to render EDIT or ADD based on whether or not there is an ID in state
// -Create update function by calling API in similar form as NEW order
// -push to view-orders page with history

// Delete:
// -Add event listener to button that takes order id
// -Button will call API to delete that record
// -At the end call the fetch method again to force rerendering on the page
// -Switch componentDidMount code into a function called getOrders()

// 
// Delete Order (POST) - (server addr)/api/delete-order (Expects id in request body)
// Edit Order (POST) - (server addr)/api/edit-order (Expects id in request body. Will look for ordered_by, quantity, menu_item.)
// Flush Orders (DELETE) - (server addr)/api/delete-all (This deletes all current orders in the DB)