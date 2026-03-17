from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, organizations, assessments, questionnaire, reports, dashboard

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(organizations.router, prefix="/organizations", tags=["organizations"])
api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])
api_router.include_router(questionnaire.router, prefix="/questionnaire", tags=["questionnaire"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
