import React, { useEffect, useState } from "react";
import { Button, Input, Panel, InputGroup, Message, useToaster } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LOGIN() {
	const [username, set_username] = useState("");
	const [password, set_password] = useState("");
	const [visible, setVisible] = React.useState(false);
	let toaster = useToaster();
	let navigate = useNavigate();

	const handleChange = () => {
		setVisible(!visible);
	};

	const notifyFailedPost = (error) => {
		toaster.push(<Message type="error">{error}</Message>, {
			placement: "topEnd",
			duration: 5000,
		});
	};

	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	delay(1000).then(() => {});

	// This function handle's the login of the user sends the collected username and password to the server
	async function handleLoginClick() {
		var params = {
			username: username,
			password: password,
		};

		axios({
			method: "post",
			url: "https://dstarforms.herokuapp.com//login/",
			data: params,
		})
			.then(async (res) => {
				if (res.status === 202) {
					console.log("success");
					navigate("/home");
				}
			})
			.catch((err) => console.log(err));
	}

	return (
		<div>
			<Panel
				header="Login"
				shaded
				style={{ textAlign: "center", width: "50%" }}
			>
				<Input
					onChange={(e) => set_username(e)}
					value={username}
					placeholder="username"
					style={{ width: "70%", margin: "auto" }}
				/>
				<InputGroup
					inside
					style={{ width: "70%", margin: "auto", marginTop: "10px" }}
				>
					<Input
						onChange={(e) => set_password(e)}
						value={password}
						placeholder="password"
						type={visible ? "text" : "password"}
					/>
					<InputGroup.Button onClick={handleChange}>
						{visible ? <EyeIcon /> : <EyeSlashIcon />}
					</InputGroup.Button>
				</InputGroup>
				<Button
					apperance="Primary"
					block
					style={{ width: "70%", margin: "auto", marginTop: 10 }}
					onClick={handleLoginClick}
				>
					Login
				</Button>
			</Panel>
		</div>
	);
}

export default LOGIN;
