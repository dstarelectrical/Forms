import React, { useState, useEffect } from "react";
import {
	Input,
	Panel,
	Whisper,
	Tooltip,
	IconButton,
	InputPicker,
	Button,
	Stack,
	FlexboxGrid,
} from "rsuite";
import axios from "axios";
import SearchIcon from "@rsuite/icons/Search";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../baseurl";
import InfoRoundIcon from "@rsuite/icons/InfoRound";

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
	const [hpkwValue, sethpkwValue] = useState("");
	const [visible, setVisible] = useState(false);

	// useEffect(() => {
	// 	if (motor !== "") {
	// 		handleSelectedClick(motor);
	// 	}
	// }, []);

	const handleSearchClick = () => {
		axios({
			method: "get",
			url: baseurl + "acmotors/search/",
			params: {
				volts: volts,
				frame: frame,
				hpkw: hpKw,
				enclosure: enclosure,
				rpm: rpm,
				hpkwValue: hpkwValue,
			},
		}).then((res) => {
			setMotors(res.data);
			if (res.status === 200 && res.data.length === 0) {
				console.log("hello");
				setVisible(true);
			} else {
				setVisible(false);
			}
			console.log(res.data);
		});
	};

	const HPKWData = ["HP", "kW"].map((item) => ({
		label: item,
		value: item,
	}));

	const handleAddClick = () => {
		navigate("/addmotor", {
			state: {
				volts: volts,
				frame: frame,
				hpkw: hpKw,
				enclosure: enclosure,
				rpm: rpm,
				hpkwValue: hpkwValue,
				edit: false,
			},
		});
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

	const keyRight = {
		fontWeight: "bold",
		fontSize: "17px",
		fontFamily: "Inter, sans-serif",
	};
	const valueRight = {
		fontSize: "17px",
		marginLeft: "5px",
		fontFamily: "Inter, sans-serif",
	};

	const getFormattedMotor = (motor) => {
		return (
			<div style={{ display: "flex", marginTop: "5px" }}>
				<div style={{ width: "25%" }}>
					<div style={{ display: "flex" }}>
						<div style={keyRight}>Manufacturer:</div>
						<div style={valueRight}>{motor["manufacturer"]}</div>
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
				</div>
				<div style={{ width: "25%" }}>
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
				<div style={{ width: "25%" }}>
					<div style={{ display: "flex" }}>
						<div style={keyRight}>Hp/KW Value:</div>
						<div style={valueRight}>{motor["hpkwValue"]}</div>
					</div>
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
				</div>
				<div style={{ width: "25%" }}>
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
		);
	};

	return (
		<div style={{ marginTop: "5px" }}>
			<h4 style={{ marginBottom: "5px" }}>
				Motor
				<Whisper
					followCursor
					speaker={
						<Tooltip>
							This is the customer associated with the job
						</Tooltip>
					}
				>
					<IconButton
						appearance="subtle"
						startIcon={<InfoRoundIcon />}
						size="sm"
					/>
				</Whisper>
			</h4>
			{!bool ? (
				<div>
					<div>
						<Stack spacing={10} style={{ marginBottom: "5px" }}>
							<div
								style={{
									width: "160px",
									textAlign: "right",
								}}
							>
								Frame:
							</div>

							<Input
								placeholder="frame"
								value={frame}
								onChange={(e) => {
									setFrame(e);
								}}
								style={{ width: "200px" }}
							/>
						</Stack>
						<Stack spacing={10} style={{ marginBottom: "5px" }}>
							<div
								style={{
									width: "160px",
									textAlign: "right",
								}}
							>
								Volts:
							</div>

							<Input
								placeholder="volts"
								value={volts}
								onChange={(e) => {
									setVolts(e);
								}}
								style={{ width: "200px" }}
							/>
						</Stack>

						<Stack spacing={10} style={{ marginBottom: "5px" }}>
							<div
								style={{
									width: "160px",
									textAlign: "right",
								}}
							>
								RPM:
							</div>

							<Input
								placeholder="rpm"
								value={rpm}
								onChange={(e) => {
									setRPM(e);
								}}
								style={{ width: "200px" }}
							/>
						</Stack>
						<Stack spacing={10} style={{ marginBottom: "5px" }}>
							<div
								style={{
									width: "160px",
									textAlign: "right",
								}}
							>
								Enclosure:
							</div>

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

						<FlexboxGrid>
							<FlexboxGrid.Item colspan={8}>
								<Stack
									spacing={10}
									style={{ marginBottom: "5px" }}
								>
									<div
										style={{
											width: "160px",
											textAlign: "right",
										}}
									>
										Hp/KW:
									</div>

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
							</FlexboxGrid.Item>
							<FlexboxGrid.Item colspan={8}>
								<Stack
									spacing={10}
									style={{ marginBottom: "5px" }}
								>
									<div
										style={{
											width: "160px",
											textAlign: "right",
										}}
									>
										Hp/KW value:
									</div>
									<Input
										placeholder="value"
										value={hpkwValue}
										onChange={(e) => {
											sethpkwValue(e);
										}}
										style={{ width: "200px" }}
									/>
								</Stack>
							</FlexboxGrid.Item>
						</FlexboxGrid>

						<Stack spacing={10}>
							<Stack.Item grow={1}>
								<IconButton
									style={{ width: "100%" }}
									onClick={handleSearchClick}
									icon={<SearchIcon />}
								/>
							</Stack.Item>

							<Button
								appearance="primary"
								onClick={handleAddClick}
							>
								Add Motor
							</Button>
						</Stack>
						{visible ? (
							<div style={{ textAlign: "center", width: "100%" }}>
								<h5>No Results Found</h5>
							</div>
						) : (
							<div></div>
						)}
					</div>

					{motors.map((motor) => (
						<Panel
							key={motor.id}
							bordered
							collapsible
							header={motor.manufacturer}
							style={{ marginTop: "5px" }}
						>
							{getFormattedMotor(motor)}
							<Stack spacing={10}>
								<Button
									style={{
										float: "right",
										marginRight: "5px",
										marginBottom: "5px",
									}}
									appearance="primary"
									onClick={(e) => handleSelectedClick(motor)}
								>
									Select
								</Button>
							</Stack>
						</Panel>
					))}
				</div>
			) : (
				<Panel
					key={selected.id}
					bordered
					collapsible
					header={"Selected Motor: " + selected["manufacturer"]}
					style={{ marginTop: "5px" }}
				>
					{getFormattedMotor(selected)}
				</Panel>
			)}
		</div>
	);
}

export default AcMotorSearch;
