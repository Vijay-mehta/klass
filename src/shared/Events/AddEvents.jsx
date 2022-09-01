import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./AddEvents.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import RenderImages from "../../components/RenderImages";

function AddEvents() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false,
    height: 400,
  };
  const [image, setimage] = useState([]);
  const [sendEventImage, setSendEventImage] = useState([]);
  const [optionsgroup, setoptionsgroup] = useState([]);
  const [selectedOptiongroup, setselectedOptiongroup] = useState([]);
  const [selectedOptionGroupLabel, setSelectedOptionGroupLabel] = useState([]);
  const [title, settitle] = useState("");
  const [Date, setDate] = useState("");
  const [price, setprice] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [country, setcountry] = useState("");
  const [options, setoptions] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);
  const [selectedOptionTagLabel, setSelectedOptionTagLabel] = useState([]);
  const [smallDescription, setSmallDescription] = useState("");
  const [group, setGroup] = useState([]) // THIS STATE IS USED FOR "GROUP" PARAMETER FOR SECTION API 
  const [groupsName, setGroupsName] = useState([]) // THIS STATE IS USED FOR "GROUPSNAME" PARAMETER FOR SECTION API 
  const [upload, setUpload] = useState({
    pictures: [],
    maxFileSize: 5242880,
    imgExtension: [".jpg", ".png", "jpeg"],
    defaultImages: [],
  })
  let history = useHistory();



  //------------React-image-upload --------//

  let handleChange = (pictureFiles, files) => {
    setSendEventImage(pictureFiles)
    const { pictures } = upload;
    // console.log(pictureFiles, "Filesimportant")
    console.warn({ pictures, files });

    setUpload(
      {


        ...upload,
        pictures: [...pictures, ...files]

      },
      () => {
        console.warn("It was added!");
      }
    );
  };

  // console.log(sendEventImage, "4444")
  useEffect(() => {
    getnewgroup();
    getnewtag();
  }, []);


  // ----Add Event API ---//
  function AddEvents(e) {

    selectedOptionGroupLabel.map(item=>{
      groupsName.push(item);
    })

    selectedOptionTagLabel.map(item=>{
      groupsName.push(item);
    })

    selectedOptionone.map(item => {
      group.push(item);
    })
    selectedOptiongroup.map(item => {
      group.push(item);
    })

    // console.log(upload, "uploadImage");
    e.preventDefault();
    var data = new FormData();
    for (var i = 0; i < sendEventImage.length; i++) {
      data.append("image", sendEventImage[i]);
    }
    data.append("groupId", selectedOptionGroupLabel);
    data.append("title", title);
    data.append("Date", Date);
    data.append("price", price);
    data.append("startTime", startTime);
    data.append("endTime", endTime);
    data.append("description", content);
    data.append("postalCode", postalCode);
    data.append("address1", address1);
    data.append("address2", address2);
    data.append("country", country);
    data.append("tags", selectedOptionTagLabel);
    data.append("smallDescription", smallDescription)
    data.append("group", group);
    data.append("groupsName", groupsName);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/addevent`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response, "responseevent");
        history.push("/Events")
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resetForm = () => {
    settitle("");
    setimage("");
    setstartTime("");
    setendTime("");
    setDate("");
    setprice("");
  };

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
        // console.log(response, "response123");
        let optionsgroup = [];
        response.data.data.forEach((grup, index) => {
          optionsgroup.push({ label: grup.groups, value: grup._id });
        });
        // console.log(optionsgroup, "optionsGroup")
        setoptionsgroup(optionsgroup);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handlechangegroupmulti = (event) => {
    let array = [];
    let arrayLabel=[];
    event.forEach((option) => {
      array.push(option.value);
    });
    event.forEach((option)=>{
      arrayLabel.push(option.label);
    })
    setselectedOptiongroup(array);
    setSelectedOptionGroupLabel(arrayLabel);
  };

  // ----PostelCode API--//

  function getAddressPostcode() {
    var data = JSON.stringify({
      postalCode: postalCode,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/getAddressPostcode`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setaddress1(response.data.addressfrompostcode.address[0].ADDRESS);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      getAddressPostcode();
    }
  };

  // ----multi tags selete get--//

  function getnewtag() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/gettag`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        // console.log(response, "responsetags6565");
        let tagData = [];
        response.data.tagData.forEach((tag, index) => {
          // console.log("=======", tag);
          options.push({ value: tag._id, label: tag.tags });
        });
        // console.log(tagData, "tagData");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handlechangetag = (event) => {
    // console.log(event, "handlechangetag6666");
    let array = [];
    let arrayLabel=[];
    event.forEach((option) => {
      array.push(option.value);
    });
    event.forEach((option)=>{
      arrayLabel.push(option.label);
    })
    setselectedOptionone(array);
    setSelectedOptionTagLabel(arrayLabel);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Event</h4>
              <div className="branchData">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">event Image</label>
                    <div className="App">
                      <RenderImages
                        {...upload}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Group</label>
                    <Select
                      isMulti
                      options={optionsgroup}
                      onChange={(e) => handlechangegroupmulti(e)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Event Title</label>
                    <input
                      value={title}
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        settitle(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Event Date</label>
                    <input
                      value={Date}
                      type="Date"
                      className="form-control"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Event Price</label>
                    <input
                      value={price}
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setprice(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Event Start Time</label>
                    <input
                      value={startTime}
                      type="time"
                      className="form-control"
                      onChange={(e) => {
                        setstartTime(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Event End Time</label>
                    <input
                      value={endTime}
                      type="time"
                      className="form-control"
                      onChange={(e) => {
                        setendTime(e.target.value);
                      }}
                    />{" "}
                  </div>

                  <div className="col-md-12 mt-3">
                    <label className="form-label">
                      Brief Event Description
                    </label>
                    <textarea type="textarea"
                      value={smallDescription}
                      className="form-control"
                      onChange={(e) => {
                        setSmallDescription(e.target.value);
                      }}
                    />
                  </div>


                  <div className="col-md-12 mb-3">
                    <label className="form-label">Event Description</label>
                    <div className="App">
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => { }}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input
                      value={postalCode}
                      type="number"
                      onKeyUp={(e) => {
                        handleKeypress(e);
                      }}
                      className="form-control"
                      onBlur={() => {
                        getAddressPostcode();
                      }}
                      onChange={(e) => {
                        setpostalCode(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Address 1</label>
                    <input
                      defaultValue={address1}
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setaddress1(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Address 2</label>
                    <input
                      value={address2}
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setaddress2(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Country</label>
                    <input
                      value={country}
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setcountry(e.target.value);
                      }}
                    />{" "}
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="form-label">Tags</label>
                    <Select
                      isMulti
                      options={options}
                      onChange={(e) => handlechangetag(e)}
                    />
                  </div>
                  <div class="col-md-12">
                    <button type="button" class="btn CancelBtn me-3" onClick={() => { history.push("./Events") }}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3"
                      onClick={AddEvents}
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

export default AddEvents;
