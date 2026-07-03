import json
from groq import Groq


class InspirationService:

    @classmethod
    def breakdown(cls, content: str, platform: str, api_key: str = "") -> dict:
        if not api_key:
            return {"error": "No API key configured"}

        prompt = f"""
You are a viral content analyst and social media psychologist who dissects why content goes viral.
Analyze the following {platform} content and provide an expert breakdown.

Content / URL Context:
---
{content}
---

Return a single structured JSON object with no markdown:
{{
  "why_it_works": "2-3 sentence analysis of the core reason this content works",
  "hook_breakdown": {{
    "hook_text": "The specific hook or opening",
    "hook_type": "Curiosity|Fear|Desire|Surprise|Story",
    "hook_score": 85,
    "analysis": "Why this hook works psychologically"
  }},
  "audience_analysis": {{
    "primary_audience": "Specific demographic description",
    "pain_points": ["Pain point 1", "Pain point 2"],
    "desires": ["Desire 1", "Desire 2"],
    "emotional_state": "The emotional state this targets"
  }},
  "storytelling_pattern": {{
    "structure": "PAS|AIDA|Hero's Journey|Before-After-Bridge",
    "breakdown": "How the storytelling structure is applied",
    "key_moments": ["Moment 1", "Moment 2", "Moment 3"]
  }},
  "engagement_strategy": {{
    "tactics": ["Tactic 1", "Tactic 2", "Tactic 3"],
    "engagement_hooks": ["Hook type used 1", "Hook type used 2"],
    "community_building": "How it builds community or connection"
  }},
  "psychological_triggers": [
    {{"trigger": "Social Proof", "how_used": "Specific example from content"}},
    {{"trigger": "Curiosity Gap", "how_used": "Specific example from content"}},
    {{"trigger": "FOMO", "how_used": "Specific example from content"}}
  ],
  "cta_analysis": {{
    "cta_text": "The actual CTA used",
    "cta_type": "Direct|Soft|Implied",
    "effectiveness_score": 78,
    "analysis": "Why this CTA does or does not work"
  }},
  "actionable_improvements": ["Improvement 1", "Improvement 2", "Improvement 3", "Improvement 4"],
  "swipe_worthy": true,
  "virality_score": 82
}}
"""
        try:
            client = Groq(api_key=api_key)
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            text = response.choices[0].message.content.strip()
            return json.loads(text)
        except Exception as e:
            return {"error": str(e)}

    @classmethod
    def generate_ideas(cls, niche: str, platform: str, audience: str, count: int = 10,
                       api_key: str = "") -> dict:
        if not api_key:
            return {"error": "No API key configured"}

        prompt = f"""
You are a creative director who generates viral content ideas for social media.
Generate {count} high-potential content ideas for:
- Niche: {niche}
- Platform: {platform}
- Audience: {audience}

Return a JSON object with no markdown:
{{
  "ideas": [
    {{
      "id": 1,
      "title": "Compelling content title",
      "type": "Educational|Entertainment|Story|Trend|Tutorial|Controversial",
      "hook": "Opening hook that grabs attention immediately",
      "angle": "Unique angle or perspective that makes this stand out",
      "virality_factor": "Why this has viral potential",
      "difficulty": "Easy|Medium|Hard",
      "estimated_views": "10K-50K",
      "tags": ["tag1", "tag2", "tag3"],
      "trend_score": 85
    }}
  ]
}}
Generate exactly {count} ideas with diverse types and angles.
"""
        try:
            client = Groq(api_key=api_key)
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.9,
                response_format={"type": "json_object"}
            )
            text = response.choices[0].message.content.strip()
            return json.loads(text)
        except Exception as e:
            return {"error": str(e)}
