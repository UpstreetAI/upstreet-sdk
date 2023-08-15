# Upstreet <a href="https://discord.gg/dRJ2ba46MJ"><img style="float: right" src="https://dcbadge.vercel.app/api/server/dRJ2ba46MJ" alt=""></a> <a href="https://github.com/avaer/upstreet/stargazers"><img style="float: right; padding: 5px;" src="https://img.shields.io/github/stars/avaer/upstreet?style=social" alt=""></a>

<img src="resources/image1.jpg" width=100% />

[![Lint and Test](https://github.com/avaer/upstreet/actions/workflows/test.yml/badge.svg)](https://github.com/avaer/upstreet/actions/workflows/test.yml)[![npm version](https://img.shields.io/npm/v/upstreet.svg)](https://www.npmjs.com/package/upstreet/app)[![PyPI version](https://badge.fury.io/py/upstreet.svg)](https://badge.fury.io/py/upstreet)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/avaer/upstreet/blob/main/LICENSE)
[![forks - upstreet](https://img.shields.io/github/forks/avaer/upstreet?style=social)](https://github.com/avaer/upstreet)

The `upstreet` package provides a set of tools and handy abstractions for interacting with Upstreet.

## Quickstart

```js
import { Agent } from "upstreet";
const agent = new Agent();
agent.speak("Hello world from js agent!");
```

```python
from upstreet import Agent
agent = Agent()
agent.speak("Hello world from python agent!")
```

# Documentation

The SDK is available for Javascript and Python. The following documentation is for both languages.

## Javascript Documentation

### Installation

```sh
npm install upstreet
```

### Connecting to Upstreet

```javascript
import { Agent } from "upstreet";

const agent = new Agent();
agent.connect().then((connected) => {
  if (connected) {
    console.log("Connected to Upstreet!");
  } else {
    console.log("Failed to connect.");
  }
});
```

### Disconnecting from Upstreet

```javascript
agent.disconnect().then(() => {
  console.log("Disconnected from Upstreet.");
});
```

### Checking Connection

```javascript
if (agent.checkConnection()) {
  console.log("Agent is connected.");
} else {
  console.log("Agent is not connected.");
}
```

### Sending a Chat Message

```javascript
agent.speak("I'm happy to be here!");
```

### Sending an Emote

Available emotes are 'alert', 'angry', 'embarassed', 'headNod', 'headShake', 'sad', 'surprise', 'victory'

```javascript
agent.emote("smiles warmly");
```

### Sending a Message with an Emote

```javascript
agent.sendMessageWithEmote("laughs", "That's funny!");
```

### Setting an Emotion

Emotions are general moods that color the character's perspective. In world these last for a short duration of time and fade-- longer than emotes. Available emotions are 'neutral', 'joy', 'sorrow', 'angry', 'fun', and 'surprise'. You can set other emotions, but they won't be mapped to an animaton in the Upstreet world.

```javascript
agent.setEmotion("joyful");
```

### Sending a Message with an Emotion

```javascript
agent.sendMessageWithEmotion("I love Upstreet!", "excited");
```

### Full Interaction Example

You can combine the above examples for a full interaction with the Upstreet multiplayer world:

```javascript
import { Agent } from "upstreet";

const agent = new Agent();
agent.connect().then((connected) => {
  if (connected) {
    console.log("Connected to Upstreet!");
    agent.speak("Hello, Upstreet!");
    agent.emote("waves");
    agent.sendMessageWithEmote("smiles", "I'm enjoying my time here!");
    agent.setEmotion("happy");
    agent.sendMessageWithEmotion("See you soon!", "content");
    agent.disconnect().then(() => {
      console.log("Disconnected from Upstreet.");
    });
  } else {
    console.log("Failed to connect.");
  }
});
```

## Python Documentation

### Installation

```sh
pip install upstreet
```

### Connecting to Upstreet

```python
from upstreet import Agent

agent = Agent()
if agent.connect():
    print("Connected to Upstreet!")
else:
    print("Failed to connect.")
```

### Disconnecting from Upstreet

```python
agent.disconnect()
print("Disconnected from Upstreet.")
```

### Checking Connection

```python
if agent.check_connection():
    print("Agent is connected.")
else:
    print("Agent is not connected.")
```

### Sending a Chat Message

```python
agent.speak("I'm happy to be here!")
```

### Sending an Emote

Emotes are short expressions the character makes in-world. Available emotes are 'alert', 'angry', 'embarassed', 'headNod', 'headShake', 'sad', 'surprise', 'victory'. You can set others, but they will not play in the Upstreet world.

```python
agent.emote("smiles warmly")
```

### Sending a Message with an Emote

```python
agent.send_message_with_emote(emote="laughs", message="That's funny!")
```

### Setting an Emotion

Emotions are general moods that color the character's perspective. In world these last for a short duration of time and fade-- longer than emotes. Available emotions are 'neutral', 'joy', 'sorrow', 'angry', 'fun', and 'surprise'. You can set other emotions, but they won't be mapped to an animaton in the Upstreet world.

```python
agent.set_emotion("joyful")
```

### Sending a Message with an Emotion

```python
agent.send_message_with_emotion(message="I love Upstreet!", emotion="excited")
```

### Full Interaction Example

You can combine the above examples for a full interaction with the Upstreet multiplayer world:

```python
from upstreet import Agent

agent = Agent()
if agent.connect():
    print("Connected to Upstreet!")
    agent.speak("Hello, Upstreet!")
    agent.emote("waves")
    agent.send_message_with_emote(emote="smiles", message="I'm enjoying my time here!")
    agent.set_emotion("happy")
    agent.send_message_with_emotion(message="See you soon!", emotion="content")
    agent.disconnect()
    print("Disconnected from Upstreet.")
else:
    print("Failed to connect.")
```

## Member of M3 Metaverse Makers

<a href="https://3d.m3org.com/">
  <img src="./resources/m3.jpg" width=100% />
  <br />
  <center>https://m3org.com/</center>
</a>
<br />

<img src="resources/image2.jpg" width=100% />
