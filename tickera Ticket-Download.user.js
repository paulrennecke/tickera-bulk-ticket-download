// ==UserScript==
// @name       tickera Ticket-Download
// @version    0.1
// @description Bulk ticket PDF download
// @match   https://*/wp-admin/edit.php?*
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

$(document).ready(function() {
  var downloadButton = $('<input type="button" class="button" value="Alle Tickets herunterladen">');
  downloadButton.click(downloadAllTickets);
  $('#post-query-submit').after(downloadButton);
});

function downloadAllTickets(){
    $('a:contains("Download"):not(:contains("Downloads"))').each(function(index) {
        var link = $(this).attr('href');
        setTimeout(function() {
            window.open(link, '_blank');
        }, index * 1000); // 200 milliseconds delay (0.2 seconds)
    });
}