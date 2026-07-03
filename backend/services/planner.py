import json
from groq import Groq


class PlannerService:

    @classmethod
    def generate_strategy(cls, goal: str, platform: str, niche: str, audience: str,
                          timeframe: str, api_key: str = "") -> dict:
        if not api_key:
            return {"error": "No API key configured"}

        prompt = f"""
You are an elite social media growth strategist who has helped top creators reach millions.
Create a detailed {timeframe}-day growth strategy for a creator with these parameters:
- Goal: {goal}
- Platform: {platform}
- Niche: {niche}
- Target Audience: {audience}

Return a single structured JSON object with no markdown wrappers:
{{
  "growth_strategy": "A compelling 2-3 sentence executive summary of the overall strategy approach",
  "weekly_objectives": ["Objective 1 for week 1", "Objective 2 for week 2", "Objective 3 for week 3", "Objective 4 for week 4"],
  "content_mix": {{
    "educational": 40,
    "entertaining": 30,
    "promotional": 15,
    "behind_the_scenes": 15
  }},
  "posting_frequency": "Detailed posting schedule with specific days and times",
  "kpis": ["KPI 1", "KPI 2", "KPI 3", "KPI 4", "KPI 5"],
  "content_pillars": ["Pillar 1", "Pillar 2", "Pillar 3", "Pillar 4"],
  "quick_wins": ["Quick win 1", "Quick win 2", "Quick win 3"],
  "month_targets": {{
    "month1": "Target and focus for month 1",
    "month2": "Target and focus for month 2",
    "month3": "Target and focus for month 3"
  }}
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
    def generate_content_plan(cls, days: int, platform: str, niche: str, audience: str,
                               brief: str, api_key: str = "") -> dict:
        if not api_key:
            return {"error": "No API key configured"}

        # For 90-day plans use batches to avoid context limits
        actual_days = min(days, 30) if days == 90 else days

        prompt = f"""
You are a world-class content strategist who creates viral content plans.
Generate a {actual_days}-day content plan for:
- Platform: {platform}
- Niche: {niche}
- Target Audience: {audience}
- Context/Brief: {brief if brief else 'General creator content'}

Return a JSON object with no markdown. Generate exactly {actual_days} content items:
{{
  "plan": [
    {{
      "day": 1,
      "date_label": "Day 1",
      "topic": "Specific compelling topic title",
      "hook": "First 3-second hook line that grabs attention",
      "script_idea": "Brief 1-2 sentence script direction",
      "caption_idea": "Ready-to-use caption with hashtag strategy",
      "cta": "Specific call to action",
      "thumbnail_idea": "Visual thumbnail concept description",
      "best_time": "Best posting time e.g. 7 PM",
      "goal": "Awareness|Engagement|Conversion",
      "status": "planned",
      "platform_tip": "Platform-specific optimization tip"
    }}
  ]
}}
"""
        try:
            client = Groq(api_key=api_key)
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.8,
                response_format={"type": "json_object"},
                max_tokens=4000
            )
            text = response.choices[0].message.content.strip()
            result = json.loads(text)
            # Tag each item with requested days count for frontend awareness
            result["requested_days"] = days
            result["generated_days"] = actual_days
            return result
        except Exception as e:
            return {"error": str(e)}
