import Loader from 'components/loader';
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import {
   Card,
   CardBody,
   CardText,
   Row,
   Col,
} from "reactstrap";
import { truncateString } from 'utils/string-formatter'
import { useGetBorrowerQuery } from 'redux/borrower';
function Borrower() {
   const { id } = useParams()
   const { data, isLoading } = useGetBorrowerQuery(id)

   let user = data?.data?.user
   return (
      <div className="content">
         {
            isLoading && <Loader size={60} />
         }
         {
            (!isLoading && user && data) && (
               <div>
                  <Row>
                     <Col md="6">
                        <Card className="card-user">

                           <CardBody className="user-details">
                              <CardText />
                              <div className="user-header">
                                 <div className="author">
                                    <div className="block block-one" />
                                    <div className="block block-two" />
                                    <div className="block block-three" />
                                    <div className="block block-four" />
                                    <div>
                                       <img
                                          alt="..."
                                          className="avatar"
                                          src={user?.passport}
                                       />
                                       <h5 className="title">{user?.firstname} {user?.lastname} </h5>
                                    </div>
                                    <p className="description">{user?.job}</p>
                                 </div>
                              </div>

                              <div className="card-description">
                                 <ul>
                                    {Object?.entries(user)?.map(([key, value]) => (
                                       <Fragment key={key}>
                                          {
                                             (typeof value !== 'object' && key !== "passport" && key !== "firstname" && key !== "lastname" && key !== "id" && key !== "signature" && key !== "deck" && key !== "identification") &&
                                             <li key={key}>
                                                <strong>{key.replace("_", " ")}:</strong> {truncateString(value, 20, true)}
                                             </li>
                                          }
                                       </Fragment>

                                    ))}
                                 </ul>

                              </div>
                           </CardBody>

                        </Card>

                        <Card className="card-user p-3">
                           <div className='card-description'>
                              <div className="user-uploads">
                                 <div>
                                    <img
                                       alt="..."
                                       className="avatar"
                                       src={user?.signature}
                                    />
                                    <h5 className="title">Signature</h5>
                                 </div>
                                 <div>
                                    <img
                                       alt="..."
                                       className="avatar"
                                       src={user?.identification}
                                    />
                                    <h5 className="title">User Identification</h5>
                                 </div>
                              </div>
                           </div>
                        </Card>

                     </Col>
                     <Col md="6">
                        <Card className='card-user'>
                           <div className="card-description p-3">
                              <div>
                                 {user?.guarantor &&
                                    user?.guarantor.map((guarantor, index) => (
                                       <Fragment key={index}>
                                          {
                                             guarantor?.firstname &&
                                             <>
                                                <h5>Guarantor {index + 1}</h5>
                                                <ul>
                                                   {Object.entries(guarantor).map(([key, value]) => (
                                                      <li key={key}>
                                                         <strong>{key}:</strong> {truncateString(value, 20, true)}
                                                      </li>
                                                   ))}
                                                </ul>
                                             </>
                                          }

                                       </Fragment>
                                    ))}
                              </div>
                           </div>
                        </Card>
                        <Card className='card-user'>
                           <div className="card-description p-3">
                              <div>
                                 {user?.kin &&
                                    user?.kin.map((kin, index) => (
                                       <div key={index}>
                                          <h5>Kin {index + 1}</h5>
                                          <ul>
                                             {Object.entries(kin).map(([key, value]) => (
                                                <li key={key}>
                                                   <strong>{key}:</strong> {truncateString(value, 20, true)}
                                                </li>
                                             ))}
                                          </ul>
                                       </div>
                                    ))}
                              </div>
                           </div>
                        </Card>
                     </Col>
                  </Row>
               </div>
            )
         }
      </div>
   )
}

export default Borrower