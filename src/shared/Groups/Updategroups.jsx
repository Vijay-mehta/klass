import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { get } from "react-hook-form";
import JoditEditor from "jodit-react";

const Updategroup = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const [description, setDescription] = useState("");

  console.log(props, "000");
  const [grupName, setGroups] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedOptionTagLabel, setSelectedOptionTagLabel] = useState([]);
  const [groupImage, setGroupImage] = useState("");
  const [sendGroupImage, setSendGroupImage] = useState("");
  // const [groupDescription, setGroupDescription] = useState("");
  // ----priority state---//
  const [priority, setPriority] = useState("");
  const [group, setGroup] = useState([]); // THIS STATE IS USED FOR "GROUP" PARAMETER FOR SECTION API
  const [groupsName, setGroupsName] = useState([]) // THIS STATE IS USED FOR "GROUPSNAME" PARAMETER FOR SECTION API 

  useEffect(() => {
    getnewtag();
  }, []);

  let editGroupsData = props.updatedData;
  console.log(props.updatedData,"editGroupData")
  var config = {
    readonly: false,
    height: 400,
  };
  function updateGroupData() {

    if (selectedOptionTagLabel.length === 0) {
      props.updatedData.tags.map((item) => {
        groupsName.push(item.tags);
      })
    } else {
      selectedOptionTagLabel.map(item => {
        groupsName.push(item);
      }
      )
      // console.log(group, "group")
    }

    if (selectedTags.length === 0) {
      props.updatedData.tags.map((item) => {
        group.push(item._id);
      });
    } else {
      selectedTags.map((item) => {
        group.push(item);
      });
      console.log(group, "group");
    }




    var data = new FormData();
    data.append("group", group);
    data.append("groupsName", groupsName);
    data.append("groupsId", props.updatedData?._id);
    data.append("priority", priority? priority : props.updatedData?.priority? props.updatedData.priority : 0);
    data.append(
      "groupDescription",
      content === "" ? props.updatedData?.groupDescription : content
    );
    data.append(
      "image",
      sendGroupImage == "" ? props.updatedData?.image : sendGroupImage
    );
    data.append(
      "groups",
      grupName === "" ? props.updatedData?.groups : grupName
    );
    data.append(
      "tags",
      selectedOptionTagLabel.toString() === "" || null
        ? props.updatedData?.tags?.map((item) => {
              return item;
            })
            : selectedOptionTagLabel
    );

    console.log(selectedTags.toString(), "ts");
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/updategroups`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(data, "");
    axios(config)
      .then(function (response) {
        props.getGroups();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //--------GET TAGS API----------//

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
        response.data.tagData.map((tag, index) => {
          options.push({ value: index, label: tag.tags });
        });
        console.log(options, "options666");
        setOptions(options);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleTagChange(event) {
    console.log(event, "event");
    var array = [];
    let arrayLabel=[];
    event.map((item) => {
      array.push(item.value);
    });
    event.forEach((option)=>{
      arrayLabel.push(option.label);
    })
    setSelectedTags(array);
    setSelectedOptionTagLabel(arrayLabel);
  }

  //----------------FUNCTION TO SET IMAGES THAT ARE TO BE SENT----------------------//

  const handleGroupImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      console.log(file, "file");
      let display = URL.createObjectURL(file);
      setGroupImage(display);
      setSendGroupImage(event.target.files[0]);
    }
  };

  //----------------FUNCTION TO RENDER IMAGES----------------------//

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
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  function selectPriorityValue(event) {
    console.log(event, "event");
    setPriority(event.value);
  }
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Edit Group
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Edit Group </label>
            <div className="position-relative">
              <input
                type="text"
                defaultValue={editGroupsData?.groups}
                key={editGroupsData?.groups}
                className="form-control"
                onChange={(e) => {
                  setGroups(e.target.value);
                }}
              />
              {console.log(props, "props.updatedData?.groups")}
              <div className="hint_box" style={{ display: "block" }}></div>
            </div>
          </div>
        </div>

        <div className="col-md-12 mb-3">
          <label className="form-label">Group Image</label>

          <ul className="imagesUpload">
            <li style={{ width: "100%", height: "128px" }}>
              <input type="file" onChange={handleGroupImage} />
              {!groupImage ? (
                <img
                  style={{ width: "100%", height: "128px" }}
                  src={props.updatedData?.image}
                />
              ) : (
                renderImages(groupImage)
              )}
              {/* {renderImages(articleImage)} */}
            </li>
          </ul>
        </div>

        <div className="col-md-12">
          <label className="form-label">Group Description</label>
          <div className="App">
            <JoditEditor
              ref={editor}
              value={editGroupsData?.groupDescription}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            />
          </div>
        </div>

        <div className="col-md-12 mb-3">
          <label className="form-label">Select Tags</label>
          <Select
            isMulti
            defaultValue={editGroupsData?.tags?.map((item, index) => {
              return { value: index, label: item };
            })}
            key={editGroupsData?.tags?.map((item,index) => {
              return index;
            })}
            options={options}
            onChange={handleTagChange}
          />
        </div>
        <div className="col-md-12 mb-3">
          <label className="form-label">Select Priority</label>
          <Select
            options={optionspriority}
            name="Priority"
            onChange={(event) => selectPriorityValue(event)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger CancelBtn"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={updateGroupData}
          className="btn submitBtn"
          data-bs-dismiss="modal"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Updategroup;
