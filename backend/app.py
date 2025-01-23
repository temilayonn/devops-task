from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

# Initialize SQLite DB
def init_db():
    conn = sqlite3.connect('ips.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS reversed_ips (ip TEXT)''')
    conn.commit()
    conn.close()

# Function to reverse the IP
def reverse_ip(ip):
    return '.'.join(reversed(ip.split('.')))

# Store the reversed IP in the database
def store_ip(ip):
    reversed_ip = reverse_ip(ip)
    conn = sqlite3.connect('ips.db')
    c = conn.cursor()
    c.execute("INSERT INTO reversed_ips (ip) VALUES (?)", (reversed_ip,))
    conn.commit()
    conn.close()

# Route to display reversed IPs
@app.route('/')
def index():
    conn = sqlite3.connect('ips.db')
    c = conn.cursor()
    c.execute("SELECT * FROM reversed_ips")
    reversed_ips = c.fetchall()
    conn.close()
    return render_template('index.html', reversed_ips=reversed_ips)

# Route to get public IP and reverse it
@app.route('/reverse_ip')
def reverse_ip_view():
    ip = request.remote_addr  # Get the IP address of the client
    store_ip(ip)  # Store the reversed IP in DB
    reversed_ip = reverse_ip(ip)  # Reverse the IP
    return f'Reversed IP: {reversed_ip}'

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)
