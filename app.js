console.log("Khoi dong MQTT...");

const client = mqtt.connect(
    "ws://broker.hivemq.com:8000/mqtt"
);

client.on("connect", function ()
{
    console.log("Da ket noi MQTT");

    document.getElementById("mqtt_status").innerHTML =
        "Da ket noi MQTT";

    client.subscribe(
        "lc_truong_aquarium_2026/test"
    );
});

client.on("message", function (topic, message)
{
    let data = message.toString();

    console.log("Nhan:", topic, data);

    document.getElementById("esp_data").innerHTML =
        data;
});

client.on("error", function (error)
{
    console.log("Loi MQTT:", error);

    document.getElementById("mqtt_status").innerHTML =
        "Loi ket noi MQTT";
});

function guiLenh()
{
    client.publish(
        "lc_truong_aquarium_2026/test2",
        "Hello from Web"
    );

    console.log("Da gui: Hello from Web");
}