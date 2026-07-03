import json
from groq import Groq
from config import settings

class CoachService:
    @classmethod
    def chat(cls, question: str, history: list, context_summary: str = "", api_key: str = "") -> dict:
        # Fallback to config key if not supplied by request
        active_key = api_key or settings.GROQ_API_KEY
        if not active_key:
            return {
                "response": "I don't have an API key configured. Please add your Groq API key in the sidebar settings.",
                "suggested_next_actions": ["Add API key"],
                "recommended_resources_or_tips": "Configuring your Groq API key will unlock the AI Coach."
            }

        # Format chat history into a structured message list
        chat_context = ""
        for msg in history[-10:]:  # Keep last 10 messages for conversational memory
            role = "Creator" if msg.get("role") == "user" else "Coach"
            chat_context += f"{role}: {msg.get('text')}\n"

        prompt = f"""
        You are a world-class Creator Coach & Mentor who has helped top-tier creators grow to millions of followers.
        Answer the creator's question or review their request.
        
        Workspace/Project Context:
        {context_summary}

        Conversation History:
        {chat_context}

        New Creator Question: "{question}"

        Provide a mentoring response. Return your response strictly as a structured JSON object. Never return raw paragraphs.
        JSON schema:
        {{
          "response": "Your advice, feedback, or coaching response here. Keep it action-oriented, professional, and encouraging.",
          "suggested_next_actions": ["Action 1", "Action 2"],
          "recommended_resources_or_tips": "A pro tip or strategic advice tailored to their question"
        }}
        Do not wrap in backticks or markdown, just return the JSON string.
        """
        try:
            client = Groq(api_key=active_key)
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            text = response.choices[0].message.content.strip()
            if text.startswith("```json"):
                text = text.replace("```json", "", 1)
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()
            return json.loads(text)
        except Exception as e:
            return {
                "response": "I'm having a brief connection issue. Let's try again in a moment.",
                "suggested_next_actions": ["Check internet", "Verify API key"],
                "recommended_resources_or_tips": f"Error detail: {str(e)}"
            }
