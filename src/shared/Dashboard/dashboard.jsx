import React from "react";
import { NavLink } from "react-router-dom";
import '../Dashboard/dashboard.css';
import { BsFilterSquare } from "react-icons/bs";
import Donut from "./tasks-graph";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import Footer from "../Footer/footer";

function Dashboard() {
	return (
		<>
			<Header />
			<Sidebar />
			<div className="page-wrapper">
				<div className="container-fluid min_height">
					{/* <div className="row">
			<div className="col-md-12">
                <ul className="filter_box">
					<NavLink exact activeClassName="active" to="#">Today</NavLink>
					<NavLink activeClassName="active" to="#">This Week</NavLink>
					<NavLink activeClassName="active" to="#">Custom</NavLink>
				</ul>  
			</div>
			<div className="col-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <div className="card dashboard_card card_border">
					<div className="card-body">
						<h4 className="card-title">All Tasks</h4>
						<div class="graph_box">
							<ul>
                                <li>All To-Dos : <stong style={{color: "#c580d1"}}>10</stong></li>
                                <li>Tasks Done : <stong style={{color: "#219653"}}>04</stong></li>
                                <li>In-Process : <stong style={{color: "#2f80ed"}}>01</stong></li>
                                <li>Pending : <stong style={{color: "#818181"}}>01</stong></li>
                                <li>Overdue : <stong style={{color: "#eb5757"}}>02</stong></li>
							</ul>
                            <div className="graph_box_in"><Donut /> <span className="count">40% <br/>Done</span></div>
						</div>
						<NavLink to="javascript:void(0)" className="link">Sell All</NavLink>
					</div>
				</div> 
			</div>
			<div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
        <div className="card dashboard_card card_border">
					<div className="card-body">
						<h4 className="card-title">Overdue To-Dos</h4>
						<p className="task">No. of Tasks: <strong>2 </strong></p>
						<p className="theme_color">Residents</p>
						<ul>
							<li><img src="../../images/profle.jpg" /></li>
							<li><img src="../../images/profle.jpg" /></li>
						</ul>
						<p className="theme_color">Assigned Care Team</p>
						<ul>
							<li><img src="../../images/profle.jpg" /></li>
						</ul>
						<NavLink to="javascript:void(0)" className="link">Sell All</NavLink>
					</div>
				</div> 
			</div>
			<div className="col-12 col-md-6 col-lg-5 col-xl-4 col-xxl-4">
        <div className="card dashboard_card card_border">
					<div className="card-body">
						<h4 className="card-title">Incidents Reported</h4>
						<p className="task">No. of Incidents: <strong>1 </strong></p>
						<p className="theme_color">Residents</p>
						<ul>
							<li><img src="../../images/profle.jpg" /></li>
							<li><img src="../../images/profle.jpg" /></li>
						</ul>
						<p className="theme_color">Assigned Care Team</p>
						<ul>
							<li><img src="../../images/profle.jpg" /></li>
						</ul>
						<NavLink to="javascript:void(0)" className="link">Sell All</NavLink>
					</div>
				</div> 
			</div>
			<div className="col-12 col-md-12 col-lg-7 col-xl-8 col-xxl-8">
        <div className="card dashboard_card card_border">
					<div className="card-body">
						<h4 className="card-title">Alerts & Reminders
						<NavLink className="float-end" to="/"><BsFilterSquare /></NavLink>
						</h4>
						<p className="task time"><strong>Today</strong><br />29th March 2021</p>
					    <ul className="notification_ul">
							<li>
								<NavLink to="">
									<span>9:00am</span>
									<div>
										<img src="../../images/notification_1.svg" />
										Today is Patrick s birthday. He is 75 years old.
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink to="">
									<span>9:50am</span>
									<div>
										<img src="../../images/notification_2.svg" />
										Donna s care plan review is overdue by 1 day.
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink to="">
									<span>11:00am</span>
									<div>
										<img src="../../images/notification_1.svg" />
										Kate has submitted a leave request. 
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink to="">
									<span>1:40pm</span>
									<div>
										<img src="../../images/notification_3.svg" />
										Regulatory inspection is due in 1 day. 
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink to="">
									<span>3:30pm</span>
									<div>
										<img src="../../images/notification_2.svg" />
										Vadim s invoice for June 2021 is overdue by 15 days. 
									</div>
								</NavLink>
							</li>
							<li>
								<NavLink to="">
									<span>5:01pm</span>
									<div>
										<img src="../../images/notification_3.svg" />
										Julie s medicine Panadol is getting out of stock in 5 days.
									</div>
								</NavLink>
							</li>
						</ul>
					</div>
				</div> 
			</div>
		</div> */}
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Dashboard;