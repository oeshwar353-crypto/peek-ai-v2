import json
from groq import Groq

class GeneratorService:
    @classmethod
    def generate(cls, generator_type: str, platform: str, tone: str, audience: str,
                 length: str, goal: str, topic: str, api_key: str = "") -> dict:
        if not api_key:
            return {
                "title": f"New {generator_type} Ideas",
                "primary_content": f"Topic: {topic}. Target: {goal}.",
                "supporting_elements": ["No Groq API key configured"],
                "meta_tips": "Please configure your Groq API key."
            }

        prompt = f"""
        You are a highly sought-after professional creator copywriter and content producer.
        Generate high-performing content of type '{generator_type}' for the platform '{platform}'.
        
        Parameters:
        - Tone: {tone}
        - Audience: {audience}
        - Length/Duration: {length}
        - Core Goal: {goal}
        - Main Topic/Concept: {topic}

        Return your output strictly as a structured JSON object. Never return raw paragraphs.
        JSON schema:
        {{
          "title": "...",
          "primary_content": "...",
          "supporting_elements": ["...", "..."],
          "meta_tips": "Explanation of why this is designed to convert/perform based on the goals and audience"
        }}
        Do not wrap in backticks or markdown, just return the JSON string.
        """
        try:
            client = Groq(api_key=api_key)
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
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()
            return json.loads(text)
        except Exception as e:
            return {
                "title": f"New {generator_type} Ideas",
                "primary_content": f"Topic: {topic}. Target: {goal}.",
                "supporting_elements": ["Verify your Groq API key is correct and active."],
                "meta_tips": f"Generation failed: {str(e)}"
            }
