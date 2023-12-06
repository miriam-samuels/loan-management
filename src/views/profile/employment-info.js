import React from 'react'
import { Input, SelectField } from 'components/Input'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { useUploadImageMutation } from 'redux/media'
import { useUpdateProfileMutation } from 'redux/user'
import Loader from 'components/loader'
import { toast } from 'react-toastify'
import { uploadFile } from 'utils/uploader'
import { truncateString } from 'utils/string-formatter'
import { occupations } from './constants'

import './index.scss'
import { formatNumber } from 'utils/number-formatter'
import { removeCommas } from 'utils/number-formatter'
function EmploymentInfo({ save, user, setUser }) {
   const [upload, { isLoading: isUploading }] = useUploadImageMutation()
   const [submit, { isLoading: isSubmitting }] = useUpdateProfileMutation()

   const handleInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const hanldeAmoutFormatting = (e) => {
      setUser({ ...user, [e.target.name]: formatNumber(e.target.value) })
   }

   const handleSave = async (e) => {
      e.preventDefault()
      let payload = user

      if (typeof (payload.deck) !== 'string') {
         const deck = await uploadFile(payload.deck, upload)
         payload = { ...payload, deck }
      }
      payload = { ...payload, income: removeCommas(payload.income), job_term: +payload.job_term }
      setUser(payload)
      const res = await submit(payload)

      if (res.data) {
         toast.success(res.data.message)
         save(3)
      } else toast.error(res.error.message)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               <Card>
                  <CardHeader>
                     <CardTitle tag="h4">Employment Details</CardTitle>
                  </CardHeader>
                  <CardBody>
                     <form onSubmit={handleSave}>
                        <div className='input-grp'>
                           <SelectField
                              className="basic-single"
                              classNamePrefix="select"
                              label="Occupation"
                              isSearchable={true}
                              name="job"
                              options={occupations}
                              defaultValue={{ label: user?.job, value: user?.job }}
                              onChange={(selected) => setUser({ ...user, job: selected.value })}
                           />
                           <Input label="Employment Period (years)" type="number" value={user.job_term} name="job_term" onChange={handleInputChange} required />
                        </div>
                        <div className='input-grp'>
                           <Input label="Annual Income (NGN)" type="text" name="income" value={user.income} onChange={hanldeAmoutFormatting} required />
                           <div>
                              <Input label="Business Deck (If Entreprenuer)" type="file" name="deck" accept=".pdf" onChange={(e) => setUser({ ...user, deck: e.target.files[0] })} required={Boolean(user.job === 'entreprenuer' && typeof (user.deck) !== 'string')} />
                              <p>{typeof (user.deck) === 'string' && truncateString(user?.deck, 40)}</p>
                           </div>
                        </div>
                        <div className='text-right mt-4'>
                           <Button color='secondary' onClick={() => save(1)}>Go Back</Button>
                           <Button color='primary' type='submit'>{isSubmitting || isUploading ? <Loader size={40} /> : "Save and Continue"}</Button>
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