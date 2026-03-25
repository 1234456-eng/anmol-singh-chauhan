from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Create DB
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS passwords (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            website TEXT,
            username TEXT,
            password TEXT
        )
    ''')

    conn.commit()
    conn.close()
    print("Database created!")

init_db()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_password():
    try:
        data = request.get_json()
        print("DATA:", data)
        username = data.get('username')
        password = data.get('password')

        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO passwords (username, password) VALUES (?, ?, ?)",
             (username, password)
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Saved successfully!"})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"message": "Error saving password"})

if __name__ == '__main__':
    app.run(debug=True)