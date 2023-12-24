import { app } from "electron";
import path from "path";
import fs from "fs";

const SETTINGS_FILE = path.join(app.getPath("userData"), "settings.json");

export class UserSettings {
  data: undefined | UserSettings.UserSettingsData;
  constructor() {
    try {
      this.data = JSON.parse(fs.readFileSync(SETTINGS_FILE).toString());
    } catch (e) {
      console.error(e);
    }
  }

  SetValue(
    key: keyof UserSettings.UserSettingsData,
    value: UserSettings.UserSettingsData[keyof UserSettings.UserSettingsData],
  ) {
    if (!this.data) {
      this.data = {
        [key]: value,
      };
    } else {
      this.data[key] = value;
    }

    // let it throw to catch on renderer
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(this.data));
  }
}
