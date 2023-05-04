import React, { useState, useEffect } from "react";
import { Input, Panel, IconButton, Form, Button, InputGroup } from "rsuite";
import axios from "axios";
import SearchIcon from "@rsuite/icons/Search";

function AddCustomer() {
	const [formVal, setFormVal] = useState({
		customer: "",
		address: "",
		email: "",
		phone: "",
	});

	const handleSaveClick = () => {
		console.log(formVal);
		axios({
			method: "post",
			url: "http://127.0.0.1:8000/customer/add/",
			data: formVal,
		}).then((res) => {
			console.log(res);
		});
	};

	return (
		<Panel
			bordered
			collapsible
			style={{ margin: "10px" }}
			header="Add Customer"
		>
			<Form onChange={setFormVal} layout="horizontal">
				<Form.Group controlId="customer">
					<Form.ControlLabel>Customer</Form.ControlLabel>
					<Form.Control name="customer" />
					<Form.HelpText tooltip>Required</Form.HelpText>
				</Form.Group>

				<Form.Group controlId="address">
					<Form.ControlLabel>Address</Form.ControlLabel>
					<Form.Control name="address" />
				</Form.Group>

				<Form.Group controlId="email">
					<Form.ControlLabel>Email</Form.ControlLabel>
					<Form.Control name="email" />
				</Form.Group>

				<Form.Group controlId="phone">
					<Form.ControlLabel>Phone</Form.ControlLabel>
					<Form.Control name="phone" />
				</Form.Group>

				<Button onClick={handleSaveClick}>Save</Button>
			</Form>
		</Panel>
	);
}

export default AddCustomer;
