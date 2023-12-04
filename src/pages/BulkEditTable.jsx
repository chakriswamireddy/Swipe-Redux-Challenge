import React, { useEffect, useState } from 'react'
import { useInvoiceListData } from "../redux/hooks";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateInvoice } from "../redux/invoicesSlice";
import { useDispatch } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

function BulkEditTable() {
  const { getOneInvoice } = useInvoiceListData();
  const location = useLocation();
  const myList = location.state;

  const dispatch = useDispatch(); //hooks
  const navigate = useNavigate();

  const [listofInvoices, setListofInvoices] = useState([])


  const editField = (name, value, invoiceId) => {
    const updatedList = listofInvoices.map((invoice) => {
      if (invoice.id === invoiceId) {

        //calculating taxes

        let subTotal = 0;

        invoice.items.forEach((itemm) => {
          subTotal += parseFloat(itemm.itemPrice).toFixed(2) * parseInt(itemm.itemQuantity);
        })

  
        const taxAmount = parseFloat(subTotal * (invoice.taxRate / 100)).toFixed(2);
        const discountAmount = parseFloat(subTotal * (invoice.discountRate / 100)).toFixed(2);
        const total = (subTotal - parseFloat(discountAmount) + parseFloat(taxAmount)).toFixed(2);

        return {
          ...invoice,
          [name]: value,
          total: total,
          taxAmount: taxAmount,
          discountAmount: discountAmount,
          subTotal: subTotal.toFixed(2)
        };
      }
      return invoice;
    });

    setListofInvoices(updatedList);


  };


  useEffect(() => {
    const updatedInvoices = [];
    myList.forEach((item) => {
      const singleInvoice = getOneInvoice(item);
      updatedInvoices.push(singleInvoice);
    });
    setListofInvoices(updatedInvoices);
  }, []);


  const BulkEditInvoice = () => {   //final successful navigation
    listofInvoices.forEach((item) => {
      dispatch(updateInvoice({ id: item.id, updatedInvoice: item }));
    })
    alert("Invoices updated at Bulk successfuly 🥳");
    navigate('/');
  }



  return (
    <div className='my-0 mx-auto w-100 d-flex align-items-center justify-content-center flex-column'>
            <div className="d-flex align-items-center align-self-start">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer">
          <Link to="/">
            <h5>Go Back</h5>
          </Link>
        </div>
      </div>
      <div className='d-flex gap-3 '>
        <div className=' d-flex flex-column justify-content-evenly mt-10 border border-3 p-2 px-4 rounded '>
          <div>----×----</div>

          <p>Due Date</p>
          <p>Invoice Number</p>
          <p>Bill to</p>
          <p>Bill Email</p>
          <p>Bill Address</p>
          <p>Bill from</p>
          <p>Email From</p>
          <p>From Address</p>
          <p>Note</p>
          <p className="my-2">Currency Type</p>
          <p className="my-2">Tax %</p>
          <p className="my-1">Discount %</p>

        </div>

        {listofInvoices.map((invoice) => (

          <div key={invoice.id} className='d-flex flex-column justify-content-between border border-3 p-2 ' >
              <h4 className='text-center '> Invoice: {invoice.invoiceNumber} </h4>


              
              <Form.Control
              type="date"
              value={invoice.dateOfIssue}
              name="dateOfIssue"
              onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
              style={{ maxWidth: "200px" }}
              className="my-2 text-center"
              required
            /> 
              <Form.Control
                type="number"
                value={invoice.invoiceNumber}
                name="invoiceNumber"
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                min="1"
                style={{ maxWidth: "200px" }}
                className="my-2"
                required
              />
              <Form.Control
                placeholder="Who is this invoice to?"
                rows={3}
                value={invoice.billTo}
                type="text"
                name="billTo"
                className="my-2"
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                autoComplete="name"
                required
              />
              <Form.Control
                placeholder="Email address"
                value={invoice.billToEmail}
                type="email"
                name="billToEmail"
                className="my-2"
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                autoComplete="email"
                required
              />
              <Form.Control
                placeholder="Billing address"
                value={invoice.billToAddress}
                type="text"
                name="billToAddress"
                className="my-2"
                autoComplete="address"
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                required
              />

              <Form.Control
                placeholder="Who is this invoice from?"
                rows={3}
                value={invoice.billFrom}
                type="text"
                name="billFrom"
                className="my-2"
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                autoComplete="name"
                required
              />

              <Form.Control
                placeholder="Email address"
                value={invoice.billFromEmail}
                type="email"
                name="billFromEmail"
                className="my-2"
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                autoComplete="email"
                required
              />

            
              <Form.Control
                placeholder="Billing address"
                value={invoice.billFromAddress}
                type="text"
                name="billFromAddress"
                className="my-2"
                autoComplete="address"
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                required
              />

              <Form.Control
                placeholder="Thanks for your business!"
                name="notes"
                value={invoice.notes}
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                as="textarea"
                className="my-2"
                rows={1}
              />
 
              <Form.Select
                onChange={

                  (e) => editField(e.target.name, e.target.value, invoice.id)
                  
                }
                className="btn btn-light my-2"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Singapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>

              <Form.Control
                name="taxRate"
                type="number"
                value={invoice.taxRate}
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                className="bg-white border my-2"
                placeholder="0.0"
                min="0.00"
                step="0.01"
                max="100.00"
              />

              <Form.Control
                name="discountRate"
                type="number"
                value={invoice.discountRate}
                onChange={(e) => editField(e.target.name, e.target.value, invoice.id)}
                className="bg-white border my-2"
                placeholder="0.0"
                min="0.00"
                step="0.01"
                max="100.00"
              />


          </div>
        ))}

        </div>


      <div>
        <Button variant="primary" type="submit" className="d-block w-100 my-5" onClick={BulkEditInvoice} >
          Bulk Edit
        </Button>
      </div>
    </div>
  )
}

export default BulkEditTable