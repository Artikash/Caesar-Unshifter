function best(string) {
  return Array(26)
    .fill(1)
    .map((unused, shiftBy) => {
      return confidence(string, shiftBy) + "," + shiftBy;
    })
    .sort((a, b) => {
      return parseInt(b, 10) - parseInt(a, 10);
    });
}

function confidence(string, shiftBy) {
  var shiftedString = shiftString(string.toLowerCase(), shiftBy);
  var cleanedString = shiftedString.replace(/\.|\,/, "");
  return cleanedString
    .split(" ")
    .map(word => {
      return isWord(word) ? 5 : -10;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);
}

function shiftString(string, shiftBy) {
  return string.replace(/[a-z]/g, c => {
    return String.fromCharCode(122 >= (c = c.charCodeAt(0) + shiftBy) ? c : c - 26);
  });
}

function isWord(word) {
  return words[word];
}
