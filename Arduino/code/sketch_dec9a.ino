#include <dht_nonblocking.h>
#define DHT_SENSOR_TYPE DHT_TYPE_11

static const int DHT_SENSOR_PIN = 2;
DHT_nonblocking dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

/*
 * Initialize the serial port.
 */
void setup() {
  Serial.begin(9600);  // Initialize serial communication
}

/*
 * Measure temperature and humidity. Returns true if measurement is available.
 */
static bool measure_environment(float *temperature, float *humidity) {
  static unsigned long measurement_timestamp = millis();

  /* Measure once every three seconds. */
  if (millis() - measurement_timestamp > 30000ul) {
    if (dht_sensor.measure(temperature, humidity) == true) {
      measurement_timestamp = millis();
      return true;
    }
  }
  return false;
}

/*
 * Main program loop.
 */
void loop() {
  float temperature;
  float humidity;

  // Measure and send temperature and humidity
  if (measure_environment(&temperature, &humidity) == true) {
    Serial.print(temperature, 1);
    Serial.print(",");
    Serial.println(humidity, 1);
  }
}
