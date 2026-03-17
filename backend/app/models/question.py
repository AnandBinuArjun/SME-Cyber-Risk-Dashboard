from sqlalchemy import Column, Integer, String, Text, JSON
from app.db.session import Base

class QuestionnaireQuestion(Base):
    __tablename__ = "questionnaire_questions"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False) # Access Control, Backup, etc.
    text = Column(Text, nullable=False)
    question_type = Column(String, default="boolean") # boolean, multiple, scale
    options = Column(JSON, nullable=True) # For non-boolean questions
    weight = Column(Integer, default=1) # Contribution to category score
