from fastapi import FastAPI
from db import *
from db_simple import *

app = FastAPI()

@app.get("/posting")
def get_all_postings():
    return {"message": getpostall()}

@app.get("/posting/id")
def get_post_by_id(id: str):
    return getpostid(id)

@app.get("/companies")
def get_all_companies():
    return getcompanyall()