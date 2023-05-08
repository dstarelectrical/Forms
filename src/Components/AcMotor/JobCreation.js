import React, { useState, useEffect } from "react";
import { Input, Button, useToaster, Message } from "rsuite";
import AcMotorSearch from "./AcMotorSearch";
import CustomerSearch from "../customer/customerSearch";
import JobDetails from "./AcMotorJobDetails";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function JobCreation() {
	const [jobNum, setJobNum] = useState("");
	const [motor, setMotor] = useState("");
	const [customer, setCustomer] = useState("");
	const [JobDetailsobj, setJobDetailsObj] = useState("");
	const [edit, setEdit] = useState(false);
	let navigate = useNavigate();
	const location = useLocation();

	// const setParams = (params) => {
	// 	if (params.edit === true) {
	// 		setEdit(params.edit);
	// 	}
	// };

	// useEffect(() => {
	// 	setParams(location.state);
	// }, []);

	const handleSaveClick = () => {
		let query = JobDetailsobj;
		query["customer"] = customer.id;
		query["motor"] = motor.id;
		query["step"] = "scope1";
		query["status"] = "active";
		if (query["app_other"] === "") {
			query["app_other"] = null;
		}
		console.log(query);
		axios({
			method: "post",
			url: "http://127.0.0.1:8000/acmotors/newjob/",
			data: query,
		}).then((res) => {
			console.log(res);
			if (res.status === 200) {
				navigate("/job/" + res.data.id, { replace: true });
			}
		});
	};

	// const handleEditClick = () => {
	// 	let query = JobDetailsobj;
	// 	query["customer"] = customer.id;
	// 	query["motor"] = motor.id;
	// 	query["step"] = "scope1";
	// 	query["status"] = "active";
	// 	if (query["app_other"] === "") {
	// 		query["app_other"] = null;
	// 	}
	// 	console.log(query);
	// 	axios({
	// 		method: "post",
	// 		url: "http://127.0.0.1:8000/acmotors/newjob/",
	// 		data: query,
	// 	}).then((res) => {
	// 		console.log(res);
	// 		if (res.status === 200) {
	// 			navigate("/job/" + res.data.id, { replace: true });
	// 		}
	// 	});
	// };

	return (
		<div style={{ margin: "20px" }}>
			<h3 style={{ marginBottom: "20px" }}>Create a Job</h3>
			<CustomerSearch pullCustomer={(e) => setCustomer(e)} />
			<AcMotorSearch pullMotor={(e) => setMotor(e)} />
			<JobDetails pullDetails={(e) => setJobDetailsObj(e)} />
			<Button onClick={handleSaveClick} block>
				Save
			</Button>
		</div>
	);
}

export default JobCreation;
