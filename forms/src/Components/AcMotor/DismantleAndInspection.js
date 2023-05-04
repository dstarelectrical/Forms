import React, { useState, useEffect } from "react";
import { Input, Button, Panel, Checkbox } from "rsuite";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DismantleInspection({ jobID, view }) {
	const [dismantle, setDismantle] = useState(false);
	const [pictures, setPictures] = useState(false);

	const [electrical, setElectrical] = useState(false);
	const [insulation, setInsulation] = useState(false);
	const [winding, setWinding] = useState(false);
	const [surge, setSurge] = useState(false);
	const [recordData, setRecordData] = useState(false);

	const [mechanical, setMechanical] = useState(false);
	const [bearings, setBearings] = useState(false);
	const [oil, setOil] = useState(false);
	const [mechFit, setMechFit] = useState(false);
	const [failure, setFailure] = useState(false);

	useEffect(() => {
		if (view === true) {
			axios({
				method: "get",
				url: `http://127.0.0.1:8000/acmotors/acdismantle/${jobID}/`,
			}).then((res) => {
				console.log(res.data);
				setDismantle(res.data.dismantle);
				setElectrical(res.data.electrical);
				setMechanical(res.data.mechanical);
				setInsulation(res.data.insulation);
				setWinding(res.data.winding);
				setSurge(res.data.surge);
				setRecordData(res.data.recordData);
				setBearings(res.data.bearings);
				setOil(res.data.oil);
				setMechFit(res.data.mechFit);
				setFailure(res.data.failure);
			});
		}
	}, []);

	const handleSaveClick = () => {
		let data = {
			dismantle: dismantle,
			pictures: pictures,
			electrical: electrical,
			insulation: insulation,
			winding: winding,
			surge: surge,
			recordData: recordData,
			mechanical: mechanical,
			bearings: bearings,
			oil: oil,
			mechFit: mechFit,
			failure: failure,
		};
		axios({
			method: "post",
			url: `http://127.0.0.1:8000/acmotors/acdismantle/${jobID}/`,
			data: data,
		}).then((res) => {
			console.log(res);
			window.location.reload(true);
		});
	};

	return (
		<Panel
			defaultExpanded
			bordered
			style={{ float: "left", width: "100%", margin: "10px" }}
			header="Dismantle and Inspection"
		>
			<Checkbox
				readOnly={view}
				checked={dismantle}
				onChange={(e) => {
					if (dismantle === true) {
						setElectrical(false);
						setMechanical(false);
						setInsulation(false);
						setWinding(false);
						setSurge(false);
						setRecordData(false);
						setBearings(false);
						setOil(false);
						setMechFit(false);
						setFailure(false);
					}
					setDismantle(!dismantle);
				}}
			>
				Dismantle Motor
			</Checkbox>
			{dismantle ? (
				<div style={{ marginLeft: "30px" }}>
					<Checkbox
						readOnly={view}
						checked={pictures}
						onChange={(e) => setPictures(!pictures)}
					>
						Take Pictures for every part dismantled
					</Checkbox>
					<br />
					<Checkbox
						readOnly={view}
						checked={electrical}
						onChange={(e) => {
							if (electrical === true) {
								setInsulation(false);
								setWinding(false);
								setSurge(false);
								setRecordData(false);
							}
							setElectrical(!electrical);
						}}
					>
						Perform Electrical Test
					</Checkbox>
					{electrical ? (
						<div style={{ marginLeft: "30px" }}>
							<Checkbox
								readOnly={view}
								checked={insulation}
								onChange={(e) => setInsulation(!insulation)}
							>
								Insulation Resistance
							</Checkbox>
							<Checkbox
								readOnly={view}
								checked={winding}
								onChange={(e) => setWinding(!winding)}
							>
								Winding Resistance
							</Checkbox>
							<Checkbox
								readOnly={view}
								checked={surge}
								onChange={(e) => setSurge(!surge)}
							>
								Surge Test
							</Checkbox>
							<Checkbox
								readOnly={view}
								checked={recordData}
								onChange={(e) => setRecordData(!recordData)}
							>
								Record data in report
							</Checkbox>
						</div>
					) : (
						<div></div>
					)}
					<Checkbox
						readOnly={view}
						checked={mechanical}
						onChange={(e) => {
							if (mechanical === true) {
								setBearings(false);
								setOil(false);
								setMechFit(false);
								setFailure(false);
							}
							setMechanical(!mechanical);
						}}
					>
						Perform Mechanical Inspection
					</Checkbox>
					{mechanical ? (
						<div style={{ marginLeft: "30px" }}>
							<Checkbox
								readOnly={view}
								checked={bearings}
								onChange={(e) => setBearings(!bearings)}
							>
								Bearings
							</Checkbox>
							<Checkbox
								readOnly={view}
								checked={oil}
								onChange={(e) => setOil(!oil)}
							>
								Oil Sealants
							</Checkbox>
							<Checkbox
								readOnly={view}
								checked={mechFit}
								onChange={(e) => setMechFit(!mechFit)}
							>
								Mechanical fit & measurement
							</Checkbox>
							<Checkbox
								readOnly={view}
								checked={failure}
								onChange={(e) => setFailure(!failure)}
							>
								Any other information in the failure
							</Checkbox>
						</div>
					) : (
						<div></div>
					)}
				</div>
			) : (
				<div></div>
			)}
			{!view ? (
				<Button block onClick={handleSaveClick}>
					Save
				</Button>
			) : (
				<div></div>
			)}
		</Panel>
	);
}

export default DismantleInspection;