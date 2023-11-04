import { SelectField } from 'components/Input';
import Loader from 'components/loader';
import React, { useState } from 'react'
import {
   Button,
   ButtonGroup,
   Card,
   CardHeader,
   CardBody,
   CardTitle,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   UncontrolledDropdown,
   Label,
   FormGroup,
   Input,
   Table,
   Row,
   Col,
   UncontrolledTooltip,
} from "reactstrap";
import { useGetLoansQuery } from 'redux/loan';
import { statuses } from './variables';
import { addCommas } from 'utils/number-formatter';
import { useNavigate } from 'react-router-dom';
function LoanHistory() {
   const [status, setStatus] = useState('')

   const navigate = useNavigate()
   const { data: loans, isLoading } = useGetLoansQuery(status)

   const openLoan = () => {
      navigate('')
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Loans</CardTitle>
                     <div className='table-filters'>
                        <SelectField
                           name="status"
                           options={statuses}
                           onChange={(selected) => setStatus(selected.value)}
                           defaultValue={statuses[0]}
                        />
                     </div>
                  </CardHeader>
                  <CardBody>

                     <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                           <tr>
                              <th>S/N</th>
                              <th>Loan Id</th>
                              <th>Type</th>
                              <th>Term</th>
                              <th>Amount(NGN)</th>
                              <th>Purpose</th>
                              <th className="text-right">Status</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              (!isLoading && loans) && loans?.data?.loans?.map((loan, idx) => (
                                 <tr key={loan.id} onClick={openLoan}>
                                    <td>{idx + 1}</td>
                                    <td>{loan.loanId}</td>
                                    <td>{loan.type}</td>
                                    <td>{loan.term}</td>
                                    <td>{addCommas(loan.amount)}</td>
                                    <td>{loan.purpose.slice(0, 20)}...</td>
                                    <td className="text-right">{loan.status}</td>
                                 </tr>
                              ))
                           }


                        </tbody>
                     </Table>
                     {
                        isLoading && <Loader size={60} />
                     }
                  </CardBody>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default LoanHistory