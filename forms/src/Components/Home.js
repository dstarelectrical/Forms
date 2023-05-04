import React, { useState, useEffect } from "react";
import AddCustomer from "./customer/addCustomer";
import AddAcMotor from "./AcMotor/AddMotor";
import JobCreation from "./AcMotor/JobCreation";

function Home() {
	return (
		<div>
			<JobCreation />
		</div>
	);
}

export default Home;
