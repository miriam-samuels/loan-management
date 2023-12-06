export const truncateString = (str, n, divide) => {
   if (divide) {
      if (str?.length > n) {
         const strLength = str?.length
         const cut = n / 2
         const start = str.slice(0, cut)
         const end = str.slice(strLength - cut, strLength)
         return start + "..." + end
      } else {
         return str
      }
   } else {
      return str?.length > n ? str?.slice(0, n - 1) + "..." : str
   }
}