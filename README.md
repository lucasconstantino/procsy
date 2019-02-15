# procsy

A proxy building helper with subdomain support.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/procsy.svg)](https://npmjs.org/package/procsy)
[![Downloads/week](https://img.shields.io/npm/dw/procsy.svg)](https://npmjs.org/package/procsy)
[![License](https://img.shields.io/npm/l/procsy.svg)](https://github.com/lucasconstantino/procsy/blob/master/package.json)

<!-- toc -->

# Usage

```sh
npm install -g procsy

procsy -t http://google.com
```

## Subdomains

> Subdomain proxying in the localhost requires you [configure the `hosts` file](https://stackoverflow.com/questions/1078193/hosts-file-and-multiple-sub-domains) properly.

To proxy subdomain based requests, you can specify source subdomains and their targets in the following syntax:

`[subdomain],[target]`

## Examples:

### 1. Single subdomain

#### `hosts`:

```
127.0.0.1 app.dev api.app.dev
```

#### command:

```sh
procsy -t api,http://my-external-api.com
```

#### outcome:

| from                        | to                                |
| --------------------------- | --------------------------------- |
| `http://api.local.dev/path` | `http://my-external-api.com/path` |
| `http://local.dev/path`     | `404`                             |

### 2. Multiple subdomains

#### `hosts`:

```
127.0.0.1 app.dev api.app.dev tracking.app.dev
```

#### command:

```sh
procsy -t api,http://my-external-api.com tracking,http://analytics.com
```

#### outcome:

| from                             | to                                |
| -------------------------------- | --------------------------------- |
| `http://api.local.dev/path`      | `http://my-external-api.com/path` |
| `http://tracking.local.dev/path` | `http://analytics.com/path`       |
| `http://local.dev/path`          | `404`                             |

### 3. Subdomain & domain

#### `hosts`:

```
127.0.0.1 app.dev api.app.dev
```

#### command:

```sh
procsy -t api,http://my-external-api.com *,http://my-app.com
```

#### outcome:

| from                        | to                                |
| --------------------------- | --------------------------------- |
| `http://api.local.dev/path` | `http://my-external-api.com/path` |
| `http://local.dev/path`     | `http://my-app.com/path`          |
