import React, { useState } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { loanTypes, occupations } from './constants'

import './index.scss'
function EmploymentInfo({ save }) {
   const [user, setUser] = useState()

   const handleInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleSave = (e) => {
      e.preventDefault()
      save(2)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Criminal History</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <form>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Occupation"
                              isSearchable={true}
                              name="occupation"
                              options={occupations}
                           />
                           <Input label="Employment Period (years)" type="number" name="employment_period" onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <Input label="Annual Income (NGN)" type="number" name="income" onChange={handleInputChange} required />
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Loan Type"
                              isSearchable={true}
                              name="loan_type"
                              options={loanTypes}
                           />
                        </div>
                        <div className='input-grp'>
                           <Input label="Business Deck" type="file" name="passport" accept=".png, .jpg" onChange={handleInputChange} required />
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

export default EmploymentInfo