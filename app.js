const options = {

    host: "5d7c2f915048459c847031acfc629ce9.s1.eu.hivemq.cloud",

    port: 8884,

    protocol: "wss",

    path: "/mqtt",

    username: "LECONGTRUONG",

    password: "Letruong57!@",

    clientId: "WEB_" + Math.random().toString(16).substr(2,8)

};

const client = mqtt.connect(options);

//========================

client.on("connect", function () {

    console.log("MQTT Connected");

    let st = document.getElementById("status");

    st.innerHTML = "Đã kết nối";

    st.className = "online";

    client.subscribe("hoca/status");

});

//========================

client.on("message", function (topic, message) {

    let data = message.toString();

    console.log("Topic:", topic);
    console.log("Message:", data);

    if (topic == "hoca/status") {

        try {

            let json = JSON.parse(data);

            document.getElementById("deviceStatus").innerHTML =

                "💡 Đèn: <b>" + (json.den ? "BẬT" : "TẮT") + "</b><br>" +

                "🌊 Lọc nước: <b>" + (json.loc ? "BẬT" : "TẮT") + "</b><br>" +

                "🔥 Sưởi: <b>" + (json.suoi ? "BẬT" : "TẮT") + "</b><br>" +

                "Co2: <b>" + (json.co2 ? "BẬT" : "TẮT") + "</b><br>" +

                "🐟 Cho ăn: <b>" + (json.cho_an ? "ĐANG CHẠY" : "SẴN SÀNG") + "</b>";

        }
        catch (e) {

            console.log("Lỗi JSON:", e);

        }

    }

});

//========================

client.on("reconnect", function () {

    console.log("Reconnect");

});

client.on("close", function () {

    let st = document.getElementById("status");

    st.innerHTML = "Mất kết nối";

    st.className = "offline";

});

client.on("error", function (err) {

    console.log(err);

});

//========================

function publish(topic, msg) {

    client.publish(topic, msg);

}

//========================
// Đèn
//========================

function batDen() {

    publish("hoca/den", "ON");

}

function tatDen() {

    publish("hoca/den", "OFF");

}

//========================
// Lọc
//========================

function batLoc() {

    publish("hoca/loc", "ON");

}

function tatLoc() {

    publish("hoca/loc", "OFF");

}

//========================
// Sưởi
//========================

function batSuoi() {

    publish("hoca/suoi", "ON");

}

function tatSuoi() {

    publish("hoca/suoi", "OFF");

}

function batCo2() {

    publish("hoca/co2", "ON");

}

function tatCo2() {

    publish("hoca/co2", "OFF");

}
//========================
// Cho ăn
//========================

function choAn() {

    publish("hoca/choan", "ON");

}

//========================
// Lấy trạng thái
//========================

function layTrangThai() {

    publish("hoca/get_status", "GET");

}
