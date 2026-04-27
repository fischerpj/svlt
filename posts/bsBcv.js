// BcvParserRef.js
import { bcv_parser } from "./bcv_parser.js";
import { grammar_options, regexps, translations }
  from "./lang/fr.js";
  
  
// bcvWrapper.js — minimal safe wrapper around bcv_parser
export class BCVWrapper {
  constructor() {
    this.bcv = (new SuperParserRef()).parser;

    // Bind methods so they can be passed as standalone functions
    this.parseOsis = this.parseOsis.bind(this);
  }

  // Parse a Bible reference and return OSIS or null
  parseOsis(input) {
    try {
      const result = this.bcv.parse(input);
      return result.osis();     // normalized OSIS string
    } catch (err) {
      return null;              // invalid reference
    }
  }
}

// creates a bcv_parser with lang
export class BcvParserLang {
  constructor() {
    this.instance = new bcv_parser({
      grammar_options,
      regexps,
      translations
    });
  }

  parse(ref) {
    return this.instance.parse(ref).osis();
  }
}

export class SuperParserRef {
  // CONSTRUCTOR
  /**
   * @param {object} lang - language configuration module
   * @param {object} options   - optional parser options
   */constructor(
        lang = {
          grammar_options,
          regexps,
          translations
        }, 
        options = {
          punctuation_strategy: "us"
        }
  ) {
     this.parser = new bcv_parser(lang, options);
//     this.parser = bcv_instance;
     this.parser.set_options(options);
    }

  // --- OK TRUE CHAINABLE PARSE ---
  parse(input) {
    // --- PRE-PROCESSING HOOK ---
    const normalized = this._preprocess(input);

    // --- DELEGATE TO ORIGINAL PARSER ---
    this.parser.parse(normalized);
    
//    this.parser.parse(input);
    return this; // critical for chaining
  }
  
  _preprocess(text) {
    // just convert hsub ! to osis whitespace
//    const arr = Array.isArray(input) ? input : [input];
//    const hsub =  arr.join(";").replaceAll('!',' ');
    const hsub = text.replaceAll('!',' ');
    return hsub;
  }

 // --- OPTIONAL: expose selected API methods ---
  osis() {
    return this.parser.osis();
  }
  
  // OK re-exposition of ...
  osis_and_translations() {
     return this.parser.osis_and_translations();
  }

  // OK NEW Method for this yields hsub ! formatting
  //
  hsub_refarray() {
  // PARSING: OSIS + TRANS
  const osis_translations = this.osis_and_translations();

  // REFACTOR input
  const output_hsub = osis_translations
    .map(([osis, translation]) => translation ? `${osis}!${translation}` : `${osis}` )

  return output_hsub 
  }
  
  // OK NEW Method for this yields hsub formatting
  osis_array() {
  // PARSING: OSIS + TRANS
  const osis_translations = this.osis_and_translations();

  // REFACTOR input
  const output_hsub = osis_translations
    .map(([osis, translation]) => translation ? `${osis}&nbsp;${translation}` : `${osis}` )

  return output_hsub 
  }

  // OK NEW Method for this yields hsub formatting
  osis_idempotent() {
  // PARSING: OSIS + TRANS
  const osis_translations = this.osis_and_translations();

  // REFACTOR input
  const output_hsub = osis_translations
    .map(([osis, translation]) => translation ? `(${osis}&nbsp;${translation})` : `(${osis})` )
 
  const json = output_hsub.join("; ");
  return json 
  }
}