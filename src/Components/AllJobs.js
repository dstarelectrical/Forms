import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Stack,
	IconButton,
	InputGroup,
	Input,
	Panel,
	Steps,
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import axios from "axios";
import { baseurl } from "../baseurl";
import SideNav from "./sidenav";

function AllJobs() {
	const [allJobs, setAllJobs] = useState([]);
	const [search, setSearch] = useState("");
	let navigate = useNavigate();

	useEffect(() => {
		axios({
			method: "get",
			url: baseurl + `acmotors/getalljobs/`,
		}).then((res) => {
			setAllJobs(res.data);
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

	return (
		<div
			style={{
				display: "flex",
				marginRight: "5px",
				fontFamily: "Inter, sans-serif",
			}}
		>
			<SideNav />
			<div
				style={{
					float: "left",
					width: "85%",
					marginTop: "5px",
					width: "calc(100% - 210px)",
					marginLeft: "210px",
				}}
			>
				{/* <h4 style={{ textAlign: "center" }}>All Jobs</h4> */}
				<InputGroup>
					<Input
						placeholder="Job number"
						value={search}
						onChange={(e) => {
							setSearch(e);
						}}
					/>
					<IconButton
						onClick={(e) => navigate("/job/" + search)}
						icon={<SearchIcon />}
					/>
				</InputGroup>

				<div
					style={{
						marginTop: "5px",
					}}
				>
					{allJobs.map((job) => (
						<Panel
							key={job.id}
							bordered
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

export default AllJobs;
