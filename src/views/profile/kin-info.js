import React, { useState } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import './index.scss'
import { relationships } from './constants'
function KinInfo({ save }) {
   const [user, setUser] = useState()

   const handleInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleSave = (e) => {
      e.preventDefault()
      save(5)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Next Of Kin Information</CardTitle>
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
                        <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Relationship"
                              name="color"
                              options={relationships}
                           />
                           <Input label="Residential Address" type="text" name="address" onChange={handleInputChange} required />
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

export default KinInfo