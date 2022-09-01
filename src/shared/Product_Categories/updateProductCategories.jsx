import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";


const Update_Product_Categories = (props) => {
  console.log(props.updatedData,"propsproduct")
    // ----updatecategory state---//

  const [updatecategoryName, setUpdatecategoryName] = useState("");

  // ----priority state---//
  const [priority, setPriority] = useState("");

  function updateProductCategory() {
    var data = JSON.stringify({
      "productcategoryId": props.updatedData?._id,
      "categoryName": updatecategoryName === '' ? props.updatedData?.categoryName : updatecategoryName,
      // "priority": priority

    });
    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/updateproductCategory`,
      headers: {
        'Authorization': localStorage.getItem('token'),
				"Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        // window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  
  const optionspriority = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

function selectPriorityValue(event) {
    console.log(event, "event");
    setPriority(event.value)

  }

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Edit Product Category
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
            <label className="form-label"> Product Category </label>
            <div className="position-relative">
              <input
                type="text"
                defaultValue={props.updatedData?.categoryName}
                key={props.updatedData?.categoryName}
                className="form-control"
                onChange={(e) => {setUpdatecategoryName(e.target.value)}}
              />
              
            </div>
          </div>

          {/* <div className="col-md-12 mb-3">
                    <label className="form-label">Select Priority</label>
                    <Select
                      // defaultValue={}
                      options={optionspriority}
                      name="Priority"
                       onChange={(event) => selectPriorityValue(event)}
                    />
                  </div> */}
        </div>
      
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger " data-bs-dismiss="modal"
        >Cancel</button>
        <button
          type="submit"
          onClick={updateProductCategory}
          className="btn submitBtn"
          data-bs-dismiss="modal"
        >
          Save
        </button>
      </div>
    </>
  )
}

export default Update_Product_Categories;