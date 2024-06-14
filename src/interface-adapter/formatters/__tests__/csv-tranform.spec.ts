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
import { describe, expect, it } from '@jest/globals';
import csvtojson from 'csvtojson';
import { Stream } from 'node:stream';
import { CsvTransform } from '../csv-transform';
import { dummyData } from './dummy-data';

describe('CsvTransform', () => {
  it('should output rows with expected CSV format()', async () => {
    const transform = CsvTransform.create(CsvTransform.DEFAULT_COLUMNS);

    const expectCsv = await csvtojson({
      output: 'csv',
    }).fromString([
      CsvTransform.DEFAULT_COLUMNS.join(','),
      [
        '"東京都千代田区紀尾井町1-3　東京ガーデンテラス紀尾井町 19階、20階"',
        '"東京都千代田区紀尾井町1-3 東京ガーデンテラス紀尾井町 19階、20階"',
        '8,131016,東京都,千代田区,紀尾井町,0056000,1,001,3,003,,,,,,," 東京ガーデンテラス紀尾井町 19階、20階",35.681411,139.73495'
      ],
      [
        '"東京都千代田区紀尾井町1"',
        '"東京都千代田区紀尾井町1"',
        '7,131016,東京都,千代田区,紀尾井町,0056000,1,001,,,,,,,,,,35.681411,139.73495',
      ],
      [
        '"山形県山形市旅篭町二丁目3番25号"',
        '"山形県山形市旅篭町二丁目3-25"',
        '8,062014,山形県,山形市,旅篭町二丁目,0247002,3,003,25,025,,,,,,,,38.255437,140.339126'
      ],
      [
        '"山形市旅篭町二丁目3番25号"',
        '"山形県山形市旅篭町二丁目3-25"',
        '8,062014,山形県,山形市,旅篭町二丁目,0247002,3,003,25,025,,,,,,,,38.255437,140.339126',
      ],
      [
        '"東京都町田市森野2-2-22"',
        '"東京都町田市森野二丁目2-22"',
        '8,132098,東京都,町田市,森野二丁目,0006002,2,002,22,022,,,,,,,,35.548247,139.440264'
      ],
      [
        '"島根県松江市末次町23-10"',
        '"島根県松江市末次町23-10"',
        '10,322016,島根県,松江市,末次町,0083000,,,,,,,23,10,,000230001000000,,35.467467,133.049814'
      ],
      [
        '"島根県松江市末次町23番10号"',
        '"島根県松江市末次町23-10"',
        '10,322016,島根県,松江市,末次町,0083000,,,,,,,23,10,,000230001000000,,35.467467,133.049814'
      ],
      [
        '"無効な値"',
        '"無効な値"',
        '0,,,,,,,,,,,,,,,,"無効な値",,'
      ]
    ].join("\n").trim());

    const buffer: string[] = [];
    const writable = new Stream.Writable({
      objectMode: true,
      write(chunk, encoding, callback) {
        buffer.push(chunk.toString());
        callback();
      },
    })
    const readStream = Stream.Readable.from(dummyData);

    await Stream.promises.pipeline(
      readStream,
      transform,
      writable,
    )

    const resultCSV = await csvtojson({
      output: 'csv',
    }).fromString(buffer.join('').trim());

    expect(resultCSV).toEqual(expectCsv);
  });
});
