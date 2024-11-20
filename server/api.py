from fastapi import FastAPI
from db import *
from db_simple import *

app = FastAPI()
pool = connect_with_connector()
db_conn = pool.connect()

@app.get("/posting")
def get_all_postings():
    insert_stmt=sqlalchemy.text("SELECT job_name, posting_id, company_id, location, post_date FROM posting;")
    temp =  db_conn.execute(insert_stmt)
    return {"message": temp}

@app.get("/posting/id")
def get_post_by_id(id: str):
    insert_stmt=sqlalchemy.text("SELECT job_name, posting_id, company_id, location, post_date FROM posting;")
    temp =  db_conn.execute(insert_stmt)
    return {"message": "Getting one specific post" + id}

@app.get("/companies")
def get_all_companies():
    insert_stmt=sqlalchemy.text("SELECT job_name, posting_id, company_id, location, post_date FROM posting;")
    temp =  db_conn.execute(insert_stmt)
    return {"message": "Getting all companies"}
