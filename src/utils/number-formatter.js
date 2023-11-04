export function addCommas(number) {
   // Convert the number to a string
   let numberStr = number.toString();

   // Use a regular expression to add commas
   numberStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

   return numberStr;
}