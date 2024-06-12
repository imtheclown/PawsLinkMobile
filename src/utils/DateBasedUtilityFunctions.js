const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const getMonth = (monthIndex) => {
    return monthsOfYear[monthIndex]
}

export const formatDate = (date) => {
    date = new Date(date);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
};

export const convertToMDY = (isoString) => {
    const date = new Date(isoString);
  
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() is zero-indexed
    const day = date.getUTCDate().toString().padStart(2, '0');
    const year = date.getUTCFullYear();
  
    return `${month}-${day}-${year}`;
  };
  
  
