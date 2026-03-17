from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from app.db.session import Base

class QuestionnaireResponse(Base):
    __tablename__ = "questionnaire_responses"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("questionnaire_questions.id"), nullable=False)
    
    answer = Column(String, nullable=False) # "Yes", "No", or JSON for complex
    notes = Column(Text, nullable=True)
