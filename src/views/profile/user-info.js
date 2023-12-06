import React from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { useUploadImageMutation } from 'redux/media'
import { useUpdateProfileMutation } from 'redux/user'
import Loader from 'components/loader'
import { toast } from 'react-toastify'
import { uploadFile } from 'utils/uploader'
import './index.scss'
import { truncateString } from 'utils/string-formatter'
import { gender } from './constants'

function UserInfo({ save, user, setUser }) {
   const [upload, { isLoading: isUploading }] = useUploadImageMutation()
   const [submit, { isLoading: isSubmitting }] = useUpdateProfileMutation()

   const handleInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleSave = async (e) => {
      e.preventDefault()
      let payload = user

      if (typeof (payload.passport) !== 'string') {
         const passport = await uploadFile(payload.passport, upload)
         payload = { ...payload, passport }
      }

      if (typeof (payload.signature) !== 'string') {
         const signature = await uploadFile(payload.signature, upload)
         payload = { ...payload, signature }
      }

      const res = await submit(payload)

      if (res.data) {
         toast.success(res.data.message)
         save(2)
      } else toast.error(res.error.message)
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
                     <form onSubmit={handleSave}>
                        <div className='input-grp'>
                           <Input label="First Name" type="text" name="firstname" value={user?.firstname} onChange={handleInputChange} required readOnly />
                           <Input label="Last Name" type="text" name="lastname" value={user?.lastname} onChange={handleInputChange} required readOnly />
                        </div>
                        <div className='input-grp'>
                           <Input label="Email" type="email" name="email" value={user?.email} onChange={handleInputChange} required readOnly />
                           <Input label="Phone Number" type="tel" name="phone" value={user?.phone} onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <Input label="Date of Birth" type="date" name="birth_date" value={user?.birth_date} onChange={handleInputChange} required />
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Gender"
                              name="gender"
                              defaultValue={{ label: user.gender, value: user.gender }}
                              options={gender}
                              onChange={(selected) => setUser({ ...user, gender: selected.value })}
                           />
                        </div>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Nationality"
                              name="nationality"
                              defaultValue={{ label: user?.nationality, value: user?.nationality }}
                              options={[
                                 { label: "Nigerian", value: "Nigerian" },
                              ]}
                              onChange={(selected) => setUser({ ...user, nationality: selected.value })}
                           />
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="State of Origin"
                              name="state_origin"
                              defaultValue={{ label: user?.state_origin, value: user?.state_origin }}
                              options={[
                                 { label: "Lagos", value: "Lagos" },
                                 { label: "Akure", value: "Akure" }
                              ]}
                              onChange={(selected) => setUser({ ...user, state_origin: selected.value })}
                           />
                        </div>
                        <div className='input-grp'>
                           <Input label="Residential Address" type="text" name="address" value={user?.address} onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <div>
                              <Input label="Passport Photograph" type="file" name="passport" accept=".png, .jpg" onChange={(e) => setUser({ ...user, passport: e.target.files[0] })} required />
                              <p>{typeof (user.passport) === 'string' && truncateString(user?.passport, 40)}</p>
                           </div>
                           <div>
                              <Input label="Upload Signature" type="file" name="signature" accept=".png, .jpg" onChange={(e) => setUser({ ...user, signature: e.target.files[0] })} required />
                              <p>{typeof (user.signature) === 'string' && truncateString(user?.signature, 40)}</p>
                           </div>
                        </div>
                        <div className='text-right mt-4'>
                           <Button color='primary' type='submit' onClick={handleSave}>{isSubmitting || isUploading ? <Loader size={40} /> : "Save and Continue"}</Button>
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