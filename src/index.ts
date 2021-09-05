const gas: any = global;
import ical from 'ical-generator';
import { DateTime } from 'luxon';

gas.doGet = (e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput => {
  if (!e.parameter.sheet) {
    throw new Error('Parameter [sheet] is empty.');
  }

  const propPref = e.parameter.sheet.toUpperCase();
  const spreadSheetId = getProperty(`${propPref}_SPREAD_SHEET_ID`);
  const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
  const sheetName = getProperty(`${propPref}_SHEET_NAME`);

  const sheet = spreadSheet.getSheetByName('Calendar');
  if (!sheet) {
    throw new Error(`Sheet [${sheetName}] is not found.`);
  }
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  let categories: string[] | undefined = undefined;
  if (e.parameter.categories) {
    categories = e.parameter.categories.split(',');
  }

  const cal = ical();

  for (let row = 2; row <= lastRow; row++) {
    const data = sheet.getRange(row, 1, 1, lastColumn).getValues()[0];
    const category = String(data[3]);
    if (categories && !categories.includes(category)) continue;
    if (!data[0]) break;

    const targetDate = DateTime.fromJSDate(data[0] as Date);
    const startTime = data[1] ? DateTime.fromJSDate(data[1]) : undefined;
    const endTime = data[2] ? DateTime.fromJSDate(data[2]) : undefined;

    let startDate = targetDate;
    if (startTime) {
      startDate = startDate.set({
        hour: startTime.hour,
        minute: startTime.minute,
        second: startTime.second
      });
    }

    let endDate = targetDate;
    if (endTime) {
      endDate = endDate.set({
        hour: endTime.hour,
        minute: endTime.minute,
        second: endTime.second
      });
    }

    cal.createEvent({
      start: startDate,
      end: endDate,
      summary: String(data[4]),
      description: String(data[5]),
      url: `https://docs.google.com/spreadsheets/d/${spreadSheetId}/`
    });
  }

  return ContentService.createTextOutput(cal.toString()).setMimeType(
    ContentService.MimeType.ICAL
  );
};

function getProperty(key: string, defaultValue?: string): string {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Undefined property: ${key}`);
}
