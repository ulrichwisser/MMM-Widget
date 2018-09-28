const bodyParser = require("body-parser")

var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
    this.config = null
    this.pooler = []
  },

  socketNotificationReceived: function(noti, payload) {
    if (noti == "INIT") {
      this.config = payload
      this.webserver()
    }
  },

  webserver: function() {
    this.expressApp.use(bodyParser.json())
		this.expressApp.use(bodyParser.urlencoded({extended: true}))
    this.expressApp.get("/widget/:id", (req, res) => {
      var id = req.params.id
      var html = `
<html>
<head>
<style>
body {padding:0, margin:0}
</style>
</head>
<body>
<div>
`
+ this.config.widgets[id].html +
`
</div>
</body>
</html>`
      res.status(200).send(this.config.widgets[id].html)
    })

    this.sendSocketNotification("READY")
  }
})
