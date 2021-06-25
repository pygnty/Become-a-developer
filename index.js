const fs = require('fs');

const readFile = (file) => {
  const fileContent = fs.readFileSync(file, 'utf-8'); 
  return fileContent;
}

const getUserNames = (data) => {
  let x;
  let set = new Set();
  for(let i = 0; i < data.length; i++) {
    x = data.indexOf('user: ', i); // слишком много индексофов. Через чур. Я понимаю, что ты делала без встроенных, но индексоф - уже сама по себе встроенная функция
    if(x === -1) break;
    i = data.indexOf(',', x);
    set.add(data.slice(x+6, i));
  }

  return set;
}

const compareFiles = (file1, file2) => {
  const file1Content = readFile(file1);
  const userNames1 = [...getUserNames(file1Content)];
  delete file1Content; //использовал - удалил.
  const file2Content = readFile(file2);
  const userNames2 = [...getUserNames(file2Content)];
  delete file1Content; // использовал - удалил
  let resultStr = ""; 
  for(let i = 0; i < userNames1.length; i++) {
    if(userNames2.indexOf(userNames1[i]) === -1) { // Оператор indexOf(userNames1[i]) крайне медленный. По фатку, ты сканишь массивы в среднем n*log(m) раз. А это дофига
      resultStr += userNames1[i] + "\n";           // Было бы логичнее оставить результаты в сетах и просто сравнивать if( userNames2[userNames1[i]] )
    }
  }
  
  return resultStr;
}

console.log(compareFiles('file1', 'file2'));
