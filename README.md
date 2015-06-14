# cc

A script that converts cockatrice cards.xml file in italian using http://mtgdb.net/database/ csv db

## Usage

As simple as

```
wget http://mtgdb.net/database/cardlist.zip
unzip cardlist.zip
node bin/convert.js -c cardlist.csv -x cards.xml -n italian_cards.xml
```
Then copy italian_cards.xml into your cockatrice directory.

## XML file

I'll try to keep the latest italian cards.xml with the latest sets in `bin/it_cards.xml` for all the lazy people out there. You're welcome

## Known bugs

- Unglued and unhinged are still in english, sorry about that
