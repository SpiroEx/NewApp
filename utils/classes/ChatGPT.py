from openai import OpenAI

client = OpenAI()


class ChatGPT:
    @staticmethod
    def chat(prompt: str):
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
        )
        reply = completion.choices[0].message.content

        if reply is None:
            reply = ""

        # remove quotes at the start and end
        if reply.startswith('"') and reply.endswith('"'):
            reply = reply[1:-1]

        return reply
