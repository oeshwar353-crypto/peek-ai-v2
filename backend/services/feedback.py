import json
from groq import Groq


class FeedbackService:

    @classmethod
    def analyze(cls, content: str, platform: str, api_key: str = "") -> dict:
        if not api_key:
            return {"error": "No API key configured"}

        prompt = f"""
You are a world-class content coach who has trained top-tier creators.
Analyze the following {platform} content thoroughly and objectively.

Content:
---
{content}
---

Return a single structured JSON object with no markdown:
{{
  "overall_score": 72,
  "grade": "B+",
  "summary": "2-3 sentence expert executive summary of the content quality",
  "scores": {{
    "hook": {{
      "score": 75,
      "label": "Hook",
      "feedback": "Specific feedback on the opening hook",
      "suggestion": "Concrete improvement suggestion"
    }},
    "retention": {{
      "score": 68,
      "label": "Retention",
      "feedback": "How well the content maintains interest",
      "suggestion": "How to improve retention"
    }},
    "readability": {{
      "score": 80,
      "label": "Readability",
      "feedback": "How easy the content is to read/follow",
      "suggestion": "Specific readability improvement"
    }},
    "flow": {{
      "score": 70,
      "label": "Flow",
      "feedback": "How naturally the content transitions",
      "suggestion": "Flow improvement tip"
    }},
    "cta": {{
      "score": 60,
      "label": "CTA",
      "feedback": "Effectiveness of the call to action",
      "suggestion": "Better CTA approach"
    }},
    "emotion": {{
      "score": 65,
      "label": "Emotion",
      "feedback": "Emotional resonance and connection",
      "suggestion": "How to add more emotion"
    }},
    "confidence": {{
      "score": 78,
      "label": "Confidence",
      "feedback": "How authoritative and confident the voice sounds",
      "suggestion": "Ways to sound more confident"
    }}
  }},
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "improvements": ["Improvement 1", "Improvement 2", "Improvement 3"],
  "quick_fixes": ["Quick fix 1", "Quick fix 2"]
}}
"""
        try:
            client = Groq(api_key=api_key)
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.6,
                response_format={"type": "json_object"}
            )
            text = response.choices[0].message.content.strip()
            return json.loads(text)
        except Exception as e:
            return {"error": str(e)}

    @classmethod
    def rewrite(cls, content: str, style: str, platform: str, api_key: str = "") -> dict:
        if not api_key:
            return {"error": "No API key configured"}

        style_prompts = {
            "viral": "Make it extremely viral — punchy, high-energy, trend-savvy, with pattern interrupts and viral hooks",
            "professional": "Make it polished, authoritative, and professional — clear value, credible tone, business-appropriate",
            "emotional": "Make it deeply emotional — tap into feelings, personal stories, empathy, vulnerability",
            "storytelling": "Transform it into a compelling narrative with story arc, tension, resolution, and character",
            "persuasive": "Make it highly persuasive — use psychology, social proof, scarcity, and strong conviction",
            "simple": "Simplify it completely — 5th grade reading level, short sentences, crystal clear messaging"
        }

        style_instruction = style_prompts.get(style, "Improve the overall quality and impact")

        prompt = f"""
You are an elite content writer specializing in {platform} content.
{style_instruction}.

Original content:
---
{content}
---

Return JSON with no markdown:
{{
  "rewritten": "The fully rewritten content here",
  "changes_made": ["Change 1", "Change 2", "Change 3"],
  "why_it_works": "Brief explanation of why the rewritten version is more effective",
  "style_applied": "{style}"
}}
"""
        try:
            client = Groq(api_key=api_key)
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.8,
                response_format={"type": "json_object"}
            )
            text = response.choices[0].message.content.strip()
            return json.loads(text)
        except Exception as e:
            return {"error": str(e)}
