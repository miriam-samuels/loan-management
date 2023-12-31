import React, { useState } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { loanTypes, occupations, offenses, yesno } from './constants'

import './index.scss'
import Loader from 'components/loader'
import { useUpdateProfileMutation } from 'redux/user'
import { toast } from 'react-toastify'
function CriminalInfo({ save, user, setUser }) {
   const [submit, { isLoading: isSubmitting }] = useUpdateProfileMutation()


   const handleInputChange = (e) => {
      if (e.target.type === "number") {
         setUser({ ...user, [e.target.name]: +e.target.value })
      } else {
         setUser({ ...user, [e.target.name]: e.target.value })
      }
   }
   const handleSave = async (e) => {
      e.preventDefault()
      let payload = user
      setUser(payload)

      const res = await submit(payload)
      if (res.data) {
         toast.success(res.data.message)
         save(4)
      } else toast.error(res.error.message)
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
                     <form onSubmit={handleSave}>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Do you have a criminal record"
                              name="has_criminal_record"
                              isSearchable={false}
                              options={yesno}
                              defaultValue={user?.has_criminal_record}
                              onChange={(selected) => setUser({ ...user, has_criminal_record: selected.value })}
                              required
                           />
                           <SelectField
                              classNamePrefix="select"
                              label="If yes, select all applicable offences?"
                              isSearchable={true}
                              isMulti
                              name="offenses"
                              options={offenses}
                              defaultValue={user.offenses}
                              onChange={(selected) => {
                                 const items = selected.map((item) => item.value)
                                 setUser({ ...user, offenses: items })
                              }}
                           />
                        </div>
                        <div className='input-grp'>
                           <Input label="How many years did you serve" type="number" name="jail_time" value={user.jail_time} onChange={handleInputChange} required={user.has_criminal_record} />
                        </div>

                        <div className='text-right mt-4'>
                           <Button color='secondary' onClick={() => save(2)}>Go Back</Button>
                           <Button color='primary' type='submit'>{isSubmitting ? <Loader size={30} /> : "Save and Continue"}</Button>
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