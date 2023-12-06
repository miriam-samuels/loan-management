import React, { useState, useEffect } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import './index.scss'
import { relationships } from './constants'
import { toast } from 'react-toastify'
import { useUpdateProfileMutation } from 'redux/user'
import Loader from 'components/loader'
function KinInfo({ save, user, setUser }) {
   const [submit, { isLoading: isSubmitting }] = useUpdateProfileMutation()
   const [kins, setKins] = useState()

   useEffect(() => {
      if (user?.kin?.length && user?.kin?.length > 0) {
         if (user?.kin?.length < 2) {
            setKins([...user.kin, {}])
         } else {
            setKins(user.kin)
         }
      } else {
         setKins([{}, {}])
      }
   }, [])

   const handleInputChange = (e, idx) => {
      const newData = [...kins]
      newData[idx] = { ...newData[idx], [e.target.name]: e.target.value }
      setKins(newData)
   }

   const handleSave = async (e) => {
      e.preventDefault()
      let payload = { ...user, kin: kins }
      setUser(payload)

      const res = await submit(payload)
      if (res.data) {
         toast.success(res.data.message)
         save(5)
      } else toast.error(res.error.message)
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
                        {
                           kins && kins?.map((kin, idx) => (
                              <div key={idx}>
                                 <div className='input-grp'>
                                    <Input label="First Name" type="text" name="firstname" value={kin.firstname} onChange={(e) => handleInputChange(e, idx)} required={Boolean(idx === 0)} />
                                    <Input label="Last Name" type="text" name="lastname" value={kin.lastname} onChange={(e) => handleInputChange(e, idx)} required={Boolean(idx === 0)} />
                                 </div>
                                 <div className='input-grp'>
                                    <Input label="Email" type="email" name="email" value={kin.email} onChange={(e) => handleInputChange(e, idx)} required={Boolean(idx === 0)} />
                                    <Input label="Phone Number" type="tel" name="phone" value={kin.phone} onChange={(e) => handleInputChange(e, idx)} required={Boolean(idx === 0)} />
                                 </div>
                                 <div className='input-grp'>
                                    <SelectField
                                       className="basic-single"
                                       classNamePrefix="select"
                                       label="Relationship"
                                       name="relationship"
                                       options={relationships}
                                       required={Boolean(idx === 0)}
                                       defaultValue={{ label: kin.relationship, value: kin.relationship }}
                                       onChange={(selected) => {
                                          const newData = kins
                                          newData[idx] = { ...newData[idx], relationship: selected.value }
                                          setKins(newData)
                                       }}
                                    />
                                    <Input label="Residential Address" type="text" name="address" value={kin.address} onChange={(e) => handleInputChange(e, idx)} required={Boolean(idx === 0)} />
                                 </div>
                                 <hr />
                                 {idx === 0 && <h4>Alternate Next OF kin</h4>}
                              </div>
                           ))
                        }



                        <div className='text-right mt-4'>
                           <Button color='secondary' onClick={() => save(3)}>Go Back</Button>
                           <Button color='primary' onClick={handleSave}>{isSubmitting ? <Loader size={30} /> : "Save and Continue"}</Button>
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