from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
# from db import *
from db_simple import *
from classes import *

app = FastAPI()
pool = connect_with_connector()
db_conn = pool.connect()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://jobkinator.web.app", "http://localhost:3000"],  # Add localhost:3000
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"]
)

@app.options("/{rest_of_path:path}")
async def preflight_handler(request: Request, rest_of_path: str):
    return JSONResponse({"message": "Preflight request successful"})

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
        "ng_or_internship": data[8],
        "company_id": data[9]
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
        "url": data[3],
        "address": data[4]
    }
    return {"message": company_data }

# @app.get("/user/{id}/applications")
# def get_user_from_applications(id: str):
#     insert_stmt=sqlalchemy.text("SELECT posting_id FROM applications WHERE user_id = {id};".format(id=id))
#     data =  db_conn.execute(insert_stmt).fetchall()
    
#     res = []
#     for item in data:
#         res.append(item[0])

#     return { "result": res }

@app.get("/user/{user_id}/applications")
def get_user_applications(user_id: str):
    insert_stmt = sqlalchemy.text("SELECT * FROM (SELECT * FROM applications WHERE user_id = {user_id}) user_application NATURAL JOIN posting;".format(user_id=user_id))
    data = db_conn.execute(insert_stmt).fetchall()
    
    res = []
    for item in data:
        application_data = {
            "posting_id": item[0],
            "user_id": item[1],
            "application_date": item[2],
            "status": item[3]
        }
        posting_data = {
            "job_name": item[4],
            "job_description": item[5],
            "med_salary": int(item[6]) if item[6] else None,
            "sponsor": item[7] if item[7] else None,
            "remote_allowed": item[8] if item[8] else None,
            "location": item[9] if item[9] else None,
            "post_date": item[10],
            "ng_or_internship": item[11] if item[11] else None,
            "company_id": item[12] if item[12] else None
        }
        res.append({"application_data": application_data, "posting_data": posting_data})

    return { "result": res }

@app.post("/user/create")
async def create_user(user: User):
    next_id_stmt = sqlalchemy.text("SELECT COALESCE(MAX(user_id), 0) + 1 FROM user;")
    result = db_conn.execute(next_id_stmt)
    next_id = result.scalar()

    if user.school_id == None:
        user.school_id = "NULL"
    if user.company_id == None:
        user.company_id = "NULL"

    insert_text = '''
    INSERT INTO user
    VALUES ({next_id}, {school_id}, {company_id}, {year}, "{user_name}", "{skills}", 0, 0, "{auth_uid}");
    '''.format(next_id=next_id, school_id=user.school_id, company_id=user.company_id, year=user.year, user_name=user.user_name, skills=user.skills, auth_uid=user.auth_uid)

    insert_stmt = sqlalchemy.text(insert_text)
    result = db_conn.execute(insert_stmt)
    db_conn.commit()
    return "User created"

@app.post("/application/create")
async def create_application(application: Application):
    insert_stmt=sqlalchemy.text("INSERT INTO applications VALUES({p_id}, {id}, NOW(), 'Applied');".format(p_id=application.posting_id, id=application.user_id))
    db_conn.execute(insert_stmt)
    db_conn.commit()
    return "Created application"

@app.post("/posting/create")
async def create_posting(posting: Posting):
    insert_text = '''
    INSERT INTO posting VALUES({p_id}, "{job_name}", "{job_desc}", {salary}, {sponsor}, {remote}, "{location}", NOW(), "{i_status}", {c_id});
    '''.format(p_id=posting.posting_id, job_name=posting.job_name, job_desc=posting.job_description, salary = posting.med_salary, sponsor=posting.sponsor, \
                remote=posting.remote_allowed, location=posting.location, post_date=posting.post_date, i_status=posting.ng_or_internship, c_id=posting.company_id)

    insert_stmt = sqlalchemy.text(insert_text)
    db_conn.execute(insert_stmt)
    db_conn.commit()
    return "Created posting"

@app.post("/user/{id}/update")
async def update_user(id: str, user: User):
    if user.school_id == None:
        user.school_id = "NULL"
    if user.company_id == None:
        user.company_id = "NULL"

    insert_text = '''
    UPDATE user
    SET school_id = {sid}, company_id = {cid}, year = {year}, user_name = "{username}", skills = "{skills}", authuid = "{auth_uid}", current_streak = {current_streak}
    WHERE user_id = {id};
    '''.format(id=id, sid=user.school_id, cid=user.company_id, year=user.year, username=user.user_name, skills=user.skills, auth_uid=user.auth_uid, current_streak=user.current_streak)
    
    insert_stmt= sqlalchemy.text(insert_text)
    db_conn.execute(insert_stmt)
    db_conn.commit()
    return "Updated user"

@app.post("/posting/{id}/update")
async def update_posting(id: str, posting: Posting):
    insert_text = '''
    UPDATE posting
    SET job_name = "{job_name}", job_description = "{job_desc}", med_salary = {salary}, sponsor = {sponsor}, remote_allowed = {remote},
        location = "{location}", ng_or_internship = "{i_status}", company_id = {c_id}
    WHERE posting_id = {id};
    '''.format(id=id, job_name=posting.job_name, job_desc=posting.job_description, salary = posting.med_salary, sponsor=posting.sponsor, \
            remote=posting.remote_allowed, location=posting.location, i_status=posting.ng_or_internship, c_id=posting.company_id)

    insert_stmt= sqlalchemy.text(insert_text)
    db_conn.execute(insert_stmt)
    db_conn.commit()
    return "Updated posting"

@app.post("/application/{user_id}/{posting_id}/update")
async def update_application(user_id: str, posting_id:str, status: Status):
    insert_stmt=sqlalchemy.text("UPDATE applications SET status = '{status}' WHERE posting_id = {pid} AND user_id = {uid};".format(pid=posting_id, uid=user_id, status = status.status))
    db_conn.execute(insert_stmt)
    db_conn.commit()
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

@app.get("/user/auth/{auth_uid}")
def auth_get_user(auth_uid: str):
    insert_stmt=sqlalchemy.text("SELECT * FROM user WHERE authuid = '{auth_uid}';".format(auth_uid=auth_uid))
    data =  db_conn.execute(insert_stmt).fetchone()
    user_data = {
        "user_id": data[0],
        "school_id": data[1],
        "company_id": data[2],
        "year": int(data[3]) if data[3] else None,
        "user_name": data[4],
        "skills": data[5],
        "current_streak": int(data[6]) if data[6] else None,
        "points": int(data[7]) if data[7] else None,
        "auth_uid": data[8]
    }

    return {"message": user_data }


@app.get("/company/{id}/postings")
def get_postings_from_company(id: str):
    insert_stmt=sqlalchemy.text("SELECT * FROM posting WHERE company_id = {id};".format(id=id))
    data =  db_conn.execute(insert_stmt).fetchall()
    
    res = []
    for item in data:
        res.append(item[0])

    return { "result": res }

@app.get("/company")
def get_all_postings():
    insert_stmt=sqlalchemy.text("SELECT * FROM employer_companies LIMIT 1000;")
    temp = db_conn.execute(insert_stmt).fetchall()

    res = []
    for item in temp:
        res.append(company_result(item[0], item[1], item[2], item[3]))

    return { "result": res }