import React, { useState } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import './index.scss'
function UserInfo({ save }) {
   const [user, setUser] = useState()

   const handleInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleSave = (e) => {
      e.preventDefault()
      save(1)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">User Information</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <form>
                        <div className='input-grp'>
                           <Input label="First Name" type="text" name="firstname" onChange={handleInputChange} required />
                           <Input label="Last Name" type="text" name="lastname" onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <Input label="Email" type="email" name="email" onChange={handleInputChange} required />
                           <Input label="Phone Number" type="tel" name="phone" onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <Input label="Date of Birth" type="date" name="email" onChange={handleInputChange} required />
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Gender"
                              name="color"
                              options={[
                                 { label: "male", value: "male" },
                                 { label: "female", value: "female" }
                              ]}
                           />
                        </div>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Nationality"
                              name="color"
                              options={[
                                 { label: "Nigerian", value: "Nigerian" },
                              ]}
                           />
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="State of Origin"
                              name="color"
                              options={[
                                 { label: "Lagos", value: "Lagos" },
                                 { label: "Akure", value: "Akure" }
                              ]}
                           />
                        </div>
                        <div className='input-grp'>
                           <Input label="Residential Address" type="text" name="address" onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <Input label="Passport Photograph" type="file" name="passport" accept=".png, .jpg" onChange={handleInputChange} required />
                           <Input label="Upload Signature" type="file" name="signature" accept=".png, .jpg" onChange={handleInputChange} required />
                        </div>
                        <div className='text-right mt-4'>
                           <Button color='primary' onClick={handleSave}>Save and Continue</Button>
                        </div>
                     </form>

                  </CardBody>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default UserInfo