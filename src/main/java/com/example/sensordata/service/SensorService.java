package com.example.sensordata.service;

import com.example.sensordata.model.SensorData;
import com.example.sensordata.repository.SensorDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SensorService {

    @Autowired
    private SensorDataRepository sensorDataRepository;

    public SensorData saveSensorData(SensorData sensorData) {
        sensorDataRepository.save(sensorData);
        return sensorData;
    }

    public List<SensorData> getAllSensorData() {
        return sensorDataRepository.findAll();
    }

    public List<SensorData> getSensorDataByType(String sensorType) {
        return sensorDataRepository.findBySensorType(sensorType);
    }
}