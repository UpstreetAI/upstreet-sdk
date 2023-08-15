# Upstreet <a href="https://discord.gg/dRJ2ba46MJ"><img style="float: right" src="https://dcbadge.vercel.app/api/server/dRJ2ba46MJ" alt=""></a> <a href="https://github.com/avaer/upstreet/stargazers"><img style="float: right; padding: 5px;" src="https://img.shields.io/github/stars/avaer/upstreet?style=social" alt=""></a>

<img src="resources/image1.jpg" width=100% />

[![Lint and Test](https://github.com/AutonomousResearchGroup/agentmemory/actions/workflows/test.yml/badge.svg)](https://github.com/AutonomousResearchGroup/agentmemory/actions/workflows/test.yml)
[![PyPI version](https://badge.fury.io/py/agentmemory.svg)](https://badge.fury.io/py/agentmemory)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/AutonomousResearchGroup/easycompletion/blob/main/LICENSE)
[![forks - easycompletion](https://img.shields.io/github/forks/AutonomousResearchGroup/easycompletion?style=social)](https://github.com/AutonomousResearchGroup/easycompletion)

The `upstreet` package provides a set of tools and handy abstractions for interacting with Upstreet.

The SDK is available for Javascript and Python.

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

## Javascript

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

### Sending a Speech Message

```javascript
agent.speak("I'm happy to be here!");
```

### Sending an Emote

```javascript
agent.emote("smiles warmly");
```

### Sending a Message with an Emote

```javascript
agent.sendMessageWithEmote("laughs", "That's funny!");
```

### Setting an Emotion

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

### Sending a Message

```python
agent.send_message(command="say", message="Hello, Upstreet!")
```

### Sending a Speech Message

```python
agent.speak("I'm happy to be here!")
```

### Sending an Emote

```python
agent.emote("smiles warmly")
```

### Sending a Message with an Emote

```python
agent.send_message_with_emote(emote="laughs", message="That's funny!")
```

### Setting an Emotion

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
</a>

<img src="resources/image2.jpg" width=100% />