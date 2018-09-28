/* Magic Mirror
* Module: MMM-Widget
*
* By eouia
*/

const DefaultWidgetFormat = {
  url: "",
  position: "top_left",
  width: "200px",
  height: "200px",
  backgroundColor: "#000"
}


Module.register("MMM-Widget",{
  defaults: {
    widgets: []
  },

  start: function() {
    this.sendSocketNotification("INIT", this.config)
  },

  notificationReceived: function(noti, payload, sender) {
    if (noti == "DOM_OBJECTS_CREATED") {
      this.sendSocketNotification("START")
    }
  },

  socketNotificationReceived: function(noti, payload) {
    if (noti == "READY") {
      this.loadWidgets()
    }
  },


  loadWidgets: function() {
    var widgets = this.config.widgets
    for (i in widgets){
      var widget = Object.assign({}, DefaultWidgetFormat, widgets[i])

      var iFrame = document.createElement("iframe")
      iFrame.id = "WIDGET_" + i
      iFrame.className = "widget_item"
      iFrame.style.width = widget.width
      iFrame.style.height = widget.height
      iFrame.style.border = "none"
      iFrame.style.display = "block"
      iFrame.style.overflow = "hidden"
      iFrame.style.backgroundColor = widget.backgroundColor
      iFrame.scrolling = "no"
      iFrame.src = "/widget/" + i
      var position = "." + widget.position.replace("_", ".") + " > .container"
      var regionContainer = document.querySelector(position)
      regionContainer.appendChild(iFrame)
      if (regionContainer.style.display == "none") {
        regionContainer.style.display = "block"
      }
    }
  },

  suspend: function() {
    var doms = document.getElementsByClassName("widget_item")
    if (doms.length > 0) {
      for (let dom of doms) {
        dom.style.display = "none"
      }
    }
  },

  resume: function() {
    var doms = document.getElementsByClassName("widget_item")
    if (doms.length > 0) {
      for (let dom of doms) {
        dom.style.display = "block"
      }
    }
  }
})
