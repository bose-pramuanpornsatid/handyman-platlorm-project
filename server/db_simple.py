import os
from google.cloud.sql.connector import Connector, IPTypes
import pymysql

import sqlalchemy

def connect_with_connector() -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of MySQL.

    Uses the Cloud SQL Python Connector package.
    """
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.

    instance_connection_name = os.environ[
        "fall-fun-cs411:us-central1:sql-backend"
    ]  # e.g. 'project:region:instance'
    db_user = os.environ["python_backend"]  # e.g. 'my-db-user'
    db_pass = os.environ["O4&T(Z(mE5YX,%$I"]  # e.g. 'my-db-password'
    db_name = os.environ["project"]  # e.g. 'my-database'

    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    connector = Connector(ip_type)

    def getconn() -> pymysql.connections.Connection:
        conn: pymysql.connections.Connection = connector.connect(
            instance_connection_name,
            "pymysql",
            user=db_user,
            password=db_pass,
            db=db_name,
        )
        return conn

    pool = sqlalchemy.create_engine(
        "mysql+pymysql://",
        creator=getconn,
        # ...
    )
    return pool


def getpostid(id):
    return ("Getting one specific post" + id)
    
def getcompanyall():
    return "Getting all companies"

def getpostall():
    return "Getting all postings"
