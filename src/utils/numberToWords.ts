function numberToWords(num: number): string {
  const units: string[] = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];

  const tens: string[] = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  const thousands: string[] = ['', 'Thousand', 'Million'];

  if (num === 0) return 'Zero';

  let words: string = '';

  let place: number = 0;

  while (num > 0) {
    let n: number = num % 1000;

    if (n !== 0) {
      let str: string = '';

      if (n % 100 < 20) {
        str = units[n % 100];
        n = Math.floor(n / 100);
      } else {
        str = units[n % 10];
        n = Math.floor(n / 10);
        str = tens[n % 10] + (str ? ' ' + str : '');
        n = Math.floor(n / 10);
      }

      if (n > 0) {
        str = units[n] + ' Hundred' + (str ? ' ' + str : '');
      }

      words = str + ' ' + thousands[place] + ' ' + words;
    }

    num = Math.floor(num / 1000);
    place++;
  }

  return words.trim() + ' Rupees';
}

export default numberToWords;
