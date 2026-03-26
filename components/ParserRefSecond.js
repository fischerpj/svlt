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

export class ParserRef {
  constructor(lang) {
    this.parser = new bcv_parser(lang);
  }

  parse(input) {
    // --- PRE-PROCESSING HOOK ---
    const normalized = this._preprocess(input);

    // --- DELEGATE TO ORIGINAL PARSER ---
    const result = this.parser.parse(normalized);

    // --- POST-PROCESSING HOOK ---
    return this.postprocess(result);
  }

  _preprocess(text) {
    // override or extend
    // just convert hsub ! tp osis whitespace
//    const arr = Array.isArray(input) ? input : [input];
//    const hsub =  arr.join(";").replaceAll('!',' ');
    const hsub = text.replaceAll('!',' ');
    return hsub;
  }

  postprocess(result) {
    // override or extend
    return result;
  }
  
    // NEW Method for this yields hsub formatting
  hsub_entities() {
  // PARSING: OSIS + TRANS
  const osis_translations = this.parser.osis_and_translations();

  // REFACTOR input
  const output_hsub = osis_translations
    .map(([osis, translation]) => `${osis}!${translation}`)

  return output_hsub 
  }

  // --- OPTIONAL: expose selected API methods ---
  Xosis() {
    return this.parser.osis();
  }

  xosis_and_translations() {
//    return this.parser.osis_and_translations();
    return "ello";
  }
  
  osis_and_indices() {
    return this.parser.osis_and_indices();
  }

  parsed_entities() {
    return this.parser.parsed_entities();
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
const bcv = new ParserRef(lang);              // uses French by default
console.log(bcv.parse(myref).osis());      // example call
console.log(bcv.Xosis());      // example call
console.log(bcv.parse(myref).osis_and_translations());      // example call

//console.log(bcv.parse(myref).hsub_entities());      // example call

