import React, { useState, useEffect } from "react";
import { Input, Panel, DatePicker, Stack, InputPicker, Button } from "rsuite";
import axios from "axios";

function JobDetails({ pullDetails }) {
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
		"Specific Time",
	].map((item) => ({
		label: item,
		value: item,
	}));

	const getSpecificTime = () => {
		if (urgency !== "Specific Time") {
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
		<div style={{ marginTop: "10px" }}>
			<h4>Job details</h4>
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				PO Number:
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
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Quote Required:
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
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Equipment:
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
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Application:
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
					data={other}
					disabled={application !== "Other"}
					onChange={(e) => {
						setOther(e);
						pullDetails(query);
					}}
				/>
			</Stack>
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				urgency:
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
					disabled={urgency !== "Specific Time"}
					value={specificTime}
					onChange={(e) => {
						setSpecificTime(e);
						pullDetails(query);
					}}
				/>
			</Stack>
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Pictures:
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
			<Stack spacing={6} style={{ marginBottom: "5px" }}>
				Eyebolt Damaged:
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
				Customer Comments:
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
				Parts Missing Or Broken:
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
				Signature:
				<Input
					placeholder="signature"
					value={signature}
					onChange={(e) => {
						setSignature(e);
						pullDetails(query);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>
		</div>
	);
}

export default JobDetails;
