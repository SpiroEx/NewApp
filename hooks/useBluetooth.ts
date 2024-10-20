import notify from "@/myfunctions/notify";
import { useEffect, useState } from "react";

export type BluetoothStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

export const useBluetooth = () => {
  const [status, setBluetoothStatus] = useState<BluetoothStatus>(
    "disconnected"
  );
  const [
    characteristic,
    setCharacteristic,
  ] = useState<BluetoothRemoteGATTCharacteristic | null>(null);

  const connect = async () => {
    try {
      //! Requires "react-bluetooth" package
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["2a9f8a61-4794-4223-a096-9612239d9a87"] }],
        // Change this to the service UUID of your BLE device
      });
      console.log("Connected to device:", device.name);

      const server = await device.gatt?.connect();
      console.log("Connected to GATT server:", server);

      // Assuming you want to interact with a specific service and characteristic
      const service = await server?.getPrimaryService(
        "2a9f8a61-4794-4223-a096-9612239d9a87"
      );
      console.log("Primary service:", service);

      // Example: Reading a characteristic
      const characteristic = await service?.getCharacteristic(
        "91c775d9-746d-4e88-a268-cf39b5fd149c"
      );

      if (!characteristic) {
        console.error("Error: Characteristic not found");
        throw new Error("Characteristic not found");
      }

      setCharacteristic(characteristic);

      // await FH.MyUser.update(myUser, { device_id: deviceId });
      notify("Connected to Land Rover", { type: "success" });
      setBluetoothStatus("connected");
    } catch (error) {
      notify(String(error), { type: "error" });
      console.error("Error connecting to Bluetooth device:", error);
      setBluetoothStatus("error");
    }
  };

  const write = async (data: string) => {
    if (characteristic === null) {
      setBluetoothStatus("error");
      console.error("Error Bluetooth write: Characteristic is null.");
      return;
    }

    const encoder = new TextEncoder();
    const dataToSend = encoder.encode(data);
    await characteristic.writeValue(dataToSend);
    // console.log("Data sent to Bluetooth device:", data);
  };

  const read = async () => {
    if (characteristic === null) {
      setBluetoothStatus("error");
      console.error("Error Bluetooth read: Characteristic is null.");
      return;
    }

    const value = await characteristic?.readValue();
    const decoder = new TextDecoder("utf-8");
    const data = decoder.decode(value);

    if (data === "") {
      console.error("Error: Device ID is empty");
    }

    // console.log("value:", data);
    return data;
  };

  return { status, connect, write, read };
};
