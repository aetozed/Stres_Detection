from flask import Flask, request, jsonify, render_template
from Fuzzy2 import model_fuzzy
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json

    if 'data1' in data and 'data2' in data and 'data3' in data and 'data4' in data and 'data5' in data:
        data_BPM = data['data1']
        data_SPO2 = data['data2']
        data_suhu = data['data3']
        data_Tekanan = data['data4']
        data_Konduktivitas = data['data5']
    # Lakukan sesuatu dengan data yang diterima di sini
    
    # Kirim balik respons ke JavaScript
    hasil = round(model_fuzzy(float(data_BPM), float(data_Tekanan), float(data_suhu), float(data_Konduktivitas), float(data_SPO2)), 2)
    if hasil >= 50:
        hasil2 = True
    else:
        hasil2 = False 
    
    return jsonify({
        'hasil1': hasil,
        'hasil2': hasil2
    })

if __name__ == "__main__":
  app.run(debug=False, host='0.0.0.0')