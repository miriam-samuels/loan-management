/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Progress,
} from "reactstrap";
import UserInfo from "./user-info";
import EmploymentInfo from "./employment-info";
import CriminalInfo from "./criminal-info";
import CollateralInfo from "./collateral-info";
import KinInfo from "./kin-info";
import GuarantorInfo from "./guarantor-info";
import IdentificationInfo from "./identification";

function UserProfile() {
  const [step, setStep] = useState(0.8)
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
                    value={step * 10}
                    max={70}
                    color='info'
                    style={{ height: '20px', backgroundColor: 'white' }}
                  >
                    Progress
                  </Progress>
                </div>
                <div className='mt-4'>
                  {step === 0.8 && <UserInfo save={(s) => setStep(s)} />}
                  {step === 1 && <EmploymentInfo save={(s) => setStep(s)} />}
                  {step === 2 && <CriminalInfo save={(s) => setStep(s)} />}
                  {step === 3 && <CollateralInfo save={(s) => setStep(s)} />}
                  {step === 4 && <KinInfo save={(s) => setStep(s)} />}
                  {step === 5 && <GuarantorInfo save={(s) => setStep(s)} />}
                  {step === 6 && <IdentificationInfo save={(s) => setStep(s)} />}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg")}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div>
              </CardBody>
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
