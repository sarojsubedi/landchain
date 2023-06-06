import React from 'react';

const DisplayLandDetails = (props) => {
    return (
        <>
            <div className="explore-result">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <p><b>Owner:</b> {props.owner}</p>
                        <p><b>Survey Number:</b> {props.surveyNo}</p>
                        <p><b>Property ID:</b> {props.propertyId}</p>
                        <p><b>Market Value:</b> {props.marketValue}</p>
                    </div>
                    <div className="col-12 col-md-6">
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
                        <p><b>Size:</b> {props.sqft} sq. ft.</p>
                    </div>
                </div>
                {
                    (props.available) ? (
                        <button className="marked-available"><b>Marked Available</b></button>
                    ) : (
                        <button className="mark-available-btn" onClick={() => props.markAvailable(props.index)}><b>Mark Available</b></button>
                    )
                }
            </div>
        </>
    );
};

export default DisplayLandDetails;
