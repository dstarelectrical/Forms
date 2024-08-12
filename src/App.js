import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LOGIN from "./Auth/login";
import AddCustomer from "./Components/customer/addCustomer";
import AddAcMotor from "./Components/AcMotor/AddMotor";
import ViewJob from "./Components/AcMotor/viewJob";
import JobCreation from "./Components/AcMotor/JobCreation";
import AllJobs from "./Components/AllJobs";
import Calendar from "./Components/calendar";
import Portfolio from "./Components/portfolio";
import Disclaimer from "./Components/discliamer";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Portfolio />} />
					<Route path="/disclaimer" element={<Disclaimer />} />
					<Route path="/forms" exact element={<Home />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route
						path="/forms/addcustomer"
						exact
						element={<AddCustomer />}
					/>
					<Route
						path="/forms/addmotor"
						exact
						element={<AddAcMotor />}
					/>
					<Route path="/forms/job/:id" exact element={<ViewJob />} />
					<Route
						path="/forms/newjob"
						exact
						element={<JobCreation />}
					/>
					<Route path="/forms/alljobs" element={<AllJobs />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
