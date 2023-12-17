import React, { Fragment, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Button } from 'reactstrap'
import { SelectField } from 'components/Input'
import { Input } from 'components/Input'
import './index.scss'
import { useApplyMutation } from 'redux/loan'
import Loader from 'components/loader'
import { toast } from 'react-toastify'
import { yesno } from 'views/profile/constants'
import { assets } from 'views/profile/constants'
import { useUploadImageMutation } from 'redux/media'
import { uploadFile } from 'utils/uploader'
import { formatNumber } from 'utils/number-formatter'
import { useGetProfileQuery } from 'redux/user'
import { Link } from 'react-router-dom'
import { removeCommas } from 'utils/number-formatter'


function LoanApplication() {
   const [loan, setLoan] = useState()
   const { data: user, isLoading: gettingUser } = useGetProfileQuery()
   const [upload, { isLoading: isUploading }] = useUploadImageMutation()
   const [apply, { isLoading }] = useApplyMutation()

   const handleInputChange = (e) => {
      setLoan({ ...loan, [e.target.name]: e.target.value })
   }
   const hanldeAmoutFormatting = (e) => {
      setLoan({ ...loan, [e.target.name]: formatNumber(e.target.value) })
   }

   const handleSave = async (e) => {
      e.preventDefault()
      let payload = loan

      if (typeof (payload.collateral_docs) !== 'string') {
         const collateral_docs = await uploadFile(payload.collateral_docs, upload)
         payload = { ...payload, collateral_docs, amount: +removeCommas(payload.amount) }
      }
      setLoan(payload)
      const res = await apply(payload)
      if (res.data) {
         setLoan(null)
         toast.success(res.data.message)
      } else toast.error(res.error.message)
   }
   return (
      <div className='content'>
         <Row>
            <Col lg="12" md="12">
               {
                  gettingUser ? <Loader /> :
                     <Fragment>
                        {
                           user.data.user.progress >= 80 ?
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
                                          <Input label="Loan Amount" type="text" name="amount" value={loan?.amount} onChange={hanldeAmoutFormatting} required />
                                       </div>
                                       <div className='input-grp'>
                                          <Input label="Why do you need a loan?" type="text" name="purpose" onChange={handleInputChange} required />
                                       </div>
                                       <hr />
                                       <div className='input-grp'>
                                          <SelectField
                                             classNamePrefix="select"
                                             label="Is there available Collateral for a secured loan?"
                                             name="has_collateral"
                                             options={yesno}
                                             onChange={(selected) => setLoan({ ...loan, has_collateral: selected.value })}
                                          />
                                          <SelectField
                                             classNamePrefix="select"
                                             label="Collateral Type"
                                             isSearchable={true}
                                             name="collateral"
                                             options={assets}
                                             onChange={(selected) => setLoan({ ...loan, collateral: selected.value })}
                                             required={loan?.has_collateral}
                                          />
                                       </div>

                                       <div className='input-grp'>
                                          <Input label="please provide collateral documents in a pdf, if applicable?" type="file" name="collateral_docs" accept=".pdf" onChange={(e) => setLoan({ ...loan, collateral_docs: e.target.files[0] })} required={loan?.has_collateral} />
                                       </div>

                                       <div className='text-right mt-4'>
                                          <Button type="submit" color='primary' >{isLoading || isUploading ? <Loader size={40} /> : 'Save and Continue'}</Button>
                                       </div>
                                    </form>

                                 </CardBody>
                              </Card> :
                              <div className='text-center mt-xl'>
                                 <h1>Please complete your profile to apply for a loan</h1>
                                 <h2>Your Current Progress is {user.data.user.progress}</h2>
                                 <Link to="/borrower/user-profile">
                                    <Button type="submit" color='primary'>Go to Profile</Button>
                                 </Link>
                              </div>
                        }

                     </Fragment>
               }

            </Col>
         </Row>
      </div>
   )
}

export default LoanApplication
