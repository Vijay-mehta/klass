import React, { useState } from "react";
import axios from "axios";
import "./categories.css";

const Updatecategories = (props) => {
  const [category, setCategory] = useState('');

  function updateData() {
    var data = new FormData();
    data.append('categoryId', props.updatedData?._id);
    data.append('category', category === "" ? props.updatedData?.category : category);

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/updateCategory`,
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        props.onEditDataFunction();
        console.log('You clicked submit.');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (<>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Category Group
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
              <label className="form-label"> Category Group </label>
              <div className="position-relative">
                <input
                  type="text"
                  defaultValue={props.updatedData?.category}
                  className="form-control"
                  onChange={(e) => {
                    setCategory(e.target.value.replace(/[^A-Za-z ]/ig, ''))
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger CancelBtn" data-bs-dismiss="modal"
          >Cancel</button>
          <button
            type="submit"
            onClick={updateData}
            className="btn submitBtn" data-bs-dismiss="modal"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </>)
}

export default Updatecategories;