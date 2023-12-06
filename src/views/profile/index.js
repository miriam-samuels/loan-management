import React, { useState, useEffect, Fragment } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col,
  Progress,
} from "reactstrap";
import UserInfo from "./user-info";
import EmploymentInfo from "./employment-info";
import CriminalInfo from "./criminal-info";
import KinInfo from "./kin-info";
import GuarantorInfo from "./guarantor-info";
import IdentificationInfo from "./identification";
import Loader from "components/loader";
import { toast } from "react-toastify";
import { useLazyGetProfileQuery } from "redux/user";
import { truncateString } from "utils/string-formatter";

function UserProfile() {
  const [getProfile, { data: profile, isLoading: loadingProfile }] = useLazyGetProfileQuery()

  const [user, setUser] = useState({})
  const [step, setStep] = useState(1)

  useEffect(() => {
    (async function () {
      const res = await getProfile()
      if (res.data) {
        console.log(res.data);
        setUser(res.data?.data?.user)
        toast.success(res.data.message)
      } else toast.error(res.error.message)
    })()
  }, [])

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8" className="user-form">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <div>
                  <Progress
                    className="my-2"
                    value={user.progress > step * 16 ? user.progress : step * 16} // to make 100 when at step 7
                    max={96}
                    color='info'
                    style={{ height: '20px', backgroundColor: 'white' }}
                  >
                    Progress
                  </Progress>
                </div>
                {
                  loadingProfile ? <Loader size={30} /> :
                    <div className='mt-4'>
                      {step === 1 && <UserInfo save={(s) => setStep(s)} user={user} setUser={setUser} />}
                      {step === 2 && <EmploymentInfo save={(s) => setStep(s)} user={user} setUser={setUser} />}
                      {step === 3 && <CriminalInfo save={(s) => setStep(s)} user={user} setUser={setUser} />}
                      {step === 4 && <KinInfo save={(s) => setStep(s)} user={user} setUser={setUser} />}
                      {step === 5 && <GuarantorInfo save={(s) => setStep(s)} user={user} setUser={setUser} />}
                      {step === 6 && <IdentificationInfo save={(s) => setStep(s)} user={user} setUser={setUser} />}
                    </div>
                }

              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              {
                (!loadingProfile && user) && (
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
                        {Object.entries(user).map(([key, value]) => (
                          <Fragment>
                            {
                              (typeof value !== 'object' && key !== "passport" && key !== "firstname" && key !== "lastname" && key !== "id" && key !== "signature" && key !== "deck" && key !== "identification") &&
                              <li key={key}>
                                <strong>{key.replace("_", " ")}:</strong> {truncateString(value, 14, true)}
                              </li>
                            }
                          </Fragment>

                        ))}
                      </ul>
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
                      <h4>Kin</h4>
                      <div>
                        {user?.kin &&
                          user?.kin.map((kin, index) => (
                            <div key={index}>
                              <h5>Kin {index + 1}</h5>
                              <ul>
                                {Object.entries(kin).map(([key, value]) => (
                                  <li key={key}>
                                    <strong>{key}:</strong> {truncateString(value, 14, true)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                      </div>
                      <h4>Guarantor</h4>
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
                                        <strong>{key}:</strong> {truncateString(value, 14, true)}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              }

                            </Fragment>
                          ))}
                      </div>
                    </div>
                  </CardBody>
                )
              }

              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default UserProfile;
