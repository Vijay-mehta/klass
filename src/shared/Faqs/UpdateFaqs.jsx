import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


//import "./AddEvents.css";

function UpdateFaqs() {
  const [serviceList, setServiceList] = useState([
    { sequenceNumber: "", question: "", answer: "" },
  ]);
  const [optionsgroup, setoptionsgroup] = useState([]);
  const [groupData, setGroupData] = useState("");
  const [classId, setClassId] = useState("");
  const [groupId, setGroupId] = useState("");
  // const [faqData, setFaqData] = useState([]);
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");
  const [deleteIndex, setDeleteIndex] = useState("");

  let location = useLocation();
  let history = useHistory();


  useEffect(() => {
    getFaqs();
    setId(location.state.details);
    setServiceList(location.state.details.faqData);
  }, []);

  //  console.log(location.state.details,"location.details")

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([
      ...serviceList,
      { sequenceNumber: "", question: "", answer: "" },
    ]);
  };

  const options = [
    { value: "Class", label: "Class" },
    { value: "Group", label: "Group" },
  ];

  //----------FUNCTION TO SET GROUP OR CLASS ID------------//
  function setId(details) {
    console.log(details, "details");
    if (details.groupId === undefined) {
      setClassId(details.classId._id);
    } else {
      setGroupId(details.groupId._id);
    }
  }

  //----------FAQ UPDATE API----------//

  function updateFaqs() {
    var data = JSON.stringify({
      FAQId: location.state.details._id,
      groupId: groupId,
      classId: classId,
      faqData: serviceList,
    });

    console.log(serviceList, "postData");

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editFAQ`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response, "response");
        // window.location.reload(false);
        history.push("./Faqs")

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //----------DELETE SINGLE FAQ API----------//

  function deleteSingleFaq() {
    var axios = require("axios");
    var data = JSON.stringify({
      FAQId: location.state.details._id,
      faqdataIndex: deleteIndex,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deletefaqonIndex`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data, "faqDelete"));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //----------FAQ GET API------------//

  function getFaqs() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getfaq`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "response.data");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ----multi group selete get--//

  function getnewgroup() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getgroups`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "response123");
        let optionsgroup = [];
        response.data.categoryData.forEach((grup, index) => {
          optionsgroup.push({ label: grup.groups, value: grup._id });
        });
        console.log(optionsgroup, "optionsgroup");

        setoptionsgroup(optionsgroup);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getclass() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getclass`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data, "getclass");
        let optionclass = [];
        response.data.data.map((clasadd, index) => {
          optionclass.push({ label: clasadd.businessName, value: clasadd._id });
        });
        console.log(optionclass, "optionclass");
        setoptionsgroup(optionclass);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function selectvalue(event) {
    console.log(event, "event");
    if (event?.label == "Group") {
      getnewgroup();
    } else {
      getclass();
    }
  }

  console.log(serviceList, "serviceList");

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Edit FAQ's</h4>
              <div className="branchData">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Type</label>
                    <Select
                      //options={options}
                      //onChange={(event) => selectvalue(event)}
                      defaultValue={
                        location.state.details.groupId === undefined
                          ? { value: "0", label: "Class" }
                          : { value: "1", label: "Group" }
                      }
                      key={
                        location.state.details.groupId === undefined
                          ? { value: "0" }
                          : { value: "1" }
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Type</label>
                    <Select
                      //options={optionsgroup}
                      //onChange={(event) => setGroupData(event.value)}
                      defaultValue={
                        location.state.details.groupId === undefined
                          ? {
                              value: location.state.details.classId._id,
                              label:
                                location.state.details.classId.businessName,
                            }
                          : {
                              value: location.state.details.groupId._id,
                              label: location.state.details.groupId.groups,
                            }
                      }
                    />
                  </div>
                  {serviceList?.map((singleService, index) => (
                    <div>
                        <div className="faqButton">
                      <div className="actionBtn">
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteIndex(index);
                          handleServiceRemove(index);
                          deleteSingleFaq(index);
                        }}
                        className="btn btn-danger"
                      >
                        <span>DELETE</span>
                      </button>

                      {serviceList.length - 1 === index &&
                        serviceList.length < 4000 && (
                          <button
                            type="button"
                            onClick={handleServiceAdd}
                            className="btn btn-success"
                          >
                            <span>+</span>
                          </button>
                        )}

                      {serviceList.length !== 1 &&
                        serviceList.length - 1 === index && (
                          <button
                            type="button"
                            onClick={() => handleServiceRemove(index)}
                            className="btn btn-danger"
                          >
                            <span>-</span>
                          </button>
                        )}
                         </div>
                      <div className="col-md-12 mt-3">
                        <label className="form-label">Sequence Number</label>
                        <input
                          // value={singleService.sequenceNumber}
                          // defaultValue={location.state.details.answer}
                          defaultValue={singleService.sequenceNumber}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            singleService.sequenceNumber = e.target.value;
                          }}
                        />
                      </div>
                      <div className="col-md-12 mt-3">
                        <label className="form-label">Question</label>
                        <textarea
                          type="textarea"
                          //value={singleService.question}
                          defaultValue={singleService.question}
                          className="form-control"
                          onChange={(e) => {
                            singleService.question = e.target.value;
                          }}
                        />
                      </div>

                      <div className="col-md-12 mt-3">
                        <label className="form-label">Answer</label>
                        <textarea
                          type="textarea"
                          //  value={singleService.answer}
                          defaultValue={singleService.answer}
                          className="form-control"
                          onChange={(e) => {
                            singleService.answer = e.target.value;
                          }}
                        />
                      </div>
                     
                    </div>
                    </div>
                  ))}
                  <div class="col-md-12 mt-3">
                    <button type="button" class="btn CancelBtn me-3 ">
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3"
                      onClick={updateFaqs}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateFaqs;
