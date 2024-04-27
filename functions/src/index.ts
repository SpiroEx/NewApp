import { FieldValue } from "firebase-admin/firestore";
import { Device } from "../../classes/Device";
import Doc from "./classes/Doc";
import getDoc from "./functions/getDoc";
import initialize from "./functions/initialize";
import print from "./functions/print";
import updateDoc from "./functions/updateDoc";

initialize();

const deviceDoc = new Doc("device/readings", {} as Device);

exports.deviceDocUpdated = deviceDoc.updated(
  async (oldData, newData, params) => {
    const chartDoc = await getDoc<Device>("device/readings");
    await updateDoc<Device>("device/readings", {
      id: FieldValue.increment(1),
    });

    print(`newData: ${newData}`);
  }
);
