import React, { useState, useEffect } from "react";
import { Input, Button, useToaster, Message } from "rsuite";
import AcMotorSearch from "./AcMotorSearch";
import CustomerSearch from "../customer/customerSearch";
import JobDetails from "./AcMotorJobDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JobCreation() {
	const [jobNum, setJobNum] = useState("");
	const [motor, setMotor] = useState("");
	const [customer, setCustomer] = useState("");
	const [JobDetailsobj, setJobDetailsObj] = useState("");
	let navigate = useNavigate();

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

	return (
		<div style={{ margin: "20px" }}>
			<h3 style={{ marginBottom: "20px" }}>Create a Job</h3>
			<CustomerSearch pullCustomer={(e) => setCustomer(e)} />
			<AcMotorSearch pullMotor={(e) => setMotor(e)} />
			<JobDetails pullDetails={(e) => setJobDetailsObj(e)} />
			<Button block onClick={handleSaveClick}>
				Save
			</Button>
		</div>
	);
}

export default JobCreation;
