var parse = require('csv-parse'),
    fs    = require('fs'),
    co = require('co'),
    parseXml = require('xml2js').parseString,
    ObjToXml = require('js2xml').Js2Xml,
    _  = require('lodash'),
    thunkify = require('thunkify');

var buildXml = require('./buildXml');

parse    = thunkify(parse);
parseXml = thunkify(parseXml);

module.exports = co(function *(csv, xml, finalXml) {
  var cards = yield parse(fs.readFileSync(csv, 'utf8'), {
    delimiter: '\t',
    columns: true,
    quote: '\xf0', // just some junk byte we will never encounter
    escape: '\xf0' // ^
  }), cardsObj = {};

  _.each(cards, function(card) {
    cardsObj[card.English] = card;
  });

  var db = yield parseXml(
    fs.readFileSync(xml, 'utf8')
  );

  var originalCards = db.cockatrice_carddatabase.cards[0].card;

  originalCards.forEach(function(card) {
    var name = card.name[0],
        newCard = cardsObj[name];

    if (!newCard)
      return console.log('Not found: %s', name);

    card.name = [ newCard.Nome_Carta ];
    card.text = [ newCard.Testo ];
    card.type = [ newCard.Tipo ];
  });

  fs.writeFileSync(finalXml, buildXml(originalCards));
});
