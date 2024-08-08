import React, { useState, useEffect } from "react";
import { Input, Button, useToaster, Message, Tooltip, Whisper } from "rsuite";
import AcMotorSearch from "./AcMotorSearch";
import CustomerSearch from "../customer/customerSearch";
import JobDetails from "./AcMotorJobDetails";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../baseurl";
import InfoRoundIcon from "@rsuite/icons/InfoRound";
import SideNav from "../sidenav";

function JobCreation() {
	const [jobNum, setJobNum] = useState("");
	const [motor, setMotor] = useState("");
	const [customer, setCustomer] = useState("");
	const [JobDetailsobj, setJobDetailsObj] = useState({});
	const [edit, setEdit] = useState(false);
	let navigate = useNavigate();
	const location = useLocation();
	const toaster = useToaster();

	const notifyFailedPost = (error) => {
		toaster.push(<Message type="error">{error}</Message>, {
			placement: "topEnd",
			duration: 5000,
		});
	};

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
			url: baseurl + "acmotors/newjob/",
			data: query,
		})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					navigate("/job/" + res.data.id, { replace: true });
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				notifyFailedPost(error.response.data);
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
	// 		url: baseurl + "acmotors/newjob/",
	// 		data: query,
	// 	}).then((res) => {
	// 		console.log(res);
	// 		if (res.status === 200) {
	// 			navigate("/job/" + res.data.id, { replace: true });
	// 		}
	// 	});
	// };

	return (
		<div
			style={{
				display: "flex",
				marginRight: "5px",
				height: "100%",
				fontFamily: "Inter, sans-serif",
			}}
		>
			<SideNav />
			<div
				style={{
					float: "left",
					width: "85%",
					height: "100%",
					width: "calc(100% - 210px)",
					marginLeft: "210px",
				}}
			>
				<h3 style={{ marginBottom: "5px" }}>Create a Job</h3>
				<CustomerSearch pullCustomer={(e) => setCustomer(e)} />
				<AcMotorSearch pullMotor={(e) => setMotor(e)} />
				<JobDetails pullDetails={(e) => setJobDetailsObj(e)} />
				<Button onClick={handleSaveClick} block appearance="primary">
					Save
				</Button>
			</div>
		</div>
	);
}

export default JobCreation;
