from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from db import *
from db_simple import *
from classes import *

app = FastAPI()
pool = connect_with_connector()
db_conn = pool.connect()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*', "https://jobkinator.web.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


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
        "med_salary": int(data[3]) if data[3] else None,
        "sponsor": data[4],
        "remote_allowed": data[5],
        "location": data[6],
        "post_date": data[7], 
        "company_id": data[8]
    }
    return {"message": posting_data }

@app.get("/company/{id}")
def get_company_by_id(id: str):
    insert_stmt=sqlalchemy.text("SELECT * FROM employer_companies WHERE company_id = {id};".format(id=id))
    data =  db_conn.execute(insert_stmt).fetchone()
    company_data = {
        "company_id": data[0],
        "company_name": data[1],
        "job_description": data[2],
        "description": data[3],
        "url": data[4],
        "address": data[5]
    }
    return {"message": company_data }

@app.get("/user/{id}/applications")
def get_user_from_applications(id: str):
    insert_stmt=sqlalchemy.text("SELECT posting_id FROM applications WHERE user_id = {id};".format(id=id))
    data =  db_conn.execute(insert_stmt).fetchall()
    
    res = []
    for item in data:
        res.append(posting_result(item[0], item[1], item[2], item[3], item[4]))

    return { "result": res }

@app.put("/user/create")
async def create_user(user: User):
    insert_stmt= \
    sqlalchemy.text("INSERT INTO USER VALUES user_id = {id}, school_id = {sid}, company_id = {cid}, year = {year}, user_name = {username}, skills = {skills};" \
        .format(id=user.user_id, sid=user.school_id, cid=user.company_id, year=user.year, username=user.user_name, ))
    db_conn.execute(insert_stmt)
    return "Created User"

@app.put("/application/create")
async def create_application(application: Application):
    insert_stmt=sqlalchemy.text("INSERT INTO applications VALUES posting_id={p_id}, user_id = {id}, NOW();".format(p_id=application.posting_id, id=application.user_id))
    db_conn.execute(insert_stmt)
    return "Created Application"

@app.put("/posting/create")
async def create_posting(posting: Posting):
    insert_stmt= \
        sqlalchemy.text("INSERT INTO posting VALUES posting_id = {p_id}, job_name = {job_name}, job_description = {job_desc}, med_salary = {salary}, sponsor = {sponsor}, remote_allowed = {remote}, location = {location}, post_date = {post_date}, ng_or_internship = {i_status}, company_id = {cid};" \
            .format(p_id=posting.posting_id, job_name=posting.job_name, job_desc=posting.job_description, salary = posting.med_salary, sponsor=posting.sponsor, \
                remote=posting.remote_allowed, location=posting.location, post_date=posting.post_date, i_status=posting.ng_or_internship, c_id=posting.company_id))
    db_conn.execute(insert_stmt)
    return "Created Application"

@app.put("/user/{id}/update")
async def update_user(id: str, user: User):
    insert_stmt= \
    sqlalchemy.text("UPDATE USER SET school_id = {sid}, company_id = {cid}, year = {year}, user_name = {username}, skills = {skills} WHERE user_id = {id};" \
        .format(id=id, sid=user.school_id, cid=user.company_id, year=user.year, username=user.user_name))
    db_conn.execute(insert_stmt)
    return "Updated User"

@app.put("/posting/{id}/update")
async def update_posting(id: str, posting: Posting):
    insert_stmt= \
    sqlalchemy.text("UPDATE posting SET job_name = {job_name}, job_description = {job_desc}, med_salary = {salary}, sponsor = {sponsor}, remote_allowed = {remote}, location = {location}, post_date = {post_date}, ng_or_internship = {i_status}, company_id = {cid} WHERE posting_id = {id};" \
        .format(id=id, job_name=posting.job_name, job_desc=posting.job_description, salary = posting.med_salary, sponsor=posting.sponsor, \
            remote=posting.remote_allowed, location=posting.location, post_date=posting.post_date, i_status=posting.ng_or_internship, c_id=posting.company_id))
    db_conn.execute(insert_stmt)
    return "Updated posting"

@app.put("/application/{user_id}/{posting_id}/update")
async def update_application(user_id: str, posting_id:str, status: Status):
    insert_stmt=sqlalchemy.text("UPDATE applications SET status = {status} WHERE posting_id = {pid} AND user_id = {uid};".format(pid=posting_id, uid=user_id, status = status.status))
    db_conn.execute(insert_stmt)
    return "Updated posting status"

@app.get("/posting/{id}/delete")
async def delete_posting(id: str):
    insert_stmt= \
    sqlalchemy.text("DELETE FROM applications WHERE posting_id = {id};" \
        .format(id=id))
    db_conn.execute(insert_stmt)
    return "Deleted Posting"

@app.get("/application/{uid}/{pid}/delete")
async def delete_application(uid: str, pid: str):
    insert_stmt= \
    sqlalchemy.text("DELETE FROM applications WHERE posting_id = {pid} AND user_id = {uid};" \
        .format(uid=uid, pid=pid))
    db_conn.execute(insert_stmt)
    return "Deleted Application"

@app.get("/user/{id}/delete")
async def delete_user(id: str):
    insert_stmt= \
    sqlalchemy.text("DELETE FROM user WHERE user_id = {id};" \
        .format(id=id))
    db_conn.execute(insert_stmt)
    return "Deleted User"

