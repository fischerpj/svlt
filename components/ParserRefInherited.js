// ============================================================
//  -------  File: components/ParserRef.js
// (Pure logic — no Svelte imports, no DOM, no side effects)
// NewRef Class and Methods can be imported in quarto ojs
// ============================================================

//------------------------------------------------------------------------------
// CLASS DEFINITON
// ParserRef extends bcv_parser nevertheless sticks to the .parse.osis aan parse.hsub paradigm

import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
import * as lang from "bible-passage-reference-parser/esm/lang/fr.js";

export class ParserRef extends bcv_parser {
  /**
   * @param {object} lang - language configuration module
   * @param {object} options   - optional parser options
   */
  constructor(
        lang, 
        options = {
          punctuation_strategy: "us"
        }
  ) {
    // The base parser expects a language config object and optional options
    super(lang, options);
    this._ref = []
    this._hsub = [];
  }
  
  // OVERRIDE this method
  parse(ref) {
    const hsub = this._preProcess(ref);
    const result = this.parse(hsub);
//    return this._postProcess(result);
    return result;
  }
  
  _preProcess(input) {
    // just convert hsub ! tp osis whitespace
//    const arr = Array.isArray(input) ? input : [input];
//    const hsub =  arr.join(";").replaceAll('!',' ');
    const hsub = input.replaceAll('!',' ');
    return hsub
  }
  
  _postProcess(parsed) {
    return parsed  
  }
  
  // NEW Method for this yields hsub formatting
  hsub_entities() {
  // PARSING: OSIS + TRANS
  const osis_translations = this.osis_and_translations();

  // REFACTOR input
  const output_hsub = osis_translations
    .map(([osis, translation]) => `${osis}!${translation}`)

  return output_hsub 
  }
  
  hsub() {
  // PARSING: OSIS + TRANS
//  const osis_translations = this.osis_and_translations();
  const osis_translations = this.hsub_entities();

  // REFACTOR input
  const output_hsub = osis_translations
//    .map(([osis, translation]) => `${osis}!${translation}`)
    .join("; ");
    
  return output_hsub 
  }

  // OVERRIDE osis
  Xosis() {
    
  // PARSING to hsub format
  const output_hsub = this.hsub();

  // REFACTOR to osis output
  const output_osis = output_hsub.replaceAll('!',' '); 
  return output_osis  
  }


  
    // NEW Method for this yields hsub formatting
  osis_entities() {
  // PARSING: OSIS + TRANS
  const osis_translations = this.osis_and_translations();

  // REFACTOR input
  const output_hsub = osis_translations
    .map(([osis, translation]) => `${osis} ${translation}`)

  return output_hsub 
  }

}

//------------------------------------------------------------------------------
// EXECUTE

// punctuation_strategy = US for whitespace
//.osis
// osis_and_translations();

const myref = "Galates 1:16,2:4 NIV Hos14 LSG; rom5:8!SG21; Psaume 51:2!ESV, Ap 4:1 Rev22:4 KJV";
console.log(myref)     // example call

//const parser = new ParserRef(lang);              // uses French by default
const bcv = new bcv_parser(lang);              // uses French by default
console.log(bcv.parse(myref).osis());      // example call
console.log(bcv.parse(myref).osis_and_translations());      // example call

//inputs
//const myref = [ 'Hos14!SG21,Matt6:33!NIV', 'Neh13!SG21','Rev22:4 KJV' ];
//const myref = "gn1:1;rom5:8!sg21;Galatians 1:16; 2:4";
//console.log(parser.parse(myref).hsub());      // example call

   // example call
//console.log(parser.parse('Jn 3:16-17 Galatians 1:16; 2:4";').osis());      // example call

//console.log(parser.parse(myref).hsub_entities());      // example call
//console.log(parser.parse(myref).hsub());      // example call
//console.log(parser.parse(myref).osis_entities());      // example call
