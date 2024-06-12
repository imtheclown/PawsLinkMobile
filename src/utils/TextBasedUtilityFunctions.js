export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const splitByDash = (str) =>{
    return str.split("_").join(" ");
}
export const generate32BitHex = () => {
    const hexChars = '0123456789abcdef';
    let hexId = '';
    for (let i = 0; i < 8; i++) {
      hexId += hexChars[Math.floor(Math.random() * 16)];
    }
    return hexId;
};

