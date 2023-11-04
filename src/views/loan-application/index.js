import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Button } from 'reactstrap'
import { SelectField } from 'components/Input'
import { Input } from 'components/Input'
import './index.scss'
import { useApplyMutation } from 'redux/loan'
import Loader from 'components/loader'
import { toast } from 'react-toastify'


function LoanApplication() {
   const [loan, setLoan] = useState()

   const [apply, { isLoading }] = useApplyMutation()

   const handleInputChange = (e) => {
      setLoan({ ...loan, [e.target.name]: e.target.value })
   }

   const handleSave = async (e) => {
      e.preventDefault()
      const res = await apply(loan)
      if (res.data) {
         setLoan(null)
         toast.success(res.data.message)
      } else toast.error(res.error.message)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Loan Information</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <form onSubmit={handleSave}>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Loan Term"
                              isSearchable={true}
                              name="term"
                              options={[
                                 { label: 'Short Term (0 years to 5 years)', value: 'short' },
                                 { label: 'Medium Term (5 years to 10 years)', value: 'medium' },
                                 { label: 'Long Term (10 years and above)', value: 'long' },
                              ]}
                              onChange={(s) => setLoan({ ...loan, term: s.value })}
                              required
                           />
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Loan Type"
                              isSearchable={true}
                              name="type"
                              options={[
                                 { label: 'Personal', value: 'personal' },
                                 { label: 'Business', value: 'business' },
                              ]}
                              onChange={(s) => setLoan({ ...loan, type: s.value })}
                              required

                           />
                        </div>
                        <div className='input-grp'>
                           <Input label="Loan Amount" type="text" name="amount" value={loan?.amount} onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <Input label="Why do you need a loan?" type="text" name="purpose" onChange={handleInputChange} required />
                        </div>

                        <div className='text-right mt-4'>
                           <Button type="submit" color='primary' >{isLoading ? <Loader size={40} /> : 'Save and Continue'}</Button>
                        </div>
                     </form>

                  </CardBody>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default LoanApplication
