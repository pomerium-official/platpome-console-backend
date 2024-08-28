import exceljs from 'exceljs';
import express from 'express';

export class ExcelUtil {
  //
  private excel;

  constructor() {
    this.excel = exceljs;
  }

  downLoadExcel = async (
    res: express.Response,
    headers: { header: string; key: string }[],
    records: any,
    fileName?: string,
    sheetName?: string
  ) => {
    //
    const workbook = new this.excel.Workbook();

    workbook.addWorksheet(sheetName ?? 'Sheet 1');
    const firstSheet = workbook.getWorksheet(sheetName ?? 'Sheet 1');

    firstSheet.columns = headers;
    records.map((record: any) => firstSheet.addRow(Object.values(record)));

    firstSheet.columns.forEach((column) => {
      let maxLength = 0;
      column['eachCell']!({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        if (columnLength > maxLength) {
          maxLength = columnLength + 2;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader(
      'Content-disposition',
      'attachment; filename=' + `${fileName ?? `${new Date().getTime()}`}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  };
}
