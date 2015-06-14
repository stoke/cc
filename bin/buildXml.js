var _ = require('lodash'),
    xmlbuilder = require('xmlbuilder');

function addElement(root, value, key) {
  value = value[0];

  if (typeof value === 'object')
    root.ele(key, value['$'], value['_']);
  else
    root.ele(key, {}, value);
}

module.exports = function buildXml(cards) {
  var root = xmlbuilder.create('cards');

  cards.forEach(function(card) {
    _.each(
      card, 
      addElement.bind(this, root.ele('card'))
    );
  });

  root.end({ pretty: true });

  return root.toString();
};
