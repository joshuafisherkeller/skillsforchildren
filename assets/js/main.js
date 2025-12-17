/* ==========================================================================
   Skills for Children - Main JavaScript
   ========================================================================== */

// Toggle Pillar Accordion
function togglePillar(header) {
    const content = header.nextElementSibling;
    
    // Close all other pillars
    document.querySelectorAll('.pillar-content').forEach(c => {
        if (c !== content) c.classList.remove('active');
    });
    document.querySelectorAll('.pillar-header').forEach(h => {
        if (h !== header) h.classList.remove('active');
    });
    
    // Toggle current pillar
    content.classList.toggle('active');
    header.classList.toggle('active');
}

// Copy Link to Clipboard
function copyLink(url, button) {
    navigator.clipboard.writeText(url).then(function() {
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Copied!';
        button.classList.add('copied');
        
        // Show toast notification
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.add('show');
        }
        
        // Reset after 2 seconds
        setTimeout(function() {
            button.innerHTML = originalText;
            button.classList.remove('copied');
            if (toast) {
                toast.classList.remove('show');
            }
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy link. Please try again.');
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // All pillars start collapsed - user clicks to expand
    console.log('Skills for Children site loaded');
});
