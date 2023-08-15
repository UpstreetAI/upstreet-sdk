# Upstreet

The `upstreet` package provides a set of tools and handy abstractions for interacting with Upstreet.


## Installation

`upstreet` is available for JS and Python.

### Javascript
```sh
npm install upstreet
```

### Python
```sh
pip install upstreet
```

## Packages

### upstreet.agents
The agents package provides handlers for connecting autonomous agents.

### upstreet.world
The world package provides handlers for querying the Upstreet world state. Future versions will enable role-accessed users to enact changes on the world programmatically.

## Quickstart

### Javascript
```js
import { World, Agent } from 'upstreet'

const world = new World({ apiKey: UPSTREET_API_KEY });
const agent = new Agent({ apiKey: UPSTREET_API_KEY });



Input stream
 Local character position update
 Nearby objects/characters enter/exit range
 Npc speech
 Npc emotion
 Npc speech
Input request
 Search memories for character
 Search memories globally
output
 Add character/set character controller
 Character speech
 Trigger character emote
 Set character emotion
 Cause character move
 Converse with peer character