import React, { useState, useEffect } from "react";
import { Input, Button, Panel } from "rsuite";
import AcMotorSearch from "./AcMotorSearch";
import CustomerSearch from "../customer/customerSearch";
import JobDetails from "./AcMotorJobDetails";
import axios from "axios";

function DisplayJobDetails({ jobDet }) {
	const [job, setJob] = useState(jobDet);
	const [motor, setMotor] = useState("");
	const [customer, setCustomer] = useState("");

	useEffect(() => {
		console.log("job", jobDet);
		axios({
			method: "get",
			url: `http://127.0.0.1:8000/customer/get/${jobDet["customer"]}`,
		}).then((res) => {
			console.log(res);
			setCustomer(res.data[0]);
		});
		axios({
			method: "get",
			url: `http://127.0.0.1:8000/acmotors/motor/${jobDet["motor"]}`,
		}).then((res) => {
			console.log(res);
			setMotor(res.data[0]);
		});
	}, []);

	const getUrgency = (job) => {
		let str = "";
		if (job["urgency"] === "Specific Time") {
			str =
				job["urgency"] + "||" + "Specific time: " + job["specificDate"];
		} else {
			str = job["urgency"];
		}
		return str;
	};

	const getApplication = (job) => {
		let str = "";
		if (job["application"] === "Other") {
			str =
				job["application"] +
				" ||          " +
				"Other: " +
				job["app_other"];
		} else {
			str = job["application"];
		}
		return str;
	};

	const keyRight = { fontWeight: "bold", fontSize: "17px" };
	const valueRight = {
		fontSize: "17px",
		marginLeft: "5px",
	};

	return (
		<div>
			<Panel
				defaultExpanded
				key={customer.id}
				bordered
				header={<h3>Customer: {customer["customer"]}</h3>}
				style={{ float: "left", width: "100%", margin: "5px" }}
			>
				<div style={{ display: "flex" }}>
					<div style={{ width: "50%" }}>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Customer:</div>
							<div style={valueRight}>{customer["customer"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>email:</div>
							<div style={valueRight}>{customer["email"]}</div>
						</div>
					</div>
					<div style={{ width: "50%" }}>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>address:</div>
							<div style={valueRight}>{customer["address"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>phone:</div>
							<div style={valueRight}>{customer["phone"]}</div>
						</div>
					</div>
				</div>
			</Panel>
			<Panel
				defaultExpanded
				key={job.id}
				bordered
				header={<h3>Job Details</h3>}
				style={{ float: "left", width: "100%", margin: "5px" }}
			>
				<div style={{ display: "flex" }}>
					<div style={{ width: "50%" }}>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>PO Number:</div>
							<div style={valueRight}>{job["po_num"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Quote required:</div>
							<div style={valueRight}>{job["quote"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Equipment:</div>
							<div style={valueRight}>{job["equipment"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Urgency:</div>
							<div style={valueRight}>{getUrgency(job)} </div>
						</div>
					</div>
					<div style={{ width: "50%" }}>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Pictures:</div>
							<div style={valueRight}>{job["pictures"]}</div>
						</div>

						<div style={{ display: "flex" }}>
							<div style={keyRight}>Signature:</div>
							<div style={valueRight}>{job["signature"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Application:</div>
							<div style={valueRight}>{getApplication(job)}</div>
						</div>
					</div>
				</div>
				<div style={{ display: "flex" }}>
					<div style={keyRight}>Customer Comments:</div>
					<div style={valueRight}>{job["customerComments"]}</div>
				</div>
				<div style={{ display: "flex" }}>
					<div style={keyRight}>Parts Missing Or Broken:</div>
					<div style={valueRight}>{job["partsMissing"]}</div>
				</div>
			</Panel>
			<Panel
				defaultExpanded
				key={motor.id}
				bordered
				header={<h3>Motor: {motor["manufacturer"]}</h3>}
				style={{
					float: "left",
					margin: "5px",
					width: "100%",
				}}
			>
				<div style={{ display: "flex" }}>
					<div style={{ width: "50%" }}>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Manufacturer:</div>
							<div style={valueRight}>
								{motor["manufacturer"]}
							</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Serial#:</div>
							<div style={valueRight}>{motor["serial"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Model:</div>
							<div style={valueRight}>{motor["model"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Frame:</div>
							<div style={valueRight}>{motor["frame"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>RPM:</div>
							<div style={valueRight}>{motor["rpm"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Hp/KW:</div>
							<div style={valueRight}>{motor["hpkw"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Enclosure:</div>
							<div style={valueRight}>{motor["enclosure"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Volts:</div>
							<div style={valueRight}>{motor["volts"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Amps:</div>
							<div style={valueRight}>{motor["amps"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Measurement:</div>
							<div style={valueRight}>{motor["measurement"]}</div>
						</div>
					</div>
					<div style={{ width: "50%" }}>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Phase:</div>
							<div style={valueRight}>{motor["phase"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Class:</div>
							<div style={valueRight}>{motor["_class"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Amb.Temp:</div>
							<div style={valueRight}>{motor["ambTemp"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Time Rating:</div>
							<div style={valueRight}>{motor["timeRating"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Cycles:</div>
							<div style={valueRight}>{motor["cycles"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>DIV:</div>
							<div style={valueRight}>{motor["div"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Eyebolt:</div>
							<div style={valueRight}>{motor["eyebolt"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Fitted With:</div>
							<div style={valueRight}>{motor["fittedWith"]}</div>
						</div>
						<div style={{ display: "flex" }}>
							<div style={keyRight}>Fitted With:</div>
							<div style={valueRight}>{motor["inOut"]}</div>
						</div>
					</div>
				</div>
			</Panel>
		</div>
	);
}

export default DisplayJobDetails;
