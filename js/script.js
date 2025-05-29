navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(function(stream) {
        Quagga.init({
            inputStream : {
                name : "Live",
                type : "LiveStream",
                constraints: {
                    width: 320,
                    height: 240,
                    facingMode: 'environment' // Sử dụng camera sau nếu có
                },
                target: document.querySelector('#interactive')
            },
            decoder : {
                readers : ["ean_13_reader"] // Chọn định dạng mã vạch bạn muốn hỗ trợ
            }
        }, function(err) {
            if (err) {
                console.error(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        Quagga.onDetected(function(result) {
            console.log("Barcode detected and processed: ", result);
            var code = result.codeResult.code;
            document.getElementById("result").innerText = "Mã vạch: " + code;
            // Ở đây bạn có thể thực hiện các hành động khác, ví dụ như tìm kiếm thông tin sản phẩm
            // (nếu bạn có dữ liệu sản phẩm được lưu trữ ở đâu đó).
        });
    })
    .catch(function(err) {
        console.error("Không thể truy cập camera: ", err);
    });