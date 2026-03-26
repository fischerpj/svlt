import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
import * as lang from "bible-passage-reference-parser/esm/lang/fr.js";

const hsub_ = (input) => {
  // PARSER fr
  const mybcv = new bcv_parser(lang);
  
  // DATA
  const input_hsub = input;
  const input_osis = input_hsub.replaceAll('!',' '); 

  // PARSING: OSIS + TRANS
  const osis_translations = mybcv.parse(input_osis).osis_and_translations();

  // REFACTOR input
  const output_hsub = osis_translations
    .map(([osis, translation]) => `${osis}!${translation}`)
    .join("; ");
    
  const output_osis = output_hsub.replaceAll('!',' '); 
  
    
  let myresult = {
    input_hsub,
    input_osis,
    osis_translations,
    output_hsub,
    output_osis
  };
  
  return myresult.output_hsub
}

// EXECUTE
// INPUTS
const input_user = "Gen.1.1; Gal3:2!KJV; Rom5:8!SG21; Matt6:33!LSG; John1.1!NGU; Jn2.1!ESV; Cantique1.1!NIV";
console.log(hsub_(input_user));



/**


console.log(JSON.stringify(osis_transaltions));



console.log(result);
*/

/**
mybcv.add_translations({
  translations: [
    { text: "KJV", system: "default"},
    { text: "NIV", system: "default"},
    { text: "ESV", system: "default"},
    { text: "NGU", system: "default"},
    ]
  });
*/

let tokens = [];


/**
  tokens = entities[0].entities.map(e => {
      if (true) {
          console.log(JSON.stringify(e.osis))
      } else {
        return { text: e.value, valid: false };
      }
    });
*/

//console.log(JSON.stringify(parsed))
//console.log(JSON.stringify(entities[0].entities))
//console.log(JSON.stringify(translations));

//console.log(JSON.stringify(mybcv.translations));

// Import French-language versifications
//import * as lsg from "bible-passage-reference-parser/esm/versification/french_lsg.js";
//import * as nbs from "bible-passage-reference-parser/esm/versification/french_nbs.js";
//import * as s21 from "bible-passage-reference-parser/esm/versification/french_s21.js";
//import * as tob from "bible-passage-reference-parser/esm/versification/french_tob.js";

/**
// 1. Create a French-language parser
const bcv = new bcv_parser(lang);

// 2. Register multiple French translations
bcv.add_translation("lsg", LSG);
bcv.add_translation("nbs", nbs);
bcv.add_translation("s21", s21);
bcv.add_translation("tob", tob);

// 3. Activate one of them
bcv.set_translation("lsg");

// 4. Parse French references using the selected versification
console.log(bcv.parse("Jean 3:16").osis());
// → "John.3.16"
*/
