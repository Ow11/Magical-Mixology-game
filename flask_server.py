from flask import Flask, jsonify



app = Flask(__name__, static_folder="/", static_url_path="/")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@app.errorhandler(404)
def catch_all(path):
    return app.send_static_file("index.html")


if __name__ == '__main__':
    app.run()
