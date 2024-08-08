import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Stack,
	ButtonToolbar,
	ButtonGroup,
	FlexboxGrid,
	Panel,
	Steps,
	IconButton,
} from "rsuite";
import axios from "axios";
import { baseurl } from "../baseurl";
import { GoChecklist } from "react-icons/go";
import { FcInspection } from "react-icons/fc";
import { FaRegComments } from "react-icons/fa6";
import SearchIcon from "@rsuite/icons/Search";
import SideNav from "./sidenav";
import { set } from "rsuite/esm/internals/utils/date";

function Home() {
	const [search, setSearch] = useState("");
	const [activeJobs, setActiveJobs] = useState([]);
	const [condAss, setConditionAss] = useState(0);
	const [dismantle, setDismantle] = useState(0);
	const [comments, setComments] = useState(0);
	let navigate = useNavigate();

	useEffect(() => {
		axios({
			method: "get",
			url: baseurl + `acmotors/getactivejobs/`,
		}).then((res) => {
			setActiveJobs(res.data);
		});
		axios({
			method: "get",
			url: baseurl + `acmotors/getstepcounts/`,
		}).then((res) => {
			console.log(res.data);
			setConditionAss(res.data["scope1"]);
			setDismantle(res.data["scope2"]);
			setComments(res.data["comments"]);
		});
	}, []);

	const getCurrStep = (step) => {
		if (step === "scope1") {
			return 1;
		} else if (step === "scope2") {
			return 2;
		} else if (step === "comments") {
			return 3;
		} else if (step === "print") {
			return 4;
		}
	};

	const paneltitle = {
		fontSize: "15px",
		fontWeight: "bold",
		color: "#000",
	};

	const paneltext = {
		fontSize: "25px",
		fontWeight: "bold",
		color: "#000",
	};

	const iconStyle = {
		display: "flex",
		justifyContent: "right",
		alignItems: "center",
		fontSize: "50px",
		fontWeight: "bold",
	};

	return (
		<div>
			<SideNav />
			<div
				style={{
					width: "calc(100% - 210px)",
					marginLeft: "210px",
				}}
			>
				<FlexboxGrid style={{ paddingTop: "5px" }}>
					<FlexboxGrid.Item
						colspan={8}
						style={{ paddingRight: "5px" }}
					>
						<Panel
							bordered
							style={{
								height: "100px",
								// backgroundColor: "#14cc52",
							}}
						>
							<FlexboxGrid>
								<FlexboxGrid.Item colspan={20}>
									<div style={paneltitle}>
										Active Condition Assesments
									</div>
									<div style={paneltext}>{condAss}</div>
								</FlexboxGrid.Item>
								<FlexboxGrid.Item colspan={4}>
									<div style={iconStyle}>
										<GoChecklist />
									</div>
								</FlexboxGrid.Item>
							</FlexboxGrid>
						</Panel>
					</FlexboxGrid.Item>
					<FlexboxGrid.Item
						colspan={8}
						style={{ paddingRight: "5px" }}
					>
						<Panel
							bordered
							style={{
								height: "100px",
								// backgroundColor: "#14cc52",
							}}
						>
							<FlexboxGrid>
								<FlexboxGrid.Item colspan={20}>
									<div style={paneltitle}>
										Dismantle And Inspection
									</div>
									<div style={paneltext}>{dismantle}</div>
								</FlexboxGrid.Item>
								<FlexboxGrid.Item colspan={4}>
									<div style={iconStyle}>
										<FcInspection />
									</div>
								</FlexboxGrid.Item>
							</FlexboxGrid>
						</Panel>
					</FlexboxGrid.Item>
					<FlexboxGrid.Item
						colspan={8}
						style={{ paddingRight: "5px" }}
					>
						<Panel
							bordered
							style={{
								height: "100px",
								// backgroundColor: "#14cc52",
							}}
						>
							<FlexboxGrid>
								<FlexboxGrid.Item colspan={20}>
									<div
										style={{
											fontSize: "15px",
											fontWeight: "bold",
											color: "#000",
											fontFamily: "Inter, sans-serif",
										}}
									>
										Comments
									</div>
									<div style={paneltext}>{comments}</div>
								</FlexboxGrid.Item>
								<FlexboxGrid.Item colspan={4}>
									<div style={iconStyle}>
										<FaRegComments />
									</div>
								</FlexboxGrid.Item>
							</FlexboxGrid>
						</Panel>
					</FlexboxGrid.Item>
				</FlexboxGrid>

				<div
					style={{
						marginTop: "5px",
						paddingRight: "5px",
					}}
					// bordered
					// header={<div>Active Jobs</div>}
				>
					<h4>Active Jobs</h4>
					{activeJobs.map((job) => (
						<Panel
							key={job.id}
							bordered
							collapsible
							header={
								<div>
									{job.id}
									<IconButton
										appearance="subtle"
										onClick={(e) =>
											navigate("/job/" + job.id)
										}
										style={{
											float: "right",
											padding: "3px",
										}}
										icon={<SearchIcon />}
									/>
								</div>
							}
						>
							<Steps current={getCurrStep(job.step)}>
								<Steps.Item title="Job Details" />
								<Steps.Item title="Condition Assesment" />
								<Steps.Item title="Dismatle And Inspection" />
								<Steps.Item title="Comments" />
								<Steps.Item title="Finished" />
							</Steps>
						</Panel>
					))}
				</div>
			</div>
		</div>
	);
}

export default Home;
