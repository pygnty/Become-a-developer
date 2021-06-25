const fs = require('fs');

const readFile = (file) => {
  const fileContent = fs.readFileSync(file, 'utf-8'); 
  return fileContent;
}

const getUserNames = (data) => {
  let x;
  let set = new Set();
  for(let i = 0; i < data.length; i++) {
    x = data.indexOf('user: ', i);
    if(x === -1) break;
    i = data.indexOf(',', x);
    set.add(data.slice(x+6, i));
  }

  return set;
}

const compareFiles = (file1, file2) => {
  const file1Content = readFile(file1);
  const file2Content = readFile(file2);
  const userNames1 = [...getUserNames(file1Content)];
  const userNames2 = [...getUserNames(file2Content)];
  let resultStr = "";
  for(let i = 0; i < userNames1.length; i++) {
    if(userNames2.indexOf(userNames1[i]) === -1) {
      resultStr += userNames1[i] + "\n";
    }
  }
  
  return resultStr;
}

console.log(compareFiles('file1', 'file2'));