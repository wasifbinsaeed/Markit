import os
import tempfile
from pathlib import Path
from flask import Flask, request, jsonify, send_from_directory
from markitdown import MarkItDown

app = Flask(__name__, static_folder="static")
md = MarkItDown()

ALLOWED_EXTENSIONS = {
    "csv", "xlsx", "xls", "pdf", "docx", "doc",
    "pptx", "ppt", "html", "htm", "txt", "json", "xml", "zip",
}

def allowed(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/convert", methods=["POST"])
def convert():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    f = request.files["file"]
    if not f.filename:
        return jsonify({"error": "Empty filename"}), 400
    if not allowed(f.filename):
        return jsonify({"error": f"Unsupported file type. Allowed: {', '.join(sorted(ALLOWED_EXTENSIONS))}"}), 400

    suffix = "." + f.filename.rsplit(".", 1)[1].lower()
    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        f.save(tmp.name)
        tmp_path = tmp.name

    try:
        result = md.convert(tmp_path)
        return jsonify({"markdown": result.text_content, "filename": Path(f.filename).stem + ".md"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        os.unlink(tmp_path)


if __name__ == "__main__":
    os.makedirs("static", exist_ok=True)
    app.run(debug=False, host="127.0.0.1", port=5000)
