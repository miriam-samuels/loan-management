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
import { truncateString } from 'utils/string-formatter';
function LoanHistory() {
   const [status, setStatus] = useState('')

   const navigate = useNavigate()
   const { data: loans, isLoading } = useGetLoansQuery(status)

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
                              <th>Status</th>
                              <th className="text-center">Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              (!isLoading && loans) && loans?.data?.loans?.map((loan, idx) => (
                                 <tr key={loan.id}>
                                    <td>{idx + 1}</td>
                                    <td>{loan.loanId}</td>
                                    <td>{loan.type}</td>
                                    <td>{loan.term}</td>
                                    <td>{addCommas(loan.amount)}</td>
                                    <td>{truncateString(loan.purpose, 20, true)}</td>
                                    <td>{loan.status}</td>
                                    <td className="text-center">
                                       <Button
                                          color="secondary"
                                          id={`tooltip${idx}`}
                                          title=""
                                          type="button"
                                          onClick={() => navigate(loan.id)}
                                       >
                                          <i className="tim-icons icon-pencil" />
                                       </Button>
                                       <UncontrolledTooltip
                                          delay={0}
                                          target={`tooltip${idx}`}
                                          placement="right"
                                       >
                                          Open Application
                                       </UncontrolledTooltip>
                                    </td>
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