import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox, Panel } from "rsuite";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Comments({ jobID, view }) {
	const [comments, setComments] = useState(false);

	useEffect(() => {
		if (view === true) {
			axios({
				method: "get",
				url: `http://127.0.0.1:8000/acmotors/accomments/${jobID}/`,
			}).then((res) => {
				setComments(res.data.comments);
			});
		}
	}, []);

	const handleSaveClick = () => {
		let data = {
			comments: comments,
		};
		axios({
			method: "post",
			url: `http://127.0.0.1:8000/acmotors/accomments/${jobID}/`,
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
			header={<h3>Comments</h3>}
		>
			{!view ? (
				<div>
					<Input
						as="textarea"
						rows={5}
						placeholder="Comments"
						value={comments}
						onChange={(e) => setComments(e)}
					/>
					<Button block onClick={handleSaveClick}>
						Save
					</Button>
				</div>
			) : (
				<div
					style={{
						fontSize: "17px",
						marginLeft: "5px",
					}}
				>
					{comments}
				</div>
			)}
		</Panel>
	);
}

export default Comments;
