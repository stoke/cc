var convert = require('./convertCards');


var args = require('yargs')
           .usage('Usage: $0 -x <cards.xml> -c <csv_file> -n <translated_cards.xml>')
           .describe('x', 'Cockatrice original cards.xml file')
           .describe('c', 'Csv from http://mtgdb.net/database/')
           .describe('n', 'Newly generated xml file')
           .demand(['x', 'c', 'n'])
           .argv;

convert(args.c, args.x, args.n);
