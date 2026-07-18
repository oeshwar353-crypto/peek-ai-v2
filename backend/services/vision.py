import json
import base64
from groq import Groq

class VisionService:
    @classmethod
    def analyze_image(cls, image_bytes: bytes, filename: str, api_key: str) -> dict:
        if not api_key:
            return {
                "overall_score": 0,
                "virality_score": 0,
                "content_health": "Critical",
                "hook_analysis": {"description": "No API key provided", "score": 0, "critique": "Please add your Groq API key via the API Key button in the sidebar."},
                "storytelling": {"pacing": "—", "structure": "—", "score": 0},
                "visual_design": {"hierarchy": "—", "colors": "—", "score": 0},
                "editing_style": {"description": "—", "recommendation": "Add API key first"},
                "audience_psychology": {"demographic": "—", "emotional_triggers": [], "attention_retention_score": 0},
                "cta": {"efficiency": "—", "score": 0, "alternative": "—"},
                "strengths": [],
                "weaknesses": ["No Groq API key configured"],
                "improvement_suggestions": ["Click 'API Key' in the sidebar and paste your Groq API key."]
            }

        try:
            base64_image = base64.b64encode(image_bytes).decode("utf-8")
        except Exception as e:
            raise ValueError(f"Invalid image content: {str(e)}")

        prompt = """
        You are an elite, world-class content strategist and growth advisor. 
        Analyze the provided screenshot of content (e.g. an Instagram post, YouTube thumbnail/video detail, TikTok, LinkedIn post, or creator graphic).
        Extract and return a structured JSON object containing a detailed analysis. 

        Ensure the response is strictly JSON with the following schema:
        {
          "overall_score": int (1-100),
          "virality_score": int (1-100),
          "content_health": "Healthy" | "Needs Attention" | "Critical",
          "hook_analysis": {
            "description": "...",
            "score": int (1-100),
            "critique": "..."
          },
          "storytelling": {
            "pacing": "...",
            "structure": "...",
            "score": int (1-100)
          },
          "visual_design": {
            "hierarchy": "...",
            "colors": "...",
            "score": int (1-100)
          },
          "editing_style": {
            "description": "...",
            "recommendation": "..."
          },
          "audience_psychology": {
            "demographic": "...",
            "emotional_triggers": ["..."],
            "attention_retention_score": int (1-100)
          },
          "cta": {
            "efficiency": "...",
            "score": int (1-100),
            "alternative": "..."
          },
          "strengths": ["...", "..."],
          "weaknesses": ["...", "..."],
          "improvement_suggestions": ["...", "..."]
        }
        Do not wrap the json in backticks or add any markdown wrappers, just return the JSON string.
        """

        try:
            client = Groq(api_key=api_key)
            response = client.chat.completions.create(
                model="qwen/qwen3.6-27b",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/png;base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                temperature=0.2,
                response_format={"type": "json_object"}
            )
            text = response.choices[0].message.content.strip()
            # Clean up potential markdown wrappers
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
                "overall_score": 50,
                "virality_score": 50,
                "content_health": "Needs Attention",
                "hook_analysis": {"description": "Analysis failed", "score": 50, "critique": str(e)},
                "storytelling": {"pacing": "Unknown", "structure": "Unknown", "score": 50},
                "visual_design": {"hierarchy": "Unknown", "colors": "Unknown", "score": 50},
                "editing_style": {"description": "Unknown", "recommendation": "Try uploading again"},
                "audience_psychology": {"demographic": "Unknown", "emotional_triggers": [], "attention_retention_score": 50},
                "cta": {"efficiency": "Unknown", "score": 50, "alternative": "Try uploading again"},
                "strengths": ["Image uploaded successfully"],
                "weaknesses": ["AI analysis encountered an error"],
                "improvement_suggestions": ["Verify your Groq API key is valid and has quota remaining."]
            }

    @classmethod
    def analyze_thumbnail(cls, image_bytes: bytes, filename: str, api_key: str) -> dict:
        if not api_key:
            return {"error": "No API key configured", "ctr_potential": 0, "clickability_score": 0}

        try:
            base64_image = base64.b64encode(image_bytes).decode("utf-8")
        except Exception as e:
            raise ValueError(f"Invalid image content: {str(e)}")

        prompt = """
        You are a YouTube thumbnail optimization expert who has analyzed millions of thumbnails.
        Analyze this thumbnail and return a structured JSON object with no markdown wrappers:
        {
          "clickability_score": int (1-100),
          "ctr_potential": {
            "score": int (1-100),
            "label": "Low|Medium|High|Viral",
            "explanation": "Why this thumbnail will or won't get clicks"
          },
          "visual_hierarchy": {
            "score": int (1-100),
            "main_focal_point": "What draws the eye first",
            "hierarchy_flow": "How the eye moves through the image",
            "issues": ["Issue 1", "Issue 2"]
          },
          "color_contrast": {
            "score": int (1-100),
            "dominant_colors": ["color1", "color2"],
            "contrast_rating": "Poor|Fair|Good|Excellent",
            "recommendation": "Color improvement suggestion"
          },
          "text_readability": {
            "score": int (1-100),
            "text_found": "The text visible in the thumbnail",
            "font_size_rating": "Too Small|Small|Good|Large",
            "legibility_at_small_size": "Poor|Fair|Good|Excellent",
            "recommendation": "Text improvement suggestion"
          },
          "focus_point": {
            "subject": "Main subject of the thumbnail",
            "composition": "Rule of thirds|Centered|Off-balance",
            "background": "How background affects the subject"
          },
          "facial_emotion": {
            "detected": true,
            "emotion": "Shock|Excitement|Curiosity|Happiness|Confusion|None detected",
            "effectiveness": "How well the emotion drives clicks",
            "score": int (1-100)
          },
          "strengths": ["Strength 1", "Strength 2", "Strength 3"],
          "weaknesses": ["Weakness 1", "Weakness 2"],
          "suggestions": ["Actionable suggestion 1", "Actionable suggestion 2", "Actionable suggestion 3"],
          "competitor_comparison": "How this thumbnail compares to top-performing thumbnails in this niche"
        }
        """

        try:
            client = Groq(api_key=api_key)
            response = client.chat.completions.create(
                model="qwen/qwen3.6-27b",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/png;base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                temperature=0.2,
                response_format={"type": "json_object"}
            )
            text = response.choices[0].message.content.strip()
            if text.startswith("```json"):
                text = text.replace("```json", "", 1)
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            return json.loads(text.strip())
        except Exception as e:
            return {"error": str(e), "clickability_score": 50, "ctr_potential": {"score": 50, "label": "Medium", "explanation": str(e)}}
