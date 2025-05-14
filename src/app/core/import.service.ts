import { Injectable } from '@angular/core';
import { Kunde } from '../shared/models/kunde.model';

@Injectable({ providedIn: 'root' })
export class ImportService {

  /** Liest eine CSV-Datei ein und gibt ein Array von Kunden zurück */
  readCsv(file: File): Promise<Kunde[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const lines = text.split('\n').filter(l => l.trim());
        const result: Kunde[] = [];
        for (let i=1; i<lines.length; i++) {
          const cols = lines[i].split(',');
          if (cols.length >= 2) {
            result.push({
              id: 0,  // id wird vom Server vergeben
              name: cols[0].replace(/"/g,'').trim(),
              email: cols[1].replace(/"/g,'').trim()
            });
          }
        }
        resolve(result);
      };
      reader.onerror = e => reject(e);
      reader.readAsText(file);
    });
  }

  /** Liest eine JSON-Datei ein und gibt ein Array von Kunden zurück */
  readJson(file: File): Promise<Kunde[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const arr = JSON.parse(reader.result as string);
          resolve(arr.filter((k: any) => k.name && k.email).map((k: any) => ({
            id: 0,
            name: String(k.name).trim(),
            email: String(k.email).trim()
          })));
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = e => reject(e);
      reader.readAsText(file);
    });
  }
}
