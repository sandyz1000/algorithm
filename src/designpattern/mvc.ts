/* 

Url shortner which will shorten the url given and save it to pickle object.
When user invoke the method with the shortened url it will redirect user to the actual web page
*/
// import * as pickle from 'pickle'; // You might need to install a pickle library for TypeScript
import * as express from 'express';

const app = express();
app.set('views', 'views');

class Url {
  full_url: string;
  short_url: string;

  constructor() {
    this.full_url = '';
    this.short_url = '';
  }

  static shorten(full_url: string): Url {
    const instance = new Url();
    instance.full_url = full_url;
    instance.short_url = instance.__create_short_url();
    Url.__save_url_mapping(instance);
    return instance;
  }

  static get_by_short_url(short_url: string): Url | undefined {
    // Implement the method as needed
    return undefined;
  }

  private __increment_string(str: string): string {
    if (str === '') {
      return 'a';
    }
    const lastChar = str.slice(-1);
    if (lastChar !== 'z') {
      return str.slice(0, -1) + String.fromCharCode(lastChar.charCodeAt(0) + 1);
    }
    return this.__increment_string(str.slice(0, -1)) + 'a';
  }

  private __create_short_url(): string {
    const lastShortUrl = Url.__load_last_short_url();
    const shortUrl = this.__increment_string(lastShortUrl);
    Url.__save_last_short_url(shortUrl);
    return shortUrl;
  }

  private static __save_last_short_url(short_url: string): void {
    // Implement the method as needed
  }

  private static __load_last_short_url(): string {
    // Implement the method as needed
    return '';
  }

  private static __save_url_mapping(instance: Url): void {
    // Implement the method as needed
  }

  private static __load_url_mapping(): { [key: string]: Url } {
    // Implement the method as needed
    return {};
  }
}

app.get('/', (req, res) => {
  // Render info about url shorten routes
  // Implement as needed
});

app.get('/shorten', (req, res) => {
  // Return the shortened url of the full url
  // Implement as needed
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
