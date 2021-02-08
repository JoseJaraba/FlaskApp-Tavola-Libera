from flask import Flask, render_template, url_for, redirect, flash, request
from controllers.forms import *
#from models.models import *
import urllib.parse 
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref
# Configure Database URI: 
params = urllib.parse.quote_plus("Driver={SQL Server};Server=tcp:tavolalibera.database.windows.net,1433;Database=TavolaLiberaDB;Uid=dreamteam;Pwd=Password1;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;")

app = Flask(__name__)
app.config["SECRET_KEY"] = "82c021c5452b33eb5c34b1c9abc2e276"
app.config['SQLALCHEMY_DATABASE_URI'] = "mssql+pyodbc:///?odbc_connect=%s" % params
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

# extensions
db = SQLAlchemy(app)

class User(db.Model):    
    __tablename__ = 'users'

    id = Column(db.Integer, primary_key = True)
    username = Column(db.String(124))
    password = Column(db.String(124))
    security_question_id = Column(db.Integer, ForeignKey('security_questions.id'))
    security_question = relationship("Security_question", backref = backref("user", uselist= False))

    def __init__(self, username, password, security_question, security_answer):
        self.username = username
        self.password = password
        self.security_question_id = security_question
        self.security_answer = security_answer

    def to_string(self):
        string = "Username: " + self.username + "\nPassword: " + self.password + "\nSecurity_Q: " + self.security_question + "\nSecurity_A: " + self.security_answer
        return string


class Security_Question(db.Model):
    __tablename__ = "security_questions"

    id = Column(db.Integer, primary_key = True)
    question = Column(db.String(124))

    def __init__(self, question):
        self.question = question


class Restaurant(db.Model):
    __tablename__ = "restaurants"

    id = Column(db.Integer, primary_key = True)
    name = Column(db.String(124))
    address = Column(db.String(124))
    phone_number = Column(db.String(124))
    user_id = Column(db.Integer, ForeignKey('users.id'))
    user = relationship("User", backref=backref("restaurant", uselist= False))

    def __init__(self, name, address, phone_number, user):
        self.name = name
        self.address = address
        self.phone_number = phone_number
        self.user = user

db.create_all()

@app.route("/", methods=["GET", "POST"])
def index():
    form = LoginForm()
    return render_template("layout.html", form=form)

@app.route("/login", methods=["GET", "POST"])  # De momento login se encuentra el la raiz
def login():
    form = LoginForm()
    
    if form.validate_on_submit():
        if form.username.data == "jose" and form.password.data == "password":  # Prueba
            flash("You Have Been Logged In", "")
            return redirect(url_for("login"))
        else:
            flash("Login Unsuccessful. Please check username and password", "danger")
    return render_template("login.html", form=form)


@app.route('/register', methods=["GET", "POST"])
def register():
    form = RegisterForm()

    if request.method == 'GET':
        return render_template('register.html', form=form)
    else:

        if not form.validate():
            print("Invalid Post")
            print(form.errors)
            return redirect(url_for("register"))
        
        user = User(
            form.username.data,
        form.password.data,
        form.security_question.data,
        form.security_answer.data
        )

        print(user.to_string())
        flash("Usuario Creado")
        
        return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True)


#DB TEST FUNCTION
def print_user_names(_db):
    result = _db.engine.execute("Select {sql} from users")
    names = [row[1] for row in result]
    print(names)