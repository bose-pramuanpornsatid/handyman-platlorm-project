from dataclasses import dataclass
from pydantic import BaseModel


@dataclass
class posting_result:
    job_name: str
    posting_id: int
    company_id: int
    location: str
    post_date: str
    company_name: str
    remote_allowed: int

@dataclass
class company_result:
    company_name: str | None = None
    description: str | None = None
    url: str | None = None
    address: str | None = None

@dataclass
class school_result:
    school_id: int | None = None
    school_name: str | None = None
    total_score: int | None = None
    student_names: str | None = None
    
class Application(BaseModel):
    posting_id: int | None = None
    user_id: int | None = None
    # application_date: int | None = None
    
class School(BaseModel):
    school_id: int | None = None
    school_name: str | None = None
    school_size: int | None = None
    school_address: str | None = None
    
class Leetcode_Problem(BaseModel):
    problem_id: int | None = None
    title: str | None = None
    description: str | None = None
    company_id: int | None = None
    url: str | None = None
    frequency: int | None = None
    rating: int | None = None 

class User(BaseModel):
    user_id: int | None = None
    school_id: int | None = None
    company_id: int | None = None
    year: int | None = None
    user_name: str | None = None
    skills: str | None = None
    current_streak: int | None = None
    points: int | None = None
    auth_uid: str | None = None

class Posting(BaseModel):
    posting_id: int | None = None
    job_name: str | None = None
    job_description: str | None = None
    med_salary: int | None = None
    sponsor: str | None = None
    remote_allowed: int | None = None
    location: str | None = None
    post_date: int | None = None
    ng_or_internship: str | None = None
    company_id: int | None = None

class Company(BaseModel):
    posting_id: int | None = None
    company_name: str | None = None
    description: str | None = None
    url: str | None = None
    address: str | None = None
    
class Interview_Question(BaseModel):
    problem_id: int | None = None
    company_name: str | None = None
    
class Status(BaseModel):
    status: str | None = None
 