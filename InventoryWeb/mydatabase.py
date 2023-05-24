import mysql.connector

database = mysql.connector.connect(
    host = 'localhost',
    user = 'admin',
    passwd = 'password'

)

# prepare a cursor object
cursor_object = database.cursor()

# Create a database
cursor_object.execute("CREATE DATABASE smartinventory")

print("Create database successfully!")