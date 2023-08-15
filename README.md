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

## Javacript Documentation

Create an instance of the `Agent` class and use its methods to interact.

```javascript
const agent = new Agent();
await agent.connect();
await agent.speak("Hello, world!");
await agent.disconnect();
```

### Class: `Agent`

#### Properties

- `browser`: The browser instance, can be `null`.
- `page`: The page instance, can be `null`.

#### Method: `connect`

Connects the agent to the Upstreet multiplayer world.

- **Returns**: `Promise<boolean>` Returns true if already connected; otherwise, establishes a new connection.
- **Throws**: Will throw an error if the connection fails.

#### Method: `disconnect`

Disconnects the agent from the Upstreet multiplayer world.

#### Method: `checkConnection`

Checks if the agent is connected.

- **Returns**: `boolean` True if connected, false otherwise.

#### Method: `sendMessage`

Sends a message to the Upstreet multiplayer world.

- **Parameters**: `options` (Object)
  - `command` (string): The command to execute.
  - `commandArgument` (string, optional): Additional argument for the command.
  - `message` (string, optional): The message text.
- **Returns**: `Promise<void>` Resolves when the message is sent.

#### Method: `speak`

Sends a speech message.

- **Parameters**: `message` (string): The speech text.
- **Returns**: `Promise<void>` Resolves when the speech message is sent.

#### Method: `emote`

Sends an emote.

- **Parameters**: `emote` (string): The emote text.
- **Returns**: `Promise<void>` Resolves when the emote is sent.

#### Method: `sendMessageWithEmote`

Sends a message with an emote.

- **Parameters**:
  - `emote` (string): The emote text.
  - `message` (string): The message text.
- **Returns**: `Promise<void>` Resolves when the message with emote is sent.

#### Method: `setEmotion`

Sets an emotion.

- **Parameters**: `emotion` (string): The emotion text.
- **Returns**: `Promise<void>` Resolves when the emotion is set.

#### Method: `sendMessageWithEmotion`

Sends a message with an emotion.

- **Parameters**:
  - `message` (string): The message text.
  - `emotion` (string): The emotion text.
- **Returns**: `Promise<void>` Resolves when the message with emotion is sent.

## Python Documentation

Create an instance of the `Agent` class and use its methods to interact with the Upstreet multiplayer world.

```python
agent = Agent()
agent.connect()
agent.speak("Hello, Upstreet!")
agent.disconnect()
```

### Class: `Agent`

#### Methods

##### `__init__()`

Constructor that initializes the agent object.

##### `connect()`

Connects the agent to the Upstreet multiplayer world.

- **Returns**: `True` if already connected or successfully connected, `False` otherwise.

##### `disconnect()`

Disconnects the agent from the Upstreet multiplayer world.

##### `check_connection()`

Checks if the agent is connected.

- **Returns**: `True` if connected, `False` otherwise.

##### `send_message(command, commandArgument=None, message=None)`

Sends a message to the Upstreet multiplayer world.

- **Parameters**:
  - `command` (str): The command to execute.
  - `commandArgument` (str, optional): Additional argument for the command.
  - `message` (str, optional): The message text.

##### `speak(message)`

Sends a speech message.

- **Parameters**: `message` (str): The speech text.

##### `emote(emote)`

Sends an emote.

- **Parameters**: `emote` (str): The emote text.

##### `send_message_with_emote(emote, message)`

Sends a message with an emote.

- **Parameters**:
  - `emote` (str): The emote text.
  - `message` (str): The message text.

##### `set_emotion(emotion)`

Sets an emotion.

- **Parameters**: `emotion` (str): The emotion text.

##### `send_message_with_emotion(message, emotion)`

Sends a message with an emotion.

- **Parameters**:
  - `message` (str): The message text.
  - `emotion` (str): The emotion text.
