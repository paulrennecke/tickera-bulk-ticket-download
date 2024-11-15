// ==UserScript==
// @name       tickera Ticket-Download
// @version    0.3
// @description Bulk ticket PDF download
// @match   https://*/wp-admin/edit.php?*post_type=tc_tickets_instances*
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

$(document).ready(function() {
  var downloadButton = $('<input type="button" class="button" value="Alle Tickets herunterladen">');
  downloadButton.click(downloadAllTickets);
  $('#post-query-submit').after(downloadButton);
});

function downloadAllTickets(){
    $('a:contains("Download"), a:contains("Herunterladen")').not(':contains("Downloads")').each(function(index) {
        var link = $(this).attr('href');
        setTimeout(function() {
            window.open(link, '_blank');
        }, index * 1000); // 1000 milliseconds delay (1 seconds)
    });
}
