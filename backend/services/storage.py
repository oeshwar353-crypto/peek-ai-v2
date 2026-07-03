import os
import json
import uuid
from typing import List, Dict, Any, Optional

from backend.config import settings

PROJECTS_FILE = os.path.join(settings.DATA_DIR, "projects.json")

class StorageService:
    @staticmethod
    def _load_projects() -> List[Dict[str, Any]]:
        if not os.path.exists(PROJECTS_FILE):
            return []
        try:
            with open(PROJECTS_FILE, "r") as f:
                return json.load(f)
        except Exception:
            return []

    @staticmethod
    def _save_projects(projects: List[Dict[str, Any]]):
        with open(PROJECTS_FILE, "w") as f:
            json.dump(projects, f, indent=2)

    @classmethod
    def list_projects(cls) -> List[Dict[str, Any]]:
        return cls._load_projects()

    @classmethod
    def get_project(cls, project_id: str) -> Optional[Dict[str, Any]]:
        projects = cls._load_projects()
        for p in projects:
            if p["id"] == project_id:
                return p
        return None

    @classmethod
    def create_project(cls, name: str) -> Dict[str, Any]:
        projects = cls._load_projects()
        new_project = {
            "id": str(uuid.uuid4()),
            "name": name,
            "created_at": str(uuid.uuid4()), # simple placeholder/timestamp format
            "analysis": None,
            "scripts": [],
            "captions": [],
            "coach_conversations": [],
            "notes": "",
            "assets": []
        }
        projects.insert(0, new_project)
        cls._save_projects(projects)
        return new_project

    @classmethod
    def update_project(cls, project_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        projects = cls._load_projects()
        for i, p in enumerate(projects):
            if p["id"] == project_id:
                projects[i].update(updates)
                cls._save_projects(projects)
                return projects[i]
        return None

    @classmethod
    def delete_project(cls, project_id: str) -> bool:
        projects = cls._load_projects()
        initial_len = len(projects)
        projects = [p for p in projects if p["id"] != project_id]
        if len(projects) < initial_len:
            cls._save_projects(projects)
            return True
        return False
