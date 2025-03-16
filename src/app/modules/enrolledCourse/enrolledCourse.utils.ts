export const gpLgGenerator = (finalMarks: number, totalMarks: number) => {
  let result = { GP: 0, LG: '' };

  if (totalMarks <= 39 || finalMarks < 20) {
    result = {
      GP: 0,
      LG: 'F',
    };
  } else if (totalMarks >= 40 && totalMarks < 49) {
    result = {
      GP: 2.00,
      LG: 'D',
    };
  } else if (totalMarks >= 50 && totalMarks < 59) {
    result = {
      GP: 2.50,
      LG: 'C',
    };
  } else if (totalMarks >= 60 && totalMarks < 69) {
    result = {
      GP: 3.00,
      LG: 'B',
    };
  } else if (totalMarks >= 70 && totalMarks < 79) {
    result = {
      GP: 3.50,
      LG: 'A',
    };
  } else if (totalMarks >= 80 && totalMarks <= 100) {
    result = {
      GP: 4.00,
      LG: 'A+',
    };
  }
  return result;
};
