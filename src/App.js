import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LOGIN from "./Auth/login";
import AddCustomer from "./Components/customer/addCustomer";
import AddAcMotor from "./Components/AcMotor/AddMotor";
import ViewJob from "./Components/AcMotor/viewJob";
import JobCreation from "./Components/AcMotor/JobCreation";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/home" exact element={<Home />} />
					<Route path="/login" exact element={<LOGIN />} />
					<Route
						path="/addcustomer"
						exact
						element={<AddCustomer />}
					/>
					<Route path="/addmotor" exact element={<AddAcMotor />} />
					<Route path="/job/:id" exact element={<ViewJob />} />
					<Route path="newjob" exact element={<JobCreation />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
