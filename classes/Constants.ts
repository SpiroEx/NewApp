export abstract class StorageNames {}

export const Constants = {
  powerUnit: "kWh",
  currentUnit: "A",
  voltageUnit: "V",
  temperatureUnit: "°C",
  humidityUnit: "%",
  Description:
    "Track real-time current and voltage readings from your Arduino project on our website. Get notified instantly of any surges exceeding the maximum limit for safety and efficiency.",
};

export const Config = {
  useFirebase: true,
  useFCM: false,
  useSignIn: true,
  terms_link:
    "https://www.termsandconditionsgenerator.com/live.php?token=G8aMDV0PD8lLHWKS8I1KJmtSD5TBulEi",
};
