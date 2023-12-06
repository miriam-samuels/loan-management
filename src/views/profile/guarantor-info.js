import React, { useState, useEffect } from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import './index.scss'
import { toast } from 'react-toastify'
import { useUpdateProfileMutation } from 'redux/user'
import { useUploadImageMutation } from 'redux/media'
import Loader from 'components/loader'
import { formatNumber } from 'utils/number-formatter'
import { uploadFile } from 'utils/uploader'
import { truncateString } from 'utils/string-formatter'
function GuarantorInfo({ save, user, setUser }) {
   const [submit, { isLoading: isSubmitting }] = useUpdateProfileMutation()
   const [upload, { isLoading: isUploading }] = useUploadImageMutation()
   const [guarantors, setGuarantors] = useState()

   useEffect(() => {
      if (user?.guarantor?.length && user?.guarantor?.length > 0) {
         if (user?.guarantor?.length < 2) {
            setGuarantors([...user.guarantor, {}])
         } else {
            setGuarantors(user.guarantor)
         }
      } else {
         setGuarantors([{}, {}])
      }
   }, [])

   const handleInputChange = (e, idx) => {
      let newData = [...guarantors]
      if (e.target.type === "file") {
         newData[idx] = { ...newData[idx], [e.target.name]: e.target.files[0] };
      } else {
         newData[idx] = { ...newData[idx], [e.target.name]: e.target.value };
      }
      setGuarantors(newData)
   }

   const hanldeAmoutFormatting = (e, idx) => {
      let newData = [...guarantors]
      newData[idx] = { ...newData[idx], [e.target.name]: formatNumber(e.target.value) };
      setGuarantors(newData)
   }

   const handleSave = async (e) => {
      e.preventDefault()
      let payload = { ...user, guarantor: [...guarantors] }
      for (let i = 0; i < guarantors.length; i++) {
         if (payload.guarantor[i]?.signature && typeof (payload.guarantor[i]?.signature) !== 'string') {
            const signature = await uploadFile(payload.guarantor[i]?.signature, upload)
            payload.guarantor[i].signature = signature
         }
      }
      setUser(payload)

      const res = await submit(payload)
      if (res.data) {
         toast.success(res.data.message)
         save(6)
      } else toast.error(res.error.message)
   }

   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Guarantor Information</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <form>
                        {
                           guarantors && guarantors?.map((guarantor, idx) => (
                              <div key={idx}>
                                 <div className='input-grp'>
                                    <Input label="First Name" type="text" name="firstname" value={guarantor.firstname} onChange={(e) => handleInputChange(e, idx)} required />
                                    <Input label="Last Name" type="text" name="lastname" value={guarantor.lastname} onChange={(e) => handleInputChange(e, idx)} required />
                                 </div>
                                 <div className='input-grp'>
                                    <Input label="Email" type="email" name="email" value={guarantor.email} onChange={(e) => handleInputChange(e, idx)} required />
                                    <Input label="Phone Number" type="tel" name="phone" value={guarantor.phone} onChange={(e) => handleInputChange(e, idx)} required />
                                 </div>
                                 <div className='input-grp'>
                                    <Input label="Annual Income (NGN)" type="text" name="income" value={guarantor?.income} onChange={(e) => hanldeAmoutFormatting(e, idx)} required />
                                    <Input label="Residential Address" type="text" name="address" value={guarantor.address} onChange={(e) => handleInputChange(e, idx)} required />
                                 </div>
                                 <div className='input-grp'>
                                    <Input label="National Identity Number" type="text" name="nin" value={guarantor.nin} maxLength={11} onChange={(e) => handleInputChange(e, idx)} required />
                                    <div>
                                       <Input label="Upload Guarantor Signature" type="file" name="signature" accept=".png, .jpg" onChange={(e) => handleInputChange(e, idx)} required />
                                       <p>{typeof (guarantor.signature) === 'string' && truncateString(guarantor?.signature, 40)}</p>
                                    </div>
                                 </div>
                                 <hr />
                                 {idx === 0 && <h4>Guarantor 2</h4>}
                              </div>
                           ))}
                        <div className='text-right mt-4'>
                           <Button color='secondary' onClick={() => save(4)}>Go Back</Button>
                           <Button color='primary' onClick={handleSave}>{isSubmitting || isUploading ? <Loader size={40} /> : "Save and Continue"}</Button>
                        </div>
                     </form>

                  </CardBody>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default GuarantorInfo