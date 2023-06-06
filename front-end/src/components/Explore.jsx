import React, { useEffect, useState } from 'react'
import '../css/Explore.css'
import DisplayExploreResult from './DisplayExploreResult';

const Explore = (props) => {

    const { provider, web3, contract } = props.myWeb3Api;
    const account = props.account;

    const [province, setProvince] = useState({
        province: "", district: "", city: "", surveyNo: ""
    })

    const [landDetail, setLandDetail] = useState({
        owner: "", propertyId: "", index: "", marketValue: "", sqft: ""
    })

    const [didIRequested, setDidIRequested] = useState(false);
    const [available, setAvailable] = useState(false);
    const [noResult, setNoResult] = useState(0);
    const [isOwner, setIsOwner] = useState(false);

    const onChangeFunc = (event) => {
        const { name, value } = event.target;
        setProvince({ ...province, [name]: value })
    }

    const handleOnClick = async () => {
        const landDetails = await contract.getLandDetails(province.province, province.district, province.city, province.surveyNo, {
            from: account
        })

        const isAvaliable = await contract.isAvailable(province.province, province.district, province.city, province.surveyNo, {
            from: account
        })

        const owner = landDetails[0];
        const propertyId = landDetails[1].words[0]
        const index = landDetails[2].words[0]
        const marketValue = landDetails[3].words[0]
        const sqft = landDetails[4].words[0]
        const surveyNo = province.surveyNo

        if (account === owner) {
            setIsOwner(true)
        }
        else {
            setIsOwner(false);
            if (isAvaliable) {
                const _didIRequested = await contract.didIRequested(province.province, province.district, province.city, province.surveyNo, {
                    from: account
                })

                setDidIRequested(_didIRequested);
            }
        }

        setLandDetail({ owner, propertyId, index, marketValue, sqft, surveyNo })
        setAvailable(isAvaliable);
        setNoResult(1);
    }

    const requestForBuy = async () => {
        await contract.RequestForBuy(province.province, province.district, province.city, province.surveyNo, {
            from: account
        })

        setDidIRequested(true);
    }


    useEffect(() => {
        console.log(landDetail)
    }, [landDetail])


    return (
        <div className='container explore-maindiv'>
            <div className='row'>
                <div className='col-12 col-sm-6'>
                    <form method='POST' className='admin-form'>
                        <div className='form-group'>
                            <label>Province</label>
                            <select class="form-control" name="province" placeholder="Enter Province"
                                autoComplete="off" value={province.province} onChange={onChangeFunc}>
                                <option value="">Select Province</option>
                                <option value="Koshi">Koshi</option>
                                <option value="Madhesh">Madhesh</option>
                                <option value="Bagmati">Bagmati</option>
                                <option value="Gandaki">Gandaki</option>
                                <option value="Karnali">Karnali</option>
                                <option value="Lumbini">Lumbini</option>
                                <option value="Sudurpaschim">Sudurpaschim</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>District</label>
                            <input type="text" className="form-control" name="district" placeholder="Enter district"
                                autoComplete="off" value={province.district} onChange={onChangeFunc} />
                        </div>
                    </form>
                </div>
                <div className='col-12 col-sm-6'>
                    <form method='POST' className='admin-form'>
                        <div className='form-group'>
                            <label>City</label>
                            <input type="text" className="form-control" name="city" placeholder="Enter city"
                                autoComplete="off" value={province.city} onChange={onChangeFunc} />
                        </div>
                        <div className='form-group'>
                            <label>Survey number</label>
                            <input type="text" className="form-control" name="surveyNo" placeholder="Enter survey number"
                                autoComplete="off" value={province.surveyNo} onChange={onChangeFunc} />
                        </div>
                    </form>
                </div>
            </div>
            <button className='admin-form-btn' onClick={handleOnClick}>Explore</button>

            <DisplayExploreResult

                owner={landDetail.owner}
                propertyId={landDetail.propertyId}
                surveyNo={landDetail.surveyNo}
                marketValue={landDetail.marketValue}
                sqft={landDetail.sqft}
                available={available}
                isAdmin={props.isAdmin}
                didIRequested={didIRequested}
                requestForBuy={requestForBuy}
                noResult={noResult}
                isOwner={isOwner}

            />

        </div>
    )
}

export default Explore