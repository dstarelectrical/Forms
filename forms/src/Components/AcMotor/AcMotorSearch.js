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

function AcMotorSearch({ pullMotor }) {
	const [motors, setMotors] = useState([]);
	const [volts, setVolts] = useState("");
	const [rpm, setRPM] = useState("");
	const [frame, setFrame] = useState("");
	const [enclosure, setEnclosure] = useState("");
	const [hpKw, setHpKw] = useState("");
	let navigate = useNavigate();
	const [selected, setSelected] = useState("");
	const [bool, setBool] = useState(false);

	const handleSearchClick = () => {
		axios({
			method: "get",
			url: "http://127.0.0.1:8000/acmotors/search/",
			params: {
				volts: volts,
				frame: frame,
				hpkw: hpKw,
				enclosure: enclosure,
				rpm: rpm,
			},
		}).then((res) => {
			setMotors(res.data);
			console.log(res.data);
		});
	};

	const HPKWData = ["HP", "kW"].map((item) => ({
		label: item,
		value: item,
	}));

	const handleAddClick = () => {
		navigate("/addmotor");
	};

	const enclosureData = ["ODP", "TEFC", "TENV", "EX.P", "Other"].map(
		(item) => ({
			label: item,
			value: item,
		})
	);

	const handleSelectedClick = (motor) => {
		setMotors([]);
		setSelected(motor);
		setBool(true);
		pullMotor(motor);
	};

	return (
		<div style={{ marginTop: "5px" }}>
			<h4 style={{ marginBottom: "5px" }}>Motor</h4>
			{!bool ? (
				<div>
					<div>
						<Stack spacing={6} style={{ marginBottom: "5px" }}>
							Volts:
							<Input
								placeholder="volts"
								value={volts}
								onChange={(e) => {
									setVolts(e);
								}}
								style={{ width: "200px" }}
							/>
						</Stack>

						<Stack spacing={6} style={{ marginBottom: "5px" }}>
							Frame:
							<Input
								placeholder="frame"
								value={frame}
								onChange={(e) => {
									setFrame(e);
								}}
								style={{ width: "200px" }}
							/>
						</Stack>

						<Stack spacing={6} style={{ marginBottom: "5px" }}>
							RPM:
							<Input
								placeholder="rpm"
								value={rpm}
								onChange={(e) => {
									setRPM(e);
								}}
								style={{ width: "200px" }}
							/>
						</Stack>

						<Stack spacing={6} style={{ marginBottom: "5px" }}>
							Enclosure:
							<InputPicker
								data={enclosureData}
								value={enclosure}
								onChange={(e) => {
									setEnclosure(e);
								}}
								placeholder="Enclosure Type"
								style={{ width: "200px" }}
							/>
						</Stack>

						<Stack spacing={6} style={{ marginBottom: "5px" }}>
							Hp/KW:
							<InputPicker
								data={HPKWData}
								value={hpKw}
								onChange={(e) => {
									setHpKw(e);
								}}
								placeholder="Hp/KW"
								style={{ width: "200px" }}
							/>
						</Stack>

						<Stack spacing={6}>
							<Stack.Item grow={1}>
								<IconButton
									style={{ width: "100%" }}
									onClick={handleSearchClick}
									icon={<SearchIcon />}
								/>
							</Stack.Item>

							<Button onClick={handleAddClick}>Add Motor</Button>
						</Stack>
					</div>

					{motors.map((motor) => (
						<Panel
							key={motor.id}
							bordered
							collapsible
							header={motor.manufacturer}
							style={{ marginTop: "5px" }}
						>
							manufacturer: {motor["manufacturer"]} <br />
							volts: {motor["volts"]} <br />
							frame: {motor["frame"]} <br />
							rpm: {motor["rpm"]} <br />
							enclosure: {motor["enclosure"]} <br />
							Hp/KW: {motor["hpkw"]} <br />
							<Button
								style={{
									float: "right",
									marginRight: "10px",
									marginBottom: "10px",
								}}
								appearance="primary"
								onClick={(e) => handleSelectedClick(motor)}
							>
								Select
							</Button>
						</Panel>
					))}
				</div>
			) : (
				<Panel
					key={selected.id}
					bordered
					collapsible
					header={"Selected Motor: " + selected["manufacturer"]}
					style={{ marginTop: "10px" }}
				>
					manufacturer: {selected["manufacturer"]} <br />
					volts: {selected["volts"]} <br />
					frame: {selected["frame"]} <br />
					rpm: {selected["rpm"]} <br />
					enclosure: {selected["enclosure"]} <br />
					Hp/KW: {selected["hpkw"]} <br />
				</Panel>
			)}
		</div>
	);
}

export default AcMotorSearch;
