from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)
DB_NAME = 'ips.db'

# Initialize SQLite DB
def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS reversed_ips (ip TEXT)')

# Reverse and store IP in the database
def store_ip(ip):
    reversed_ip = '.'.join(reversed(ip.split('.')))
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute("INSERT INTO reversed_ips (ip) VALUES (?)", (reversed_ip,))
    return reversed_ip

# Route to display reversed IPs
@app.route('/')
def index():
    with sqlite3.connect(DB_NAME) as conn:
        reversed_ips = conn.execute("SELECT * FROM reversed_ips").fetchall()
    return render_template('index.html', reversed_ips=reversed_ips)

# Route to reverse public IP
@app.route('/reverse_ip')
def reverse_ip_view():
    ip = request.remote_addr  # Get the client's IP
    reversed_ip = store_ip(ip)  # Reverse and store the IP
    return f'Reversed IP: {reversed_ip}'

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)
