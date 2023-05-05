import React, { useState, useEffect } from "react";
import { Panel, Form, Button, useToaster, Message } from "rsuite";
import axios from "axios";
import SearchIcon from "@rsuite/icons/Search";

function AddCustomer() {
	const [formVal, setFormVal] = useState({
		customer: "",
		address: "",
		email: "",
		phone: "",
	});
	const toaster = useToaster();

	const notifySuccessPost = (message) => {
		toaster.push(<Message type="success">{message}</Message>, {
			placement: "topEnd",
			duration: 5000,
		});
	};

	const notifyFailedPost = (error) => {
		toaster.push(<Message type="error">{error}</Message>, {
			placement: "topEnd",
			duration: 5000,
		});
	};

	const handleSaveClick = () => {
		console.log(formVal);
		axios({
			method: "post",
			url: "http://127.0.0.1:8000/customer/add/",
			data: formVal,
		})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					notifySuccessPost("motor created successfully");
				}
			})
			.catch((err) => {
				notifyFailedPost(err.message);
			});
	};

	return (
		<Panel bordered style={{ margin: "10px" }} header="Add Customer">
			<Form onChange={(e) => setFormVal(e)} layout="horizontal">
				<Form.Group controlId="customer">
					<Form.ControlLabel>Customer</Form.ControlLabel>
					<Form.Control name="customer" defaultValue={""} />
				</Form.Group>

				<Form.Group controlId="address">
					<Form.ControlLabel>Address</Form.ControlLabel>
					<Form.Control name="address" defaultValue={""} />
				</Form.Group>

				<Form.Group controlId="email">
					<Form.ControlLabel>Email</Form.ControlLabel>
					<Form.Control name="email" defaultValue={""} />
				</Form.Group>

				<Form.Group controlId="phone">
					<Form.ControlLabel>Phone</Form.ControlLabel>
					<Form.Control name="phone" defaultValue={""} />
				</Form.Group>

				<Button onClick={handleSaveClick}>Save</Button>
			</Form>
		</Panel>
	);
}

export default AddCustomer;
