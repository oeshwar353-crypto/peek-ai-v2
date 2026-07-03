import json
from groq import Groq

class ImproverService:
    @classmethod
    def improve(cls, content_type: str, raw_content: str, focus_area: str,
                project_context: str = "", api_key: str = "") -> dict:
        if not api_key:
            return {
                "original_critique": "Failed to analyze draft.",
                "improved_content": raw_content,
                "why_it_works": "Please configure your Groq API key."
            }

        prompt = f"""
        You are an expert content optimizer. Improve the provided draft:
        Draft: "{raw_content}"
        Content Type: {content_type}
        Focus Area: {focus_area}
        Context: {project_context}

        Optimize it to achieve maximum performance and engagement.
        Return your output strictly as a structured JSON object. Never return raw paragraphs.
        JSON schema:
        {{
          "original_critique": "Detailed analysis of what was holding the original draft back.",
          "improved_content": "The fully optimized, improved, and rewritten draft.",
          "why_it_works": "Deep strategic breakdown of why the new version is scientifically better (hook, psychology, structure)."
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
                temperature=0.3,
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
                "original_critique": "Failed to analyze draft.",
                "improved_content": raw_content,
                "why_it_works": f"Optimizer encountered an issue: {str(e)}"
            }
