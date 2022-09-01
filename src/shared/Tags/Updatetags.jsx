import React, { useState } from "react";
import axios from "axios";
import "./tags";

const Updatetags = (props) => {
  const [tags, setTags] = useState('');

  function updateDatatags() {
    var data = JSON.stringify({
      "tagId": props.updatedData?._id,
      "tags": tags === '' ? props.updatedData?.tags : tags,
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASEURL}/updatetag`,
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
          //  window.location.reload(false);
           props.onEditDataFunction();

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (<>
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Edit Tag
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
          <label className="form-label">Edit Tag </label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={props.updatedData?.tags}
              className="form-control"
              onChange={(e) => { setTags(e.target.value) }}
            />
            <div
              className="hint_box"
              style={{ display: "block" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-danger CancelBtn" data-bs-dismiss="modal"
      >Cancel</button>
      <button
        type="submit"
        onClick={updateDatatags}
        className="btn submitBtn"
        data-bs-dismiss="modal"
      >
        Submit
      </button>
    </div>
  </>)
}




export default Updatetags;