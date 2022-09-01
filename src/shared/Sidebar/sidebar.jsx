import React from "react";
import { NavLink } from "react-router-dom";
import '../../loader.js'
import { AiFillAppstore } from "react-icons/ai";
import { FaUsers } from 'react-icons/fa';
import { AiOutlinePoweroff } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { AiFillTag } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";

function Sidebar() {
    return (
        <aside className="left-sidebar col-md-4">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <h5>Menus</h5>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/dashboard" aria-expanded="false">
                                <AiFillAppstore />
                                <span className="hide-menu">DashBoard</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Students" aria-expanded="false">
                                <FaUsers />
                                <span className="hide-menu">Users</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Business" aria-expanded="false">
                                <FaUsers />
                                <span className="hide-menu">Business</span>
                            </NavLink>
                        </li>
                        {/* <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Class" aria-expanded="false">
                                <FaUsers />
                                <span className="hide-menu">Class</span>
                            </NavLink>
                        </li> */}
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Events" aria-expanded="false">
                                <FaUsers />
                                <span className="hide-menu">Events</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Articles" aria-expanded="false">
                                <FaUsers />
                                <span className="hide-menu">Articles</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Categories" aria-expanded="false">
                                <FaList />
                                <span className="hide-menu">Category Group</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Subcategories" aria-expanded="false">
                                <FaList />
                                <span className="hide-menu">Category</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Tags" aria-expanded="false">
                                <AiFillTags />
                                <span className="hide-menu">Tags</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/GroupsData" aria-expanded="false">
                                <AiFillTags />
                                <span className="hide-menu">Groups</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Faqs" aria-expanded="false">
                                <AiFillTags />
                                <span className="hide-menu">FAQ's</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Grouptags" aria-expanded="false">
                                <AiFillTags />
                                <span className="hide-menu">Tag-Group</span>
                            </NavLink>
                        </li>
                        {/* <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Product_Category_Group" aria-expanded="false">
                                <AiFillTag />
                                <span className="hide-menu">Product Category Group</span>
                            </NavLink>
                        </li> */}
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Product_Categories" aria-expanded="false">
                                <AiFillTags />
                                <span className="hide-menu">Product Categories</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Sections" aria-expanded="false">
                                <AiFillSetting />
                                <span className="hide-menu">Sections</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="sidebar-footer">
                <NavLink to="/" className="link" title="Settings"><AiFillSetting /></NavLink>
                <NavLink to="/" className="link" title="Help Resources"><BiHelpCircle /></NavLink>
                <NavLink to="/" className="link" title="Logout"><AiOutlinePoweroff /></NavLink>
            </div>
        </aside>
    );
}

export default Sidebar;