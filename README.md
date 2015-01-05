proxyvator
==========

Configures environment when developing behind a proxy

## Quick Start

Before anything, you need installed:
* [node.js](http://nodejs.org)
* [npm.js](https://www.npmjs.com/)

Then, just use `npm install` to get it ready:
```sh
$ npm install -g proxyvator
```

## Current Support

By this version, `proxyvator` supports configuring next apps:
* `git`
* `node.js`
* `npm.js`
* `bower`

## Usage

Calling `proxyvator` from command line outputs the general help:
```sh
$ proxyvator

  Usage: proxyvator [options] [command]

  Commands:

    setup [options]   setup configuration for developing behind the proxy
    clear             clear configuration for developing behind the proxy

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    --debug        output debbuging messages
```

`proxyvator` has two commands:
* `setup` which sets up the configuration for developing behind the proxy specified or saved prevoiusly.
* `clean` which cleans the configuration for using direct connection.

### Setting up a proxy

The `proxyvator setup` command has several options:
```sh
$ proxyvator setup --help

  Usage: setup [options]

  Options:

    -h, --help     output usage information
    --http <url>   set url for http proxy (e.g. http://myproxy.com:8080)
    --https <url>  set url for https proxy (e.g. https://me:mypass@myproxy.com:443
    --same         use the same http proxy for https
    --save         save settings
```

For the first time you call `proxyvator`, you must specify the options `--http <url> --save` to set your proxy and save it to the app settings.
```sh
$ proxyvator setup --http http://myproxy.com:8080 --save
```

If you have the same proxy for http and https requests, then you can use the option `--same` to tell the app that it will use the proxy specified by `--http <url>` as the https proxy.
```sh
$ proxyvator setup --http http://mysweetproxy.org:80 --same --save
```

When you previously saved the proxy settings, just call:
```sh
$ proxyvator setup
```

### Cleaning proxy settings

Just call the command `clear` to have your proxy settings erased:
```sh
$ proxyvator clear
```
