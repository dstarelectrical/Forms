import { Sidenav, Nav, Button } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../baseurl";

function SideNav() {
	let navigate = useNavigate();
	let [key, setActiveKey] = useState("1");

	useEffect(() => {
		if (window.location.pathname === "/home") {
			setActiveKey("1");
		} else if (window.location.pathname === "/alljobs") {
			setActiveKey("2");
		} else if (window.location.pathname === "/newjob") {
			setActiveKey("3");
		}
	}, []);

	return (
		<div
			style={{
				width: "200px",
				height: "100%",
				float: "left",
				position: "fixed",
				marginRight: "5px",
				fontFamily: "Inter, sans-serif",
			}}
		>
			<Sidenav
				appearance="inverse"
				style={{ height: "100%", postion: "fixed" }}
			>
				<Sidenav.Body>
					<Nav activeKey={key}>
						<Nav.Item
							eventKey="1"
							onClick={(e) => {
								navigate("/home");
								setActiveKey("1");
							}}
						>
							Home
						</Nav.Item>
						<Nav.Item
							eventKey="2"
							onClick={(e) => {
								navigate("/alljobs");
								setActiveKey("2");
							}}
						>
							All Jobs
						</Nav.Item>
						<Nav.Item
							eventKey="3"
							onClick={(e) => {
								navigate("/newjob");
								setActiveKey("3");
							}}
						>
							New Job
						</Nav.Item>
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</div>
	);
}

export default SideNav;
