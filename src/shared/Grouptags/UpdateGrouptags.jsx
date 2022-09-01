import React, { useState,useEffect } from "react";
import axios from "axios";
import Select from "react-select";


const Updategroup = (props) => {
  let editGroupData = props.updatedData;
  console.log(editGroupData, props.updatedData, "editGroupData")


  console.log(props,"updategrouptag")
  const [group, setGroup] = useState("");
  const [options, setoptions] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState([]);


  // --Update tag API--//
  
  function updategroup(e) {
    var data = JSON.stringify({
      'tagGroupId': editGroupData._id,
      'groupName': group === '' || null ? editGroupData.groupName : group,
      'tags':selectedOptionone.toString() === '' || null ? editGroupData?.tags?.map((item) => { return item._id }).toString() : selectedOptionone.toString()
     });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/updateGrouptag`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        props.onEditDataFunction();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getnewtag();
  }, []);

  const handlechangetag = (event) => {
    let array = [];
    event.forEach((value) => {
      array.push(value.value);
    });
    setselectedOptionone(array);

    console.log(array, "array");
  };

  // ---- Get tag API ---//

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
        response.data.tagData.forEach((tag, index) => {
          options.push({ value: tag._id, label: tag.tags });
        });
        console.log(options,"jjj")
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Edit Tag-Group
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
            <label className="form-label">Tag-Group </label>
            <div className="position-relative">
              <input
                type="text"
                defaultValue={props.updatedData?.groupName}
                className="form-control"
                onChange={(e) => {
                  setGroup(e.target.value);
                }}
              />
              <div className="hint_box" style={{ display: "block" }}></div>
            </div>
          </div>

          <div className="col-md-12 mb-3">
                              <label className="form-label">Select Tags</label>

                              <Select
                                isMulti
                                // placeholder={editArticlesData?.tags?.map((item)=>{return item.tags}).toString()}
                                defaultValue={editGroupData?.tags?.map((item) => { return { value: item._id, label: item.tags } })}
                                key={editGroupData?.tags?.map((item) => { return item._id })}
                                options={options}
                                name="tags"
                                onChange={(e) => {
                                    e.persist = () => { }
                                    handlechangetag(e)
                                }}

                            />
                              
                            </div>
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
          onClick={updategroup}
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
