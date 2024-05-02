#models.py file: Here is where we create our DB by creating the model classes (class Users, class Profiles, etc) to represent a User object, Profile Object, etc. in our code 
# that will correspond to a User table, Profile table, etc in our database.

from flask_sqlalchemy import SQLAlchemy

# We use SQLAlchemy() from Flask to create a database instance (db) linked to the Flask app
db = SQLAlchemy()

# We create a class (1 class = 1 table) that will inherit from the Flask-SQLAlchemy Model class. Naming convention: PascalCase, plural
class Users(db.Model):
     # 1. We create the table alias __tablename__. Naming convention: snake_case
    __tablename__ = "users"
     # 2. We define the columns of the table:
    # 2.1. We define the primary key, with data type, primary_key=True
    id = db.Column(db.Integer, primary_key=True)
    # 2.2. We define the model attributes (if any), with data type
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    #2.3. We define the foreign key (if any), with data type, db.ForeignKey('alias.id')
    #3. We define the relationships (if any): db.relationship(Models)

    # rep method is used to define the string representation of an object.Here it will print a string with the user's email (It's used for debugging)
    def __repr__(self):
        return f'<User {self.email}>'

    # serialize is what we return to our front-end
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }