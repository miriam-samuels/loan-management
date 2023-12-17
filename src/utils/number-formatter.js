export function addCommas(number) {
   let numberStr = ''
   // Convert the number to a string
   if (number) {
      numberStr = number.toString();
   }

   // Use a regular expression to add commas
   numberStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

   return numberStr;
}

export function removeCommas(string) {
   let numberStr = ''
   // Use a regular expression to add commas
   if (string) {
      numberStr = string.toString().replace(/,/g, '');
   }

   return numberStr;
}
export function formatNumber(input) {
   // Remove letters and special characters using regular expression
   const numericString = input.replace(/[^0-9]/g, '');


   // Convert the numeric string to a number
   const number = parseFloat(numericString);

   // Check if the number is valid
   if (isNaN(number)) {
      return '';
   }

   // Format the number with commas
   const formatted = addCommas(number)
   return formatted
}