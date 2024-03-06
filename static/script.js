document.addEventListener("DOMContentLoaded", function() {
    const hitung = document.querySelector(".container");
    const hasil_hitung_normal = document.querySelector(".container1");
    const hasil_hitung_tidak_normal = document.querySelector(".container2");

    
    //tidak dibawah 300
    var input1 = document.getElementById("input1");
    var errorMessage1 = document.getElementById("error-message1");

    //max suhu
    input1.addEventListener("input", function () {
        var nilai = parseInt(input1.value, 10);

        if (nilai < 89 || nilai > 301) {
            input1.classList.add("input-error");
            errorMessage1.textContent = "Nilai harus antara 89 dan 300";
        } else {
            input1.classList.remove("input-error");
            errorMessage1.textContent = "";
        }
    });



    document.getElementById("tombol-home").addEventListener("click", function() {
        hitung.style.display = "grid";
        hasil_hitung_normal.style.display = "none";
        hasil_hitung_tidak_normal.style.display = "none";
    })

    document.getElementById("detect").addEventListener("click", function(){
        // mendefinisikan data dari input
        // BPM
        var nilaiBPM = document.getElementById("BPM").innerHTML;
        //SPO2
        var nilaiSPO2 = document.getElementById("SPO2").innerHTML;
        //SUHU
        var nilaisuhu = document.getElementById("suhu").innerHTML;
        //Tekanan Darah
        var dataToSend1 = document.getElementById("input1").value;
    
        //tipe konduktansi kulit
        var selectedOption = Konduktansi.options[Konduktansi.selectedIndex];
        var selectedKonduktansi = selectedOption.value;
    
        //Cek apakah semua input telah dimasukkan
        if (input1.value !== "") {
            
            input1.value = "";
    
            //Nyeri reset
            pilihanKonduktansi.selectedIndex = 0;
    
            var inputInt1 = parseInt(nilaiBPM);
            var inputInt2 = parseInt(nilaiSPO2);
            var inputInt3 = parseInt(nilaisuhu);
            var inputInt4 = parseInt(dataToSend1);
            var inputInt5 = parseInt(selectedKonduktansi);
    
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
                    console.log(data.hasil1)
                    var hasilElement1 = document.getElementById("hasil1");
                    if(data.hasil2) {
                        hitung.style.display = "none";
                        hasil_hitung_normal.style.display = "grid";
                        hasil_hitung_tidak_normal.style.display = "none";
                        hasilElement1.innerHTML = data.hasil1
                    } else {
                        hitung.style.display = "none";
                        hasil_hitung_normal.style.display = "none";
                        hasil_hitung_tidak_normal.style.display = "grid";
                        hasilElement1.innerHTML = data.hasil2
                    }
            
            
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




