import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./AddArticles.css";
import Footer from "../Footer/footer";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import { AiFillEye } from "react-icons/ai";
import JoditEditor from "jodit-react";
import { useHistory } from "react-router-dom";

function AddArticles() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [sendAuthorImage, setSendAuthorImage] = useState("")
  const [sendArticleImage, setSendArticleImage] = useState("")
  const [authorname, setAuthorname] = useState("");
  const [authordescription, setAuthorDescription] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articleImages, setArticleImages] = useState([]);
  const [title, settitle] = useState("");
  const [subject, setSubject] = useState("");
  const [articledescription, setArticledescription] = useState("");
  const [group, setGroup] = useState([]) // THIS STATE IS USED FOR "GROUP" PARAMETER FOR SECTION API 
  const [groupsName, setGroupsName] = useState([]) // THIS STATE IS USED FOR "GROUPSNAME" PARAMETER FOR SECTION API 
  const [serviceList, setServiceList] = useState([
    { image: "", article: "" },
  ]);
  const [optionsgroup, setoptionsgroup] = useState([]);
  const [selectedOptiongroup, setselectedOptiongroup] = useState([]);
  const [selectedOptionGroupLabel, setSelectedOptionGroupLabel] = useState([]);


  //const [displayImage, setDisplayImage] = useState([{img:""}])

  let history = useHistory();

  const [options, setoptions] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);
  const [selectedOptionTagLabel, setSelectedOptionTagLabel] = useState([]);

  // console.log(selectedOptionone, "selectedOptionone");

  function AddArticles(e) {

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

    let description = [], image = [];
    for (var a of serviceList) {
      // console.log(a,"ssl");
      description.push(a.article);
      image.push(a.image)
    }
    //console.log(articleData,"arrayssl")

    e.preventDefault();
    var data = new FormData();

    // console.log(articleImages,"displayArticleImages")
    var array = []
    for (var i = 0; i < articleImages.length; i += 2) {
      // console.log("asdasdd",articleImages[i])
      array.push(articleImages[i]);
    }



    data.append("authorimage", sendAuthorImage);
    data.append("authorName", authorname);
    data.append("authordescription", authordescription);
    data.append("title", title);
    data.append("banner", sendArticleImage);
    data.append("subject", subject);
    data.append("description", description);
    data.append("tags", selectedOptionTagLabel);
    data.append("groupId", selectedOptionGroupLabel);
    data.append("group", group);
    data.append("groupsName", groupsName);
    data.append("articledescription", articledescription)

    for(var obj of data){
      console.log(obj,"requestData");
    }

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/addarticles`,//http://192.168.1.40:8900/admin
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "Application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        // console.log(response, "response12");
        history.push("./Articles");
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const resetForm = () => {
    setContent("");
    setAuthorImage("");
    setAuthorname("");
    setAuthorDescription("");
    settitle("");
    setSubject("");
    setselectedOptionone("");
  };
  //----get tags API--//

  useEffect(() => {
    getnewtag();
    getnewgroup();
  }, []);

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

  const config = {
    readonly: false,
    height: 400,
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
        // console.log(response.data.data, "response123");
        let optionsgroup = [];
        response.data.data.forEach((grup, index) => {
          optionsgroup.push({ label: grup.groups, value: grup._id });
        });

        setoptionsgroup(optionsgroup);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handlechangegroupmulti = (event) => {
    let array = [];
    let arrayLabel = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    event.forEach((option)=>{
      arrayLabel.push(option.label);
    })
    setselectedOptiongroup(array);
    setSelectedOptionGroupLabel(arrayLabel);
  };



  //--------Function to handle and set Author Image--------//

  const handleAuthorImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      // console.log(file,"file")
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
    return (<img style={{ width: "110px", height: "140px" }} src={image} key={image} />)
  }


  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Articles</h4>

              <div className="branchData">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-2">
                        <label className="form-label">Author Image</label>
                        <ul className="imagesUpload">
                          <li style={{ width: "100%", height: "148px" }}>
                            <input type="file" onChange={handleAuthorImage} />
                            {authorImage.length === 0 ? <img
                              style={{ width: "100%", height: "148px" }}
                              src="../../images/defalutimg.svg"
                            /> : renderImages(authorImage)}
                            {/* {renderImages(authorImage)} */}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-10">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Author Name</label>
                          <input
                            value={authorname}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setAuthorname(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">
                            Author Description
                          </label>
                          <textarea
                            type="textarea"
                            value={authordescription}
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
                            {articleImage.length === 0 ? <img
                              style={{ width: "100%", height: "128px" }}
                              src="../../images/defalutimg.svg" /> : renderImages(articleImage)}
                            {/* {renderImages(articleImage)} */}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-10">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Article Title</label>
                          <input
                            value={title}
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              settitle(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">Article Subject</label>
                          <input
                            value={subject}
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
                          Article Brief Description
                        </label>
                        <textarea type="textarea"
                          //value={articledescription}
                          className="form-control"
                          onChange={(e) => {
                            setArticledescription(e.target.value);
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
                              Article  Description
                            </label>
                            <div className="App">
                              <JoditEditor
                                ref={editor}
                                value={singleService.article}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => { singleService.article = newContent; return setContent(newContent); }} // preferred to use only this option to update the content for performance reasons
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
                        <label className="form-label"> Select Tags </label>
                        <Select
                          isMulti
                          options={options}
                          onChange={(e) => handlechangetag(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Select Group</label>
                        <Select
                          isMulti
                          options={optionsgroup}
                          onChange={(e) => handlechangegroupmulti(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <button type="button" class="btn CancelBtn me-3" onClick={() => { history.push("./Articles") }}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn submitBtn me-3"
                      onClick={AddArticles}
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

export default AddArticles;