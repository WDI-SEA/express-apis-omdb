// 1. Write a function called isPalindrome that accepts a string and returns true
//   if the string is a palindrome. A palindrome is a string that is spelled the 
//   same way backwards and forwards.

//   isPalindrome("") // returns true;
//   isPalindrome("a") // returns true;
//   isPalindrome("ada") // returns true;
//   isPalindrome("tacocat") // returns true;
//   isPalindrome("racecar") // returns true;
//   isPalindrome("lions oil") // returns true;
//   isPalindrome("not the same backwards and forwards") // returns false;

// 2. Write a method called removeLetter that accepts a string, and a string representing
//    a character to be removed from the string. The function should return a new string
//    with all the occurences of the letter removed from the original string.

//    removeLetter("tomorrow", "o") // returns "tmrrw"
//    



function palindrome(str) {
  var len = str.length;
  for ( var i = 0; i < Math.floor(len/2); i++ ) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}



var lett= '';
var text = ['remove'];


for (var i = 0; i < text.length; i++) {
  if (text.indexOf(letter) === -1) {
    return false;
  }
}
return true;
}

function removeLetter(text, letter) {
  var result = "";
    for (var i = 0; i < text.length; i++) {
      if (text[i] !== letter) {
        result += text[i];
      }
    }
    return result;
}
    