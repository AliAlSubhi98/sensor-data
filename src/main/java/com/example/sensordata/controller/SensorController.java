package com.example.sensordata.controller;

import com.example.sensordata.model.SensorData;
import com.example.sensordata.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @PostMapping("/data")
    public ResponseEntity<SensorData> receiveSensorData(@RequestBody SensorData sensorData) {
        // Save the sensor data and return it as a response
        SensorData savedData = sensorService.saveSensorData(sensorData);
        return new ResponseEntity<>(savedData, HttpStatus.CREATED); // Return the saved data with a 201 status
    }

    @GetMapping("/all")
    public ResponseEntity<List<SensorData>> getAllSensorData() {
        List<SensorData> sensorDataList = sensorService.getAllSensorData();
        return new ResponseEntity<>(sensorDataList, HttpStatus.OK); // Return the list of sensor data with a 200 status
    }

    @GetMapping("/filter")
    public ResponseEntity<List<SensorData>> getSensorDataByType(@RequestParam String sensorType) {
        List<SensorData> filteredData = sensorService.getSensorDataByType(sensorType);
        return new ResponseEntity<>(filteredData, HttpStatus.OK); // Return the filtered data with a 200 status
    }
}
