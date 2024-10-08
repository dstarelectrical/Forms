import React, { useState, useLayoutEffect } from "react";
import { Input, Button, Panel } from "rsuite";
import axios from "axios";
import { useParams } from "react-router-dom";
import DisplayJobDetails from "./displayCreatedJob";
import Condition from "./ConditionAssesment";
import DismantleInspection from "./DismantleAndInspection";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Comments from "./Comments";
import { baseurl } from "../../baseurl";
import SideNav from "../sidenav";

function ViewJob() {
	const { id } = useParams();
	const [job, setJob] = useState({});
	const steps = ["create", "scope1", "scope2", "comments"];
	const finishedSteps = [];
	const [viewJobDet, setViewJob] = useState(false);
	const [viewCondition, setViewConditon] = useState(false);
	const [viewDismantle, setViewDismanatle] = useState(false);
	const [viewComments, setViewComments] = useState(false);

	useLayoutEffect(() => {
		axios({
			method: "get",
			url: baseurl + `acmotors/job/${id}/`,
		}).then((res) => {
			setJob(res.data);
			if (res.data.step === "scope1") {
				setViewJob(true);
			} else if (res.data.step === "scope2") {
				setViewJob(true);
				setViewConditon(true);
			} else if (res.data.step === "comments") {
				setViewJob(true);
				setViewConditon(true);
				setViewDismanatle(true);
			} else if (res.data.step === "print") {
				setViewJob(true);
				setViewConditon(true);
				setViewDismanatle(true);
				setViewComments(true);
			}
		});
	}, []);

	const getCurrStep = () => {
		if (job["step"] === "scope1") {
			return <Condition jobID={id} view={false} />;
		} else if (job["step"] === "scope2") {
			return <DismantleInspection jobID={id} view={false} />;
		} else if (job["step"] === "comments") {
			return <Comments jobID={id} view={false} />;
		}
	};

	const printDocument = () => {
		const input = document.getElementById("print");
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			var imgWidth = 175;
			var pageHeight = 325;
			var imgHeight = (canvas.height * imgWidth) / canvas.width;
			var heightLeft = imgHeight;

			var pdf = new jsPDF("p", "mm");
			var position = 0;

			pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
			heightLeft -= pageHeight - 10;

			while (heightLeft >= 0) {
				position = heightLeft - imgHeight;
				pdf.addPage();
				pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight - 10;
			}
			pdf.save("file.pdf");
		});
	};

	return (
		<div
			style={{
				display: "flex",
			}}
		>
			<SideNav />
			<Panel
				id="print"
				style={{
					display: "flex",
					float: "left",
					width: "84%",
					padding: "5px",
					fontSize: "12px",
					fontFamily: "Inter, sans-serif",
					width: "calc(100% - 210px)",
					marginLeft: "210px",
				}}
			>
				<h4 style={{ textAlign: "center" }}>
					AC Motor Report(Inspection)
				</h4>
				{viewJobDet ? <DisplayJobDetails jobDet={job} /> : <div></div>}

				<div>
					{viewCondition ? (
						<Condition jobID={id} view={true} />
					) : (
						<div></div>
					)}
					{viewDismantle ? (
						<DismantleInspection jobID={id} view={true} />
					) : (
						<div></div>
					)}
				</div>

				{viewComments ? (
					<Comments jobID={id} view={true} />
				) : (
					<div></div>
				)}
				{getCurrStep()}
				<Button block onClick={printDocument} appearance="primary">
					Download PDF
				</Button>
			</Panel>
		</div>
	);
}

export default ViewJob;
