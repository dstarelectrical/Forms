import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, IconButton, InputGroup, Input } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

function Home() {
	const [search, setSearch] = useState("");
	let navigate = useNavigate();
	return (
		<div>
			<Button
				appearance="primary"
				onClick={(e) => navigate("/newjob")}
				style={{
					marginLeft: "10%",
					marginTop: "20%",
					width: "80%",
					marginRight: "10%",
				}}
				block
			>
				Create a new Job
			</Button>
			<Stack
				spacing={6}
				style={{
					marginLeft: "10%",
					marginTop: "20px",
					width: "80%",
					marginRight: "10%",
				}}
			>
				<Stack.Item grow={1}>
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
				</Stack.Item>
			</Stack>
		</div>
	);
}

export default Home;
