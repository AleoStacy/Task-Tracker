from flask import Flask, request, jsonify
from models import db, Task, User  # Import db, Task, and User from models.py
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from flask_migrate import Migrate

# Initialize the app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for the frontend

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Flask-SQLAlchemy for database operations
db.init_app(app)

# Initialize Flask-Migrate for database migrations
migrate = Migrate(app, db)

# JWT setup
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure key in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)  # Token expiration

# Initialize JWTManager
jwt = JWTManager(app)

# Create the database tables
with app.app_context():
    db.create_all()

# Endpoint to get all tasks
@app.route("/api/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()  # Get the user ID from the JWT token
    tasks = Task.query.filter_by(owner_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks])

# Endpoint to add a new task
@app.route("/api/tasks", methods=["POST"])
@jwt_required()
def add_task():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    user_id = get_jwt_identity()  # Get the user ID from the JWT token
    new_task = Task(
        text=data.get('text'),
        completed=data.get('completed', False),
        priority=data.get('priority'),
        due_date=data.get('dueDate'),
        collaborator=data.get('collaborator'),
        owner_id=user_id  # Associate task with logged-in user
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

# Endpoint to update a task
@app.route("/api/tasks/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    task = Task.query.get_or_404(task_id)
    if 'completed' in data:
        task.completed = data['completed']
    if 'text' in data:
        task.text = data['text']
    if 'priority' in data:
        task.priority = data['priority']
    if 'dueDate' in data:
        task.due_date = data['dueDate']
    if 'collaborator' in data:
        task.collaborator = data['collaborator']

    db.session.commit()
    return jsonify(task.to_dict())

# Endpoint to delete a task
@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"})

# Endpoint for user registration
@app.route("/signup", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(email=email)
    new_user.set_password(password)  # Hash the password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        print(f"User with email {email} not found")  # Debugging

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify({"message": "Invalid email or password"}), 401
