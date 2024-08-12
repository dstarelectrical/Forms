import React from "react";
import YouTube from "react-youtube";

class Calender extends React.Component {
	render() {
		const opts = {
			height: "480",
			width: "100%",
			playerVars: {
				autoplay: 1,
			},
		};

		return (
			<div
				style={{
					height: "100vh",
					width: "100vhw",
					paddingLeft: "9rem",
					paddingRight: "9rem",
					contentAlign: "center",
					display: "block",
					marginLeft: "auto",
					marginRight: "auto",
					backgroundColor: "#07020d",
					fontFamily: "Inconsolata",
					color: "#F1E9DB",
				}}
			>
				<div
					style={{
						fontWeight: "bold",
						fontSize: "30px",
						width: "100%",
						textAlign: "center",
					}}
				>
					Calender Enhancements
				</div>
				<div
					style={{
						fontSize: "15px",
						width: "100%",
						textAlign: "center",
					}}
				>
					<p style={{ fontWeight: "bold", textAlign: "left" }}>
						Disclaimer:
					</p>
					<p style={{ textAlign: "left" }}>
						The following video is a demonstration of the website I
						made for the Universtiy of Alberta Medicine and
						Dentistry department. I cannot provide a demo of the
						actual website because it requires a university login
						and is not accessible to the public. The video is a
						demonstration of the website's features and
						functionalities.
					</p>
				</div>
				<div
					style={{
						paddingRight: "6rem",
						paddingRight: "6rem",
						marginTop: "20px",
						width: "100%",
					}}
				>
					<YouTube
						videoId="JZIRJZeEVUs"
						opts={opts}
						onReady={this._onReady}
					/>
				</div>

				<p
					style={{
						fontWeight: "bold",
						textAlign: "left",
						fontSize: "15px",
						width: "100%",
					}}
				>
					Summary:
				</p>
				<p
					style={{
						textAlign: "left",
						fontSize: "15px",
						width: "100%",
					}}
				>
					A quick summary of the website. It is a schedule managment
					website for the administration, professors and the students.
					This website allows the administration to add/delete/manage
					schedules for professors and students. The professors and
					students can view their schedules and generate various types
					of reports based on their schedules. It has a robust search
					feature that allows the users to search by various
					parameters such as course, time, professor, etc.
				</p>
			</div>
		);
	}

	_onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}
}

export default Calender;
