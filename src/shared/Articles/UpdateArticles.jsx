import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./AddArticles.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import JoditEditor from "jodit-react";
import { useHistory, useLocation } from "react-router-dom";

function UpdateArticles() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [sendAuthorImage, setSendAuthorImage] = useState("");
  const [sendArticleImage, setSendArticleImage] = useState("");
  const [authorName, setauthorName] = useState("");
  const [authordescription, setAuthorDescription] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [options, setoptions] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);
  const [selectedOptionTagLabel, setSelectedOptionTagLabel] = useState([]);
  const [serviceList, setServiceList] = useState([{ image: "", article: "" }]);
  const [groupdata, setGroupdata] = useState([]);
  const [selectedOptiongroup, setselectedOptiongroup] = useState([]);
  const [selectedOptionGroupLabel, setSelectedOptionGroupLabel] = useState([]);
  const [priority, setPriority] = useState(""); // ----priority state---//
  const [group, setGroup] = useState([]) // THIS STATE IS USED FOR "GROUP" PARAMETER FOR SECTION API 
  const [groupsName, setGroupsName] = useState([]) // THIS STATE IS USED FOR "GROUPSNAME" PARAMETER FOR SECTION API 
  let history = useHistory();
  let location = useLocation();
  console.log(location?.state?.details, "location.details");

  // console.log(selectedOptionone, "selectedOptionone")

  //----------EDIT ARTICLE API----------//

  function editArticles() {

    // --- THIS CONDITION IS USED FOR "GROUP" PARAMETER FOR SECTION API 

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
    
    if (selectedOptionTagLabel.length === 0) {
      location.state.details.tags.map((item) => {
        group.push(item);
      })
    } else {
      selectedOptionTagLabel.map(item => {
        group.push(item);
      }
      )
      // console.log(group, "group")
    }

    if (selectedOptionGroupLabel.length === 0) {
      location.state.details.groupId.map((item) => {
        group.push(item);
      })

    } else {
      selectedOptionGroupLabel.map(item => {
        group.push(item);
      }
      )
      // console.log(group, "group")
    }

    var data = new FormData();
    data.append("priority", priority ? priority : location.state.details.priority? location.state.details.priority:0);
    data.append("group", group);
    data.append("groupsName", groupsName);
    data.append("authorimage",
      sendAuthorImage == ""
        ? location.state.details.authorimage
        : sendAuthorImage
    );
    data.append(
      "authorName",
      authorName === "" ? location.state.details.authorName : authorName
    );
    data.append(
      "authordescription",
      authordescription === ""
        ? location.state.details.authordescription
        : authordescription
    );
    data.append(
      "title",
      title === "" || null ? location.state.details.title : title
    );
    data.append(
      "banner",
      sendArticleImage === "" ? location.state.details.banner : sendArticleImage
    );
    data.append(
      "subject",
      subject === "" ? location.state.details.subject : subject
    );
    data.append(
      "articledescription",
      articleDescription === ""
        ? location.state.details.articledescription
        : articleDescription
    );
    data.append(
      "description",
      description === ""
        ? location.state.details.description.toString()
        : description
    );
    data.append("articleId", location.state.details._id);
    data.append(
      "tags",
      selectedOptionTagLabel.toString() === "" || null
        ? location.state.details.tags
          .map((item) => {
            return item;
          })
          .toString()
        : selectedOptionTagLabel.toString()
    );
    // console.log(sendAuthorImage, "sendAuthorImage");

    data.append(
      "groupId",
      selectedOptionGroupLabel.toString() === "" || null
        ? location.state.details?.groupId
          ?.map((item) => {
            // console.log(item);
            return item;
          })
          .toString()
        : selectedOptionGroupLabel
    );
    for (let obj of data) {
      // console.log(sendAuthorImage, "obj");
    }

    for(var obj of data){
      console.log(obj,"requestData");
    }

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editarticles`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "Application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        history.push("./Articles");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //----get tags API--//

  useEffect(() => {
    getnewtag();
    getnewgroup();
  }, []);

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
        // console.log(response, "response")
        let groupData = [];
        response.data.data.map((item, index) => {
          groupData.push({ label: item.groups, value: index });
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
        response.data.tagData.forEach((item, index) => {
          // console.log("=======", tag);
          options.push({ value: index, label: item.tags });
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
    let arrayLabel = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    event.forEach((option)=>{
      arrayLabel.push(option.label);
    })
    setselectedOptionone(array);
    setSelectedOptionTagLabel(arrayLabel);
    // console.log(array, "array");
  };

  // ---- Get article API ---//



  var config = {
    readonly: false,
    height: 400,
  };

  //--------Function to handle and set Author Image--------//

  const handleAuthorImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      // console.log(file, "file");
      let display = URL.createObjectURL(file);
      setAuthorImage(display);
      setSendAuthorImage(event.target.files[0]);
    }
  };

  //--------Function to handle and set Article Banner Image--------//

  const handleArticleImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      let display = URL.createObjectURL(file);
      setArticleImage(display);
      setSendArticleImage(event.target.files[0]);
    }
  };

  //--------Function to render images--------//

  const renderImages = (image) => {
    return (
      <img
        style={{ width: "110px", height: "140px" }}
        src={image}
        key={image}
      />
    );
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
              <h4 className="card-title">Edit Articles</h4>

              <div className="branchData">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-2">
                        <label className="form-label">Author Image</label>
                        <ul className="imagesUpload">
                          <li style={{ width: "100%", height: "148px" }}>
                            <input type="file" onChange={handleAuthorImage} />
                            {!sendAuthorImage ? (
                              <img
                                style={{ width: "100%", height: "148px" }}
                                src={location.state.details.authorimage}
                              />
                            ) : (
                              renderImages(authorImage)
                            )}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-10">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Author Name</label>
                          <input
                            defaultValue={location.state.details.authorName}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setauthorName(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">
                            Author Description
                          </label>
                          <textarea
                            type="textarea"
                            defaultValue={
                              location.state.details.authordescription
                            }
                            className="form-control"
                            onChange={(e) => {
                              setAuthorDescription(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-2">
                        <label className="form-label">Article Image</label>
                        <ul className="imagesUpload">
                          <li style={{ width: "100%", height: "128px" }}>
                            <input type="file" onChange={handleArticleImage} />
                            {!sendArticleImage ? (
                              <img
                                style={{ width: "100%", height: "128px" }}
                                src={location.state.details.banner}
                              />
                            ) : (
                              renderImages(articleImage)
                            )}
                            {/* {renderImages(articleImage)} */}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-10">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Article Title</label>
                          <input
                            defaultValue={location.state.details.title}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">Article Subject</label>
                          <input
                            defaultValue={location.state.details.subject}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setSubject(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mt-3">
                        <label className="form-label">
                          Brief Article Description
                        </label>
                        <textarea
                          type="textarea"
                          defaultValue={
                            location.state.details.articledescription
                          }
                          className="form-control"
                          onChange={(e) => {
                            setArticleDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {serviceList.map((singleService, index) => (
                    <div key={index} className="services">
                      <div className="col-md-12">
                        <div className="row bgBox mb-3">
                          <div className="col-md-12">
                            <label className="form-label">
                              Article Description
                            </label>
                            <div className="App">
                              <JoditEditor
                                ref={editor}
                                value={location.state.details.description.toString()}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => {
                                  // console.log(newContent, "newContent");
                                  singleService.article = newContent;
                                  setContent(newContent);
                                  return setDescription(newContent);
                                }} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => { }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Select Tags</label>
                        <Select
                          isMulti
                          defaultValue={location.state.details.tags.map(
                            (item, index) => {
                              return { value: index, label: item };
                            }
                          )}
                          key={location.state.details.tags.map((item, index) => {
                            return { Value: index };
                          })}
                          options={options}
                          onChange={(e) => handlechangetag(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Select Groups</label>
                        <Select
                          isMulti
                          defaultValue={location.state.details?.groupId?.map(
                            (item, index) => {
                              // console.log(item);
                              return { value: index, label: item };
                            }
                          )}
                          key={location.state.details?.groupId?.map((item, index) => {
                            return item;
                          })}
                          options={groupdata}
                          onChange={(e) => {
                            e.persist = () => { };
                            handlechangegroupmulti(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>


                  <div className="col-md-12 mb-3">
                    <label className="form-label">Select Priority</label>
                    <Select
                      defaultValue={optionspriority.map(item => {
                        if (location.state.details?.priority?.toString() === item.value) {
                          // console.log(item.label, "item.label");
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
                    <button type="button" class="btn CancelBtn me-3" onClick={() => { history.push("./Articles") }}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3"
                      onClick={editArticles}
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

export default UpdateArticles;