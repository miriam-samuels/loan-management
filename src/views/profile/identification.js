import React, { useState } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import './index.scss'
import { banks, relationships } from './constants'
import { useUpdateProfileMutation } from 'redux/user'
import { useUploadImageMutation } from 'redux/media'
import { uploadFile } from 'utils/uploader'
import { toast } from 'react-toastify'
import Loader from 'components/loader'
import { truncateString } from 'utils/string-formatter'
function IdentificationInfo({ save, user, setUser }) {
   const [submit, { isLoading: isSubmitting }] = useUpdateProfileMutation()
   const [upload, { isLoading: isUploading }] = useUploadImageMutation()

   const handleInputChange = (e, idx) => {
      if (e.target.type === "file") {
         setUser({ ...user, [e.target.name]: e.target.files[0] })
      } else {
         setUser({ ...user, [e.target.name]: e.target.value })
      }
   }

   const handleSave = async (e) => {
      e.preventDefault()
      let payload = user

      if (typeof (payload.identification) !== 'string') {
         const identification = await uploadFile(payload.identification, upload)
         payload = { ...payload, identification }
      }
      setUser(payload)
      const res = await submit(payload)

      if (res.data) {
         toast.success(res.data.message)
         save(7)
      } else toast.error(res.error.message)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Borrower Information</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <form onSubmit={handleSave}>
                        <div className='input-grp'>
                           <Input label="National Identity Number" type="text" name="nin" value={user?.nin} maxLength={11} onChange={handleInputChange} required />
                           <div>
                              <Input label="National Passport / Voters Card / Drivers License" type="file" name="identification" accept=".png, .jpg" onChange={handleInputChange} required />
                              <p>{typeof (user?.identification) === 'string' && truncateString(user?.identification, 40)}</p>
                           </div>
                        </div>
                        <div className='input-grp'>
                           <Input label="Bank Verification Number (BVN)" type="text" name="bvn" value={user?.bvn} maxLength={11} onChange={handleInputChange} required />
                           <Input label="Account number" type="text" name="account_number" value={user?.account_number} onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Bank Name"
                              isSearchable={true}
                              name="bank_name"
                              options={banks}
                              defaultValue={user?.bank_name}
                              onChange={(selected) => setUser({ ...user, bank_name: selected.value })}
                           />
                        </div>

                        <div className='text-right mt-4'>
                           <Button color='secondary' onClick={() => save(4)}>Go Back</Button>
                           <Button color='primary'>{isSubmitting || isUploading ? <Loader size={30} /> : "Save"}</Button>
                        </div>
                     </form>

                  </CardBody>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default IdentificationInfo