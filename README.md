What we will use in CraftyBoilerplate:

* Crafty (0.5.3)
* Modernizr (2.6.2)
* Backbone (0.9.10)
* Underscore (1.4.3)
* RequireJS (2.1.4)
* JQuery (1.9.0)
* JQuery-migrate (1.0.0)

To clean up the code and files, in this case we need to use backbone.js as wrapper for entities and require.js for loading files when requests. 

proposed structure tree:

```
-- src
---- components -> Crafty components files
---- entities -> Files with entities
-------- base
------------ baseEntity.js -> Base entity
---- interfaces -> We keep here files with interface entities
---- levels -> Configuration files for levels
---- scenes -> Files with scenes declarations
---- windows -> Files with logic for interface windows
---- libs -> Other libraries files
-------- backbone
-------- jquery
-------- modernizr
-------- require-jquery
-------- underscore
---- config.js -> Game configuration
---- game.js -> Main file of the game
---- sprites.js -> Sprites definitions
-- web
---- images
---- css
-- index.html -> Game wrapper
``` 
