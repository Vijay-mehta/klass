import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import JoditEditor from "jodit-react";
import "./UpdateEvents.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import RenderImages from "../../components/RenderImages";

function UpdateEvents(props) {
  // console.log(props, "UpdateAddEventsUpdateAddEvents");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false,
    height: 400,
  };
  let location = useLocation();
  // console.log(location.state.details,"smallDescription")

  // const [image, setimage] = useState([]);
  const [groupdata, setGroupdata] = useState([]);
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
  const [eventImages, setEventImages] = useState([]);
  const [smallDescription, setSmallDescription] = useState("");
  const [defaultImages, setDefaultImages] = useState([]);
  const [priority, setPriority] = useState("");
  const [group, setGroup] = useState([]) //----- THIS STATE IS USED FOR "GROUP" PARAMETER FOR SECTION API--// 
  const [groupsName, setGroupsName] = useState([]) // THIS STATE IS USED FOR "GROUPSNAME" PARAMETER FOR SECTION API 
  const [upload, setUpload] = useState({
    pictures: [],
    maxFileSize: 5242880,
    imgExtension: [".jpg", ".png", "jpeg"],
    defaultImages: [...location.state.details.image],
  })

  let history = useHistory();
  useEffect(() => {
    getnewgroup();
    gettag();
    initialArray();
  }, []);


  //--------FUNCTION FOR DEFAULT IMAGES--------//

  function initialArray() {
    setDefaultImages(location.state.details.image);
  }

  //------------React-image-upload --------//

  let handleChange = (pictureFiles, files, uploadFiles) => {
    let defaultArray = [];
    uploadFiles?.map(item => {
      if (item.includes("https://")) {
        // console.log("item",item)
        defaultArray.push(item);
      }
    })
    setDefaultImages(defaultArray);
    // console.log("defaultArray",defaultArray);
    // console.log(uploadFiles,"pictureFiles");
    setEventImages(pictureFiles);
    const { pictures } = upload;
    // console.log(pictureFiles,"Filesimportant")
    console.warn({ pictures, files });

    setUpload(
      {


        ...upload,
        pictures: [...pictures, ...files],
      },
      () => {
        console.warn("It was added!");
      }
    );
  };


  //-----------EVENT EDIT API---------//

  function EditEvents(e) {
  // --- THIS CONDITION IS USED FOR "GROUPSNAME" PARAMETER FOR SECTION API 

    if (selectedOptionTagLabel.length === 0) {
      location.state.details.tags.map((item) => {
        groupsName.push(item);
      })
    } else {
      selectedOptionTagLabel.map(item => {
        groupsName.push(item);
      }
      )
      // console.log(group, "group")
    }
    if (selectedOptionGroupLabel.length === 0) {
      location.state.details.groupId.map((item) => {
        groupsName.push(item);
      })
    } else {
      selectedOptionGroupLabel.map(item => {
        groupsName.push(item);
      }
      )
      // console.log(group, "group")
    }

    // --- THIS CONDITION IS USED FOR "GROUP" PARAMETER FOR SECTION API 

    if (selectedOptionone.length === 0) {
      location.state.details.tags.map((item) => {
        group.push(item);
      })
    } else {
      selectedOptionone.map(item => {
        group.push(item);
      }
      )
      // console.log(group,"group")
    }

    if (selectedOptiongroup.length === 0) {
      location.state.details.groupId.map((item) => {
        group.push(item);
      })

    } else {
      selectedOptiongroup.map(item => {
        group.push(item);
      }
      )
      // console.log(group,"group")
    }




    // console.log(upload, "uploadImage");
    e.preventDefault();
    // console.log(eventImages,"eventImages");
    var data = new FormData();
    data.append("eventId", location.state.details._id);
    data.append("priority", priority ? priority : location.state.details.priority? location.state.details.priority:0);
    data.append("group", group);
    data.append("groupsName", groupsName);
    data.append("title", title === "" ? location.state.details.title : title);

    eventImages?.map(item => {
      data.append(
        "image",
        eventImages === "" || null ? location.state.details.image : item
      );
    });

    defaultImages?.map(item => {
      data.append("image", defaultImages === "" || null ? location.state.details.image : item);
    })

    data.append(
      "address1",
      address1 === "" ? location.state.details.address1 : address1
    );
    data.append(
      "address2",
      address2 === "" ? location.state.details.address2 : address2
    );
    data.append(
      "postalCode",
      postalCode === "" ? location.state.details.postalCode : postalCode
    );

    data.append(
      "country",
      country === "" ? location.state.details.country : country
    );
    data.append(
      "startTime",
      startTime === "" ? location.state.details.startTime : startTime
    );
    data.append(
      "endTime",
      endTime === "" ? location.state.details.endTime : endTime
    );
    data.append("Date", Date === "" ? location.state.details.Date : Date);
    data.append("price", price === "" ? location.state.details.price : price);

    data.append("smallDescription", smallDescription === "" || null ? location.state.details.smallDescription : smallDescription)

    data.append(
      "description",
      content === "" ? location.state.details.description : content
    );

    data.append(
      "tags",
      selectedOptionTagLabel.toString() === "" || null
        ? location.state.details?.tags
          ?.map((item) => {
            return item;
          })

        : selectedOptionTagLabel
    );
    data.append(
      "groupId",
      selectedOptionGroupLabel.toString() === "" || null
        ? location.state.details?.groupId
          ?.map((item) => {
            // console.log(item);
            return item;
          })

        : selectedOptionGroupLabel
    );

    for (var obj of data )
{
  console.log(obj,"requestData")
}
    console.log(data.groupId,"groupId");
    console.log(data.tags,"Tags");
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editevent`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        // console.log(response.data, "5555");
        history.push("./Events")
      })

      .catch(function (error) {
        console.log(error);
      });
  }

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
        let groupData = [];
        response.data.data?.map((grup, index) => {
          groupData.push({ label: grup.groups, value: index });
        });
        setGroupdata(groupData);
        // console.log(groupData, "groupData");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handlechangegroupmulti = (event) => {
    let array = [];
    let arrayLabel= [];
    event.forEach((option) => {
      array.push(option.value);
    });
    event.forEach((option)=>{
      arrayLabel.push(option.label);
    })
    setselectedOptiongroup(array);
    setSelectedOptionGroupLabel(arrayLabel);
  };

  // ---- get Postal Code API ---//
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
        // console.log(response.data, "response in postal code api");
        setaddress1(response.data.addressfrompostcode.address[0].ADDRESS);
        // setcountry('Singapore');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---- On Enter key Calling API ---//
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      getAddressPostcode();
    }
  };

  // ---- get tags API ---//
  const handlechangetag = (event) => {
    event.persist();
    let array = [];
    let arrayLabel=[];
    event.forEach((value) => {
      array.push(value.value);
    });
    event.forEach((option)=>{
      arrayLabel.push(option.label);
    })
    setselectedOptionone(array);
    setSelectedOptionTagLabel(arrayLabel);
  };

  function gettag() {
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
        // console.log(response.data, "gettags");
        let tagData = [];
        response.data.tagData.forEach((tag, index) => {
          // console.log("=======", tag);
          tagData.push({ value: index, label: tag.tags });
        });
        // console.log(tagData, "tagData");
        setoptions(tagData);
        // setdefaultOptions(defaultTagData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let imagelist = location.state.details.image;

  const handleRemove = (index) => {

    let displayArray = [];
    imagelist.splice(index, 1);
    displayArray = imagelist;
    // console.log(displayArray, "imagelist")
    renderImages(displayArray);
    // console.log(imagelist, "imagelist")

  };


  const renderImages = (images) => {



    return images?.map((single_image, index) => {
      return (

        <>
          <span className="mainButton" >

            <IoIosClose className="crossButton"
              onClick={() => handleRemove(index)}
            />
            <img
              style={{ width: "110px", height: "140px" }}
              src={single_image}
              key={single_image}
            />
          </span>

        </>
      );
    });
  };


  const optionspriority = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  function selectPriorityValue(event) {
    // console.log(event, "event");
    setPriority(event.value)

  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Edit Event</h4>



              <div className="branchData">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Event Images</label>
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
                      defaultValue={location.state.details?.groupId?.map(
                        (item,index) => {
                          console.log(item,"groupItem");
                          return { value: index, label: item };
                        }
                      )}
                      key={location.state.details?.groupId?.map((item,index) => {
                        return index;
                      })}
                      options={groupdata}
                      onChange={(e) => {
                        e.persist = () => { };
                        handlechangegroupmulti(e);
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Event Title</label>
                    <input
                      defaultValue={location.state.details.title}
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
                      defaultValue={location.state.details.Date}
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Event Price</label>
                    <input
                      defaultValue={location.state.details.price}
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        setprice(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Event Start Time</label>
                    <input
                      defaultValue={location.state.details.startTime}
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
                      defaultValue={location.state.details.endTime}
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
                      //value={articledescription}
                      defaultValue={location.state.details.smallDescription}
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
                        value={location.state.details.description.toString()}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      />
                    </div>
                  </div>

                  <div className="col-md-2 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input
                      defaultValue={location.state.details.postalCode}
                      type="text"
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
                      type="text"
                      className="form-control"
                      value={address1 ? address1 : location.state.details.address1}
                      onChange={(e) => {
                        setaddress1(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Address 2</label>
                    <input
                      defaultValue={location.state.details.address2}
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
                      defaultValue={location.state.details.country}
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
                      defaultValue={location.state.details?.tags?.map(
                        (item, index) => {
                          // console.log(item);
                          return { value: index, label: item };
                        }
                      )}
                      key={location.state.details?.tags?.map((item,index) => {
                        return index;
                      })}
                      options={options}
                      name="tags"
                      onChange={(e) => {
                        e.persist = () => { };
                        handlechangetag(e);
                      }}
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="form-label">Select Priority</label>
                    <Select
                      defaultValue={optionspriority.map(item => {
                        if (location.state.details?.priority?.toString() === item.value) {
                          // console.log(item.label,"item.label");
                          return item;
                        }
                      })}
                      key={optionspriority.map(item => {
                        if (location.state.details.priority === item.value) {
                          return item.value;
                        }
                      })}
                      options={optionspriority}
                      name="Priority"
                      onChange={(event) => selectPriorityValue(event)}
                    />
                  </div>
                  <div class="col-md-12">
                    <button type="button" class="btn CancelBtn me-3" onClick={() => { history.push("./Events") }}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3 "
                      onClick={EditEvents}
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

export default UpdateEvents;