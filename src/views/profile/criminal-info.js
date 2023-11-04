import React, { useState } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { loanTypes, occupations, offenses, yesno } from './constants'

import './index.scss'
function CriminalInfo({ save }) {
   const [user, setUser] = useState()

   const handleInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }
   const handleSave = (e) => {
      e.preventDefault()
      save(3)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Employment Information</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <form>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Do you have a criminal record"
                              isSearchable={true}
                              name="occupation"
                              options={yesno}
                           />
                           <SelectField
                              classNamePrefix="select"
                              label="If yes, select all applicable offences?"
                              isSearchable={true}
                              isMulti
                              name="occupation"
                              options={offenses}
                           />
                        </div>
                        <div className='input-grp'>
                           <Input label="How many years did you serve" type="number" name="jail_time" onChange={handleInputChange} required />
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

export default CriminalInfo