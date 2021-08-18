const fetch = require('node-fetch')

class Logger {
  _hookUrl = null

  constructor(hookUrl) {
    this._hookUrl = hookUrl
  }

  _log(message, color) {
    fetch(this._hookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attachments: [
          {
            ...(color ? { color } : {}),

            blocks: [
              {
                "type": "section",
                "text": {
                  "type": "plain_text",
                  'text': message,
                }
              }
            ]
          }
        ]
      }),
    })
      .catch(console.error)
  }

  log(message) {
    this._log(message)
  }

  success(message) {
    this._log(message, '#2eb886')
  }

  error(message) {
    this._log(message, '#a30200')
  }

  info(message) {
    this._log(message, '#439fe0')
  }
}

module.exports = Logger
