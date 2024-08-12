import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";

function Disclaimer() {
	let navigate = useNavigate();

	return (
		<div
			style={{
				backgroundColor: "#07020d",
				width: "100vw",
				height: "100vh",
				fontFamily: "Inconsolata",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					right: "25%",
					top: "25%",
					width: "50%",
					height: "50%",
					margin: "auto",
				}}
			>
				<p style={{ color: "#f1e9db", fontSize: "30px" }}>
					Disclaimer: This is a freelance project I built for Dstar
					electrials. I was able to get permission to use a part of
					the webiste to showcase my work. This is a stripped down
					version of the original website, it only contains the first
					step of the Job tracking app I made for Dstar. Thank you for
					visiting.
				</p>
				<Button
					color="#f1e9db"
					onClick={() => navigate("/forms")}
					block
					style={{ marginTop: "5px" }}
				>
					Continue
				</Button>
			</div>
		</div>
	);
}

export default Disclaimer;
