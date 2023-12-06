import Loader from 'components/loader';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
import { useLazyGetBorrowersQuery } from 'redux/borrower';
import { addCommas } from 'utils/number-formatter';
function Borrowers() {
   const [getBorrowers, { data, isLoading }] = useLazyGetBorrowersQuery()

   const navigate = useNavigate()

   useEffect(() => {
      getBorrowers()
   }, [])

   const brw = data?.data?.user
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Borrowers</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                           <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Gender</th>
                              <th>City</th>
                              <th className="text-center">Salary</th>
                              <th className="text-center">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              (!isLoading && brw) && brw?.map((b) => (
                                 <tr key={b?.id}>
                                    <td>{b?.firstname} {b?.lastname}</td>
                                    <td>{b?.email}</td>
                                    <td>{b?.gender}</td>
                                    <td>{b?.nationality}</td>
                                    <td className="text-center">{addCommas(b?.income)}</td>
                                    <td className="text-center">
                                       <Button
                                          color="secondary"
                                          id={`tooltip${b?.id}`}
                                          title=""
                                          type="button"
                                          onClick={() => navigate(b.id)}
                                       >
                                          <i className="tim-icons icon-pencil" />
                                       </Button>
                                       <UncontrolledTooltip
                                          delay={0}
                                          target={`tooltip${b?.id}`}
                                          placement="right"
                                       >
                                          View
                                       </UncontrolledTooltip>
                                    </td>
                                 </tr>
                              ))
                           }
                           <tr>

                           </tr>
                        </tbody>
                     </Table>
                     {
                        isLoading && <Loader />
                     }
                  </CardBody>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default Borrowers