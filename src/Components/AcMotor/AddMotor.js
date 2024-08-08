import React, { useState, useEffect } from "react";
import {
	Input,
	Panel,
	IconButton,
	Form,
	Button,
	InputGroup,
	InputPicker,
	useToaster,
	Message,
	Stack,
} from "rsuite";
import axios from "axios";
import SearchIcon from "@rsuite/icons/Search";
import AcMotorSearch from "./AcMotorSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../baseurl";

function AddAcMotor() {
	const [manufacturer, setManufacturer] = useState("");
	const [serial, setSerial] = useState("");
	const [model, setModel] = useState("");
	const [rpm, setRPM] = useState("");
	const [frame, setFrame] = useState("");
	const [hpkw, setHpkw] = useState("");
	const [hpkwValue, sethpkwValue] = useState("");
	const [volts, setVolts] = useState("");
	const [phase, setPhase] = useState("");
	const [_class, setClass] = useState("");
	const [ambTemp, setAmbTemp] = useState("");
	const [timeRating, setTimeRating] = useState("");
	const [cycles, setCycles] = useState("");
	const [div, setDiv] = useState("");
	const [enclosure, setEnclosure] = useState("");
	const [eyebolt, setEyebolt] = useState("");
	const [eyeboltDamaged, setEyeDamaged] = useState("");
	const [fittedWith, setFitted] = useState("");
	const [inOut, setInout] = useState("");
	const [measurement, setMeasurement] = useState("");
	const [enclosureOther, setEnclosureOther] = useState("");
	const [fittedWithOther, setFittedOther] = useState("");
	const [amps, setAmps] = useState("");
	const [edit, setEdit] = useState(false);
	const [id, setId] = useState("");
	const [jobId, setJobId] = useState("");
	const toaster = useToaster();
	const location = useLocation();

	const setParams = (params) => {
		if (params.edit === true) {
			setManufacturer(params.manufacturer);
			setSerial(params.serial);
			setRPM(params.rpm);
			setFrame(params.frame);
			setHpkw(params.hpkw);
			sethpkwValue(params.hpkwValue);
			setPhase(params.phase);
			setClass(params._class);
			setAmbTemp(params.ambTemp);
			setTimeRating(params.timeRating);
			setCycles(params.cycles);
			setDiv(params.div);
			setEnclosure(params.enclosure);
			setEyebolt(params.eyebolt);
			setEyeDamaged(params.eyeboltDamaged);
			setFitted(params.fittedWith);
			setInout(params.inOut);
			setMeasurement(params.measurement);
			setEnclosureOther(params.enclosureOther);
			setFittedOther(params.fittedWithOther);
			setEdit(params.edit);
			setVolts(params.volts);
			setModel(params.model);
			setAmps(params.amps);
			setId(params.id);
			setJobId(params.jobId);
			setEdit(params.edit);
		} else {
			setRPM(params.rpm);
			setFrame(params.frame);
			setHpkw(params.hpkw);
			sethpkwValue(params.hpkwValue);
			setEnclosure(params.enclosure);
		}
	};

	useEffect(() => {
		setParams(location.state);
	}, []);

	const getQuery = () => {
		let query = {
			manufacturer: manufacturer,
			serial: serial,
			model: model,
			rpm: rpm,
			frame: frame,
			hpkw: hpkw,
			hpkwValue: hpkwValue,
			volts: volts,
			amps: amps,
			phase: phase,
			_class: _class,
			ambTemp: ambTemp,
			timeRating: timeRating,
			cycles: cycles,
			div: div,
			enclosure: enclosure,
			eyebolt: eyebolt,
			fittedWith: fittedWith,
			inOut: inOut,
			measurement: measurement,
			encloseOther: enclosureOther,
			fittedOther: fittedWithOther,
		};
		return query;
	};
	const eyeboltData = ["Yes", "No"].map((item) => ({
		label: item,
		value: item,
	}));

	const enclosureData = ["ODP", "TEFC", "TENV", "EX.P", "Other"].map(
		(item) => ({
			label: item,
			value: item,
		})
	);

	const HPKWData = ["HP", "kW"].map((item) => ({
		label: item,
		value: item,
	}));

	const fittedWithData = [
		"Pulley",
		"Sheave",
		"Brake",
		"Coupling",
		"Other",
	].map((item) => ({
		label: item,
		value: item,
	}));

	const inOutData = ["In", "Out"].map((item) => ({
		label: item,
		value: item,
	}));

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

	let navigate = useNavigate();

	const handleSaveClick = () => {
		console.log(getQuery());
		axios({
			method: "post",
			url: baseurl + "acmotors/add/",
			data: getQuery(),
		})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					// window.location.reload(true);
					notifySuccessPost("motor created successfully");
				} else if (res.status !== 200) {
					notifyFailedPost("error creating a motor");
				}
			})
			.catch((err) => {
				console.log(err);
				notifyFailedPost(err.response.data);
			});
	};

	const handleEditClick = () => {
		let data = {
			id: id,
			jobId: jobId,
			...getQuery(),
		};
		axios({
			method: "post",
			url: baseurl + "acmotors/add/",
			data: data,
		})
			.then((res) => {
				if (res.status === 200) {
					navigate(`/job/${jobId}`);
					notifySuccessPost("motor edited successfully");
				} else if (res.status !== 200) {
					notifyFailedPost("error editing the motor");
				}
			})
			.catch((err) => {
				console.log(err);
				notifyFailedPost(err.response.data);
			});
	};

	return (
		<Panel bordered style={{ margin: "10px" }} header="Add AC Motor">
			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Manufacturer:
				</div>
				<Input
					value={manufacturer}
					onChange={(e) => {
						setManufacturer(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>
			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Serial#:
				</div>
				<Input
					value={serial}
					onChange={(e) => {
						setSerial(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>
			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>Model:</div>

				<Input
					value={model}
					onChange={(e) => {
						setModel(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>RPM:</div>

				<Input
					value={rpm}
					onChange={(e) => {
						setRPM(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>Frame:</div>

				<Input
					value={frame}
					onChange={(e) => {
						setFrame(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>HP/kW:</div>

				<InputPicker
					value={hpkw}
					data={HPKWData}
					onChange={(e) => {
						setHpkw(e);
					}}
					style={{ width: "200px" }}
				/>
				<div style={{ width: "160px", textAlign: "right" }}>
					HP/kW Value
				</div>
				<Input
					value={hpkwValue}
					onChange={(e) => {
						sethpkwValue(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>Volts:</div>

				<Input
					value={volts}
					onChange={(e) => {
						setVolts(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>Amps:</div>

				<Input
					value={amps}
					onChange={(e) => {
						setAmps(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>Phase:</div>

				<Input
					value={phase}
					onChange={(e) => {
						setPhase(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>Class:</div>

				<Input
					value={_class}
					onChange={(e) => {
						setClass(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Amb.Temp:
				</div>

				<Input
					value={ambTemp}
					onChange={(e) => {
						setAmbTemp(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Time Rating:
				</div>

				<Input
					value={timeRating}
					onChange={(e) => {
						setTimeRating(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Cycles:
				</div>

				<Input
					value={cycles}
					onChange={(e) => {
						setCycles(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>DIV:</div>

				<Input
					value={div}
					onChange={(e) => {
						setDiv(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Enclosure:
				</div>

				<InputPicker
					value={enclosure}
					data={enclosureData}
					onChange={(e) => {
						setEnclosure(e);
					}}
					style={{ width: "200px" }}
				/>
				<div style={{ width: "160px", textAlign: "right" }}>Other:</div>
				<Input
					disabled={enclosure !== "Other"}
					value={enclosureOther}
					onChange={(e) => {
						setEnclosureOther(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Eyebolt:
				</div>

				<InputPicker
					value={eyebolt}
					data={eyeboltData}
					onChange={(e) => {
						setEyebolt(e);
					}}
					style={{ width: "200px" }}
				/>
				{/* <div style={{ width: "160px", textAlign: "right" }}>
					Eyebolt Damaged:
				</div>
				<InputPicker
					value={eyeboltDamaged}
					data={eyeboltDamagedData}
					onChange={(e) => {
						setEyeDamaged(e);
					}}
					style={{ width: "200px" }}
				/> */}
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Fitted With:
				</div>
				<InputPicker
					value={fittedWith}
					data={fittedWithData}
					onChange={(e) => {
						setFitted(e);
					}}
					style={{ width: "200px" }}
				/>
				<div style={{ width: "160px", textAlign: "right" }}>Other:</div>
				<Input
					disabled={fittedWith !== "Other"}
					value={fittedWithOther}
					onChange={(e) => {
						setFittedOther(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Fitted With:
				</div>
				<InputPicker
					value={inOut}
					data={inOutData}
					onChange={(e) => {
						setInout(e);
					}}
					style={{ width: "200px" }}
				/>
			</Stack>

			<Stack spacing={10} style={{ marginBottom: "5px" }}>
				<div style={{ width: "160px", textAlign: "right" }}>
					Measurement:
				</div>
				<Input
					value={measurement}
					onChange={(e) => {
						setMeasurement(e);
					}}
					style={{ width: "200px" }}
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

export default AddAcMotor;
