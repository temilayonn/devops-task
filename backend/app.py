from flask import Flask, request, render_template
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['ips_db']  # Use a database called ips_db
ips_collection = db['reversed_ips']  # Use a collection (similar to a table) called reversed_ips

# Initialize MongoDB collection (you can skip this part as MongoDB auto-creates collections)
def init_db():
    if 'reversed_ips' not in db.list_collection_names():
        ips_collection.create_index('ip', unique=True)  # Optional: Ensures no duplicate IPs

# Reverse and store IP in the database
def store_ip(ip):
    reversed_ip = '.'.join(reversed(ip.split('.')))
    # Store reversed IP in MongoDB
    ips_collection.insert_one({'ip': reversed_ip})
    return reversed_ip

# Route to display reversed IPs
@app.route('/')
def index():
    reversed_ips = list(ips_collection.find())  # Fetch all reversed IPs from MongoDB
    return render_template('index.html', reversed_ips=reversed_ips)

# Route to reverse public IP
@app.route('/reverse_ip')
def reverse_ip_view():
    ip = request.remote_addr  # Get the client's IP
    reversed_ip = store_ip(ip)  # Reverse and store the IP
    return f'Reversed IP: {reversed_ip}'

if __name__ == '__main__':
    init_db()  # Initialize DB (check collections)
    app.run(host='0.0.0.0', port=5000)
