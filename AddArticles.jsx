import React, { useState, useMemo, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import Select from "react-select";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "ag-grid-community/dist/styles/ag-grid.css";
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
  const [authorImage, setAuthorImage] = useState([]);
  const [sendAuthorImage, setSendAuthorImage] = useState("")
  const [sendArticleImage, setSendArticleImage] = useState("")
  const [authorname, setAuthorname] = useState("");
  const [authordescription, setAuthorDescription] = useState("");
  const [articleImage, setArticleImage] = useState([]);
  const [articleImages, setArticleImages] = useState([]);
  const [title, settitle] = useState("");
  const [subject, setSubject] = useState("");
  const [articledescription, setArticledescription] = useState("");
  // const [displayImages, setDisplayImages] = useState([])
  const [rowData, setRowData] = useState({});
  const [serviceList, setServiceList] = useState([
    { image: "", article: "" },
  ]);
  //const [displayImage, setDisplayImage] = useState([{img:""}])

  let history = useHistory();

  const [options, setoptions] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);

  console.log(selectedOptionone, "selectedOptionone");

  function AddArticles(e) {

    let description=[];
  //   for(let a of serviceList){
  //     console.log(a,"ssl");
  //   description.push(a.article);
  // }

  description = serviceList.map((desc)=>{return desc.article});
  //console.log(articleData,"arrayssl")

    e.preventDefault();
    var data = new FormData();

    console.log(description,"displayArticleImages")
    let array=[]
    for (let i=0 ; i<articleImages.length; i+=2){
      console.log("asdasdd",articleImages[i])
      array.push(articleImages[i]);
    }
    console.log("arrayimages",array);
    for(let i =0 ; i<array.length; i++){
      console.log("array12123123",array);
      data.append("images",array[i])
    }

    data.append("authorName", authorname);
    data.append("authordescription", authordescription);
    data.append("title", title);
    data.append("authorimage", sendAuthorImage);
    data.append("banner",sendArticleImage);
    data.append("subject", subject);
    data.append("description", description.join(",././,./"));
    data.append("tags", selectedOptionone.join(","));
    // data.append("groupId", "622706c6ce53cf5adfd6afa7");
    
    // data.append("image",JSON.stringify(image));
    // data.append("authorimage", authorimage);
    //data.append("articleimage", image);
    // data.append("tags", tags);
    console.log(serviceList,"serviceList====>>>>")
    
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/addarticles`,//http://192.168.1.3:8900/admin
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "response12");
        getarticles();
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
    // seteventLocation("");
  };
  //----get tags API--//

  useEffect(() => {
    getnewtag();
    getarticles();
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
        console.log(response, "responsetags6565");
        let tagData = [];
        response.data.tagData.forEach((tag, index) => {
          console.log("=======", tag);
          options.push({ value: tag._id, label: tag.tags });
        });
        console.log(tagData, "tagData");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handlechangetag = (event) => {
    console.log(event, "handlechangetag6666");
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });

    setselectedOptionone(array);

    console.log(array, "array");
  };

  // ---- Get article API ---//

  function getarticles() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getarticles`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        setRowData(response.data.articleData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const config = {
    readonly: false,
    height: 400,
  };

  //--------This function has not been used--------//

  const handleUpdate = (event) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
  };

  //--------Function to handle and set Author Image--------//

  const handleAuthorImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      console.log(file,"file")
      let display = URL.createObjectURL(file);
      setAuthorImage((image) => image.concat(display));
      setSendAuthorImage(event.target.files[0]);
    }
  };

  //--------Function to handle and set Article Banner Image--------//

  const handleArticleImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      let display = URL.createObjectURL(file);
      setArticleImage((image) => image.concat(display));
      setSendArticleImage(event.target.files[0]);

    }
  };

  //--------Function to handle and set Article Images--------//

  const handleArticleImages = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      let display = URL.createObjectURL(file);
      setArticleImages((images) => [...images, display] );

    
    }
  };

  //--------Function to render images--------//

  const renderImages=(images)=>{
    return images?.map((single_image)=>{
      return (<img style={{ width:"110px", height:"140px" }}  src={single_image} key={single_image} />) 
    })
    
  }

  //---------Function to Add Jodit Editor and image---------//  
  
  const handleServiceAdd = () => {
    setServiceList([...serviceList, { image: [] , article: ""}]);
    setContent([...content,{info:""}])
    //setDisplayImage([...displayImage, {img:""}])
  };

  //---------Function to Remove Jodit Editor and image---------//  


  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };


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
                            {authorImage.length===0?<img
                              style={{ width: "100%", height: "148px" }}
                              src="../../images/defalutimg.svg"
                            />:renderImages(authorImage)}
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
                            {articleImage.length===0?<img
                              style={{ width: "100%", height: "128px" }}
                              src="../../images/defalutimg.svg"/> : renderImages(articleImage)}
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
                        <textarea  type="textarea"
                            value={articledescription}
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
                          <div className="col-md-2 mb-3">
                            <label className="form-label">Article Image</label>
                            <ul className="imagesUpload">
                              <li style={{ width: "100%", height: "148px" }}>
                                <input
                                  type="file"
                                  onChange={(event)=>{
                                  setArticleImages([...articleImages, event.target.files[0]])
                                  singleService.image = event.target.files[0];
                                  return handleArticleImages(event);
                                }}
                                  // value={singleService.service}
                                />
                                  <img
                                  style={{ width: "100%", height: "148px" }}
                                  src="../../images/defalutimg.svg"/>
                               </li>
                            </ul>
                          </div>
                          <div className="col-md-10 text-end">
                            {serviceList.length - 1 === index &&
                              serviceList.length < 40 && (
                                <button
                                  type="button"
                                  onClick={handleServiceAdd}
                                  className="btn btn-success addAction mt-3"
                                >
                                  <span>+</span>
                                </button>
                              )}

                              <div className="second-division">
                            {serviceList.length !== 1 && (
                              <button
                                type="button"
                                onClick={() => handleServiceRemove(index)}
                                className="btn btn-danger addAction mt-3"
                              >
                                <span>-</span>
                              </button>
                            )}
                            </div>
                          </div>

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
                                onBlur={(newContent) =>{ singleService.article=newContent ;return setContent(newContent);}} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="col-md-12">
                        <div className="row bgBox mb-3">
                          <div className="col-md-2 mb-3">
                            <label className="form-label">Article Image</label>
                            <ul className="imagesUpload">
                              <li style={{ width: "100%", height: "148px" }}>
                                <input
                                  type="file"
                                  onChange={handleArticleImage}
                                />
                                <img
                                  style={{ width: "100%", height: "148px" }}
                                  src="../../images/defalutimg.svg"
                                />
                                {renderImages(authorImage)}
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-10 text-end">
                            {serviceList.length !== 1 && (
                              <button
                                type="button"
                                onClick={() => handleServiceRemove(index)}
                                className="btn btn-danger addAction mt-3"
                              >
                                <span>-</span>
                              </button>
                            )}
                          </div>

                          <div className="col-md-12">
                            <label className="form-label">
                              Article Description
                            </label>
                            <div className="App">
                              <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  ))}
                  <div className="col-md-12">
                    <div className="row bgBox mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Tags</label>
                        <Select
                          isMulti
                          options={options}
                          onChange={(e) => handlechangetag(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <button type="button" class="btn CancelBtn me-3">
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
