export const uploadFile = async (file, upload) => {
   // new formdata
   const formData = new FormData();

   // append file
   formData.append("file", file);

   // upload file
   const res = await upload(formData)

   return res?.data?.data?.url
}