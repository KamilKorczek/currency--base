export const convertPLNToUSD = (PLN) => {

  //switch (typeof(PLN)) {
  //  case 'string':
  //    return NaN
  //  case 'undefined':
  //    return NaN
  //  default:
  //  break;
  //}

  if (typeof(PLN) === 'string' || typeof(PLN) === 'undefined') {
    return NaN;
  } else if (typeof(PLN) !== 'string' && typeof(PLN) !== 'number') {
    return "Error"
  } else if (PLN <= 0) {
    PLN = 0.00;
  }

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}