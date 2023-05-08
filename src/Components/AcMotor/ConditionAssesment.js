import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox, Panel, Stack } from "rsuite";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Condition({ jobID, view }) {
	const [visual, setVisual] = useState(false);
	const [pictures, setPictures] = useState(false);
	const [missing, setMissing] = useState(false);
	const [broken, setBroken] = useState(false);

	const [electrical, setElectrical] = useState(false);
	const [insulation, setInsulation] = useState(false);
	const [winding, setWinding] = useState(false);
	const [turn, setTurn] = useState(false);
	const [auxiliary, setAuxialiary] = useState(false);
	const [heater, setHeater] = useState(false);

	const [signature, setSignature] = useState("");
	const [comments, setComments] = useState("");

	useEffect(() => {
		if (view === true) {
			axios({
				method: "get",
				url: `https://dstarforms.herokuapp.com/acmotors/accondition/${jobID}/`,
			}).then((res) => {
				setVisual(res.data.visual);
				setMissing(res.data.missing);
				setPictures(res.data.pictures);
				setBroken(res.data.broken);
				setElectrical(res.data.electrical);
				setInsulation(res.data.insulation);
				setAuxialiary(res.data.auxiliary);
				setWinding(res.data.winding);
				setHeater(res.data.winding);
				setSignature(res.data.signature);
				setComments(res.data.comments);
			});
		}
	}, []);

	const handleSaveClick = () => {
		let data = {
			visual: visual,
			pictures: pictures,
			missing: missing,
			broken: broken,
			electrical: electrical,
			insulation: insulation,
			winding: winding,
			turn: turn,
			auxiliary: auxiliary,
			heater: heater,
			signature: signature,
			comments: comments,
		};
		axios({
			method: "post",
			url: `https://dstarforms.herokuapp.com/acmotors/accondition/${jobID}/`,
			data: data,
		}).then((res) => {
			console.log(res);
			window.location.reload(true);
		});
	};

	return (
		<div
			bordered
			style={{
				float: "left",
				width: "355px",
				marginLeft: "3px",
				marginTop: "3px",
				height: "525px",
				borderTopWidth: "1px",
				borderTopStyle: "solid",
				borderTopColor: "grey",
				borderRightWidth: "1px",
				borderRightStyle: "solid",
				borderRightColor: "grey",
				padding: "5px",
			}}
		>
			<h5>Condition Assessment</h5>
			<Checkbox
				readOnly={view}
				checked={visual}
				onChange={(e) => {
					if (visual === true) {
						setMissing(false);
						setPictures(false);
						setBroken(false);
					}
					setVisual(!visual);
				}}
			>
				Visual Assessment
			</Checkbox>

			<div style={{ marginLeft: "30px" }}>
				<Checkbox
					readOnly={view}
					checked={pictures}
					onChange={(e) => setPictures(!pictures)}
				>
					Take Pictures
				</Checkbox>
				<Checkbox
					readOnly={view}
					checked={missing}
					onChange={(e) => setMissing(!missing)}
				>
					Record any missing components
				</Checkbox>
				<Checkbox
					readOnly={view}
					checked={broken}
					onChange={(e) => setBroken(!broken)}
				>
					Record any broken components
				</Checkbox>
			</div>
			<Checkbox
				readOnly={view}
				checked={electrical}
				onChange={(e) => {
					if (electrical === true) {
						setInsulation(false);
						setAuxialiary(false);
						setWinding(false);
						setHeater(false);
					}
					setElectrical(!electrical);
				}}
			>
				Preleminary Electrical Test
			</Checkbox>

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
					checked={turn}
					onChange={(e) => setTurn(!turn)}
				>
					Turn Ratio Test
				</Checkbox>
				<Checkbox
					readOnly={view}
					checked={auxiliary}
					onChange={(e) => setAuxialiary(!auxiliary)}
				>
					Auxiliary RTD/Klixon Resistance
				</Checkbox>
				<Checkbox
					readOnly={view}
					checked={heater}
					onChange={(e) => setHeater(!heater)}
				>
					Heater Data
				</Checkbox>

				{!view ? (
					<Stack spacing={6} style={{ marginBottom: "5px" }}>
						Comments:
						<Input
							as="textarea"
							rows={1}
							placeholder="Comments"
							value={comments}
							onChange={(e) => setComments(e)}
							style={{ width: "200px" }}
						/>
					</Stack>
				) : (
					<div
						style={{
							fontSize: "17px",
							marginLeft: "5px",
						}}
					>
						Comments: {comments}
					</div>
				)}

				<Stack spacing={6} style={{ marginBottom: "5px" }}>
					Signature:
					<Input
						readOnly={view}
						placeholder="signature"
						value={signature}
						onChange={(e) => {
							setSignature(e);
						}}
						style={{ width: "200px" }}
					/>
				</Stack>
			</div>
			{!view ? (
				<Button block onClick={handleSaveClick}>
					Save
				</Button>
			) : (
				<div></div>
			)}
		</div>
	);
}

export default Condition;
