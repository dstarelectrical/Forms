import React, { useState, useEffect } from "react";
import {
	Input,
	Panel,
	InputGroup,
	IconButton,
	InputPicker,
	Button,
	Stack,
} from "rsuite";
import axios from "axios";
import SearchIcon from "@rsuite/icons/Search";
import { useNavigate } from "react-router-dom";

function CustomerSearch({ pullCustomer }) {
	const [customers, setCustomers] = useState([]);
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState("");
	const [bool, setBool] = useState(false);
	let navigate = useNavigate();

	// useEffect(() => {
	// 	if (customer !== "") {
	// 		handleSelectClick(customer);
	// 	}
	// }, []);

	const handleSearchClick = () => {
		console.log(search);
		axios({
			method: "get",
			url: "http://127.0.0.1:8000/customer/search/",
			params: { search: search },
		}).then((res) => {
			setCustomers(res.data);
			console.log(res.data);
		});
	};

	const handleAddClick = () => {
		navigate("/addcustomer", {
			state: {
				edit: false,
			},
		});
	};

	const header = (customer) => {
		return (
			<div style={{ padding: "5px" }}>
				<h5
					style={{
						marginLeft: "10px",
						float: "left",
					}}
				>
					{customer["customer"]}
				</h5>
			</div>
		);
	};

	const handleSelectClick = (customer) => {
		setCustomers([]);
		setSelected(customer);
		setBool(true);
		pullCustomer(customer);
	};

	return (
		<div>
			<h4>Customer</h4>
			{!bool ? (
				<div>
					<Stack spacing={6} style={{ widht: "100%" }}>
						<Stack.Item grow={1}>
							<InputGroup>
								<Input
									placeholder="Customer Name"
									value={search}
									onChange={(e) => {
										setSearch(e);
									}}
								/>
								<IconButton
									onClick={handleSearchClick}
									icon={<SearchIcon />}
								/>
							</InputGroup>
						</Stack.Item>

						<Button onClick={handleAddClick}>
							Add a new Customer
						</Button>
					</Stack>
					{customers.map((customer) => (
						<Panel
							key={customer.id}
							bordered
							collapsible
							header={customer.customer}
						>
							customer: {customer["customer"]} <br />
							email: {customer["email"]} <br />
							address: {customer["address"]} <br />
							phone: {customer["phone"]} <br />
							<Button
								style={{
									float: "right",
									marginRight: "10px",
									marginBottom: "10px",
								}}
								appearance="primary"
								onClick={(e) => handleSelectClick(customer)}
							>
								Select
							</Button>
						</Panel>
					))}{" "}
				</div>
			) : (
				<Panel
					key={selected.id}
					bordered
					collapsible
					header={"Selected Customer: " + selected["customer"]}
				>
					customer: {selected["customer"]} <br />
					email: {selected["email"]} <br />
					address: {selected["address"]} <br />
					phone: {selected["phone"]} <br />
				</Panel>
			)}
		</div>
	);
}

export default CustomerSearch;
