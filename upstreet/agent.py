import os
import asyncio
import websockets
import json
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


class Agents:
    @staticmethod
    async def connect(supabase_url, supabase_public_api_key):
        # Connection URL for the real-time server (replace 'rest' with 'realtime')
        ws_url = supabase_url.replace("https://", "wss://").replace("http://", "ws://").replace('rest', 'realtime') + '/v1/websocket'

        # WebSocket connection headers
        headers = {
            'apikey': supabase_public_api_key
        }

        # Connect to the real-time server
        async with websockets.connect(ws_url, extra_headers=headers) as ws:
            # Subscribe to a channel
            payload = {
                "topic": "room-1",
                "event": "phx_join",
                "ref": "1",
                "payload": {}
            }
            await ws.send(json.dumps(payload))

            # Listen for messages
            async for message in ws:
                payload = json.loads(message)
                if payload['event'] == 'broadcast':
                    print('got payload', payload)

# Example usage
asyncio.get_event_loop().run_until_complete(Agents.connect(SUPABASE_URL, SUPABASE_KEY))
