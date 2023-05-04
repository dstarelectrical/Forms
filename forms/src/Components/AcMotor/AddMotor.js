import React, { useState, useEffect } from "react";
import {
	Input,
	Panel,
	IconButton,
	Form,
	Button,
	InputGroup,
	InputPicker,
} from "rsuite";
import axios from "axios";
import SearchIcon from "@rsuite/icons/Search";

function AddAcMotor() {
	const [formVal, setFormVal] = useState({
		manufacturer: "",
		serial: "",
		model: "",
		rpm: "",
		frame: "",
		hpkw: "",
		volts: "",
		amps: "",
		phase: "",
		_class: "",
		ambTemp: "",
		timeRating: "",
		cycles: "",
		div: "",
		enclosure: "",
		eyebolt: "",
		eyeboltDamaged: "",
		fittedWith: "",
		inOut: "",
		measurement: "",
		enclosureOther: "",
		fittedWithOther: "",
	});

	const eyeboltDamagedData = ["Yes", "No"].map((item) => ({
		label: item,
		value: item,
	}));

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

	const handleSaveClick = () => {
		console.log(formVal);
		axios({
			method: "post",
			url: "http://127.0.0.1:8000/acmotors/add/",
			data: formVal,
		}).then((res) => {
			console.log(res);
		});
	};

	return (
		<Panel
			bordered
			collapsible
			style={{ margin: "10px" }}
			header="Add AC Motor"
		>
			<Form onChange={setFormVal} layout="horizontal">
				<Form.Group controlId="manufacturer">
					<Form.ControlLabel>Manufacturer</Form.ControlLabel>
					<Form.Control name="manufacturer" />
				</Form.Group>
				<Form.Group controlId="serial">
					<Form.ControlLabel>Serial#</Form.ControlLabel>
					<Form.Control name="serial" />
				</Form.Group>
				<Form.Group controlId="model">
					<Form.ControlLabel>Model</Form.ControlLabel>
					<Form.Control name="model" />
				</Form.Group>

				<Form.Group controlId="rpm">
					<Form.ControlLabel>RPM</Form.ControlLabel>
					<Form.Control name="rpm" />
				</Form.Group>

				<Form.Group controlId="frame">
					<Form.ControlLabel>Frame</Form.ControlLabel>
					<Form.Control name="frame" />
				</Form.Group>

				<Form.Group controlId="hpkw">
					<Form.ControlLabel>HP/kW</Form.ControlLabel>
					<Form.Control
						name="hpkw"
						accepter={InputPicker}
						data={HPKWData}
					/>
				</Form.Group>

				<Form.Group controlId="volts">
					<Form.ControlLabel>Volts</Form.ControlLabel>
					<Form.Control name="volts" />
				</Form.Group>

				<Form.Group controlId="amps">
					<Form.ControlLabel>Amps</Form.ControlLabel>
					<Form.Control name="amps" />
				</Form.Group>

				<Form.Group controlId="phase">
					<Form.ControlLabel>Phase</Form.ControlLabel>
					<Form.Control name="phase" />
				</Form.Group>

				<Form.Group controlId="_class">
					<Form.ControlLabel>Class</Form.ControlLabel>
					<Form.Control name="_class" />
				</Form.Group>

				<Form.Group controlId="ambTemp">
					<Form.ControlLabel>Amb.Temp</Form.ControlLabel>
					<Form.Control name="ambTemp" />
				</Form.Group>

				<Form.Group controlId="timeRating">
					<Form.ControlLabel>Time Rating</Form.ControlLabel>
					<Form.Control name="timeRating" />
				</Form.Group>

				<Form.Group controlId="cycles">
					<Form.ControlLabel>Cycles</Form.ControlLabel>
					<Form.Control name="cycles" />
				</Form.Group>

				<Form.Group controlId="div">
					<Form.ControlLabel>DIV</Form.ControlLabel>
					<Form.Control name="div" />
				</Form.Group>

				<Form.Group controlId="enclosure">
					<Form.ControlLabel>Enclosure</Form.ControlLabel>
					<Form.Control
						name="enclosure"
						accepter={InputPicker}
						data={enclosureData}
					/>

					<Form.ControlLabel>Other</Form.ControlLabel>
					<Form.Control
						disabled={formVal.enclosure !== "Other"}
						name="enclosureOther"
					/>
				</Form.Group>

				<Form.Group controlId="eyebolt">
					<Form.ControlLabel>Eyebolt</Form.ControlLabel>
					<Form.Control
						name="eyebolt"
						accepter={InputPicker}
						data={eyeboltData}
					/>
				</Form.Group>

				<Form.Group controlId="eyeboltDamaged">
					<Form.ControlLabel>Eyebolt Damaged</Form.ControlLabel>
					<Form.Control
						name="eyeboltDamaged"
						accepter={InputPicker}
						data={eyeboltDamagedData}
					/>
				</Form.Group>

				<Form.Group controlId="fittedWith">
					<Form.ControlLabel>Fitted With</Form.ControlLabel>
					<Form.Control
						name="fittedWith"
						accepter={InputPicker}
						data={fittedWithData}
					/>
					<Form.ControlLabel>Other</Form.ControlLabel>
					<Form.Control
						disabled={formVal.fittedWith !== "Other"}
						name="fittedWithOther"
					/>
				</Form.Group>

				<Form.Group controlId="inOut">
					<Form.ControlLabel>Fitted With</Form.ControlLabel>
					<Form.Control
						name="inOut"
						accepter={InputPicker}
						data={inOutData}
					/>
				</Form.Group>

				<Form.Group controlId="measurement">
					<Form.ControlLabel>Measurement</Form.ControlLabel>
					<Form.Control name="measurement" />
				</Form.Group>

				<Button onClick={handleSaveClick}>Save</Button>
			</Form>
		</Panel>
	);
}

export default AddAcMotor;
