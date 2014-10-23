/**
 * Append a running clock to an element jQuery Plugin
 *
 * @param options
 * - id: a unique id for your clock
 * - ampm: bool: false for military time
 *
 * @return $(this)
 *
 * Usage:
 *
 * <div id="clock-1" class="clock">
 *   <div class="clock-border">
 *     <div class="clock-padding">
 *       Thu, Sep 20, 2012
 *     </div>
 *   </div>
 * </div>
 *
 * $('.clock-padding').runningClock({id: 'clock-1-display'})
 *
 * @author Aaron Klump, In the Loft Studios, LLC
 * @see http://www.intheloftstudios.com
 * @see http://gist.github.com/3758984
 */
(function( $ ) {
  $.fn.runningClock = function(options) {

    var $element = $(this);
    var digital = new Date();
    var hours = digital.getHours();
    var minutes = digital.getMinutes();
    var seconds = digital.getSeconds();

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'id'           : 'running-clock-display',
      'ampm'         : true,
    }, options);

    if (settings.ampm) {
      var dn = "PM";
      if (hours < 12) dn = "AM";
      if (hours > 12) hours = hours - 12;
      if (hours == 0) hours = 12;
    }
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;

    var display = hours + ":" + minutes + ":" + seconds;
    if (settings.ampm) {
      display = display + ' ' + dn;
    }

    // Do we replace or append?
    if ($('#' + settings.id).length) {
      $('#' + settings.id).html(display);
    }
    else {
      $element.append(' <span id="' + settings.id + '">' + display + '</span>');
    }

    // Make it come back a second later
    setTimeout(function() {
      $($element).runningClock(options);
    }, 1000);

    return $(this);
  };
})( jQuery );