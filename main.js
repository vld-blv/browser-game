const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

const getRow = (firstRow, secondRow) => {
  let firstA = 0;
  let secondA = 0;

  for (let i = 0, j = 0; i < firstRow.length, j < secondRow.length; i += 1, j +=1) {
    if (firstRow[i] === 'а') firstA += 1;
    if (secondRow[j] === 'а') secondA += 1;
  }

  return firstA > secondA ? firstRow : secondRow;
};

getRow(firstRow, secondRow);


const formattedPhone = (phone) => {
  const code = phone.slice(0, 2);
  const prefix = phone.slice(2, 5);
  const number = `${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10)}`;
  const formattedNumber = `${code} (${prefix}) ${number}`;
  return formattedNumber;
};

formattedPhone('+71234567890');
