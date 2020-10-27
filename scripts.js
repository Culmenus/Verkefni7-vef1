/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;
let invalid;

/**
 * Byrja forrit.
 */
function start() {
  let input = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');
  let assertion = input.trim().toLocaleUpperCase();
  if(assertion === "KÓÐA" || assertion === "AFKÓÐA"){
    var shift = inputShift();
    var strInput = giveString(assertion, shift);
    var out;
    if(assertion === "KÓÐA"){
      out = encode(strInput, shift);
      result(out);
    }
    else{
      out = decode(strInput, shift);
      result(out);
    }
  }
  else{
    alert(`Veit ekki hvaða aðgerð „${input}“ er. Reyndu aftur.`);
    tryAgain();
  }
}

/**
 * Biður notenda um að skilgreina hliðrun via promt.
 * @param void
 * @return shift, sem er hliðrun sesarkóðunarinnar.
 */
function inputShift(){
  let shift = prompt('Hversu mikið á að hliðra streng?');
  if(!Number.isInteger(+shift)){
    alert(`${shift} er ekki heiltala`);
    tryAgain();
  }
  return shift;
}

/**
 * Prompt sem biður um streng til að kóða/dulkóða
 * @param {string} action , fyrir prompt. kóðun eða afkóðun
 * @param {int} n , fyrir prompt, hliðrun um n sæti.
 * @return void
 */
function giveString(action, n){
  var dumpAction = action;
  var dumpN = n;
  let input = prompt(`Gefðu upp strenginn sem á að ${action.toLocaleLowerCase()} með hliðrun ${n}:`);
  if(input === ""){
    alert('Þú gafst ekki upp streng. Reyndu aftur.');
    tryAgain();
  }
  if(validString(input)){
    return input.trim();
  }
  else{
    invalidString(dumpAction,dumpN);
  }
}
/**
 * Athugar hvort allt í stren inn sé í LETTERS (nema bil þ.e " ").
 * @param {string} inn
 * @return {boolean} out
 */
function validString(inn){
  var test = inn.trim();
  test = test.toLocaleUpperCase();
  var out = true;
  for(var i = 0; i < test.length; i++){
    var temp = test.charAt(i)
    if(LETTERS.indexOf(temp) === -1 && temp !== " "){
      invalid = temp;
      out = false;
      break;
    }
  }
  return out;
}

/**
 * Eitthvað fór úrskeiðis. Alert bendir á global breytu invalid sem er fyrsti
 * stafurinn sem forritið ræður ekki við. Fannst óþarfi að finna alla og gefa fylki.
 * @param {string} action , fyrir alert. kóðun eða afkóðun
 * @return void
 */
function invalidString(action){
  alert(`Þú gafst upp stafi sem ekki er hægt að ${action}: ${invalid}. Reyndu aftur.`);
  invalid = "";
  tryAgain();
}
/**
 * Sýnir notenda niðurstöðu kóðunarinnar eða afkóðunar.
 * Býður upp á að byrja aftur.
 * @param {string} theResult, niðurstaða kóðunarinnar eða afkóðunar.
 * @return void
 */
function result(theResult){
  alert(`Nidurstadan er: \n${theResult}`);
  let tryAgain = confirm("Aftur?");
    if(tryAgain){
      start();
    }
    else{
      alert("I guess I'm done. Reload page to try again.");
    }
}

/**
 * Eitthvað er að. Biður notenda hvort hann vilji birja aftur.
 * @param void
 * @return void
 */
function tryAgain(){
  let tryAgain = confirm("Aftur?");
    if(tryAgain){
      start();
    }
    else{
      alert("I guess I'm dead. Reload page.");
    }
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  str = str.toLocaleUpperCase();
  var hlidrun = n % 32;
  var lettersArray = LETTERS.split('');
  var out = "";
  for(var i = 0; i < str.length; i++){
    var tempChar = str.charAt(i);
    var aplhaIndex = lettersArray.indexOf(tempChar);
    if (aplhaIndex === -1)
      continue;
    var encIndex = (aplhaIndex+hlidrun) % 32;
    if(encIndex < 0){
      encIndex = encIndex + 32;
    }
    out = out.concat(lettersArray[encIndex]);
  }
  return out;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  str = str.toLocaleUpperCase();
  var hlidrun = n % 32;
  var lettersArray = LETTERS.split('');
  var out = "";
  for(var i = 0; i < str.length; i++){
    var tempChar = str.charAt(i)
    var aplhaIndex = lettersArray.indexOf(tempChar);
    if (aplhaIndex === -1){
      continue;
    }
    var decIndex = (aplhaIndex-hlidrun) % 32;
    if(decIndex < 0){
      decIndex = decIndex + 32;
    }
    out = out.concat(lettersArray[decIndex]);
  }
  return out;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
