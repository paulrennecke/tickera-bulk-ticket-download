// ==UserScript==
// @name       tickera Ticket-Download
// @version    0.4
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
    // Select only links inside .ticket_links within #the-list
    const links = $('#the-list tr .ticket_links a')
    .filter(function() {
        const text = $(this).text().trim().toLowerCase();
        return text === 'download' || text === 'herunterladen';
    })
    .map(function() { return $(this).attr('href'); })
    .get();

    if (links.length === 0) {
        alert("No 'Download' or 'Herunterladen' links found inside #the-list .ticket_links.");
        return;
    }

    console.log(`Found ${links.length} ticket download links. Starting...`);

    let i = 0;
    const delay = 1000; // 1 second between downloads

    const downloadNext = () => {
        if (i >= links.length) {
            console.log("✅ All downloads triggered.");
            return;
        }

        const url = links[i];
        console.log(`⬇️ Downloading ${i + 1}/${links.length}: ${url}`);
        window.open(url, '_blank'); // triggers the file download
        i++;
        setTimeout(downloadNext, delay);
    };

    downloadNext();
}
