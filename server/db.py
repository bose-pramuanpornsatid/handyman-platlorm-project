from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

# Added SQL models
class applications(SQLModel, table=True):
    posting_id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    application_date: int | None = Field(default=None)
class school(SQLModel, table=True):
    school_id: int | None = Field(default=None, primary_key=True)
    school_name: str | None = Field(default=None)
    school_size: int | None = Field(default=None)
    school_address: str | None = Field(default=None)
    
class leetcode_problem(SQLModel, table=True):
    problem_id: int | None = Field(default=None, primary_key=True)
    title: str | None = Field(default=None)
    description: str | None = Field(default=None)
    company_id: int | None = Field(default=None, foreign_key="employer_companies.id")
    url: str | None = Field(default=None)
    frequency: int | None = Field(default=None)
    rating: int | None = Field(default=None)

class user(SQLModel, table=True):
    user_id: int | None = Field(default=None, primary_key=True)
    school_id: int | None = Field(default=None, foreign_key="school.id")
    company_id: int | None = Field(default=None, foreign_key="employer_companies.id")
    user_name: str | None = Field(default=None)
    skills: str | None = Field(default=None)
    current_streak: int | None = Field(default=None)
    points: int | None = Field(default=None)

class posting(SQLModel, table=True):
    posting_id: int | None = Field(default=None, primary_key=True)
    job_name: str | None = Field(default=None)
    job_description: str | None = Field(default=None)
    med_salary: int | None = Field(default=None)
    sponsor: str | None = Field(default=None)
    remote_allowed: str | None = Field(default=None)
    location: str | None = Field(default=None)
    post_date: int | None = Field(default=None)
    company_id: int | None = Field(default=None, foreign_key="employer_companies.id")

class employer_companies(SQLModel, table=True):
    posting_id: int | None = Field(default=None, primary_key=True)
    company_name: str | None = Field(default=None)
    description: str | None = Field(default=None)
    url: str | None = Field(default=None)
    address: str | None = Field(default=None)
    
class interview_question(SQLModel, table=True):
    problem_id: int | None = Field(default=None, primary_key=True, foreign_key="leetcode_problem.problem_id")
    company_name: str | None = Field(default=None, primary_key=True, foreign_key="employer_companies.company_name")
