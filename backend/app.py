# to run flask: > python app.py

from flask import Flask,  request, jsonify
from flask_cors import CORS
from my_scripts import PredictionClass


app = Flask(__name__)
CORS(app)

main_prediction_class = PredictionClass()

print("Endpoints:")
print("http://localhost:5000/")
print("http://localhost:5000/prediction_isotherm")
print("http://localhost:5000/reverse_engineering")


@app.route('/')
def hello():
    return 'Test message: Hello from Flask!'


# get data from POST request (application/JSON) - http://localhost:5000/prediction_isotherm
@app.route('/prediction_isotherm', methods=['POST'])
def prediction_isotherm():
    response_data = main_prediction_class.make_simulation(request)
    return  jsonify(response_data)


@app.route('/reverse_engineering', methods=['POST'])
def reverse_engineering():
    response_data = main_prediction_class.reverse_engineering(request)
    return jsonify(response_data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000 )  # This runs the Flask app, making it accessible on all network interfaces (0.0.0.0), and the app will be accessible at port 5000 on the local machine.
    # app.run(debug=True)


