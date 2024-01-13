import fetch from 'node-fetch';
import * as cheerio from 'cheerio';


abstract class AbstractFactory {
  protected is_secure: boolean;

  constructor(is_secure: boolean = false) {
    this.is_secure = is_secure;
  }

  abstract create_port(): any;

  abstract create_parser(): any;

  abstract create_protocol(): any;
}

// The HttpFactory create factory of related object HttpPort, HttpProtocol and HttpParser
class HttpFactory extends AbstractFactory {
  create_parser(): any {
    return new HttpParser();
  }

  create_port(): any {
    if (this.is_secure) {
      return new HttpsPort();
    }
    return new HttpPort();
  }

  create_protocol(): any {
    if (this.is_secure) {
      return new HttpsProtocol();
    }
    return new HttpProtocol();
  }
}

// The FtpFactory create factory of related object FtpPort, FtpProtocol and FtpParser
class FtpFactory extends AbstractFactory {
  create_parser(): any {
    return new FtpParser();
  }

  create_port(): any {
    return new FtpPort();
  }

  create_protocol(): any {
    return new FtpProtocol();
  }
}

abstract class Parser {
  abstract __call__(content: any, ...args: any[]): any;
}

abstract class Port {
  abstract __str__(): string;
}

abstract class Protocol {
  abstract __str__(): string;
}

class HttpParser extends Parser {
  __call__(content: any, ...args: any[]): any {
    const soup = cheerio.load(content);
    const links = soup('a');
    const filenames = links.map((_, link) => soup(link).attr('href')).get();
    return filenames.join('\n');
  }
}

class FtpParser extends Parser {
  __call__(content: any, ...args: any[]): any {
    const lines = content.split('\n');
    const filenames = [];
    for (const line of lines) {
      const splitted_line = line.split(undefined, 8);
      if (splitted_line.length === 9) {
        filenames.push(splitted_line[splitted_line.length - 1]);
      }
    }
    return filenames.join('\n');
  }
}

class HttpPort extends Port {
  __str__(): string {
    return '80';
  }
}

class HttpsPort extends Port {
  __str__(): string {
    return '443';
  }
}

class FtpPort extends Port {
  __str__(): string {
    return '22';
  }
}

class HttpProtocol extends Protocol {
  __str__(): string {
    return 'http';
  }
}

class HttpsProtocol extends Protocol {
  __str__(): string {
    return 'https';
  }
}

class FtpProtocol extends Protocol {
  __str__(): string {
    return 'ftp';
  }
}

// Client class that will accept the concrete factory, and this factory will be used to
// inject protocol, port and method to parse
class Connector {
  private protocol: any;
  private port: any;
  private parse: any;

  constructor(factory: any) {
    this.protocol = factory.create_protocol();
    this.port = factory.create_port();
    this.parse = factory.create_parser();
  }
  
  async _read(domain: string, path: string): Promise<any> {
    const url = `${this.protocol}://${domain}:${this.port}${path}`;
    try {
      const response = await fetch(url, { timeout: 2000 });
      const content = await response.text();
      return content;
    } catch (error) {
      console.error('Error occurred:', error);
      return null;
    }
  }

  read(domain: string, path: string): any {
    return this._read(domain, path).then((content) => {
      if (content !== null) {
        return this.parse(content);
      }
    });
  }
}

const domain = 'ftp.freebsd.org';
const path = '/pub/FreeBSD/';
const protocol = prompt('Connecting to ' + domain + '. Which Protocol to use? (0-http, 1 - ftp): ');
if (protocol === '0') {
  const is_secure = prompt('Use secure connection? (1-yes, 0-no): ');
  const factory = new HttpFactory(is_secure === '1');
} else {
  const is_secure = false;
  const factory = new FtpFactory(is_secure);
}

const connector = new Connector(factory);
const content = connector.read(domain, path);
if (content !== null) {
  console.log(connector.parse(content));
}