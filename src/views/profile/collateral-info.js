import React, { useState } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { loanTypes, assets, yesno } from './constants'

import './index.scss'
function CollateralInfo({ save }) {
   const [user, setUser] = useState()

   const handleInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleSave = (e) => {
      e.preventDefault()
      save(4)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Collateral Information</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <form>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Is there available Collateral for a secured loan?"
                              isSearchable={true}
                              name="occupation"
                              options={yesno}
                           />
                            <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              isMulti
                              label="Collateral Type"
                              isSearchable={true}
                              name="collateral"
                              options={assets}
                           />
                        </div>
                        
                        <div className='input-grp'>
                           <Input label="please provide collateral documents in a pdf, if applicable?" type="file" name="passport" accept=".png, .jpg" onChange={handleInputChange} required />
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

export default CollateralInfo