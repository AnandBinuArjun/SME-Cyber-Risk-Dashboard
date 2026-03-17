from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class OrganizationBase(BaseModel):
    name: str
    domain: str
    industry: Optional[str] = None
    company_size: Optional[str] = None
    employee_count: Optional[int] = None
    country: Optional[str] = None

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationUpdate(OrganizationBase):
    name: Optional[str] = None
    domain: Optional[str] = None

class OrganizationOut(OrganizationBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
