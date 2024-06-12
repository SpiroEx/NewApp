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
        return completion.choices[0].message.content
