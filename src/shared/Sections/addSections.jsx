import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
//import "./AddEvents.css";

function AddSection() {
  const [serviceList, setServiceList] = useState([
    { sequenceNumber: "", question: "", answer: "" },
  ]);
  const [optionsgroup, setoptionsgroup] = useState([]);
  const [groupData, setGroupData] = useState("");
  const [classId, setClassId] = useState("");
   const [groupId, setGroupId] = useState("");
  //  const [type, setGroupId] = useState("");


  // console.log(classId,"classId")

  const [Class, setClass] = useState("");
  const [type, setType] = useState("");

  // const [faqData, setFaqData] = useState([]);
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");

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

  // const handleDataChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...serviceList];
  //   list[index][name] = value;
  //   setServiceList(list);
  // };

  function addFaqApi() {
    var data = JSON.stringify({
      type: type,
      classId: classId,
     groupId: groupId,
      faqData: serviceList,
      // "question":question,
      // "answer":answer
    });

    console.log(groupData, "groupData");

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/addFAQ`,
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    //  getclass();
    // getnewgroup();
  }, []);
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
      
      setClassId("");
      setType("group");
      console.log("eventcall")
      getnewgroup();
    } else {
      console.log("classcall");
      setGroupId("");
      setType("class");
      getclass();
    }
  }

  function selectID(event) {
    console.log(optionsgroup,event, "optionsgroupcATEGORIES");
      if (type == "class") {
        console.log(type, "classdata");
        setClassId(event);
        return;
      } else {
        console.log(event, "groupdata");
        setGroupId(event);
        return;
      }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add FAQ</h4>
              <div className="branchData">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Type</label>
                    <Select
                      options={options}
                      onChange={(event) => selectvalue(event)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Type</label>
                    <Select
                      options={optionsgroup}
                      //  onChange={(event)=> setGroupData(event.value)}
                      onChange={(event) => selectID(event.value)}
                    />
                  </div>
                  {serviceList?.map((singleService, index) => (
                    <div>
                      {serviceList.length - 1 === index &&
                        serviceList.length >0 && (
                          <button
                            type="button"
                            onClick={handleServiceAdd}
                            className="btn btn-success"
                          >
                            <span>+</span>
                          </button>
                        )}
                      {serviceList.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => handleServiceRemove(index)}
                          className="btn btn-danger"
                        >
                          <span>-</span>
                        </button>
                      )}
                      <div className="col-md-12 mt-3">
                        <label className="form-label">Sequence Number</label>
                        <input
                          // value={singleService.sequence}
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
                          className="form-control"
                          onChange={(e) => {
                            singleService.answer = e.target.value;
                          }}
                        />
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
                      onClick={addFaqApi}
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

export default AddSection;
