document.addEventListener("DOMContentLoaded", function() {
    const hitung = document.querySelector(".container");
    const hasil_hitung_tidak_normal = document.querySelector(".container1");
    const hasil_hitung_normal = document.querySelector(".container2");

    
    //tidak dibawah 300
    var input1 = document.getElementById("input1");
    var BPM = document.getElementById("input2");
    var SPO2 = document.getElementById("input3");

    document.getElementById("tombol-home").addEventListener("click", function() {
        hitung.style.display = "grid";
        hasil_hitung_normal.style.display = "none";
        hasil_hitung_tidak_normal.style.display = "none";
    })

    document.getElementById("detect").addEventListener("click", function(){
        // mendefinisikan data dari input
        // BPM
        var nilaiBPM = document.getElementById("input2").value;
        //SPO2
        var nilaiSPO2 = document.getElementById("input3").value;
        //SUHU
        var nilaisuhu = document.getElementById("suhu").innerHTML;
        //Tekanan Darah
        var dataToSend1 = document.getElementById("input1").value;
        // konduktansi kulit
        var nilai_gsr = document.getElementById("gsr").innerHTML;
    
        //Cek apakah semua input telah dimasukkan
        if (input1.value !== "" && BPM.value !== "" && SPO2.value !== "") {
            
            input1.value = "";
            BPM.value = "";
            SPO2.value = "";
    
            var inputInt1 = parseInt(nilaiBPM);
            var inputInt2 = parseInt(nilaiSPO2);
            var inputInt3 = parseInt(nilaisuhu);
            var inputInt4 = parseInt(dataToSend1);
            var inputInt5 = parseInt(nilai_gsr);
    
            var dataToSend = {
                    data1 : inputInt1,
                    data2: inputInt2,
                    data3: inputInt3,
                    data4: inputInt4,
                    data5: inputInt5
                };
            // memeriksa apakah konversi berhasil    
            if (!isNaN(inputInt1 && inputInt2 && inputInt3 && inputInt4 && inputInt5)){
                fetch('/api/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend)
                })
                .then(response => response.json())
                .then(data => {
                    setTimeout(function() {
                        console.log(data.hasil1);
                        var hasilElement1 = document.getElementById("hasil1");
                        var hasilElement2 = document.getElementById("hasil2");
                        if (data.hasil2) {
                            hitung.style.display = "none";
                            hasil_hitung_tidak_normal.style.display = "grid";
                            hasil_hitung_normal.style.display = "none";
                            hasilElement1.innerHTML = data.hasil1 + "%";
                        } else {
                            hitung.style.display = "none";
                            hasil_hitung_normal.style.display = "grid";
                            hasil_hitung_tidak_normal.style.display = "none";
                            hasilElement2.innerHTML = data.hasil1 + "%";
                        }
                    }, 10000); // Waktu ditulis dalam milidetik (10 detik)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                alert("masukkan data yang valid (bilangan bulat)");
            }
        } else {
            alert("Silakan isi semua input sebelum menekan tombol.");
        }
    });
})




