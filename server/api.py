from fastapi import FastAPI
# import db
# import db_simple

app = FastAPI()

@app.get("/posting")
def get_all_postings():
    return getpostall()

@app.get("/posting/id")
def get_post_by_id(id: str):
    return getpostid(id)

@app.get("/companies")
def get_all_companies():
    return getcompanyall()