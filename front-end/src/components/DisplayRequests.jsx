import React from 'react';

const DisplayRequests = (props) => {
    return (
        <>
            <div className="explore-result">
                <h4><b>Property ID: {props.propertyId}</b></h4>
                <p><b>Requested by:</b> {props.requester}</p>
                <p><b>Survey Number:</b> {props.surveyNo}</p>
                <p><b>Province:</b>
                    <select name="province" value={props.province} onChange={(e) => props.setProvince(e.target.value)}>
                        <option value="Koshi">Koshi</option>
                        <option value="Madhesh">Madhesh</option>
                        <option value="Bagmati">Bagmati</option>
                        <option value="Gandaki">Gandaki</option>
                        <option value="Karnali">Karnali</option>
                        <option value="Lumbini">Lumbini</option>
                        <option value="Sudurpaschim">Sudurpaschim</option>
                    </select>
                </p>
                <p><b>District:</b> {props.district}</p>
                <p><b>City:</b> {props.city}</p>
                <button className="accept-req" onClick={() => props.acceptReq(props.index, props.reqNo)}><b>Accept Request</b></button>
            </div>
        </>
    );
};

export default DisplayRequests;
