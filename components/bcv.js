// src/bcv.js  (ESM module)
// STICK TO STRICT OSIS format GAL.1.13, it's bgw compatible

import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
import * as lang from "bible-passage-reference-parser/esm/lang/en.js";

export class bcv extends bcv_parser {
  constructor(lang = "en") {
    super(lang);
    this.set_options({
    // This tells the parser: "If you see a chapter/verse after a separator, 
    // look back at the previous book mentioned."
    consecutive_combination_strategy: "combine",
    // This ensures semicolons don't break the chain
    sequence_combination_strategy: "combine",
  });
    this.workerUrl = "https://your-worker.hsub.workers.dev/";
  }
  
  /**
   * Helper to check if a string is a valid Bible reference
   */
  isValid(input) {
    return this.parse(input).osis().length > 0;
  }
  
  mirror(input) {
    return this.parse(input).parsed_entities();
  } 
}


// Parser
const bcv_std = new bcv(lang);

const G4102 = 'Galatians 1:13; 2:16; 2:20, 3:2; 3:5'
console.log(G4102);

console.log(  bcv_std.parse(G4102).osis_array() ); 

/**
console.log( bcv_std.parse(G4102).parsed_entities() ); 

console.log( JSON.stringify( bcv_std.parse(G4102).osis(),null,0) ); // John.1

// Validity
console.log(bcv_std.isValid(G4102)); // true

// Parse

// Entities
*/
