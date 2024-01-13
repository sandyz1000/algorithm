/* 
Facade provide a simplified interface to it's set of interfaces.
Advantages:
1. Client gain simplicity and subsystem get flexibility.
2. Reduce dependency to external code which it related to facade code but unrelated to client code.
3. Provides a better and clearer API for the client code.

 */

import * as fs from 'fs';
import * as util from 'util';
import * as http from 'http';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class WeatherProvider {
  private api_url: string;

  constructor() {
    this.api_url = 'http://api.openweathermap.org/data/2.5/forecast?q={},{}&appid=211d5e0dea27ca83eefcea0790126b1a';
  }

  async get_weather_data(city: string, country: string): Promise<string | null> {
    const url = this.api_url.replace('{}', encodeURIComponent(city)).replace('{}', encodeURIComponent(country));
    try {
      const response = await this.http_request(url);
      return response;
    } catch (error) {
      return null;
    }
  }

  private async http_request(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }
}

class Parser {
  parse_weather_data(weather_data: string): number[] {
    const parsed_data = JSON.parse(weather_data);
    let start_date: Date | null = null;
    const results: number[] = [];

    for (const item of parsed_data["lists"]) {
      const date = new Date(item['dt_txt']);
      start_date = start_date || date;
      if (start_date.getDate() !== date.getDate()) {
        return results;
      }
      results.push(item['main']['temp']);
    }

    return results;
  }
}

class Converter {
  kelvin_to_celsius(temp: number): number {
    return Math.round(temp - 273.15);
  }
}

class CachedObject {
  obj: any;
  expired: Date;

  constructor(obj: any, interval: number = 1) {
    this.obj = obj;
    this.expired = new Date(Date.now() + interval * 60 * 60 * 1000);
  }

  toString(): string {
    // Implement as needed
    return '';
  }
}

class Cache {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  async save(obj: any): Promise<void> {
    const dct = new CachedObject(obj, 3);
    await writeFileAsync(this.filename, JSON.stringify(dct));
  }

  async load(): Promise<CachedObject | null> {
    try {
      const fileContent = await readFileAsync(this.filename, 'utf-8');
      const result = JSON.parse(fileContent);
      if (result['expired'] > Date.now()) {
        return result;
      }
    } catch (error) {
      // File not found or invalid JSON
    }

    return null;
  }
}

class Weather {
  temperature: number;

  constructor(data: number[]) {
    const result = data.reduce((x, y) => x + y, 0);
    this.temperature = result / data.length;
  }
}

class Facade {
  async get_forecast(city: string, country: string): Promise<number | null> {
    const cache = new Cache('myfile');
    const cache_result = await cache.load();

    if (cache_result) {
      return cache_result.obj;
    } else {
      const weather_provider = new WeatherProvider();
      const weather_data = await weather_provider.get_weather_data(city, country);

      if (weather_data) {
        const parser = new Parser();
        const parsed_data = parser.parse_weather_data(weather_data);
        const weather = new Weather(parsed_data);
        const converter = new Converter();
        const temperature_celsius = converter.kelvin_to_celsius(weather.temperature);

        await cache.save(temperature_celsius);
        return temperature_celsius;
      } else {
        return null;
      }
    }
  }
}

// Example usage:
(async () => {
  const facade = new Facade();
  const city = prompt("Enter your city: ");
  const country = prompt("Enter your country: ");
  const forecast = await facade.get_forecast(city, country);
  if (forecast !== null) {
    console.log(forecast);
  } else {
    console.log('Failed to fetch weather data.');
  }
})();
