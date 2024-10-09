package com.example.sensordata.config;
import com.example.sensordata.model.SensorData;
import com.example.sensordata.repository.SensorDataRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class SampleDataInitializer {

    @Bean
    CommandLineRunner initData(SensorDataRepository repository) {
        return args -> {
            // Sample data
            SensorData[] sampleData = {
                    new SensorData("DHT11", "temperature", 24.0, "°C", LocalDateTime.parse("2024-10-09T12:00:00")),
                    new SensorData("DHT11", "humidity", 58.0, "%", LocalDateTime.parse("2024-10-09T12:00:00")),
                    new SensorData("MQ135", "CO2", 415.0, "ppm", LocalDateTime.parse("2024-10-09T12:01:00")),
                    new SensorData("MQ135", "smoke", 210.0, "ppm", LocalDateTime.parse("2024-10-09T12:02:00")),
                    new SensorData("BMP180", "pressure", 1015.0, "hPa", LocalDateTime.parse("2024-10-09T12:03:00")),
                    new SensorData("GP2Y1010AU0F", "dust", 40.0, "mg/m³", LocalDateTime.parse("2024-10-09T12:04:00")),
                    new SensorData("Water Sensor", "leak", 0.0, "none", LocalDateTime.parse("2024-10-09T12:05:00")),
                    new SensorData("DHT11", "temperature", 22.5, "°C", LocalDateTime.parse("2024-10-09T12:06:00")),
                    new SensorData("DHT11", "humidity", 54.0, "%", LocalDateTime.parse("2024-10-09T12:06:00")),
                    new SensorData("DHT11", "temperature", 21.0, "°C", LocalDateTime.parse("2024-10-09T12:30:00")),
                    new SensorData("DHT11", "humidity", 50.0, "%", LocalDateTime.parse("2024-10-09T12:30:00")),
                    new SensorData("MQ135", "CO2", 420.0, "ppm", LocalDateTime.parse("2024-10-09T12:31:00")),
                    new SensorData("MQ135", "smoke", 205.0, "ppm", LocalDateTime.parse("2024-10-09T12:32:00")),
                    new SensorData("BMP180", "pressure", 1012.0, "hPa", LocalDateTime.parse("2024-10-09T12:33:00")),
                    new SensorData("GP2Y1010AU0F", "dust", 38.0, "mg/m³", LocalDateTime.parse("2024-10-09T12:34:00")),
                    new SensorData("Water Sensor", "leak", 0.0, "none", LocalDateTime.parse("2024-10-09T12:35:00")),
                    new SensorData("DHT11", "temperature", 23.0, "°C", LocalDateTime.parse("2024-10-09T12:36:00")),
                    new SensorData("DHT11", "humidity", 52.0, "%", LocalDateTime.parse("2024-10-09T12:36:00")),
                    new SensorData("DHT11", "temperature", 25.0, "°C", LocalDateTime.parse("2024-10-09T12:45:00")),
                    new SensorData("DHT11", "humidity", 53.0, "%", LocalDateTime.parse("2024-10-09T12:45:00")),
                    new SensorData("MQ135", "CO2", 430.0, "ppm", LocalDateTime.parse("2024-10-09T12:46:00")),
                    new SensorData("MQ135", "smoke", 215.0, "ppm", LocalDateTime.parse("2024-10-09T12:47:00")),
                    new SensorData("BMP180", "pressure", 1010.0, "hPa", LocalDateTime.parse("2024-10-09T12:48:00")),
                    new SensorData("GP2Y1010AU0F", "dust", 34.0, "mg/m³", LocalDateTime.parse("2024-10-09T12:49:00")),
                    new SensorData("Water Sensor", "leak", 0.0, "none", LocalDateTime.parse("2024-10-09T12:50:00")),
                    new SensorData("DHT11", "temperature", 20.0, "°C", LocalDateTime.parse("2024-10-09T12:51:00")),
                    new SensorData("DHT11", "humidity", 51.0, "%", LocalDateTime.parse("2024-10-09T12:51:00"))

            };

            // Save sample data
            repository.saveAll(Arrays.asList(sampleData));
        };
    }
}
