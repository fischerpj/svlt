// ============================================================
//  -------  File: components/NewRef.js
// (Pure logic — no Svelte imports, no DOM, no side effects)
// NewRef Class and Methods can be imported in quarto ojs
// ============================================================

import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
import * as fr from "bible-passage-reference-parser/esm/lang/fr.js";

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

class nRef {
    constructor(
      input = [ 'Hos14!SG21', 'Neh13!SG21','Rev22:4!KJV' ],
      edition_default="SG21",
      langModule = fr) {
        
    // PARSER fr stuff
    this.langModule = langModule;
    this._parser = null;   // lazy-loaded parser
          
    this.inputs = Array.isArray(input) ? input : [input];
    this.edition_default = edition_default;
    
    this.hsub = this.inputs;
    this.osis = this.inputs;
    
    this.data = []; 

  }
  
  // METHODS
  
/**  
  // Lazy getter
  get parser() {
    if (!this._parser) {
      this._parser = new this.langModule.bcv_parser();
    }
    return this._parser;
  }
*/

/**
  parse() {
    return this._parser.parse(this.input).osis();
  }
*/

  get as_hsub() {
    return this.hsub;
  }

  get as_osis() {
    return this.osis;
  }
  
  get input() {
    return this.inputs;
  }

}

const myRef1 = new nRef('Gen1!KJV;Act4:12:NGU');
const myRef2 = new nRef();
console.log(myRef1);                 // inspect upon completion
//console.log(myRef2);                 // inspect upon completion


export class NewRef {
  // takes an array of validated reference(s) as argument
  // Step 1: Define URLs-params as a property
  constructor(
    input = [ 'Hos14!SG21', 'Neh13!SG21','Rev22:4!KJV' ],
    edition_default="SG21") {

      this.inputs = Array.isArray(input) ? input : [input];
      this.baseUrl = 'https://hsub.pjafischer.workers.dev/bgw/api/';
      this.urls = this.inputs.map(input => `${this.baseUrl}?param=${encodeURIComponent(input)}`);
      this.data = [];
      this.edition_default = edition_default;

    }

  // Step 2: Method to fetch and populate data
 async fetch_parallel() {
    // attempt to fetch the urls
    try {
      const responses = await Promise.all(
        this.urls.map(url => fetch(url).then(res => res.json()))
      );
      this.data = responses;
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  }
  
}

// ============================================================

/**
const myParam = ["Gal.1.21",'Hos14.5!SG21','Neh13.1!SG21','Rev22:4!KJV'] ;         // OSIS conform
const myRef = new NewRef(myParam);
await myRef.fetch_parallel();       // Wait for data fetched
await myRef.data;

console.log(myRef);                 // inspect upon completion
*/