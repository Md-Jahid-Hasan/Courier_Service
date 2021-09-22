import React, {useState, useEffect} from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
} from 'reactstrap';


const PaginationComponent = () => {

    const [parcelData, setParcelData] = useState({
        SenderName:"", SenderNumber:"", BookedFrom:"", RecieverName:"", RecieverNumber:"",
        SendTo:"", ProductType:"", TotalCost:0, PaidAmount:0, PayableAmount: 0,
    })
    const [branch, setBranch] = useState([])

    useEffect(() => {
        const getBranchName = async() => {
            const res = await fetch('http://localhost:4000/branchApi/getBranch', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }) 

            const temp = await res.json()
            setBranch(temp)
        }
        getBranchName()
    }, [])

    useEffect(() => {
      let amount = parcelData.TotalCost - parcelData.PaidAmount
        console.log(amount)
        setParcelData({...parcelData, PayableAmount:amount})
    },[parcelData.TotalCost, parcelData.PaidAmount])

    const changeParcelData = (event) => {
        let name = event.target.name
        setParcelData({...parcelData, [event.target.name]:event.target.value})
    }
    
    const handleCreateParcel = (event) => {
        event.preventDefault()
        console.log(parcelData)
    }

    return (
        <div class="container">
        <form onSubmit={(e)=>handleCreateParcel(e)}>
          <div class="form-group row updatefrom">
            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">SenderName:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control form-control-sm" name="SenderName" id="colFormLabelSm" placeholder="SenderName" 
              value={parcelData.SenderName} onChange={(e) => changeParcelData(e)}/>
            </div>
          </div>
          <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">SenderNumber:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" name="SenderNumber" id="colFormLabelSm" placeholder="SenderNumber"
                    value={parcelData.SenderNumber} onChange={(e) => changeParcelData(e)}/>
              </div>
            </div>
            <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">BookedFrom:</label>
              <div class="col-sm-10">
                   <select className="form-control form-control-sm" id="sel1" name="BookedFrom" defaultValue={'DEFAULT'}
                   onChange={(e) => changeParcelData(e)}>
                    <option value="DEFAULT" disabled hidden>
                        Enter Your Branch
                    </option>
                    {branch.map((x, key) => 
                        <option key={key} value={x._id}>{x.branch}</option>
                    )}
                    
                    </select>
                 </div>
            </div>
            <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ReceiverName:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" name="RecieverName" id="colFormLabelSm" placeholder="SenderName"
                value={parcelData.RecieverName} onChange={(e) => changeParcelData(e)}/>
              </div>
            </div>
            <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ReceiverNumber:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" name="RecieverNumber" id="colFormLabelSm" placeholder="SenderNumber"
                value={parcelData.RecieverNumber} onChange={(e) => changeParcelData(e)}/>
              </div>
            </div>
  
  
            <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">SendedTo:</label>
              <div class="col-sm-10">
              <select className="form-control form-control-sm" id="sel1" name="SendTo" defaultValue={'DEFAULT'}
              onChange={(e) => changeParcelData(e)}>
                <option value="DEFAULT" disabled hidden>
                    Enter Your Branch
                </option>
                {branch.map((x, key) => 
                    <option key={key} value={x._id}>{x.branch}</option>
                )}
                
                </select>
                </div>
            </div>
            <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ProductType:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" name="ProductType" id="colFormLabelSm" placeholder="ProductType"
                value={parcelData.ProductType} onChange={(e) => changeParcelData(e)}/>
              </div>
            </div>
          
            <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">TotalCost:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" name="TotalCost" id="colFormLabelSm" placeholder="TotalCost"
                value={parcelData.TotalCost} onChange={(e) => changeParcelData(e)}/>
              </div>
            </div>
            <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">PaidAmount:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" name="PaidAmount" id="colFormLabelSm" placeholder="PaidAmount"
                value={parcelData.PaidAmount} onChange={(e) => changeParcelData(e)}/>
              </div>
            </div>
          
            <div class="form-group row updatefrom">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">PayableAmount:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" name="PayableAmount" id="colFormLabelSm" placeholder="PayableAmount"
                value={parcelData.PayableAmount}/>
              </div>
            </div>
            <div class="form-group row updatefrom frombtn">
              <button type="button my-2" class="btn btn-outline-secondary">Back</button>
              <button type="submit" class="btn btn-outline-success">Update</button>
            </div>
        
        </form>
          </div>
        
    );
}

export default PaginationComponent;
