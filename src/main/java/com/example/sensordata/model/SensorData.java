package com.example.sensordata.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SensorData {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String sensorType;
  private String dataType; // e.g., temperature, humidity
  private Double value;
  private String unit; // e.g., °C, %, mg/m³

  private LocalDateTime timestamp;

  public SensorData(String sensorType, String dataType, Double value, String unit, LocalDateTime timestamp) {
    this.sensorType = sensorType;
    this.dataType = dataType;
    this.value = value;
    this.unit = unit;
    this.timestamp = timestamp;
  }




}
