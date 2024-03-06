from flask import Flask, request, jsonify, render_template
from test import hitung

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
    teks = hitung(int(data_BPM), int(data_SPO2), int(data_suhu), int(data_Tekanan), int(data_Konduktivitas))
    return jsonify({
        'hasil1': str(teks),
        'hasil2': True
    })

if __name__ == '__main__':
    app.run(debug=True)
