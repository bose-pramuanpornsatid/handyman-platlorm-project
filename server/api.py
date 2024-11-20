from fastapi import FastAPI
from db import *
from db_simple import *
from dataclasses import dataclass

app = FastAPI()
pool = connect_with_connector()
db_conn = pool.connect()

@dataclass
class posting_result:
    job_name: str
    posting_id: int
    company_id: int
    location: str
    post_date: str


@app.get("/posting")
def get_all_postings():
    insert_stmt=sqlalchemy.text("SELECT job_name, posting_id, company_id, location, post_date FROM posting LIMIT 1000;")
    temp = db_conn.execute(insert_stmt).fetchall()

    res = []
    for item in temp:
        res.append(posting_result(item[0], item[1], item[2], item[3], item[4]))

    return { "result": res }

@app.get("/posting/{id}")
def get_post_by_id(id: str):
    insert_stmt=sqlalchemy.text("SELECT * FROM posting WHERE posting_id = {id};".format(id=id))
    data =  db_conn.execute(insert_stmt).fetchone()
    posting_data = {
        "posting_id": data[0],
        "job_name": data[1],
        "job_description": data[2],
        "med_salary": int(data[3]),
        "sponsor": data[4],
        "remote_allowed": data[5],
        "location": data[6],
        "post_date": data[7], 
        "company_id": data[8],
    }
    return {"message": posting_data }

# @app.get("/companies")
# def get_all_companies():
#     insert_stmt=sqlalchemy.text("SELECT job_name, posting_id, company_id, location, post_date FROM posting;")
#     temp =  db_conn.execute(insert_stmt)
#     return {"message": "Getting all companies"}
