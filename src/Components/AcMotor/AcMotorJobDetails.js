import React, { useState, useEffect } from "react";
import {
	Input,
	Panel,
	DatePicker,
	Stack,
	InputPicker,
	Button,
	FlexboxGrid,
} from "rsuite";
import axios from "axios";
import { baseurl } from "../../baseurl";

function JobDetails({ job, pullDetails }) {
	const [po, setPO] = useState("");
	const [date, setDate] = useState(new Date());
	const [quote, setQuote] = useState("");
	const [equipment, setEquipment] = useState("");
	const [application, setApplication] = useState("");
	const [urgency, setUrgency] = useState("");
	const [specificTime, setSpecificTime] = useState(new Date());
	const [other, setOther] = useState("");
	const [pictures, setPictures] = useState("");
	const [comments, setComments] = useState("");
	const [missing, setMissing] = useState("");
	const [signature, setSignature] = useState("");
	const [eyeboltDamaged, setEyeboltDamaged] = useState("");
	const [id, setId] = useState("");
	const [edit, setEdit] = useState(false);

	// const setParams = (params) => {
	// 	console.log(params);
	// 	if (params.edit === true) {
	// 		setId(params.id);
	// 		setEdit(params.edit);
	// 		setPO(params.po);
	// 		setDate(params.date);
	// 		setQuote(params.quote);
	// 		setApplication(params.application);
	// 		setUrgency(params.urgency);
	// 		setSpecificTime(params.specificTime);
	// 		setOther(params.other);
	// 		setPictures(params.pictures);
	// 		setComments(params.comments);
	// 		setMissing(params.missing);
	// 		setSignature(params.signature);
	// 		setEyeboltDamaged(params.eyeboltDamaged);
	// 	} else {
	// 		setEdit(params.edit);
	// 	}
	// };

	// useEffect(() => {
	// 	setParams(job);
	// }, []);

	const quoteData = ["Yes", "No"].map((item) => ({
		label: item,
		value: item,
	}));

	const equipmentData = [
		"1Phase AC Motor",
		"3Phase AC Motor",
		"AC Stator",
		"AC Rotor",
	].map((item) => ({
		label: item,
		value: item,
	}));

	const applicationData = [
		"General Purpose",
		"Crane",
		"Elevator",
		"Other",
	].map((item) => ({
		label: item,
		value: item,
	}));

	const urgencyData = [
		"Rush w/OT",
		"Rush w/limitedOT",
		"Normal Planning",
		"Hold Points",
		"Specific Date",
	].map((item) => ({
		label: item,
		value: item,
	}));

	const getSpecificTime = () => {
		if (urgency !== "Specific Date") {
			return specificTime;
		} else {
			return "";
		}
	};

	let query = {
		equipment: equipment,
		application: application,
		urgency: urgency,
		app_other: other,
		po_num: po,
		quote: quote,
		customerComments: comments,
		partsMissing: missing,
		signature: signature,
		specificDate: getSpecificTime(),
		pictures: pictures,
		eyeboltDamaged: eyeboltDamaged,
	};

	return (
		<div style={{ marginTop: "5px", position: "relative" }}>
			<h4>Job details</h4>
			<FlexboxGrid>
				<FlexboxGrid.Item colspan={8}>
					<Stack spacing={6} style={{ marginBottom: "5px" }}>
						<div style={{ width: "160px", textAlign: "right" }}>
							PO Number:
						</div>
						<Input
							placeholder="PO"
							value={po}
							onChange={(e) => {
								setPO(e);
								pullDetails(query);
							}}
							style={{ width: "200px" }}
						/>
					</Stack>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={8}>
					<Stack spacing={6} style={{ marginBottom: "5px" }}>
						<div style={{ width: "160px", textAlign: "right" }}>
							Quote Required:
						</div>

						<InputPicker
							data={quoteData}
							value={quote}
							onChange={(e) => {
								setQuote(e);
								pullDetails(query);
							}}
							style={{ width: "200px" }}
						/>
					</Stack>
				</FlexboxGrid.Item>
			</FlexboxGrid>

			<FlexboxGrid>
				<FlexboxGrid.Item colspan={8}>
					<Stack spacing={6} style={{ marginBottom: "5px" }}>
						<div style={{ width: "160px", textAlign: "right" }}>
							Equipment:
						</div>
						<InputPicker
							data={equipmentData}
							value={equipment}
							onChange={(e) => {
								setEquipment(e);
								pullDetails(query);
							}}
							style={{ width: "200px" }}
						/>
					</Stack>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={8}>
					<Stack spacing={6} style={{ marginBottom: "5px" }}>
						<div style={{ width: "160px", textAlign: "right" }}>
							Pictures:
						</div>

						<InputPicker
							data={quoteData}
							value={pictures}
							onChange={(e) => {
								setPictures(e);
								pullDetails(query);
							}}
							style={{ width: "200px" }}
						/>
					</Stack>
				</FlexboxGrid.Item>
			</FlexboxGrid>

			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Eyebolt Damaged:
				</div>

				<InputPicker
					data={quoteData}
					value={eyeboltDamaged}
					onChange={(e) => {
						setEyeboltDamaged(e);
						pullDetails(query);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Application:
				</div>

				<InputPicker
					data={applicationData}
					value={application}
					onChange={(e) => {
						setApplication(e);
						pullDetails(query);
					}}
					style={{ width: "200px" }}
				/>
				<Input
					style={{ width: "200px" }}
					data={other}
					disabled={application !== "Other"}
					onChange={(e) => {
						setOther(e);
						pullDetails(query);
					}}
				/>
			</Stack>
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					urgency:
				</div>

				<InputPicker
					data={urgencyData}
					value={urgency}
					onChange={(e) => {
						setUrgency(e);
						pullDetails(query);
					}}
					style={{ width: "200px" }}
				/>
				<DatePicker
					disabled={urgency !== "Specific Date"}
					value={specificTime}
					style={{ width: "200px" }}
					onChange={(e) => {
						setSpecificTime(e);
						pullDetails(query);
					}}
				/>
			</Stack>

			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Customer Comments:
				</div>

				<Stack.Item grow={1}>
					<Input
						placeholder="Customer Comments"
						value={comments}
						onChange={(e) => {
							setComments(e);
							pullDetails(query);
						}}
					/>
				</Stack.Item>
			</Stack>

			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Parts Missing Or Broken:
				</div>

				<Stack.Item grow={1}>
					<Input
						placeholder="Parts Missing Or Broken"
						value={missing}
						onChange={(e) => {
							setMissing(e);
							pullDetails(query);
						}}
					/>
				</Stack.Item>
			</Stack>
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Signature:
				</div>
				<Stack.Item grow={1}>
					<Input
						placeholder="signature"
						value={signature}
						onChange={(e) => {
							setSignature(e);
							pullDetails(query);
						}}
						style={{ width: "200px" }}
					/>
				</Stack.Item>
			</Stack>
		</div>
	);
}

export default JobDetails;
