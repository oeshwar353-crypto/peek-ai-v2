import os
import shutil
import uuid
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Body, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

from config import settings
from services.storage import StorageService
from services.vision import VisionService
from services.generator import GeneratorService
from services.improver import ImproverService
from services.coach import CoachService
from services.planner import PlannerService
from services.feedback import FeedbackService
from services.inspiration import InspirationService

app = FastAPI(
    title="Peek AI",
    description="Your AI Creator Workspace",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- REQUEST MODELS ---

class ProjectCreate(BaseModel):
    name: str

class UpdateProjectData(BaseModel):
    notes: Optional[str] = None
    scripts: Optional[List[Any]] = None
    captions: Optional[List[Any]] = None
    coach_conversations: Optional[List[Any]] = None
    assets: Optional[List[Any]] = None
    content_plans: Optional[List[Any]] = None
    thumbnail_analyses: Optional[List[Any]] = None
    strategy: Optional[Dict[str, Any]] = None
    favorite: Optional[bool] = None

class GenerateRequest(BaseModel):
    generator_type: str
    platform: str
    tone: str
    audience: str
    length: str
    goal: str
    topic: str

class ImproveRequest(BaseModel):
    content_type: str
    raw_content: str
    focus_area: str
    project_context: Optional[str] = ""

class CoachRequest(BaseModel):
    question: str
    history: List[Dict[str, Any]]
    context_summary: Optional[str] = ""

class StrategyRequest(BaseModel):
    goal: str
    platform: str
    niche: str
    audience: str
    timeframe: str  # "30", "60", or "90"

class ContentPlanRequest(BaseModel):
    days: int  # 7, 30, or 90
    platform: str
    niche: str
    audience: str
    brief: Optional[str] = ""

class FeedbackRequest(BaseModel):
    content: str
    platform: Optional[str] = "general"

class RewriteRequest(BaseModel):
    content: str
    style: str  # viral, professional, emotional, storytelling, persuasive, simple
    platform: Optional[str] = "general"

class InspirationBreakdownRequest(BaseModel):
    content: str  # URL or pasted content
    platform: Optional[str] = "general"

class InspirationIdeasRequest(BaseModel):
    niche: str
    platform: str
    audience: Optional[str] = "general"
    count: Optional[int] = 10


# --- HEALTH ---

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "Peek AI Creator Workspace Backend",
        "version": "2.0.0"
    }


@app.get("/api/api-status")
def get_api_status():
    api_key = settings.GROQ_API_KEY
    if not api_key:
        return {"status": "missing", "message": "API key missing in codebase (.env)"}
    try:
        from groq import Groq
        client = Groq(api_key=api_key)
        # Fast validation check by requesting a completion of 1 token max
        client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": "ping"}],
            max_tokens=1
        )
        return {"status": "active", "message": "API Key is active & healthy"}
    except Exception as e:
        err_msg = str(e)
        if "rate" in err_msg.lower() or "limit" in err_msg.lower() or "quota" in err_msg.lower():
            return {"status": "exhausted", "message": "API Key limit exhausted"}
        return {"status": "error", "message": f"API Key invalid or error: {err_msg[:40]}"}



# --- PROJECTS & WORKSPACE ENDPOINTS ---

@app.get("/api/projects")
def list_projects():
    return StorageService.list_projects()

@app.get("/api/projects/{project_id}")
def get_project(project_id: str):
    project = StorageService.get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.post("/api/projects")
def create_project(data: ProjectCreate):
    if not data.name.strip():
        raise HTTPException(status_code=400, detail="Project name cannot be empty")
    return StorageService.create_project(data.name)

@app.patch("/api/projects/{project_id}")
def update_project(project_id: str, data: UpdateProjectData):
    updates = data.model_dump(exclude_unset=True)
    project = StorageService.update_project(project_id, updates)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: str):
    success = StorageService.delete_project(project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

@app.post("/api/projects/{project_id}/duplicate")
def duplicate_project(project_id: str):
    project = StorageService.get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    new_project = StorageService.create_project(f"{project['name']} (Copy)")
    # Copy all data except id and created_at
    exclude_keys = {"id", "created_at"}
    updates = {k: v for k, v in project.items() if k not in exclude_keys}
    StorageService.update_project(new_project["id"], updates)
    return StorageService.get_project(new_project["id"])


# --- AI WORKFLOW PIPELINES ---

@app.post("/api/projects/{project_id}/analyze")
async def analyze_project_screenshot(
    project_id: str,
    file: UploadFile = File(...),
    x_groq_key: Optional[str] = Header(None)
):
    project = StorageService.get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Could not read upload image")

    file_ext = os.path.splitext(file.filename or "")[1] or ".png"
    filename = f"{project_id}_analysis{file_ext}"
    dest_path = os.path.join(settings.DATA_DIR, "uploads", filename)
    try:
        with open(dest_path, "wb") as buffer:
            buffer.write(contents)
    except Exception:
        pass

    api_key = x_groq_key or settings.GROQ_API_KEY
    analysis_result = VisionService.analyze_image(contents, file.filename, api_key=api_key)
    StorageService.update_project(project_id, {"analysis": analysis_result})
    return analysis_result


@app.post("/api/analyze/thumbnail")
async def analyze_thumbnail(
    file: UploadFile = File(...),
    x_groq_key: Optional[str] = Header(None)
):
    """Analyze a YouTube thumbnail for CTR potential and optimization."""
    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Could not read uploaded image")

    api_key = x_groq_key or settings.GROQ_API_KEY
    result = VisionService.analyze_thumbnail(contents, file.filename or "thumbnail.png", api_key=api_key)
    return result


@app.post("/api/generate")
def generate_content(req: GenerateRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return GeneratorService.generate(
        generator_type=req.generator_type,
        platform=req.platform,
        tone=req.tone,
        audience=req.audience,
        length=req.length,
        goal=req.goal,
        topic=req.topic,
        api_key=api_key
    )

@app.post("/api/improve")
def improve_content(req: ImproveRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return ImproverService.improve(
        content_type=req.content_type,
        raw_content=req.raw_content,
        focus_area=req.focus_area,
        project_context=req.project_context,
        api_key=api_key
    )

@app.post("/api/coach")
def ask_coach(req: CoachRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return CoachService.chat(
        question=req.question,
        history=req.history,
        context_summary=req.context_summary,
        api_key=api_key
    )


# --- PLAN ENDPOINTS ---

@app.post("/api/plan/strategy")
def generate_strategy(req: StrategyRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return PlannerService.generate_strategy(
        goal=req.goal,
        platform=req.platform,
        niche=req.niche,
        audience=req.audience,
        timeframe=req.timeframe,
        api_key=api_key
    )

@app.post("/api/plan/content-plan")
def generate_content_plan(req: ContentPlanRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return PlannerService.generate_content_plan(
        days=req.days,
        platform=req.platform,
        niche=req.niche,
        audience=req.audience,
        brief=req.brief or "",
        api_key=api_key
    )


# --- COACH ENDPOINTS ---

@app.post("/api/coach/feedback")
def analyze_content_feedback(req: FeedbackRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return FeedbackService.analyze(
        content=req.content,
        platform=req.platform,
        api_key=api_key
    )

@app.post("/api/coach/rewrite")
def rewrite_content(req: RewriteRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return FeedbackService.rewrite(
        content=req.content,
        style=req.style,
        platform=req.platform,
        api_key=api_key
    )


# --- INSPIRATION ENDPOINTS ---

@app.post("/api/inspiration/breakdown")
def breakdown_content(req: InspirationBreakdownRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return InspirationService.breakdown(
        content=req.content,
        platform=req.platform,
        api_key=api_key
    )

@app.post("/api/inspiration/ideas")
def generate_inspiration_ideas(req: InspirationIdeasRequest, x_groq_key: Optional[str] = Header(None)):
    api_key = x_groq_key or settings.GROQ_API_KEY
    return InspirationService.generate_ideas(
        niche=req.niche,
        platform=req.platform,
        audience=req.audience,
        count=req.count or 10,
        api_key=api_key
    )


frontend_dir = os.path.join(os.path.dirname(__file__), "..", "frontend")
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
