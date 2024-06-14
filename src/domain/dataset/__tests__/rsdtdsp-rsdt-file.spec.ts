/*!
 * MIT License
 *
 * Copyright (c) 2023 デジタル庁
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { IDatasetFileMeta } from '@domain/dataset-file';
import { DataField } from '@domain/dataset/data-field';
import { IStreamReady } from '@domain/istream-ready';
import { describe, expect, it } from '@jest/globals';
import { RsdtdspRsdtFile } from '../rsdtdsp-rsdt-file';

describe('RsdtdspRsdtFile', () => {
  it.concurrent('should create an instance', async () => {
    const fileMeta: IDatasetFileMeta = {
      type: 'rsdtdsp_rsdt',
      fileArea: 'pref02',
      path: 'dummy',
      filename: 'mt_rsdtdsp_rsdt_pref02.csv',
    };

    const istreamReady: IStreamReady = {
      name: 'mt_rsdtdsp_rsdt_pref02.csv',
      crc32: 123456,
      contentLength: 123456,
      lastModified: 123456,
      getStream: function (): Promise<NodeJS.ReadableStream> {
        throw new Error('Function not implemented.');
      }
    }
    const instance = RsdtdspRsdtFile.create(fileMeta, istreamReady);
    expect(instance).not.toBeNull();
    expect(instance.filename).toBe('mt_rsdtdsp_rsdt_pref02.csv');
    expect(instance.type).toBe('rsdtdsp_rsdt');
    expect(instance.fields).toEqual([
      DataField.LG_CODE,
      DataField.MACHIAZA_ID,
      DataField.BLK_ID,
      DataField.RSDT_ID,
      DataField.RSDT2_ID,
      DataField.CITY,
      DataField.WARD,
      DataField.OAZA_CHO,
      DataField.CHOME,
      DataField.KOAZA,
      DataField.BLK_NUM,
      DataField.RSDT_NUM,
      DataField.RSDT_NUM2,
      DataField.BASIC_RSDT_DIV,
      DataField.RSDT_ADDR_FLG,
      DataField.RSDT_ADDR_MTD_CODE,
      DataField.STATUS_FLG,
      DataField.EFCT_DATE,
      DataField.ABLT_DATE,
      DataField.SRC_CODE,
      DataField.REMARKS,
    ]);
  });

  it.concurrent('should return expected values from a given row', async () => {
    const fileMeta: IDatasetFileMeta = {
      type: 'rsdtdsp_rsdt',
      fileArea: 'pref02',
      path: 'dummy',
      filename: 'mt_rsdtdsp_rsdt_pref02.csv',
    };
    const istreamReady: IStreamReady = {
      name: 'mt_rsdtdsp_rsdt_pref02.csv',
      crc32: 123456,
      contentLength: 123456,
      lastModified: 123456,
      getStream: function (): Promise<NodeJS.ReadableStream> {
        throw new Error('Function not implemented.');
      }
    }
    const instance = RsdtdspRsdtFile.create(fileMeta, istreamReady);
    const reuslt = instance.parseFields({
      [DataField.LG_CODE.csv]: '22012',
      [DataField.MACHIAZA_ID.csv]: '2001',
      [DataField.BLK_ID.csv]: '1',
      [DataField.RSDT_ID.csv]: '1',
      [DataField.RSDT2_ID.csv]: '',
      [DataField.CITY.csv]: '青森市',
      [DataField.WARD.csv]: '',
      [DataField.OAZA_CHO.csv]: '青柳',
      [DataField.CHOME.csv]: '一丁目',
      [DataField.KOAZA.csv]: '',
      [DataField.BLK_NUM.csv]: '',
      [DataField.RSDT_NUM.csv]: '1',
      [DataField.RSDT_NUM2.csv]: '1',
      [DataField.BASIC_RSDT_DIV.csv]: '',
      [DataField.RSDT_ADDR_FLG.csv]: '0',
      [DataField.RSDT_ADDR_MTD_CODE.csv]: '1',
      [DataField.STATUS_FLG.csv]: '0',
      [DataField.EFCT_DATE.csv]: '1947-04-17',
      [DataField.ABLT_DATE.csv]: '',
      [DataField.SRC_CODE.csv]: '0',
      [DataField.REMARKS.csv]: '',
    });

    expect(reuslt).toMatchObject({
      [DataField.LG_CODE.dbColumn]: '22012',
      [DataField.MACHIAZA_ID.dbColumn]: '2001',
      [DataField.BLK_ID.dbColumn]: '1',
      [DataField.RSDT_ID.dbColumn]: '1',
      [DataField.RSDT2_ID.dbColumn]: '',
      [DataField.CITY.dbColumn]: '青森市',
      [DataField.WARD.dbColumn]: '',
      [DataField.OAZA_CHO.dbColumn]: '青柳',
      [DataField.CHOME.dbColumn]: '一丁目',
      [DataField.KOAZA.dbColumn]: '',
      [DataField.BLK_NUM.dbColumn]: '',
      [DataField.RSDT_NUM.dbColumn]: '1',
      [DataField.RSDT_NUM2.dbColumn]: '1',
      [DataField.BASIC_RSDT_DIV.dbColumn]: '',
      [DataField.RSDT_ADDR_FLG.dbColumn]: '0',
      [DataField.RSDT_ADDR_MTD_CODE.dbColumn]: '1',
      [DataField.STATUS_FLG.dbColumn]: '0',
      [DataField.EFCT_DATE.dbColumn]: '1947-04-17',
      [DataField.ABLT_DATE.dbColumn]: '',
      [DataField.SRC_CODE.dbColumn]: '0',
      [DataField.REMARKS.dbColumn]: '',
    });
  });
})