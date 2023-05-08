import React, { useState, useEffect } from "react";
import {
	Panel,
	Form,
	Button,
	useToaster,
	Message,
	Input,
	InputPicker,
	Stack,
} from "rsuite";
import axios from "axios";
import SearchIcon from "@rsuite/icons/Search";
import { useLocation, useNavigate } from "react-router-dom";

function AddCustomer() {
	const [customer, setCustomer] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [id, setId] = useState("");
	const [edit, setEdit] = useState(false);
	const [jobId, setJobId] = useState("");
	const toaster = useToaster();
	const location = useLocation();
	let navigate = useNavigate();

	const setParams = (params) => {
		console.log(params);
		if (params.edit === true) {
			setAddress(params.address);
			setCustomer(params.customer);
			setPhone(params.phone);
			setEmail(params.email);
			setId(params.id);
			setEdit(params.edit);
			setJobId(params.jobId);
		} else {
			setEdit(false);
		}
	};

	useEffect(() => {
		setParams(location.state);
	}, []);

	const query = {
		customer: customer,
		address: address,
		email: email,
		phone: phone,
	};

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
		axios({
			method: "post",
			url: "https://dstarforms.herokuapp.com//customer/add/",
			data: query,
		})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					notifySuccessPost("customer created successfully");
				}
			})
			.catch((err) => {
				notifyFailedPost(err.message);
			});
	};

	const handleEditClick = () => {
		let data = {
			id: id,
			...query,
		};
		axios({
			method: "post",
			url: "https://dstarforms.herokuapp.com//customer/add/",
			data: data,
		})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					navigate(`/job/${jobId}`);
					notifySuccessPost("customer edited successfully");
				}
			})
			.catch((err) => {
				notifyFailedPost(err.message);
			});
	};

	return (
		<Panel bordered style={{ margin: "10px" }} header="Add Customer">
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Customer:
				<Input
					value={customer}
					onChange={(e) => {
						setCustomer(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Address:
				<Input
					value={address}
					onChange={(e) => {
						setAddress(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Email:
				<Input
					value={email}
					onChange={(e) => {
						setEmail(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Phone:
				<Input
					value={phone}
					onChange={(e) => {
						setPhone(e);
					}}
				/>
			</Stack>

			{!edit ? (
				<Button onClick={handleSaveClick}>Save</Button>
			) : (
				<Button onClick={handleEditClick}>Edit</Button>
			)}
		</Panel>
	);
}

export default AddCustomer;
